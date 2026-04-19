import { computed, onBeforeUnmount, onMounted, shallowRef, unref, watch } from "vue";
import { createGlassThemeScript } from "../theme.js";
import { createGlassStyleObject, createGlassTokenObject, mountGlass, stableSerialize } from "./shared.js";

function resolvePayload(value, fallbackRuntimeOptions = {}) {
  const payload = value && typeof value === "object" && !Array.isArray(value) ? value : { input: value };
  return {
    input: payload.input ?? payload,
    runtimeOptions: payload.runtimeOptions ?? fallbackRuntimeOptions
  };
}

export function useGlassGradient(targetRef, input = {}, runtimeOptions = {}) {
  const instance = shallowRef(null);

  const mount = () => {
    const node = unref(targetRef);
    if (!node) {
      return;
    }
    instance.value?.destroy();
    instance.value = mountGlass(node, unref(input), unref(runtimeOptions));
  };

  onMounted(mount);
  onBeforeUnmount(() => instance.value?.destroy());

  watch(() => stableSerialize(unref(input)), () => {
    if (instance.value) {
      instance.value.update(unref(input));
    }
  });

  watch(() => stableSerialize(unref(runtimeOptions)), () => {
    if (instance.value) {
      mount();
    }
  });

  return instance;
}

export function useGlassStyle(input = {}) {
  return computed(() => createGlassStyleObject(unref(input)));
}

export function useGlassTokens(input = {}) {
  return computed(() => createGlassTokenObject(unref(input)));
}

export function createGlassDirective(defaultRuntimeOptions = {}) {
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

export function createGlassThemeBootstrap(options = {}) {
  return createGlassThemeScript(options);
}
