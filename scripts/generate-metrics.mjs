import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { performance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";
import { compileGlass } from "../src/compiler.js";
import { GLASS_COMPONENTS, listGlassComponents } from "../src/components.js";
import { EFFECT_COMPLEXITY, PALETTES, PRESETS, RECIPES, RECIPE_CONTRACTS, normalizeConfig } from "../src/defaults.js";
import { parseGlass } from "../src/parser.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const docsMetricsDir = path.join(root, "docs", "metrics");
const docsAssetsDir = path.join(root, "docs", "assets");
const siteDataDir = path.join(root, "site", "data");
const siteAssetsDir = path.join(root, "site", "assets");

const sample = `
selector: .bench
preset: editor
recipe: command-palette
mode: surface
strength: strong
contrastMode: safe
performance: balanced
effect: ribbon
animate.mode: orbit
animate.hueShift: 24
grain.amount: 0.04
`.trim();

function bench(name, fn, iterations) {
  for (let i = 0; i < Math.min(iterations, 200); i += 1) {
    fn();
  }

  const started = performance.now();
  for (let i = 0; i < iterations; i += 1) {
    fn();
  }
  const totalMs = performance.now() - started;
  return {
    name,
    iterations,
    totalMs: Number(totalMs.toFixed(3)),
    msPerOp: Number((totalMs / iterations).toFixed(5)),
    opsPerSecond: Math.round(iterations / (totalMs / 1000))
  };
}

async function listFiles(dir, predicate = () => true) {
  if (!existsSync(dir)) {
    return [];
  }

  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listFiles(fullPath, predicate));
    } else if (predicate(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

async function countTests() {
  const files = await listFiles(path.join(root, "test"), (file) => file.endsWith(".js"));
  let cases = 0;

  for (const file of files) {
    const source = await readFile(file, "utf8");
    cases += source.match(/\btest\(/g)?.length || 0;
  }

  return { files: files.length, cases };
}

async function countBytes(files) {
  let total = 0;

  for (const file of files) {
    total += (await stat(file)).size;
  }

  return total;
}

function svgShell({ title, subtitle, width, height, body }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${title}">
  <style>
    .bg { fill: #0f1319; }
    .panel { fill: #151a23; stroke: #2a3140; }
    .title { fill: #edf2fa; font: 700 18px ui-sans-serif, system-ui, sans-serif; }
    .subtitle { fill: #98a4b8; font: 12px ui-sans-serif, system-ui, sans-serif; }
    .grid { stroke: #2a3140; stroke-width: 1; opacity: .72; }
    .value { fill: #dce8ff; font: 700 12px ui-monospace, SFMono-Regular, Consolas, monospace; }
    .label { fill: #aab6c9; font: 12px ui-sans-serif, system-ui, sans-serif; }
    .axis { stroke: #2a3140; stroke-width: 1; }
    .shape { fill: #243752; stroke: #78a8ff; stroke-width: 2; }
    .dot { fill: #9fd0ff; }
  </style>
  <rect class="bg" width="100%" height="100%" rx="14" />
  <rect class="panel" x="10" y="10" width="${width - 20}" height="${height - 20}" rx="12" />
  <text x="30" y="36" class="title">${title}</text>
  <text x="30" y="54" class="subtitle">${subtitle}</text>
  ${body}
</svg>`;
}

function barSvg({ title, subtitle, values, suffix = "", width = 860, height = 300 }) {
  const padding = { top: 72, right: 34, bottom: 58, left: 54 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;
  const max = Math.max(...values.map((item) => item.value), 1);
  const slot = innerWidth / values.length;
  const barWidth = Math.min(92, slot * 0.58);
  const bars = values.map((item, index) => {
    const h = (item.value / max) * innerHeight;
    const x = padding.left + index * slot + (slot - barWidth) / 2;
    const y = padding.top + innerHeight - h;
    return `
      <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barWidth.toFixed(1)}" height="${h.toFixed(1)}" rx="6" fill="${item.color}" />
      <text x="${(x + barWidth / 2).toFixed(1)}" y="${(y - 10).toFixed(1)}" text-anchor="middle" class="value">${item.value}${suffix}</text>
      <text x="${(x + barWidth / 2).toFixed(1)}" y="${height - 30}" text-anchor="middle" class="label">${item.label}</text>`;
  }).join("");

  return svgShell({
    title,
    subtitle,
    width,
    height,
    body: `
      <line class="grid" x1="${padding.left}" y1="${padding.top + innerHeight}" x2="${width - padding.right}" y2="${padding.top + innerHeight}" />
      <line class="grid" x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${padding.top + innerHeight}" />
      ${bars}`
  });
}

function radarSvg({ title, subtitle, values, width = 560, height = 430 }) {
  const cx = width / 2;
  const cy = 230;
  const radius = 128;
  const max = Math.max(...values.map((item) => item.value), 1);
  const points = values.map((item, index) => {
    const angle = -Math.PI / 2 + (Math.PI * 2 * index) / values.length;
    const scaled = (item.value / max) * radius;
    return {
      ...item,
      x: cx + Math.cos(angle) * scaled,
      y: cy + Math.sin(angle) * scaled,
      lx: cx + Math.cos(angle) * (radius + 46),
      ly: cy + Math.sin(angle) * (radius + 46)
    };
  });
  const polygon = points.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");
  const body = `
    ${[0.33, 0.66, 1].map((scale) => `<circle class="grid" cx="${cx}" cy="${cy}" r="${(radius * scale).toFixed(1)}" fill="none" />`).join("")}
    ${points.map((point) => `<line class="axis" x1="${cx}" y1="${cy}" x2="${point.lx.toFixed(1)}" y2="${point.ly.toFixed(1)}" />`).join("")}
    <polygon class="shape" points="${polygon}" />
    ${points.map((point) => `<circle class="dot" cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="4" />`).join("")}
    ${points.map((point) => `<text class="label" x="${point.lx.toFixed(1)}" y="${point.ly.toFixed(1)}" text-anchor="middle">${point.label}</text>`).join("")}`;
  return svgShell({ title, subtitle, width, height, body });
}

async function main() {
  await Promise.all([docsMetricsDir, docsAssetsDir, siteDataDir, siteAssetsDir].map((dir) => mkdir(dir, { recursive: true })));

  const parsed = parseGlass(sample);
  const performanceRuns = [
    bench("parseGlass", () => parseGlass(sample), 6000),
    bench("normalizeConfig", () => normalizeConfig(parsed), 6000),
    bench("compileGlass", () => compileGlass(sample, { minify: true }), 1800)
  ];

  const cssSamples = [
    { label: "surface", config: { selector: ".m-surface", recipe: "command-palette", mode: "surface" } },
    { label: "frost", config: { selector: ".m-frost", recipe: "navbar", mode: "frost" } },
    { label: "gradient", config: { selector: ".m-gradient", mode: "gradient", effect: "ribbon" } },
    { label: "static", config: { selector: ".m-static", recipe: "terminal", performance: "static" } }
  ].map((item) => {
    const css = compileGlass(item.config, { minify: true });
    return { label: item.label, bytes: Buffer.byteLength(css), chars: css.length };
  });

  const pkg = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
  const testStats = await countTests();
  const sourceFiles = await listFiles(path.join(root, "src"), (file) => /\.(js|d\.ts)$/.test(file));
  const docsFiles = await listFiles(path.join(root, "docs"), (file) => /\.(md|json|svg)$/.test(file));
  const examplesFiles = await listFiles(path.join(root, "examples"), () => true);

  const report = {
    generatedAt: new Date().toISOString(),
    package: {
      name: pkg.name,
      version: pkg.version,
      publicExports: Object.keys(pkg.exports || {}).length,
      optionalPeers: Object.keys(pkg.peerDependenciesMeta || {}).filter((key) => pkg.peerDependenciesMeta[key]?.optional).length
    },
    surfaceModel: {
      modes: ["surface", "gradient", "frost"],
      effects: Object.keys(EFFECT_COMPLEXITY),
      strengths: ["soft", "medium", "strong"]
    },
    counts: {
      adapters: Object.keys(pkg.exports || {}).filter((key) => key.startsWith("./adapters/")).length,
      componentSubpaths: Object.keys(pkg.exports || {}).filter((key) => key.startsWith("./components")).length,
      components: listGlassComponents().length,
      recipes: Object.keys(RECIPES).length,
      recipeContracts: Object.keys(RECIPE_CONTRACTS).length,
      presets: Object.keys(PRESETS).length,
      palettes: Object.keys(PALETTES).length,
      tests: testStats.cases,
      testFiles: testStats.files,
      examples: examplesFiles.length,
      docs: docsFiles.length,
      sourceFiles: sourceFiles.length,
      sourceBytes: await countBytes(sourceFiles)
    },
    performance: performanceRuns,
    cssSamples,
    components: Object.keys(GLASS_COMPONENTS),
    integrationMatrix: ["React", "Vue", "Solid", "Preact", "Svelte", "Vanilla", "Tailwind", "Tailwind v4", "shadcn-style", "UnoCSS", "Next", "Nuxt", "Astro"]
  };

  const json = `${JSON.stringify(report, null, 2)}\n`;
  await writeFile(path.join(docsMetricsDir, "report.json"), json);
  await writeFile(path.join(siteDataDir, "metrics.json"), json);

  const opsSvg = barSvg({
    title: "Operation Throughput",
    subtitle: "Local Node run from scripts/generate-metrics.mjs",
    suffix: "/s",
    values: performanceRuns.map((item, index) => ({
      label: item.name,
      value: item.opsPerSecond,
      color: ["#78a8ff", "#72d7c7", "#d6a8ff"][index]
    }))
  });
  const cssSvg = barSvg({
    title: "Compiled CSS Size",
    subtitle: "Minified bytes for representative surface modes",
    suffix: "B",
    values: cssSamples.map((item, index) => ({
      label: item.label,
      value: item.bytes,
      color: ["#78a8ff", "#72d7c7", "#f0be75", "#d6a8ff"][index]
    }))
  });
  const capabilitySvg = radarSvg({
    title: "System Coverage",
    subtitle: "Components, adapters, recipes, tests and examples",
    values: [
      { label: "components", value: report.counts.components },
      { label: "adapters", value: report.counts.adapters },
      { label: "recipes", value: report.counts.recipes },
      { label: "tests", value: report.counts.tests },
      { label: "examples", value: report.counts.examples }
    ]
  });

  for (const [name, svg] of Object.entries({
    "chart-ops.svg": opsSvg,
    "chart-css-size.svg": cssSvg,
    "chart-capability.svg": capabilitySvg
  })) {
    await writeFile(path.join(docsAssetsDir, name), svg);
    await writeFile(path.join(siteAssetsDir, name), svg);
  }

  const md = `# Metrics Report

Generated by \`npm run metrics\`.

## Package

- version: \`${report.package.version}\`
- public export entries: \`${report.package.publicExports}\`
- optional peers: \`${report.package.optionalPeers}\`
- adapters: \`${report.counts.adapters}\`
- components: \`${report.counts.components}\`
- recipes: \`${report.counts.recipes}\`
- tests: \`${report.counts.tests}\`
- examples: \`${report.counts.examples}\`

## Performance

| operation | iterations | total ms | ms/op | ops/sec |
| --- | ---: | ---: | ---: | ---: |
${performanceRuns.map((item) => `| ${item.name} | ${item.iterations} | ${item.totalMs} | ${item.msPerOp} | ${item.opsPerSecond} |`).join("\n")}

## CSS Samples

| mode | minified bytes |
| --- | ---: |
${cssSamples.map((item) => `| ${item.label} | ${item.bytes} |`).join("\n")}
`;
  await writeFile(path.join(docsMetricsDir, "report.md"), md);

  console.log(`metrics generated for ${pkg.name}@${pkg.version}`);
}

await main();
