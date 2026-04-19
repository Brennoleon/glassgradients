import { compileGlass } from "../compiler.js";
import { compileGlassTheme, createGlassThemeScript } from "../theme.js";
import { createGlassStyleObject } from "./shared.js";

export function createNextGlassThemeScriptProps(options = {}) {
  const {
    id = "glassgradients-theme",
    strategy = "beforeInteractive",
    nonce,
    ...themeOptions
  } = options;
  const props = {
    id,
    strategy,
    dangerouslySetInnerHTML: {
      __html: createGlassThemeScript(themeOptions)
    }
  };
  if (nonce) {
    props.nonce = nonce;
  }
  return props;
}

export function createNextGlassStyleProps(selector = ":root", input = {}, options = {}) {
  const {
    id = "glassgradients-theme-css",
    nonce,
    ...compileOptions
  } = options;
  const props = {
    id,
    dangerouslySetInnerHTML: {
      __html: compileGlassTheme(selector, input, compileOptions)
    }
  };
  if (nonce) {
    props.nonce = nonce;
  }
  return props;
}

export function createNextGlassSurfaceProps(input = {}, options = {}) {
  return {
    style: createGlassStyleObject(input),
    suppressHydrationWarning: options.suppressHydrationWarning ?? true
  };
}

export function createNextGlassStaticCss(selector, input = {}, options = {}) {
  return compileGlass(input, { ...options, selector });
}

export function createNextGlassThemeCss(selector = ":root", input = {}, options = {}) {
  return compileGlassTheme(selector, input, options);
}
