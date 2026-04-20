import test from "node:test";
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";

const execFileAsync = promisify(execFile);
const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const cliPath = join(repoRoot, "src", "cli.js");

async function runCli(args) {
  try {
    const result = await execFileAsync(process.execPath, [cliPath, ...args], {
      cwd: repoRoot,
      windowsHide: true
    });
    return { code: 0, stdout: result.stdout, stderr: result.stderr };
  } catch (error) {
    return {
      code: typeof error.code === "number" ? error.code : 1,
      stdout: error.stdout || "",
      stderr: error.stderr || ""
    };
  }
}

async function tempDir() {
  return mkdtemp(join(tmpdir(), "glassgradients-cli-"));
}

test("help lists existing and new commands", async () => {
  const result = await runCli(["--help"]);

  assert.equal(result.code, 0);
  assert.match(result.stdout, /glassgradients init \[file\.glass\]/);
  assert.match(result.stdout, /glassgradients build <file\.glass>/);
  assert.match(result.stdout, /glassgradients inspect <file\.glass> \[--score\]/);
  assert.match(result.stdout, /glassgradients lint <file\.glass>/);
  assert.match(result.stdout, /glassgradients format <file\.glass>/);
  assert.match(result.stdout, /glassgradients tokens <file\.glass>/);
});

test("legacy inspect remains parsed JSON and ignores unknown extras", async () => {
  const result = await runCli(["inspect", "examples/starter.glass", "--unknown", "extra"]);
  const parsed = JSON.parse(result.stdout);

  assert.equal(result.code, 0);
  assert.equal(parsed.selector, ".hero");
  assert.equal(parsed.animate.mode, "wave");
  assert.deepEqual(parsed.colors, ["#66b3ff", "#8f7dff", "#45d6c8", "#f97db2"]);
});

test("legacy init and build remain compatible", async () => {
  const dir = await tempDir();
  const input = join(dir, "legacy.glass");
  const output = join(dir, "legacy.css");

  const init = await runCli(["init", input, "--preset", "editor", "--recipe", "panel", "--mode", "frost", "--ignored"]);
  assert.equal(init.code, 0);

  const source = await readFile(input, "utf8");
  assert.match(source, /preset: editor/);
  assert.match(source, /recipe: panel/);
  assert.match(source, /mode: frost/);

  const build = await runCli(["build", input, "-o", output, "--selector", ".legacy", "--minify", "--ignored"]);
  assert.equal(build.code, 0);

  const css = await readFile(output, "utf8");
  assert.match(css, /\.legacy\{/);
  assert.match(css, /--gg-glass-fill:/);
});

test("subcommand help exits before requiring input", async () => {
  const result = await runCli(["build", "--help"]);

  assert.equal(result.code, 0);
  assert.match(result.stdout, /glassgradients build <file\.glass>/);
});

test("flags that require values fail instead of consuming the next flag", async () => {
  const result = await runCli(["build", "examples/starter.glass", "-o", "--minify"]);

  assert.equal(result.code, 1);
  assert.match(result.stderr, /Missing value for -o/);
});

test("build rejects invalid explicit overrides", async () => {
  const dir = await tempDir();
  const output = join(dir, "out.css");
  const result = await runCli([
    "build",
    "examples/starter.glass",
    "-o",
    output,
    "--mode",
    "liquid",
    "--effect",
    "sparkle",
    "--performance",
    "turbo"
  ]);

  assert.equal(result.code, 1);
  assert.match(result.stderr, /Unknown mode "liquid"/);
  assert.match(result.stderr, /Unknown effect "sparkle"/);
  assert.match(result.stderr, /Unknown performance profile "turbo"/);
});

test("lint reports validation errors with exit code 1", async () => {
  const dir = await tempDir();
  const input = join(dir, "bad.glass");
  await writeFile(
    input,
    `selector: .bad
recipe: missing-shell
mode: liquid
effect: sparkle
performance: turbo
mainFilter: glow
unknownKey: true
`,
    "utf8"
  );

  const result = await runCli(["lint", input]);

  assert.equal(result.code, 1);
  assert.match(result.stderr, /Unknown recipe "missing-shell"/);
  assert.match(result.stderr, /Unknown mode "liquid"/);
  assert.match(result.stderr, /Unknown effect "sparkle"/);
  assert.match(result.stderr, /Unknown performance profile "turbo"/);
  assert.match(result.stderr, /Unknown main filter "glow"/);
  assert.match(result.stderr, /Unknown key "unknownKey"/);
});

test("lint allows warnings without failing", async () => {
  const dir = await tempDir();
  const input = join(dir, "heavy.glass");
  await writeFile(
    input,
    `selector: .heavy
recipe: hero
effect: liquid
performance: quality
glass.blur: 48
grain.amount: 0.24
animate.fps: 90
`,
    "utf8"
  );

  const result = await runCli(["lint", input]);

  assert.equal(result.code, 0);
  assert.match(result.stdout, /Lint OK:/);
  assert.match(result.stderr, /warning: performance:/);
  assert.match(result.stderr, /performance "quality" is expensive/);
  assert.match(result.stderr, /animated "liquid" can be expensive/);
  assert.doesNotMatch(result.stderr, /Unknown effect "liquid"/);
});

test("format writes stable order and check mode fails when needed", async () => {
  const dir = await tempDir();
  const input = join(dir, "messy.glass");
  const output = join(dir, "formatted.glass");
  await writeFile(
    input,
    `effect: prism
selector: .panel
animate.mode: orbit
colors: #111111, #222222, #333333, #444444
`,
    "utf8"
  );

  const check = await runCli(["format", input, "--check"]);
  assert.equal(check.code, 1);
  assert.match(check.stderr, /Needs format:/);

  const format = await runCli(["format", input, "-o", output]);
  assert.equal(format.code, 0);

  const formatted = await readFile(output, "utf8");
  assert.equal(
    formatted,
    `selector: .panel
effect: prism
colors: #111111, #222222, #333333, #444444
animate:
  mode: orbit
`
  );

  const formattedCheck = await runCli(["format", output, "--check"]);
  assert.equal(formattedCheck.code, 0);
});

test("inspect --score emits a quality report", async () => {
  const result = await runCli(["inspect", "examples/starter.glass", "--score"]);
  const report = JSON.parse(result.stdout);

  assert.equal(result.code, 0);
  assert.equal(report.score, 100);
  assert.equal(report.grade, "A");
  assert.equal(report.summary.selector, ".hero");
  assert.equal(report.summary.effect, "mesh");
  assert.deepEqual(report.errors, []);
});

test("tokens exports theme CSS with selector and output file", async () => {
  const dir = await tempDir();
  const input = join(dir, "tokens.glass");
  const output = join(dir, "tokens.css");
  await writeFile(input, "selector: .tokens\nrecipe: panel\npreset: editor\n", "utf8");

  const result = await runCli(["tokens", input, "--selector", ":root", "-o", output]);
  assert.equal(result.code, 0);

  const css = await readFile(output, "utf8");
  assert.match(css, /:root \{/);
  assert.match(css, /--gg-glass-fill:/);
  assert.match(css, /backdrop-filter:/);
});
