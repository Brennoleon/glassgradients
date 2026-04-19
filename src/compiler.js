import { mergeDeep, normalizeConfig } from "./defaults.js";
import { parseGlass } from "./parser.js";
import { buildAnimationFrames, buildBackdropFilter, buildStyleVariables, hash, minifyCss } from "./style-engine.js";
import { collectVariantEntries, stripVariantConfig } from "./variants.js";

function resolveInput(input) {
  if (typeof input === "string") {
    return parseGlass(input);
  }
  return input ?? {};
}

function serializeVariables(variables) {
  return Object.entries(variables)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");
}

function indentBlock(css) {
  return css
    .split("\n")
    .map((line) => (line ? `  ${line}` : line))
    .join("\n");
}

function buildCssBlock(config) {
  const selector = config.selector;
  const animationName = `gg-shift-${hash(`${selector}|${config.speed}|${config.colors.join("|")}|${config.effect}|${config.mode}|${config.recipe}`)}`;
  const animationRule = config.gradient.enabled && config.animate.enabled
    ? `${animationName} ${config.speed} ${config.animate.easing} infinite alternate`
    : "none";
  const variables = buildStyleVariables(config);
  const frames = buildAnimationFrames(config.animate.mode, config.animate.hueShift, config.gradient.intensity);
  const isolation = config.isolate ? "isolate" : "auto";
  const backdropFilter = buildBackdropFilter(config.glass);

  return `
${selector} {
${serializeVariables(variables)}
  position: relative;
  isolation: ${isolation};
  overflow: hidden;
  box-sizing: border-box;
  border-radius: var(--gg-radius);
  z-index: var(--gg-z-index);
  border: var(--gg-glass-border);
  background: var(--gg-glass-fill);
  box-shadow: var(--gg-shadow-stack);
  -webkit-backdrop-filter: ${backdropFilter};
  backdrop-filter: ${backdropFilter};
}

${selector}::before,
${selector}::after {
  content: "";
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}

${selector}::before {
  inset: var(--gg-gradient-inset);
  z-index: -2;
  background-image: var(--gg-gradient-background);
  background-blend-mode: overlay, var(--gg-gradient-blend);
  opacity: var(--gg-gradient-opacity);
  filter: var(--gg-gradient-filter);
  transform: translate3d(0, 0, 0) scale(1.04);
  animation: ${animationRule};
  will-change: transform, filter, opacity;
}

${selector}::after {
  inset: 0;
  z-index: -1;
  background-image: var(--gg-ornament-background);
  background-blend-mode: var(--gg-ornament-blend);
  opacity: var(--gg-ornament-opacity);
}

@supports not ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))) {
  ${selector} {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    background: var(--gg-fallback-fill);
  }
}

@keyframes ${animationName} {
${frames}
}
`.trimStart();
}

export function compileGlass(input, options = {}) {
  const parsed = resolveInput(input);
  const merged = mergeDeep(parsed, options);
  const baseInput = stripVariantConfig(merged);
  const cssParts = [buildCssBlock(normalizeConfig(baseInput))];

  for (const entry of collectVariantEntries(merged)) {
    const variantInput = mergeDeep(baseInput, entry.input);
    const variantCss = buildCssBlock(normalizeConfig(variantInput));
    cssParts.push(`@media ${entry.query} {\n${indentBlock(variantCss)}\n}`);
  }

  const css = cssParts.join("\n\n");
  return options.minify ? minifyCss(css) : css;
}

export async function compileGlassFile(filePath, options = {}, encoding = "utf8") {
  const { readFile } = await import("node:fs/promises");
  const source = await readFile(filePath, encoding);
  return compileGlass(source, options);
}
