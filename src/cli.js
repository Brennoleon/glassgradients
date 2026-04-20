#!/usr/bin/env node
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { watch } from "node:fs";
import { dirname, resolve } from "node:path";
import { compileGlass } from "./compiler.js";
import { DEFAULT_CONFIG, EFFECT_COMPLEXITY, PALETTES, PERFORMANCE_PRESETS, PRESETS, RECIPES, RECIPE_CONTRACTS, normalizeConfig } from "./defaults.js";
import { parseGlass } from "./parser.js";
import { compileGlassTheme, createGlassTokens } from "./theme.js";

const KNOWN_EFFECTS = new Set(Object.keys(EFFECT_COMPLEXITY));
const KNOWN_MODES = new Set(["surface", "gradient", "frost"]);
const KNOWN_STRENGTHS = new Set(["soft", "medium", "strong"]);
const KNOWN_CONTRAST_MODES = new Set(["balanced", "safe"]);
const KNOWN_ANIMATE_MODES = new Set(["wave", "pulse", "orbit"]);
const KNOWN_MAIN_FILTERS = new Set(["standard", "none", "blur-filters"]);
const RESPONSIVE_ORDER = ["sm", "md", "lg", "xl", "2xl"];
const SCHEME_ORDER = ["dark", "light"];

const ROOT_FORMAT_ORDER = [
  "selector",
  "preset",
  "recipe",
  "mode",
  "strength",
  "contrastMode",
  "palette",
  "effect",
  "performance",
  "intensity",
  "frost",
  "vignette",
  "shadow",
  "tint",
  "blur",
  "opacity",
  "saturation",
  "contrast",
  "brightness",
  "radius",
  "blendMode",
  "monochrome",
  "speed",
  "colors",
  "layerInset",
  "zIndex",
  "isolate",
  "mainFilter",
  "main-filter",
  "monitoring",
  "engineUp",
  "engine-up",
  "motionBlurrin",
  "motion-blurrin",
  "gradient",
  "glass",
  "grain",
  "shine",
  "interactive",
  "animate",
  "visibility",
  "responsive",
  "scheme"
];

const FORMAT_ORDERS = {
  gradient: ["enabled", "palette", "effect", "intensity", "colors", "opacity", "tint", "blur", "saturation", "contrast", "brightness", "blendMode", "inset", "monochrome"],
  glass: ["enabled", "frost", "blur", "saturation", "contrast", "brightness", "opacity", "fill", "fillSecondary", "fallbackFill", "fallbackSecondary", "fillAngle", "strokeWidth", "strokeOpacity", "strokeColor", "highlight", "innerGlow", "shadow", "mainFilter"],
  grain: ["enabled", "amount", "size", "blend", "motion"],
  shine: ["enabled", "opacity", "angle", "blend"],
  interactive: ["enabled", "glare", "radius", "blend"],
  animate: ["enabled", "mode", "hueShift", "drift", "dfirt", "speedMultiplier", "fps", "easing"],
  visibility: ["rootMargin", "threshold"],
  monitoring: ["enabled", "engine", "strategy", "minPerformance"],
  engineUp: ["enabled", "duration", "easing", "direction", "iteration", "fillMode", "x", "y", "scale", "rotate", "opacity", "blur", "brightness", "saturation", "contrast", "hueRotate", "frames"],
  motionBlurrin: ["enabled", "layers", "blur", "openness", "edgeFade", "opacity", "blend", "direction", "duration", "easing"]
};

const EXTRA_ALLOWED_PATHS = new Set([
  "animate.dfirt",
  "gradient.colors",
  "gradient.monochrome",
  "engine-up",
  "motion-blurrin",
  "motionBlur",
  "main-filter",
  "grainAmount"
]);

function starterTemplate(preset = "default", mode = "surface", recipe = "") {
  const recipeLine = recipe ? `recipe: ${recipe}\n` : "";
  return `selector: .hero
preset: ${preset}
${recipeLine}mode: ${mode}
palette: aurora
effect: mesh
performance: auto
contrastMode: balanced
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
glass.enabled: true
gradient.enabled: true
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
  glassgradients init [file.glass] [--preset editor] [--recipe panel] [--mode surface]
  glassgradients build <file.glass> [-o output.css] [--selector .hero] [--minify] [--watch]
                      [--preset frosted] [--recipe navbar] [--effect prism]
                      [--performance eco] [--mode gradient]
  glassgradients lint <file.glass>
  glassgradients format <file.glass> [-o out.glass] [--check]
  glassgradients inspect <file.glass> [--score]
  glassgradients tokens <file.glass> [--selector :root] [-o out.css]
  glassgradients help

Commands:
  init      Create a starter .glass file.
  build     Compile .glass into component CSS.
  lint      Validate useful keys, known presets, recipes, effects, modes, and performance profiles.
  format    Rewrite .glass with a stable key order, or verify with --check.
  inspect   Print parsed JSON. Add --score for a compact quality report.
  tokens    Export theme CSS variables with compileGlassTheme().

Options:
  -o, --output <file>        Write output to a file.
  --selector <selector>      Override build selector or token selector.
  --preset <name>            Override preset for init/build.
  --recipe <name>            Override recipe for init/build.
  --effect <name>            Override effect for build.
  --performance <name>       Override performance profile for build.
  --mode <name>              Override mode for init/build.
  --minify                   Minify build CSS.
  --watch                    Rebuild CSS when the input changes.
  --check                    Check formatting without writing.
  --score                    Include score output for inspect.
  -h, --help                 Show this help.

Examples:
  glassgradients lint ./hero.glass
  glassgradients format ./hero.glass --check
  glassgradients format ./hero.glass -o ./hero.formatted.glass
  glassgradients tokens ./hero.glass --selector :root -o ./tokens.css

Exit codes:
  0  Success, including lint warnings.
  1  Parse error, lint error, failed format check, or command error.
`.trim());
}

function readValue(rest, index, flag) {
  const value = rest[index + 1];
  if (!value || value.startsWith("-")) {
    throw new Error(`Missing value for ${flag}.`);
  }
  return value;
}

function parseArgs(argv) {
  const args = argv.slice(2);
  const command = args[0] || "";
  const rest = args.slice(1);

  const params = {
    command,
    input: "",
    output: "",
    selector: "",
    minify: false,
    watchMode: false,
    preset: "",
    recipe: "",
    effect: "",
    performance: "",
    mode: "",
    check: false,
    score: false,
    help: false
  };

  for (let i = 0; i < rest.length; i += 1) {
    const token = rest[i];
    if (!token) {
      continue;
    }
    if (!token.startsWith("-")) {
      if (!params.input) {
        params.input = token;
        continue;
      }
      continue;
    }
    if (token === "-o" || token === "--output") {
      params.output = readValue(rest, i, token);
      i += 1;
      continue;
    }
    if (token === "--selector") {
      params.selector = readValue(rest, i, token);
      i += 1;
      continue;
    }
    if (token === "--preset") {
      params.preset = readValue(rest, i, token);
      i += 1;
      continue;
    }
    if (token === "--recipe") {
      params.recipe = readValue(rest, i, token);
      i += 1;
      continue;
    }
    if (token === "--effect") {
      params.effect = readValue(rest, i, token);
      i += 1;
      continue;
    }
    if (token === "--performance") {
      params.performance = readValue(rest, i, token);
      i += 1;
      continue;
    }
    if (token === "--mode") {
      params.mode = readValue(rest, i, token);
      i += 1;
      continue;
    }
    if (token === "--minify") {
      params.minify = true;
      continue;
    }
    if (token === "--watch") {
      params.watchMode = true;
      continue;
    }
    if (token === "--check") {
      params.check = true;
      continue;
    }
    if (token === "--score") {
      params.score = true;
      continue;
    }
    if (token === "--help" || token === "-h") {
      params.help = true;
      continue;
    }
    // Preserve the historical CLI behavior: unknown flags are ignored.
  }

  return params;
}

function compileOverrides({ selector, minify, preset, recipe, effect, performance, mode }) {
  const overrides = {};
  if (selector) {
    overrides.selector = selector;
  }
  if (preset) {
    overrides.preset = preset;
  }
  if (recipe) {
    overrides.recipe = recipe;
  }
  if (effect) {
    overrides.effect = effect;
  }
  if (performance) {
    overrides.performance = performance;
  }
  if (mode) {
    overrides.mode = mode;
  }
  if (minify) {
    overrides.minify = true;
  }
  return overrides;
}

function isPlainObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function collectAllowedPaths(value, prefix = "", out = new Set()) {
  for (const [key, nested] of Object.entries(value || {})) {
    const path = prefix ? `${prefix}.${key}` : key;
    out.add(path);
    if (isPlainObject(nested)) {
      collectAllowedPaths(nested, path, out);
    }
  }
  return out;
}

const ALLOWED_PATHS = collectAllowedPaths(DEFAULT_CONFIG);
for (const path of EXTRA_ALLOWED_PATHS) {
  ALLOWED_PATHS.add(path);
}

function hasAllowedPath(path) {
  return ALLOWED_PATHS.has(path);
}

function addIssue(issues, severity, path, message) {
  issues.push({ severity, path, message });
}

function normalizedString(value) {
  return String(value ?? "").trim().toLowerCase();
}

function validateKnownValue(path, value, issues) {
  if (value === undefined || value === null || value === "") {
    return;
  }

  const text = normalizedString(value);
  if ((path === "preset" || path.endsWith(".preset")) && !PRESETS[text]) {
    addIssue(issues, "error", path, `Unknown preset "${value}".`);
    return;
  }
  if ((path === "recipe" || path.endsWith(".recipe")) && !RECIPES[text] && !RECIPE_CONTRACTS[text]) {
    addIssue(issues, "error", path, `Unknown recipe "${value}".`);
    return;
  }
  if ((path === "palette" || path.endsWith(".palette")) && !PALETTES[text]) {
    addIssue(issues, "error", path, `Unknown palette "${value}".`);
    return;
  }
  if ((path === "effect" || path.endsWith(".effect")) && !KNOWN_EFFECTS.has(text)) {
    addIssue(issues, "error", path, `Unknown effect "${value}".`);
    return;
  }
  if ((path === "mainFilter" || path === "main-filter" || path.endsWith(".mainFilter")) && !KNOWN_MAIN_FILTERS.has(text)) {
    addIssue(issues, "error", path, `Unknown main filter "${value}".`);
    return;
  }
  if ((path === "animate.mode" || path.endsWith(".animate.mode")) && !KNOWN_ANIMATE_MODES.has(text)) {
    addIssue(issues, "error", path, `Unknown animation mode "${value}".`);
    return;
  }
  if (path === "animate.mode" || path.endsWith(".animate.mode")) {
    return;
  }
  if ((path === "mode" || path.endsWith(".mode")) && !KNOWN_MODES.has(text)) {
    addIssue(issues, "error", path, `Unknown mode "${value}".`);
    return;
  }
  if ((path === "performance" || path.endsWith(".performance")) && !PERFORMANCE_PRESETS[text]) {
    addIssue(issues, "error", path, `Unknown performance profile "${value}".`);
    return;
  }
  if ((path === "strength" || path.endsWith(".strength")) && !KNOWN_STRENGTHS.has(text)) {
    addIssue(issues, "error", path, `Unknown strength "${value}".`);
    return;
  }
  if ((path === "contrastMode" || path.endsWith(".contrastMode")) && !KNOWN_CONTRAST_MODES.has(text)) {
    addIssue(issues, "error", path, `Unknown contrast mode "${value}".`);
    return;
  }
}

function validateColorList(path, value, issues) {
  if (!Array.isArray(value)) {
    return;
  }
  if (value.length > 0 && value.length < 4) {
    addIssue(issues, "warning", path, "Colors with fewer than 4 entries will be repeated by the compiler.");
  }
}

function validateVariantMap(kind, value, issues, displayPath) {
  if (!isPlainObject(value)) {
    addIssue(issues, "error", displayPath, `${kind} must be an object.`);
    return;
  }

  for (const [key, variantInput] of Object.entries(value)) {
    const variantPath = `${displayPath}.${key}`;
    if (kind === "scheme" && !SCHEME_ORDER.includes(normalizedString(key))) {
      addIssue(issues, "error", variantPath, `Unknown scheme "${key}". Use dark or light.`);
      continue;
    }
    if (!isPlainObject(variantInput)) {
      addIssue(issues, "error", variantPath, `${kind} variant must be an object.`);
      continue;
    }
    validateConfigObject(variantInput, issues, variantPath, "");
  }
}

function validateConfigObject(value, issues, displayPrefix = "", localPrefix = "") {
  if (!isPlainObject(value)) {
    addIssue(issues, "error", displayPrefix || "root", "Config must be an object.");
    return;
  }

  for (const [key, nested] of Object.entries(value)) {
    const localPath = localPrefix ? `${localPrefix}.${key}` : key;
    const displayPath = displayPrefix ? `${displayPrefix}.${key}` : key;

    if (localPath === "responsive") {
      validateVariantMap("responsive", nested, issues, displayPath);
      continue;
    }
    if (localPath === "scheme") {
      validateVariantMap("scheme", nested, issues, displayPath);
      continue;
    }

    if (!hasAllowedPath(localPath)) {
      addIssue(issues, "error", displayPath, `Unknown key "${displayPath}".`);
    }

    validateKnownValue(displayPath, nested, issues);
    validateColorList(displayPath, nested, issues);

    if (isPlainObject(nested)) {
      validateConfigObject(nested, issues, displayPath, localPath);
    }
  }
}

function toFiniteNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim()) {
    const number = Number.parseFloat(value.trim());
    if (Number.isFinite(number)) {
      return number;
    }
  }
  return null;
}

function addHeavyConfigWarnings(input, issues, displayPrefix = "") {
  const config = normalizeConfig(input);
  const prefix = displayPrefix ? `${displayPrefix}: ` : "";
  const blur = toFiniteNumber(config.blur);
  const glassBlur = toFiniteNumber(config.glass?.blur);

  if (config.performance === "quality") {
    addIssue(issues, "warning", displayPrefix || "performance", `${prefix}performance "quality" is expensive; prefer balanced or eco for dense UI.`);
  }
  if (config.gradient.enabled && config.animate.enabled && EFFECT_COMPLEXITY[config.effect] > 1.25 && config.performance !== "static") {
    addIssue(issues, "warning", displayPrefix || "effect", `${prefix}animated "${config.effect}" can be expensive on low-end GPUs.`);
  }
  if (blur !== null && blur > 80) {
    addIssue(issues, "warning", displayPrefix || "blur", `${prefix}gradient blur above 80px can increase paint cost.`);
  }
  if (glassBlur !== null && glassBlur > 34) {
    addIssue(issues, "warning", displayPrefix || "glass.blur", `${prefix}glass blur above 34px can increase backdrop-filter cost.`);
  }
  if (config.grain.enabled && config.grain.amount > 0.18) {
    addIssue(issues, "warning", displayPrefix || "grain.amount", `${prefix}grain amount above 0.18 can add visible noise and cost.`);
  }
  if (config.animate.enabled && config.animate.fps > 60) {
    addIssue(issues, "warning", displayPrefix || "animate.fps", `${prefix}animate.fps above 60 has no practical benefit for most displays.`);
  }

  for (const [key, variantInput] of Object.entries(input.responsive || {})) {
    if (isPlainObject(variantInput)) {
      addHeavyConfigWarnings(variantInput, issues, displayPrefix ? `${displayPrefix}.responsive.${key}` : `responsive.${key}`);
    }
  }
  for (const [key, variantInput] of Object.entries(input.scheme || {})) {
    if (isPlainObject(variantInput)) {
      addHeavyConfigWarnings(variantInput, issues, displayPrefix ? `${displayPrefix}.scheme.${key}` : `scheme.${key}`);
    }
  }
}

function lintGlassConfig(parsed) {
  const issues = [];
  validateConfigObject(parsed, issues);
  addHeavyConfigWarnings(parsed, issues);
  return {
    errors: issues.filter((issue) => issue.severity === "error"),
    warnings: issues.filter((issue) => issue.severity === "warning"),
    issues
  };
}

function formatIssue(issue) {
  return `${issue.severity}: ${issue.path}: ${issue.message}`;
}

function normalizeNewlines(source) {
  return source.replace(/\r\n/g, "\n");
}

function createOrderIndex(keys) {
  return new Map(keys.map((key, index) => [key, index]));
}

function sortKeys(keys, path) {
  let order = ROOT_FORMAT_ORDER;
  if (path === "responsive") {
    order = RESPONSIVE_ORDER;
  } else if (path === "scheme") {
    order = SCHEME_ORDER;
  } else if (FORMAT_ORDERS[path]) {
    order = FORMAT_ORDERS[path];
  }

  const orderIndex = createOrderIndex(order);
  return keys.sort((a, b) => {
    const aIndex = orderIndex.has(a) ? orderIndex.get(a) : Number.MAX_SAFE_INTEGER;
    const bIndex = orderIndex.has(b) ? orderIndex.get(b) : Number.MAX_SAFE_INTEGER;
    if (aIndex !== bIndex) {
      return aIndex - bIndex;
    }
    return a.localeCompare(b);
  });
}

function needsQuoting(value) {
  if (value === "") {
    return true;
  }
  if (/^\s|\s$/.test(value)) {
    return true;
  }
  if (/^(true|false|null)$/i.test(value)) {
    return true;
  }
  if (/^-?\d+(\.\d+)?$/.test(value)) {
    return true;
  }
  if (value.includes("\n")) {
    return true;
  }
  return value.includes(",") && !/[()]/.test(value);
}

function quoteString(value) {
  return `"${value.replace(/\\/g, "\\\\").replace(/"/g, "\\\"")}"`;
}

function formatScalar(value) {
  if (value === null) {
    return "null";
  }
  if (typeof value === "boolean") {
    return value ? "true" : "false";
  }
  if (typeof value === "number") {
    return String(value);
  }
  const text = String(value);
  return needsQuoting(text) ? quoteString(text) : text;
}

function isScalar(value) {
  return value === null || typeof value !== "object";
}

function formatArray(value, indent) {
  const pad = " ".repeat(indent);
  if (value.every(isScalar)) {
    return value.map(formatScalar).join(", ");
  }

  const lines = [];
  for (const item of value) {
    if (isPlainObject(item)) {
      const entries = Object.entries(item);
      if (entries.length === 1 && isScalar(entries[0][1])) {
        lines.push(`${pad}- ${entries[0][0]}: ${formatScalar(entries[0][1])}`);
      } else {
        lines.push(`${pad}- ${JSON.stringify(item)}`);
      }
    } else {
      lines.push(`${pad}- ${formatScalar(item)}`);
    }
  }
  return `\n${lines.join("\n")}`;
}

function childFormatPath(path, key) {
  if (path === "responsive" || path === "scheme") {
    return "";
  }
  return path ? `${path}.${key}` : key;
}

function formatObject(value, indent = 0, path = "") {
  const pad = " ".repeat(indent);
  const lines = [];
  for (const key of sortKeys(Object.keys(value), path)) {
    const nested = value[key];
    if (Array.isArray(nested)) {
      const formatted = formatArray(nested, indent + 2);
      if (formatted.startsWith("\n")) {
        lines.push(`${pad}${key}:${formatted}`);
      } else {
        lines.push(`${pad}${key}: ${formatted}`);
      }
      continue;
    }
    if (isPlainObject(nested)) {
      lines.push(`${pad}${key}:`);
      lines.push(...formatObject(nested, indent + 2, childFormatPath(path, key)));
      continue;
    }
    lines.push(`${pad}${key}: ${formatScalar(nested)}`);
  }
  return lines;
}

function formatGlass(parsed) {
  return `${formatObject(parsed).join("\n")}\n`;
}

function scoreGrade(score) {
  if (score >= 90) {
    return "A";
  }
  if (score >= 80) {
    return "B";
  }
  if (score >= 70) {
    return "C";
  }
  if (score >= 60) {
    return "D";
  }
  return "F";
}

function inspectScore(filePath, parsed, lintResult) {
  const config = normalizeConfig(parsed);
  const tokens = createGlassTokens(parsed);
  const score = Math.max(0, Math.min(100, 100 - lintResult.errors.length * 25 - lintResult.warnings.length * 7));

  return {
    file: filePath,
    score,
    grade: scoreGrade(score),
    summary: {
      selector: config.selector,
      preset: config.preset,
      recipe: config.recipe || "custom",
      role: tokens.contract.role,
      mode: config.mode,
      effect: config.effect,
      performance: config.performance,
      animated: Boolean(config.animate.enabled),
      variants: {
        responsive: Object.keys(parsed.responsive || {}),
        scheme: Object.keys(parsed.scheme || {})
      }
    },
    errors: lintResult.errors.map((issue) => ({ path: issue.path, message: issue.message })),
    warnings: lintResult.warnings.map((issue) => ({ path: issue.path, message: issue.message }))
  };
}

async function readGlassInput(input, usage) {
  if (!input) {
    throw new Error(`Missing input file. Use: ${usage}`);
  }
  const filePath = resolve(input);
  const source = await readFile(filePath, "utf8");
  return { filePath, source, parsed: parseGlass(source) };
}

async function doBuild(inputPath, outputPath, options) {
  const source = await readFile(inputPath, "utf8");
  const { minify, ...configOverrides } = options;
  const lintResult = Object.keys(configOverrides).length > 0
    ? lintGlassConfig(configOverrides)
    : { errors: [] };
  if (lintResult.errors.length > 0) {
    for (const error of lintResult.errors) {
      console.error(formatIssue(error));
    }
    throw new Error(`Build config invalid: ${lintResult.errors.length} error(s).`);
  }
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

async function runLint(params) {
  const { filePath, parsed } = await readGlassInput(params.input, "glassgradients lint <file.glass>");
  const result = lintGlassConfig(parsed);

  for (const warning of result.warnings) {
    console.error(formatIssue(warning));
  }
  for (const error of result.errors) {
    console.error(formatIssue(error));
  }

  if (result.errors.length > 0) {
    throw new Error(`Lint failed: ${result.errors.length} error(s), ${result.warnings.length} warning(s).`);
  }

  console.log(`Lint OK: ${filePath}${result.warnings.length ? ` (${result.warnings.length} warning(s))` : ""}`);
}

async function runFormat(params) {
  const { filePath, source, parsed } = await readGlassInput(params.input, "glassgradients format <file.glass>");
  const formatted = formatGlass(parsed);
  const current = normalizeNewlines(source);

  if (params.check) {
    if (current !== formatted) {
      console.error(`Needs format: ${filePath}`);
      throw new Error("Format check failed.");
    }
    console.log(`Format OK: ${filePath}`);
    return;
  }

  const outputPath = params.output ? resolve(params.output) : filePath;
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, formatted, "utf8");
  console.log(`Formatted: ${outputPath}`);
}

async function runInspect(params) {
  const { filePath, parsed } = await readGlassInput(params.input, "glassgradients inspect <file.glass>");
  if (params.score) {
    const result = lintGlassConfig(parsed);
    console.log(JSON.stringify(inspectScore(filePath, parsed, result), null, 2));
    return;
  }
  console.log(JSON.stringify(parsed, null, 2));
}

async function runTokens(params) {
  const { parsed } = await readGlassInput(params.input, "glassgradients tokens <file.glass>");
  const selector = params.selector || ":root";
  const css = compileGlassTheme(selector, parsed);

  if (!params.output) {
    console.log(css);
    return;
  }

  const outputPath = resolve(params.output);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, css, "utf8");
  console.log(`Tokens CSS: ${outputPath}`);
}

async function run() {
  const params = parseArgs(process.argv);
  const { command, input, preset, recipe, mode } = params;

  if (!command || command === "--help" || command === "-h" || command === "help" || params.help) {
    printHelp();
    return;
  }

  if (command === "init") {
    const initPath = resolve(input || "./glassgradient.glass");
    await mkdir(dirname(initPath), { recursive: true });
    await writeFile(initPath, starterTemplate(preset || "default", mode || "surface", recipe || ""), "utf8");
    console.log(`Starter created: ${initPath}`);
    return;
  }

  if (command === "build") {
    await runBuild(params);
    return;
  }

  if (command === "lint") {
    await runLint(params);
    return;
  }

  if (command === "format") {
    await runFormat(params);
    return;
  }

  if (command === "inspect") {
    await runInspect(params);
    return;
  }

  if (command === "tokens") {
    await runTokens(params);
    return;
  }

  throw new Error(`Unknown command "${command}". Use --help.`);
}

run().catch((error) => {
  console.error(`[glassgradients] ${error.message}`);
  process.exitCode = 1;
});
