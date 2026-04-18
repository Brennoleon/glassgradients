#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { watch } from "node:fs";
import { dirname, resolve } from "node:path";
import { mkdir } from "node:fs/promises";
import { compileGlass } from "./compiler.js";
import { parseGlass } from "./parser.js";

function starterTemplate(preset = "default") {
  return `selector: .hero
preset: ${preset}
palette: aurora
effect: mesh
performance: auto
intensity: 1
frost: 0.62
vignette: 0.24
shadow: 0.22
tint: rgba(255,255,255,0.02)
radius: 22px
speed: 18s
animate.mode: wave
animate.hueShift: 30
animate.drift: 9%
animate.speedMultiplier: 1
animate.fps: 0
grain.amount: 0.08
grain.size: 3px
grain.motion: 0.2
colors: #66b3ff, #8f7dff, #45d6c8, #f97db2
`;
}

function printHelp() {
  console.log(`
glassgradients - stable .glass -> CSS toolchain

Usage:
  glassgradients init [file.glass] [--preset cinematic]
  glassgradients build <input.glass> [-o output.css] [--selector .hero] [--minify] [--watch]
                      [--preset frosted] [--effect prism] [--performance eco]
  glassgradients inspect <input.glass>
  glassgradients --help
`.trim());
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const command = args[0];
  const rest = args.slice(1);

  let input = "";
  let output = "";
  let selector = "";
  let minify = false;
  let watchMode = false;
  let preset = "";
  let effect = "";
  let performance = "";

  for (let i = 0; i < rest.length; i += 1) {
    const token = rest[i];
    if (!token) {
      continue;
    }
    if (!token.startsWith("-") && !input) {
      input = token;
      continue;
    }
    if (token === "-o" || token === "--output") {
      output = rest[i + 1] || "";
      i += 1;
      continue;
    }
    if (token === "--selector") {
      selector = rest[i + 1] || "";
      i += 1;
      continue;
    }
    if (token === "--preset") {
      preset = rest[i + 1] || "";
      i += 1;
      continue;
    }
    if (token === "--effect") {
      effect = rest[i + 1] || "";
      i += 1;
      continue;
    }
    if (token === "--performance") {
      performance = rest[i + 1] || "";
      i += 1;
      continue;
    }
    if (token === "--minify") {
      minify = true;
      continue;
    }
    if (token === "--watch") {
      watchMode = true;
    }
  }

  return { command, input, output, selector, minify, watchMode, preset, effect, performance };
}

function compileOverrides({ selector, minify, preset, effect, performance }) {
  const overrides = {};
  if (selector) {
    overrides.selector = selector;
  }
  if (preset) {
    overrides.preset = preset;
  }
  if (effect) {
    overrides.effect = effect;
  }
  if (performance) {
    overrides.performance = performance;
  }
  if (minify) {
    overrides.minify = true;
  }
  return overrides;
}

async function doBuild(inputPath, outputPath, options) {
  const source = await readFile(inputPath, "utf8");
  const css = compileGlass(source, options);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, css, "utf8");
  return outputPath;
}

async function runBuild(params) {
  const { input, output, watchMode } = params;
  if (!input) {
    throw new Error("Missing input file. Use: glassgradients build <input.glass>");
  }

  const inputPath = resolve(input);
  const outputPath = output ? resolve(output) : resolve(`${inputPath.replace(/\.glass$/i, "")}.css`);
  const options = compileOverrides(params);

  const runOnce = async () => {
    const builtFile = await doBuild(inputPath, outputPath, options);
    console.log(`Built CSS: ${builtFile}`);
  };

  await runOnce();
  if (!watchMode) {
    return;
  }

  console.log(`Watching: ${inputPath}`);
  watch(inputPath, { persistent: true }, async (eventType) => {
    if (eventType !== "change") {
      return;
    }
    try {
      await runOnce();
    } catch (error) {
      console.error(`[glassgradients] watch build failed: ${error.message}`);
    }
  });
}

async function run() {
  const params = parseArgs(process.argv);
  const { command, input, preset } = params;

  if (!command || command === "--help" || command === "-h" || command === "help") {
    printHelp();
    return;
  }

  if (command === "init") {
    const initPath = resolve(input || "./glassgradient.glass");
    await mkdir(dirname(initPath), { recursive: true });
    await writeFile(initPath, starterTemplate(preset || "default"), "utf8");
    console.log(`Starter created: ${initPath}`);
    return;
  }

  if (command === "inspect") {
    if (!input) {
      throw new Error("Missing input file. Use: glassgradients inspect <input.glass>");
    }
    const source = await readFile(resolve(input), "utf8");
    console.log(JSON.stringify(parseGlass(source), null, 2));
    return;
  }

  if (command !== "build") {
    throw new Error(`Unknown command "${command}". Use --help.`);
  }

  await runBuild(params);
}

run().catch((error) => {
  console.error(`[glassgradients] ${error.message}`);
  process.exitCode = 1;
});
