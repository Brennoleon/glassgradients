import { PRESETS, RECIPES, RECIPE_CONTRACTS, normalizeConfig } from "../defaults.js";
import { buildBackdropFilter, buildStyleVariables } from "../style-engine.js";

const KEYFRAME_NAMES = {
  wave: "gg-wave",
  pulse: "gg-pulse",
  orbit: "gg-orbit"
};

function toCssPropertyName(property) {
  if (property.startsWith("--")) {
    return property;
  }
  if (property === "WebkitBackdropFilter") {
    return "-webkit-backdrop-filter";
  }
  return property.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
}

function renderDeclarations(styleMap, indent) {
  return Object.entries(styleMap)
    .map(([property, value]) => `${indent}${toCssPropertyName(property)}: ${value};`)
    .join("\n");
}

function renderRule(selector, styleMap, indent) {
  const declarations = renderDeclarations(styleMap, `${indent}  `);
  return `${indent}${selector} {\n${declarations}\n${indent}}`;
}

function renderCssTree(tree, indent = "") {
  return Object.entries(tree)
    .map(([key, value]) => {
      if (key.startsWith("@")) {
        return `${indent}${key} {\n${renderCssTree(value, `${indent}  `)}\n${indent}}`;
      }
      return renderRule(key, value, indent);
    })
    .join("\n\n");
}

function buildKeyframeSteps(mode) {
  if (mode === "pulse") {
    return {
      "0%": {
        transform: "translate3d(0, 0, 0) scale(calc(1.01 + var(--gg-motion-amp, 1) * 0.01))",
        filter: "var(--gg-gradient-filter) hue-rotate(0deg)"
      },
      "50%": {
        transform: "translate3d(calc(1% * var(--gg-motion-amp, 1)), calc(-1% * var(--gg-motion-amp, 1)), 0) scale(calc(1.08 + var(--gg-motion-amp, 1) * 0.03))",
        filter: "var(--gg-gradient-filter) hue-rotate(var(--gg-hue-shift, 30deg))"
      },
      "100%": {
        transform: "translate3d(calc(-1% * var(--gg-motion-amp, 1)), calc(1.2% * var(--gg-motion-amp, 1)), 0) scale(calc(1.02 + var(--gg-motion-amp, 1) * 0.02))",
        filter: "var(--gg-gradient-filter) hue-rotate(calc(var(--gg-hue-shift, 30deg) * -1))"
      }
    };
  }

  if (mode === "orbit") {
    return {
      "0%": {
        transform: "translate3d(calc(-2.5% * var(--gg-motion-amp, 1)), calc(-1.2% * var(--gg-motion-amp, 1)), 0) scale(1.04)",
        filter: "var(--gg-gradient-filter) hue-rotate(0deg)"
      },
      "25%": {
        transform: "translate3d(calc(2.8% * var(--gg-motion-amp, 1)), calc(-0.8% * var(--gg-motion-amp, 1)), 0) scale(1.06)",
        filter: "var(--gg-gradient-filter) hue-rotate(calc(var(--gg-hue-shift, 30deg) * 0.5))"
      },
      "50%": {
        transform: "translate3d(calc(3.4% * var(--gg-motion-amp, 1)), calc(2.7% * var(--gg-motion-amp, 1)), 0) scale(1.08)",
        filter: "var(--gg-gradient-filter) hue-rotate(var(--gg-hue-shift, 30deg))"
      },
      "75%": {
        transform: "translate3d(calc(-1.8% * var(--gg-motion-amp, 1)), calc(2.5% * var(--gg-motion-amp, 1)), 0) scale(1.05)",
        filter: "var(--gg-gradient-filter) hue-rotate(calc(var(--gg-hue-shift, 30deg) * -0.4))"
      },
      "100%": {
        transform: "translate3d(calc(-2.5% * var(--gg-motion-amp, 1)), calc(-1.2% * var(--gg-motion-amp, 1)), 0) scale(1.04)",
        filter: "var(--gg-gradient-filter) hue-rotate(calc(var(--gg-hue-shift, 30deg) * -1))"
      }
    };
  }

  return {
    "0%": {
      transform: "translate3d(calc(-1.8% * var(--gg-motion-amp, 1)), calc(-1% * var(--gg-motion-amp, 1)), 0) scale(1.03)",
      filter: "var(--gg-gradient-filter) hue-rotate(0deg)"
    },
    "50%": {
      transform: "translate3d(calc(1.5% * var(--gg-motion-amp, 1)), calc(1.8% * var(--gg-motion-amp, 1)), 0) scale(1.06)",
      filter: "var(--gg-gradient-filter) hue-rotate(var(--gg-hue-shift, 30deg))"
    },
    "100%": {
      transform: "translate3d(calc(2.2% * var(--gg-motion-amp, 1)), calc(-1.2% * var(--gg-motion-amp, 1)), 0) scale(1.04)",
      filter: "var(--gg-gradient-filter) hue-rotate(calc(var(--gg-hue-shift, 30deg) * -1))"
    }
  };
}

function buildSharedKeyframes() {
  return {
    "@keyframes gg-wave": buildKeyframeSteps("wave"),
    "@keyframes gg-pulse": buildKeyframeSteps("pulse"),
    "@keyframes gg-orbit": buildKeyframeSteps("orbit")
  };
}

function normalizeClassName(className) {
  if (!className) {
    throw new Error("className is required");
  }
  return className.startsWith(".") ? className : `.${className}`;
}

export function createGlassStaticClassMap(className, input = {}) {
  const selector = normalizeClassName(className);
  const config = normalizeConfig(input);
  const variables = buildStyleVariables(config);
  const backdropFilter = buildBackdropFilter(config.glass);
  const animation = config.gradient.enabled && config.animate.enabled
    ? `${KEYFRAME_NAMES[config.animate.mode] || KEYFRAME_NAMES.wave} ${config.speed} ${config.animate.easing} infinite alternate`
    : "none";

  return {
    [selector]: {
      ...variables,
      "--gg-animation": animation,
      "--gg-motion-amp": String(config.gradient.intensity),
      "--gg-hue-shift": `${config.animate.hueShift}deg`,
      position: "relative",
      isolation: config.isolate ? "isolate" : "auto",
      overflow: "hidden",
      boxSizing: "border-box",
      borderRadius: "var(--gg-radius)",
      zIndex: "var(--gg-z-index)",
      border: "var(--gg-glass-border)",
      background: "var(--gg-glass-fill)",
      boxShadow: "var(--gg-shadow-stack)",
      WebkitBackdropFilter: backdropFilter,
      backdropFilter
    },
    [`${selector}::before, ${selector}::after`]: {
      content: '""',
      position: "absolute",
      pointerEvents: "none",
      borderRadius: "inherit"
    },
    [`${selector}::before`]: {
      inset: "var(--gg-gradient-inset)",
      zIndex: "-2",
      backgroundImage: "var(--gg-gradient-background)",
      backgroundBlendMode: "overlay, var(--gg-gradient-blend)",
      opacity: "var(--gg-gradient-opacity)",
      filter: "var(--gg-gradient-filter)",
      transform: "translate3d(0, 0, 0) scale(1.04)",
      animation: "var(--gg-animation)",
      willChange: "transform, filter, opacity"
    },
    [`${selector}::after`]: {
      inset: "0",
      zIndex: "-1",
      backgroundImage: "var(--gg-ornament-background)",
      backgroundBlendMode: "var(--gg-ornament-blend)",
      opacity: "var(--gg-ornament-opacity)"
    },
    "@supports not ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0)))": {
      [selector]: {
        WebkitBackdropFilter: "none",
        backdropFilter: "none",
        background: "var(--gg-fallback-fill)"
      }
    },
    ...buildSharedKeyframes()
  };
}

export function createGlassStaticClassCss(className, input = {}) {
  return renderCssTree(createGlassStaticClassMap(className, input));
}

function createSemanticAliases(prefix) {
  return {
    [`${prefix}-shell`]: { recipe: "panel" },
    [`${prefix}-nav`]: { recipe: "navbar" },
    [`${prefix}-side`]: { recipe: "sidebar" },
    [`${prefix}-workspace`]: { recipe: "workspace" },
    [`${prefix}-form`]: { recipe: "form" },
    [`${prefix}-dialog`]: { recipe: "dialog" },
    [`${prefix}-command-palette`]: { recipe: "command-palette" },
    [`${prefix}-command-bar`]: { recipe: "command-bar" },
    [`${prefix}-table`]: { recipe: "table" },
    [`${prefix}-inspector`]: { recipe: "inspector" },
    [`${prefix}-terminal`]: { recipe: "terminal" }
  };
}

export function createGlassClassCatalog(options = {}) {
  const prefix = options.prefix || "gg";
  const catalog = {
    [prefix]: {},
    [`${prefix}-surface`]: { mode: "surface" },
    [`${prefix}-gradient`]: { mode: "gradient" },
    [`${prefix}-frost`]: { mode: "frost" },
    ...createSemanticAliases(prefix)
  };

  if (options.includePresets !== false) {
    for (const presetName of Object.keys(PRESETS)) {
      catalog[`${prefix}-preset-${presetName}`] = { preset: presetName };
    }
  }

  if (options.includeRecipes !== false) {
    for (const recipeName of Object.keys(RECIPES)) {
      catalog[`${prefix}-recipe-${recipeName}`] = { recipe: recipeName };
    }
  }

  if (options.includeStrengths !== false) {
    for (const strengthName of ["soft", "medium", "strong"]) {
      catalog[`${prefix}-strength-${strengthName}`] = { strength: strengthName };
    }
  }

  if (options.includeContracts !== false) {
    for (const contractName of Object.keys(RECIPE_CONTRACTS)) {
      catalog[`${prefix}-contract-${contractName}`] = { recipe: contractName };
    }
  }

  for (const [name, value] of Object.entries(options.classes || {})) {
    catalog[name] = value;
  }

  return catalog;
}

export function createGlassCatalogClassMap(options = {}) {
  const catalog = createGlassClassCatalog(options);
  return Object.entries(catalog).reduce((acc, [className, input]) => {
    const classMap = createGlassStaticClassMap(className, input);
    for (const [key, value] of Object.entries(classMap)) {
      if (
        key.startsWith("@") &&
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value) &&
        typeof acc[key] === "object" &&
        acc[key] !== null &&
        !Array.isArray(acc[key])
      ) {
        acc[key] = { ...acc[key], ...value };
        continue;
      }
      acc[key] = value;
    }
    return acc;
  }, {});
}

export function createGlassCatalogCss(options = {}) {
  return renderCssTree(createGlassCatalogClassMap(options));
}

export function createGlassSafelist(options = {}) {
  return Object.keys(createGlassClassCatalog(options));
}

export function selectorMapToCss(selectorMap) {
  return renderCssTree(selectorMap);
}
