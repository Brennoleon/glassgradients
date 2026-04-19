import { mergeDeep } from "../defaults.js";
import { parseGlass } from "../parser.js";
import { createGlassTokens, createGlassThemeScript } from "../theme.js";
import { compileRuntimeInlineStyle, createGlassGradient } from "../runtime.js";

export function resolveGlassInput(input) {
  if (typeof input === "function") {
    return resolveGlassInput(input());
  }
  if (typeof input === "string") {
    return input.includes(":") ? parseGlass(input) : {};
  }
  return input ?? {};
}

export function mergeGlassInputs(base, extra) {
  return mergeDeep(resolveGlassInput(base), resolveGlassInput(extra));
}

export function createGlassStyleObject(input = {}) {
  return compileRuntimeInlineStyle(resolveGlassInput(input));
}

export function createGlassTokenObject(input = {}) {
  return createGlassTokens(resolveGlassInput(input));
}

export function createGlassThemeBootstrap(options = {}) {
  return createGlassThemeScript(options);
}

export function mountGlass(target, input = {}, runtimeOptions = {}) {
  return createGlassGradient(target, resolveGlassInput(input), runtimeOptions);
}

export function stableSerialize(value) {
  return JSON.stringify(sortForSerialization(value));
}

function sortForSerialization(value) {
  if (Array.isArray(value)) {
    return value.map((item) => sortForSerialization(item));
  }
  if (typeof value === "object" && value !== null) {
    return Object.keys(value)
      .sort()
      .reduce((acc, key) => {
        acc[key] = sortForSerialization(value[key]);
        return acc;
      }, {});
  }
  return value;
}
