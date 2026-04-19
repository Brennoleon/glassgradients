import { compileGlassTheme } from "../theme.js";
import { createGlassCatalogCss, createGlassStaticClassCss } from "./preset-shared.js";

export function createGlassUnoClass(className, input = {}) {
  return createGlassStaticClassCss(className, input);
}

export function createGlassUnoCss(options = {}) {
  return createGlassCatalogCss(options);
}

export function createGlassUnoShortcuts(options = {}) {
  const prefix = options.prefix || "gg";
  return {
    [`${prefix}-shell-stack`]: `${prefix} ${prefix}-shell`,
    [`${prefix}-workspace-shell`]: `${prefix} ${prefix}-workspace`,
    [`${prefix}-form-shell`]: `${prefix} ${prefix}-form`,
    [`${prefix}-dialog-shell`]: `${prefix} ${prefix}-dialog`,
    [`${prefix}-command-shell`]: `${prefix} ${prefix}-command-palette`,
    [`${prefix}-command-strip`]: `${prefix} ${prefix}-command-bar`,
    [`${prefix}-data-shell`]: `${prefix} ${prefix}-table`,
    [`${prefix}-inspector-shell`]: `${prefix} ${prefix}-inspector`,
    [`${prefix}-terminal-shell`]: `${prefix} ${prefix}-terminal`
  };
}

export function createGlassUnoPreset(options = {}) {
  return {
    name: "glassgradients",
    shortcuts: createGlassUnoShortcuts(options),
    preflights: [
      {
        layer: "default",
        getCSS: () => createGlassUnoCss(options)
      }
    ]
  };
}

export function createGlassUnoTheme(selector = ":root", input = {}, options = {}) {
  return compileGlassTheme(selector, input, options);
}
