import { getRecipeContract, mergeDeep, normalizeConfig } from "./defaults.js";
import { parseGlass } from "./parser.js";
import { buildBackdropFilter, buildStyleVariables, minifyCss } from "./style-engine.js";
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

function buildThemeBlock(selector, config) {
  const variables = buildStyleVariables(config);
  const backdropFilter = buildBackdropFilter(config.glass);

  return `
${selector} {
${serializeVariables(variables)}
  -webkit-backdrop-filter: ${backdropFilter};
  backdrop-filter: ${backdropFilter};
}
`.trimStart();
}

export function createGlassTokens(input = {}) {
  const config = normalizeConfig(stripVariantConfig(resolveInput(input)));
  const variables = buildStyleVariables(config);

  return {
    recipe: config.recipe,
    strength: config.strength,
    mode: config.mode,
    contrastMode: config.contrastMode,
    contract: getRecipeContract(config.recipe, config),
    radius: config.radius,
    zIndex: config.zIndex,
    surface: {
      fill: variables["--gg-glass-fill"],
      fallbackFill: variables["--gg-fallback-fill"],
      border: variables["--gg-glass-border"],
      shadow: variables["--gg-shadow-stack"],
      backdropFilter: buildBackdropFilter(config.glass)
    },
    gradient: {
      background: variables["--gg-gradient-background"],
      blendMode: variables["--gg-gradient-blend"],
      opacity: variables["--gg-gradient-opacity"],
      filter: variables["--gg-gradient-filter"],
      inset: variables["--gg-gradient-inset"]
    },
    ornament: {
      background: variables["--gg-ornament-background"],
      blendMode: variables["--gg-ornament-blend"],
      opacity: variables["--gg-ornament-opacity"]
    },
    palette: config.colors.slice()
  };
}

export function compileGlassTheme(selector = ":root", input = {}, options = {}) {
  const parsed = resolveInput(input);
  const merged = mergeDeep(parsed, options);
  const baseInput = stripVariantConfig(merged);
  const blocks = [buildThemeBlock(selector, normalizeConfig(baseInput))];

  for (const entry of collectVariantEntries(merged)) {
    const variantInput = mergeDeep(baseInput, entry.input);
    const block = buildThemeBlock(selector, normalizeConfig(variantInput));
    blocks.push(`@media ${entry.query} {\n${indentBlock(block)}\n}`);
  }

  const css = blocks.join("\n\n");
  return options.minify ? minifyCss(css) : css;
}

export function createGlassThemeScript(options = {}) {
  const {
    attribute = "data-glass-theme",
    storageKey = "glass-theme",
    defaultMode = "system"
  } = options;

  return `(() => {
  try {
    const root = document.documentElement;
    const stored = window.localStorage.getItem(${JSON.stringify(storageKey)});
    const mode = stored || ${JSON.stringify(defaultMode)};
    const resolved = mode === "system"
      ? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light")
      : mode;
    root.setAttribute(${JSON.stringify(attribute)}, resolved);
    root.style.colorScheme = resolved;
  } catch {}
})();`;
}
