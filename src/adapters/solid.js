import { createEffect, createMemo, onCleanup, onMount } from "solid-js";
import { createGlassThemeScript } from "../theme.js";
import { createGlassStyleObject, createGlassTokenObject, mountGlass, stableSerialize } from "./shared.js";

function resolveValue(value) {
  return typeof value === "function" ? value() : value;
}

function resolvePayload(value) {
  const resolved = resolveValue(value);
  const payload = resolved && typeof resolved === "object" && !Array.isArray(resolved) ? resolved : { input: resolved };
  return {
    input: payload.input ?? payload,
    runtimeOptions: payload.runtimeOptions ?? {}
  };
}

export function useGlassGradient(target, input = {}, runtimeOptions = {}) {
  let instance = null;
  let runtimeSignature = "";

  const remount = () => {
    const node = resolveValue(target);
    if (!node) {
      return;
    }
    instance?.destroy();
    instance = mountGlass(node, resolveValue(input), resolveValue(runtimeOptions));
    runtimeSignature = stableSerialize(resolveValue(runtimeOptions));
  };

  onMount(remount);

  createEffect(() => {
    const nextInput = resolveValue(input);
    const nextRuntime = resolveValue(runtimeOptions);
    const nextRuntimeSignature = stableSerialize(nextRuntime);

    if (!instance) {
      return;
    }

    if (nextRuntimeSignature !== runtimeSignature) {
      remount();
      return;
    }

    instance.update(nextInput);
  });

  onCleanup(() => instance?.destroy());

  return () => instance;
}

export function createGlassStyle(input = {}) {
  return createMemo(() => createGlassStyleObject(resolveValue(input)));
}

export function createGlassTokens(input = {}) {
  return createMemo(() => createGlassTokenObject(resolveValue(input)));
}

export function glass(node, value = () => ({})) {
  let instance = null;
  let runtimeSignature = "";

  createEffect(() => {
    const payload = resolvePayload(value);
    const nextRuntimeSignature = stableSerialize(payload.runtimeOptions);

    if (!instance) {
      instance = mountGlass(node, payload.input, payload.runtimeOptions);
      runtimeSignature = nextRuntimeSignature;
      return;
    }

    if (nextRuntimeSignature !== runtimeSignature) {
      instance.destroy();
      instance = mountGlass(node, payload.input, payload.runtimeOptions);
      runtimeSignature = nextRuntimeSignature;
      return;
    }

    instance.update(payload.input);
  });

  onCleanup(() => instance?.destroy());
}

export function createGlassThemeBootstrap(options = {}) {
  return createGlassThemeScript(options);
}
