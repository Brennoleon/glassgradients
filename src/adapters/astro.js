import { compileGlass } from "../compiler.js";
import { compileGlassTheme, createGlassThemeScript } from "../theme.js";
import { createGlassStyleObject } from "./shared.js";

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function renderAttrs(attrs) {
  return Object.entries(attrs)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([key, value]) => (value === true ? key : `${key}="${escapeAttribute(value)}"`))
    .join(" ");
}

function renderTag(tagName, attrs, content) {
  const attrText = renderAttrs(attrs);
  return `<${tagName}${attrText ? ` ${attrText}` : ""}>${content}</${tagName}>`;
}

export function createAstroGlassStyleTag(selector, input = {}, options = {}) {
  const {
    id = "glassgradients-css",
    nonce,
    ...compileOptions
  } = options;
  const css = compileGlass(input, { ...compileOptions, selector });
  return renderTag("style", { id, nonce }, css);
}

export function createAstroGlassThemeStyleTag(selector = ":root", input = {}, options = {}) {
  const {
    id = "glassgradients-theme-css",
    nonce,
    ...compileOptions
  } = options;
  const css = compileGlassTheme(selector, input, compileOptions);
  return renderTag("style", { id, nonce }, css);
}

export function createAstroGlassThemeScriptTag(options = {}) {
  const {
    id = "glassgradients-theme",
    nonce,
    ...themeOptions
  } = options;
  return renderTag("script", { id, nonce, "is:inline": true }, createGlassThemeScript(themeOptions));
}

export function createAstroGlassHead(options = {}) {
  const {
    selector = ":root",
    input = {},
    includeThemeScript = true,
    includeThemeStyle = true,
    themeOptions = {},
    styleOptions = {}
  } = options;
  const tags = [];
  if (includeThemeStyle) {
    tags.push(createAstroGlassThemeStyleTag(selector, input, styleOptions));
  }
  if (includeThemeScript) {
    tags.push(createAstroGlassThemeScriptTag(themeOptions));
  }
  return tags.join("\n");
}

export function createAstroGlassStyleObject(input = {}) {
  return createGlassStyleObject(input);
}
