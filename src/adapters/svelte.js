import { createGlassThemeScript } from "../theme.js";
import { createGlassStyleObject, createGlassTokenObject, mountGlass, stableSerialize } from "./shared.js";

function resolveActionPayload(value) {
  const payload = value && typeof value === "object" && !Array.isArray(value) ? value : { input: value };
  return {
    input: payload.input ?? payload,
    runtimeOptions: payload.runtimeOptions ?? {}
  };
}

export function glass(node, value = {}) {
  let payload = resolveActionPayload(value);
  let instance = mountGlass(node, payload.input, payload.runtimeOptions);
  let runtimeSignature = stableSerialize(payload.runtimeOptions);

  return {
    update(nextValue = {}) {
      payload = resolveActionPayload(nextValue);
      const nextRuntimeSignature = stableSerialize(payload.runtimeOptions);
      if (nextRuntimeSignature !== runtimeSignature) {
        instance.destroy();
        instance = mountGlass(node, payload.input, payload.runtimeOptions);
        runtimeSignature = nextRuntimeSignature;
        return;
      }
      instance.update(payload.input);
    },
    destroy() {
      instance.destroy();
    }
  };
}

export function glassStyle(input = {}) {
  return createGlassStyleObject(input);
}

export function glassTokens(input = {}) {
  return createGlassTokenObject(input);
}

export function glassThemeScript(options = {}) {
  return createGlassThemeScript(options);
}
