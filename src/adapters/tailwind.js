import { compileGlassTheme } from "../theme.js";
import { createGlassCatalogClassMap, createGlassSafelist, createGlassStaticClassMap } from "./preset-shared.js";

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
