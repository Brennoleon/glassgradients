import { compileGlass } from "../compiler.js";
import { compileGlassTheme, createGlassThemeScript } from "../theme.js";
import { mountGlass, stableSerialize } from "./shared.js";

function resolvePayload(value, fallbackRuntimeOptions = {}) {
  const payload = value && typeof value === "object" && !Array.isArray(value) ? value : { input: value };
  return {
    input: payload.input ?? payload,
    runtimeOptions: payload.runtimeOptions ?? fallbackRuntimeOptions
  };
}

export function createNuxtGlassDirective(defaultRuntimeOptions = {}) {
  return {
    mounted(el, binding) {
      const payload = resolvePayload(binding?.value, defaultRuntimeOptions);
      el.__glassgradients = mountGlass(el, payload.input, payload.runtimeOptions);
      el.__glassgradientsRuntimeSignature = stableSerialize(payload.runtimeOptions);
    },
    updated(el, binding) {
      const payload = resolvePayload(binding?.value, defaultRuntimeOptions);
      const runtimeSignature = stableSerialize(payload.runtimeOptions);
      if (!el.__glassgradients) {
        el.__glassgradients = mountGlass(el, payload.input, payload.runtimeOptions);
        el.__glassgradientsRuntimeSignature = runtimeSignature;
        return;
      }
      if (el.__glassgradientsRuntimeSignature !== runtimeSignature) {
        el.__glassgradients.destroy();
        el.__glassgradients = mountGlass(el, payload.input, payload.runtimeOptions);
        el.__glassgradientsRuntimeSignature = runtimeSignature;
        return;
      }
      el.__glassgradients.update(payload.input);
    },
    unmounted(el) {
      el.__glassgradients?.destroy();
      delete el.__glassgradients;
      delete el.__glassgradientsRuntimeSignature;
    }
  };
}

export function createNuxtGlassPlugin(options = {}) {
  const directiveName = options.directiveName || "glass";
  const directive = createNuxtGlassDirective(options.runtimeOptions || {});
  return {
    install(app) {
      app.directive(directiveName, directive);
    }
  };
}

export function createNuxtGlassHead(options = {}) {
  const {
    script = true,
    style = true,
    scriptId = "glassgradients-theme",
    styleId = "glassgradients-theme-css",
    selector = ":root",
    input = {},
    themeOptions = {},
    cssOptions = {}
  } = options;
  const head = {};

  if (script) {
    head.script = [
      {
        key: scriptId,
        id: scriptId,
        type: "text/javascript",
        tagPosition: "head",
        children: createGlassThemeScript(themeOptions)
      }
    ];
  }

  if (style) {
    head.style = [
      {
        key: styleId,
        id: styleId,
        children: compileGlassTheme(selector, input, cssOptions)
      }
    ];
  }

  return head;
}

export function createNuxtGlassStaticCss(selector, input = {}, options = {}) {
  return compileGlass(input, { ...options, selector });
}

export function createNuxtGlassThemeCss(selector = ":root", input = {}, options = {}) {
  return compileGlassTheme(selector, input, options);
}
