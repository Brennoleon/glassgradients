import { compileGlassTheme } from "../theme.js";
import { minifyCss } from "../style-engine.js";
import {
  createGlassCatalogClassMap,
  createGlassClassCatalog,
  createGlassSafelist,
  createGlassStaticClassMap
} from "./preset-shared.js";

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

function renderNestedRule(selector, styleMap, indent) {
  return `${indent}${selector} {\n${renderDeclarations(styleMap, `${indent}  `)}\n${indent}}`;
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeUtilityName(className) {
  const value = String(className || "").trim();
  if (!value) {
    throw new Error("className is required");
  }
  const utilityName = value.startsWith(".") ? value.slice(1) : value;
  if (/\s|,/.test(utilityName)) {
    throw new Error("Tailwind v4 utilities require a single class name");
  }
  return utilityName;
}

function toNestedSelector(selector, utilitySelector) {
  return selector.replace(new RegExp(escapeRegExp(utilitySelector), "g"), "&");
}

function renderUtilityAtRule(atRule, tree, utilitySelector, indent) {
  const body = Object.entries(tree)
    .map(([selector, value]) => {
      if (selector.startsWith("@")) {
        return renderUtilityAtRule(selector, value, utilitySelector, `${indent}  `);
      }
      return renderNestedRule(toNestedSelector(selector, utilitySelector), value, `${indent}  `);
    })
    .join("\n\n");

  return `${indent}${atRule} {\n${body}\n${indent}}`;
}

function renderKeyframeBlock(name, steps, indent = "") {
  const body = Object.entries(steps)
    .map(([step, declarations]) => renderNestedRule(step, declarations, `${indent}  `))
    .join("\n\n");

  return `${indent}${name} {\n${body}\n${indent}}`;
}

function renderTailwindV4UtilityBlock(className, input = {}) {
  const utilityName = normalizeUtilityName(className);
  const utilitySelector = `.${utilityName}`;
  const classMap = createGlassStaticClassMap(utilityName, input);
  const body = Object.entries(classMap)
    .flatMap(([selector, value]) => {
      if (selector.startsWith("@keyframes")) {
        return [];
      }
      if (selector === utilitySelector) {
        return renderDeclarations(value, "  ");
      }
      if (selector.startsWith("@")) {
        return renderUtilityAtRule(selector, value, utilitySelector, "  ");
      }
      if (selector.includes(utilitySelector)) {
        return renderNestedRule(toNestedSelector(selector, utilitySelector), value, "  ");
      }
      return [];
    })
    .filter(Boolean)
    .join("\n\n");

  return `@utility ${utilityName} {\n${body}\n}`;
}

function renderTailwindV4Theme(options = {}) {
  const themeName = options.themeName || "glass";
  const directive = Object.hasOwn(options, "themeDirective") ? options.themeDirective : "inline";
  const atRule = directive ? `@theme ${directive}` : "@theme";
  const tokens = {
    [`--radius-${themeName}`]: "var(--gg-radius)",
    [`--shadow-${themeName}`]: "var(--gg-shadow-stack)",
    [`--animate-${themeName}`]: "var(--gg-animation)",
    ...(options.themeTokens || {})
  };

  return `${atRule} {\n${renderDeclarations(tokens, "  ")}\n}`;
}

function renderTailwindV4Keyframes() {
  const classMap = createGlassStaticClassMap("gg", {});
  return Object.entries(classMap)
    .filter(([selector]) => selector.startsWith("@keyframes"))
    .map(([selector, steps]) => renderKeyframeBlock(selector, steps))
    .join("\n\n");
}

export function createGlassTailwindClass(className, input = {}) {
  return createGlassStaticClassMap(className, input);
}

export function createGlassTailwindComponents(options = {}) {
  return createGlassCatalogClassMap(options);
}

export function createGlassTailwindSafelist(options = {}) {
  return createGlassSafelist(options);
}

export function createGlassTailwindPlugin(pluginFactory, options = {}) {
  if (typeof pluginFactory !== "function") {
    throw new Error("createGlassTailwindPlugin expects the host Tailwind plugin factory");
  }

  return pluginFactory(({ addComponents }) => {
    addComponents(createGlassTailwindComponents(options));
  });
}

export function createGlassTailwindTheme(selector = ":root", input = {}, options = {}) {
  return compileGlassTheme(selector, input, options);
}

export function createGlassTailwindV4Utility(className, input = {}, options = {}) {
  const css = renderTailwindV4UtilityBlock(className, input);
  return options.minify ? minifyCss(css) : css;
}

export function createGlassTailwindV4Keyframes(options = {}) {
  const css = renderTailwindV4Keyframes();
  return options.minify ? minifyCss(css) : css;
}

export function createGlassTailwindV4Theme(options = {}) {
  const css = renderTailwindV4Theme(options);
  return options.minify ? minifyCss(css) : css;
}

export function createGlassTailwindV4Utilities(options = {}) {
  const catalog = createGlassClassCatalog(options);
  const utilityBlocks = Object.entries(catalog).map(([className, input]) => renderTailwindV4UtilityBlock(className, input));

  if (options.includeKeyframes !== false) {
    utilityBlocks.push(renderTailwindV4Keyframes());
  }

  const css = utilityBlocks.join("\n\n");
  return options.minify ? minifyCss(css) : css;
}

export function createGlassTailwindV4Css(options = {}) {
  const chunks = [];

  if (options.includeImport) {
    chunks.push(options.importStatement || '@import "tailwindcss";');
  }

  if (options.includeTheme !== false) {
    chunks.push(renderTailwindV4Theme(options));
  }

  if (options.includeUtilities !== false) {
    chunks.push(createGlassTailwindV4Utilities({ ...options, minify: false }));
  }

  const css = chunks.join("\n\n");
  return options.minify ? minifyCss(css) : css;
}

export function createGlassTailwindV4Preset(options = {}) {
  const prefix = options.prefix || "gg";
  const themeName = options.themeName || "glass";

  return {
    name: "glassgradients-tailwind-v4",
    css: createGlassTailwindV4Css(options),
    theme: createGlassTailwindV4Theme(options),
    utilities: createGlassTailwindV4Utilities(options),
    safelist: createGlassTailwindSafelist(options),
    usage: `<section class="${prefix} ${prefix}-workspace rounded-${themeName} shadow-${themeName}">...</section>`
  };
}
