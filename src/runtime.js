import { mergeDeep, normalizeConfig } from "./defaults.js";
import { parseGlass } from "./parser.js";
import { buildBackdropFilter, buildStyleVariables } from "./style-engine.js";
import { collectVariantEntries, evaluateVariantInput } from "./variants.js";

const RUNTIME_CLASS = "gg-runtime-host";
const LAYER_CLASS = "gg-runtime-layer";
const ORNAMENT_CLASS = "gg-runtime-ornament";
const HIDDEN_CLASS = "gg-runtime-paused";

let runtimeStyleInjected = false;
const runtimeState = new WeakMap();

function injectRuntimeStyle() {
  if (runtimeStyleInjected || typeof document === "undefined") {
    return;
  }

  const style = document.createElement("style");
  style.setAttribute("data-glassgradients", "runtime");
  style.textContent = `
.${RUNTIME_CLASS} {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: var(--gg-radius, 18px);
  z-index: var(--gg-z-index, auto);
  border: var(--gg-glass-border, 0 solid transparent);
  background: var(--gg-glass-fill, transparent);
  box-shadow: var(--gg-shadow-stack, none);
  -webkit-backdrop-filter: none;
  backdrop-filter: none;
  --ggx: 0%;
  --ggy: 0%;
  --ggh: 0deg;
  --ggr: 0deg;
  --ggz: 1.04;
  --ggm-x: 0%;
  --ggm-y: 0%;
  --ggm-z: 1;
  --ggm-r: 0deg;
}

.${RUNTIME_CLASS} .${LAYER_CLASS},
.${RUNTIME_CLASS} .${ORNAMENT_CLASS} {
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}

.${RUNTIME_CLASS} .${LAYER_CLASS} {
  inset: var(--gg-gradient-inset, -22%);
  z-index: -2;
  background-image: var(--gg-gradient-background, none);
  background-blend-mode: overlay, var(--gg-gradient-blend, normal);
  opacity: var(--gg-gradient-opacity, 0);
  filter: var(--gg-runtime-gradient-filter, var(--gg-gradient-filter, none) hue-rotate(var(--ggh, 0deg)));
  transform: translate3d(var(--ggx), var(--ggy), 0) scale(var(--ggz)) rotate(var(--ggr));
  will-change: transform, filter, opacity;
}

.${RUNTIME_CLASS} .${ORNAMENT_CLASS} {
  inset: 0;
  z-index: -1;
  background-image: var(--gg-ornament-background, none);
  background-blend-mode: var(--gg-ornament-blend, normal);
  opacity: var(--gg-ornament-opacity, 1);
  filter: var(--gg-motion-blurrin-filter, none);
  transform: translate3d(var(--ggm-x), var(--ggm-y), 0) scale(var(--ggm-z)) rotate(var(--ggm-r));
  will-change: transform, filter, opacity;
}

.${RUNTIME_CLASS}.${HIDDEN_CLASS} .${LAYER_CLASS} {
  will-change: auto;
}

@supports not ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0))) {
  .${RUNTIME_CLASS} {
    -webkit-backdrop-filter: none;
    backdrop-filter: none;
    background: var(--gg-fallback-fill, transparent);
  }
}
`.trim();

  document.head.append(style);
  runtimeStyleInjected = true;
}

function createLayer(element) {
  const layer = document.createElement("div");
  layer.className = LAYER_CLASS;
  const ornament = document.createElement("div");
  ornament.className = ORNAMENT_CLASS;

  if (getComputedStyle(element).position === "static") {
    element.style.position = "relative";
  }

  element.classList.add(RUNTIME_CLASS);
  element.prepend(ornament);
  element.prepend(layer);
  return { layer, ornament, styleKeys: [] };
}

function applyStyleMap(element, styleMap, state) {
  const nextKeys = Object.keys(styleMap);
  for (const key of state.styleKeys) {
    if (!nextKeys.includes(key)) {
      element.style.removeProperty(key);
    }
  }
  for (const [key, value] of Object.entries(styleMap)) {
    element.style.setProperty(key, value);
  }
  state.styleKeys = nextKeys;
}

function syncLayerState(state, config) {
  state.layer.style.display = config.gradient.enabled ? "" : "none";

  const ornamentVisible =
    (config.interactive.enabled && config.interactive.glare > 0) ||
    (config.glass.enabled && config.glass.highlight > 0) ||
    (config.shine.enabled && config.shine.opacity > 0) ||
    config.vignette > 0 ||
    (config.grain.enabled && config.grain.amount > 0) ||
    config.motionBlurrin.enabled;

  state.ornament.style.display = ornamentVisible ? "" : "none";
}

function applyCssVariables(element, state, config) {
  const styleMap = buildStyleVariables(config);
  applyStyleMap(element, styleMap, state);
  syncLayerState(state, config);
  element.style.setProperty("--ggx", "0%");
  element.style.setProperty("--ggy", "0%");
  element.style.setProperty("--ggh", "0deg");
  element.style.setProperty("--ggr", "0deg");
  element.style.setProperty("--ggz", "1.04");
  element.style.setProperty("--ggm-x", "0%");
  element.style.setProperty("--ggm-y", "0%");
  element.style.setProperty("--ggm-z", "1");
  element.style.setProperty("--ggm-r", "0deg");
  element.style.removeProperty("--gg-runtime-gradient-filter");
  element.style.setProperty("--gg-glare-x", "50%");
  element.style.setProperty("--gg-glare-y", "50%");
  element.style.webkitBackdropFilter = buildBackdropFilter(config.glass);
  element.style.backdropFilter = buildBackdropFilter(config.glass);
  element.style.isolation = config.isolate ? "isolate" : "auto";
}

function parseSpeed(speed) {
  if (typeof speed === "string" && speed.trim().endsWith("ms")) {
    const value = Number.parseFloat(speed);
    return Number.isFinite(value) ? Math.max(200, value) : 18000;
  }
  if (typeof speed === "string" && speed.trim().endsWith("s")) {
    const value = Number.parseFloat(speed);
    return Number.isFinite(value) ? Math.max(0.2, value) * 1000 : 18000;
  }
  if (typeof speed === "number" && Number.isFinite(speed)) {
    return Math.max(200, speed);
  }
  return 18000;
}

function computeFrame(mode, phase, drift, hueShift, intensity) {
  if (mode === "pulse") {
    return {
      x: Math.sin(phase * Math.PI * 1.8) * drift * 0.7,
      y: Math.cos(phase * Math.PI * 1.9) * drift * 0.7,
      hue: Math.sin(phase * Math.PI * 1.4) * hueShift,
      z: 1.03 + Math.abs(Math.sin(phase * Math.PI * 2)) * 0.09 * intensity
    };
  }
  if (mode === "orbit") {
    return {
      x: Math.sin(phase * Math.PI * 2) * drift,
      y: Math.cos(phase * Math.PI * 2) * drift,
      hue: Math.sin(phase * Math.PI * 1.2) * hueShift,
      z: 1.04 + Math.sin(phase * Math.PI * 3.2) * 0.02 * intensity
    };
  }
  return {
    x: Math.sin(phase * Math.PI * 2) * drift,
    y: Math.cos(phase * Math.PI * 1.6) * drift,
    hue: Math.sin(phase * Math.PI * 1.4) * hueShift,
    z: 1.05
  };
}

function createWorkerController(onFrame) {
  if (typeof Worker === "undefined" || typeof Blob === "undefined" || typeof URL === "undefined") {
    return null;
  }

  const workerSource = `
let timer = null;
let phase = 0;
let speedMs = 18000;
let hueShift = 30;
let drift = 8;
let mode = "wave";
let frameStep = 1;
let intensity = 1;

function computeFrame(modeName, value, driftValue, hue, amp) {
  if (modeName === "pulse") {
    return {
      x: Math.sin(value * Math.PI * 1.8) * driftValue * 0.7,
      y: Math.cos(value * Math.PI * 1.9) * driftValue * 0.7,
      hue: Math.sin(value * Math.PI * 1.4) * hue,
      z: 1.03 + Math.abs(Math.sin(value * Math.PI * 2)) * 0.09 * amp
    };
  }
  if (modeName === "orbit") {
    return {
      x: Math.sin(value * Math.PI * 2) * driftValue,
      y: Math.cos(value * Math.PI * 2) * driftValue,
      hue: Math.sin(value * Math.PI * 1.2) * hue,
      z: 1.04 + Math.sin(value * Math.PI * 3.2) * 0.02 * amp
    };
  }
  return {
    x: Math.sin(value * Math.PI * 2) * driftValue,
    y: Math.cos(value * Math.PI * 1.6) * driftValue,
    hue: Math.sin(value * Math.PI * 1.4) * hue,
    z: 1.05
  };
}

function tick() {
  phase += (0.016 / (speedMs / 1000)) * frameStep;
  postMessage(computeFrame(mode, phase, drift, hueShift, intensity));
}

onmessage = (event) => {
  const data = event.data || {};
  if (data.type === "start") {
    speedMs = data.speedMs || speedMs;
    hueShift = data.hueShift || hueShift;
    drift = data.drift || drift;
    mode = data.mode || mode;
    frameStep = data.frameStep || frameStep;
    intensity = data.intensity || intensity;
    if (timer) clearInterval(timer);
    const tickMs = Math.max(14, data.tickMs || (speedMs / 220));
    timer = setInterval(tick, tickMs);
    tick();
  }
  if (data.type === "stop" && timer) {
    clearInterval(timer);
    timer = null;
  }
};
`;

  const blob = new Blob([workerSource], { type: "text/javascript" });
  const workerUrl = URL.createObjectURL(blob);
  const worker = new Worker(workerUrl);
  URL.revokeObjectURL(workerUrl);
  worker.onmessage = (event) => onFrame(event.data);
  return worker;
}

function computeTickMs(speedMs, desiredFps, fpsCap) {
  const maxFps = fpsCap > 0 ? fpsCap : 60;
  const fps = desiredFps > 0 ? Math.min(desiredFps, maxFps) : maxFps;
  return Math.max(1000 / fps, speedMs / 240);
}

function startAnimator(element, config, runtimeOptions = {}) {
  const shouldAnimateGradient = config.gradient.enabled && (config.animate.enabled || config.engineUp.enabled);
  const shouldAnimateMotionBlurrin = config.motionBlurrin.animated;
  if (!shouldAnimateGradient && !shouldAnimateMotionBlurrin) {
    return {
      canAnimate: false,
      start() {},
      stop() {},
      destroy() {}
    };
  }

  const speedMs = (config.engineUp.enabled ? parseSpeed(config.engineUp.duration) : parseSpeed(config.speed)) / config.animate.speedMultiplier;
  const driftRaw = String(config.animate.drift || "8%").replace("%", "");
  const drift = Number.parseFloat(driftRaw);
  const driftPct = Number.isFinite(drift) ? drift : 8;
  const hueShift = config.animate.hueShift;
  const mode = config.animate.mode;
  const threaded = runtimeOptions.threaded !== false;
  const frameStep = config.frameStep;
  const desiredFps = config.animate.fps;
  const tickMs = computeTickMs(speedMs, desiredFps, config.fpsCap);

  let frameId = null;
  let phase = 0;
  let worker = null;
  let lastTs = 0;

  const applyFrame = (frame) => {
    if (shouldAnimateGradient) {
      if (config.engineUp.enabled) {
        const engineFrame = computeEngineUpRuntimeFrame(config.engineUp, phase);
        element.style.setProperty("--ggx", engineFrame.x);
        element.style.setProperty("--ggy", engineFrame.y);
        element.style.setProperty("--ggz", engineFrame.z);
        element.style.setProperty("--ggr", engineFrame.r);
        if (engineFrame.filter) {
          element.style.setProperty("--gg-runtime-gradient-filter", engineFrame.filter);
        }
      } else {
        element.style.setProperty("--ggx", `${frame.x.toFixed(2)}%`);
        element.style.setProperty("--ggy", `${frame.y.toFixed(2)}%`);
        element.style.setProperty("--ggh", `${frame.hue.toFixed(2)}deg`);
        element.style.setProperty("--ggz", `${frame.z.toFixed(3)}`);
      }
    }
    if (shouldAnimateMotionBlurrin) {
      const motionFrame = computeMotionBlurrinRuntimeFrame(config.motionBlurrin.direction, phase);
      element.style.setProperty("--ggm-x", motionFrame.x);
      element.style.setProperty("--ggm-y", motionFrame.y);
      element.style.setProperty("--ggm-z", motionFrame.z);
      element.style.setProperty("--ggm-r", motionFrame.r);
    }
  };

  const runMainThread = () => {
    const step = (ts) => {
      if (lastTs && ts - lastTs < tickMs) {
        frameId = requestAnimationFrame(step);
        return;
      }
      lastTs = ts;
      phase += (16 / speedMs) * frameStep;
      applyFrame(computeFrame(mode, phase, driftPct, hueShift, config.gradient.intensity));
      frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);
  };

  return {
    canAnimate: true,
    start() {
      if (threaded && !worker && !config.engineUp.enabled && !shouldAnimateMotionBlurrin) {
        worker = createWorkerController(applyFrame);
      }
      if (worker) {
        worker.postMessage({
          type: "start",
          speedMs,
          hueShift,
          drift: driftPct,
          mode,
          frameStep,
          intensity: config.gradient.intensity,
          tickMs
        });
        return;
      }
      if (!frameId) {
        runMainThread();
      }
    },
    stop() {
      if (worker) {
        worker.postMessage({ type: "stop" });
      }
      if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = null;
      }
    },
    destroy() {
      this.stop();
      if (worker) {
        worker.terminate();
        worker = null;
      }
    }
  };
}

function createNoopHandle() {
  return {
    destroy() {},
    disconnect() {}
  };
}

function bindAnimatorVisibility(element, animator, threshold, rootMargin) {
  if (!animator.canAnimate) {
    return createNoopHandle();
  }

  if (typeof IntersectionObserver === "undefined") {
    animator.start();
    return createNoopHandle();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          element.classList.remove(HIDDEN_CLASS);
          animator.start();
        } else {
          element.classList.add(HIDDEN_CLASS);
          animator.stop();
        }
      }
    },
    {
      threshold: [0, threshold, 0.2].sort((a, b) => a - b),
      rootMargin
    }
  );

  observer.observe(element);
  animator.start();
  return observer;
}

function bindInteractiveGlare(element, config) {
  if (!config.interactive.enabled || typeof window === "undefined") {
    return createNoopHandle();
  }

  const updateGlare = (event) => {
    const rect = element.getBoundingClientRect();
    if (!rect.width || !rect.height) {
      return;
    }
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    element.style.setProperty("--gg-glare-x", `${Math.max(0, Math.min(100, x)).toFixed(2)}%`);
    element.style.setProperty("--gg-glare-y", `${Math.max(0, Math.min(100, y)).toFixed(2)}%`);
  };

  const resetGlare = () => {
    element.style.setProperty("--gg-glare-x", "50%");
    element.style.setProperty("--gg-glare-y", "50%");
  };

  element.addEventListener("pointermove", updateGlare, { passive: true });
  element.addEventListener("pointerleave", resetGlare, { passive: true });
  element.addEventListener("pointercancel", resetGlare, { passive: true });

  return {
    destroy() {
      element.removeEventListener("pointermove", updateGlare);
      element.removeEventListener("pointerleave", resetGlare);
      element.removeEventListener("pointercancel", resetGlare);
      resetGlare();
    }
  };
}

function resolveElements(target) {
  if (typeof target === "string") {
    return Array.from(document.querySelectorAll(target));
  }
  if (target instanceof Element) {
    return [target];
  }
  if (target && typeof target.length === "number") {
    return Array.from(target).filter((item) => item instanceof Element);
  }
  return [];
}

function resolveInputConfig(input) {
  if (typeof input === "string") {
    if (input.includes(":")) {
      return parseGlass(input);
    }
    return {};
  }
  return input ?? {};
}

function getRuntimeHints() {
  if (typeof navigator === "undefined" || typeof window === "undefined") {
    return {};
  }

  const prefersReduced =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};

  return {
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
    deviceMemory: navigator.deviceMemory || 0,
    devicePixelRatio: window.devicePixelRatio || 1,
    effectiveType: connection.effectiveType || "",
    saveData: Boolean(connection.saveData),
    prefersReducedMotion: prefersReduced
  };
}

function parseNumericUnit(value, fallback = 0) {
  const text = String(value ?? "").trim();
  const number = Number.parseFloat(text);
  if (!Number.isFinite(number)) {
    return { value: fallback, unit: "%" };
  }
  const unit = text.replace(String(number), "") || "%";
  return { value: number, unit };
}

function formatNumericUnit(value, unit) {
  return `${value.toFixed(2)}${unit}`;
}

function computeEngineUpRuntimeFrame(engineUp, phase) {
  const x = parseNumericUnit(engineUp.x, 2);
  const y = parseNumericUnit(engineUp.y, 1.4);
  const rotate = parseNumericUnit(engineUp.rotate, 0);
  const wave = Math.sin(phase * Math.PI * 2);
  const cross = Math.cos(phase * Math.PI * 1.7);
  const scale = 1 + Math.max(0, engineUp.scale - 1) * ((wave + 1) / 2);

  const filterParts = [];
  if (engineUp.blur) {
    filterParts.push(`blur(${engineUp.blur})`);
  }
  if (engineUp.saturation) {
    filterParts.push(`saturate(${engineUp.saturation})`);
  }
  if (engineUp.contrast) {
    filterParts.push(`contrast(${engineUp.contrast})`);
  }
  if (engineUp.brightness) {
    filterParts.push(`brightness(${engineUp.brightness})`);
  }
  if (engineUp.hueRotate) {
    filterParts.push(`hue-rotate(${engineUp.hueRotate})`);
  }

  return {
    x: formatNumericUnit(x.value * wave, x.unit),
    y: formatNumericUnit(y.value * cross, y.unit),
    z: scale.toFixed(3),
    r: formatNumericUnit(rotate.value * wave, rotate.unit),
    filter: filterParts.length > 0 ? filterParts.join(" ") : ""
  };
}

function computeMotionBlurrinRuntimeFrame(direction, phase) {
  const wave = Math.sin(phase * Math.PI * 2);
  const cross = Math.cos(phase * Math.PI * 2);
  if (direction === "left") {
    return { x: `${(-3 * wave).toFixed(2)}%`, y: "0%", z: "1", r: "0deg" };
  }
  if (direction === "up") {
    return { x: "0%", y: `${(-3 * wave).toFixed(2)}%`, z: "1", r: "0deg" };
  }
  if (direction === "down") {
    return { x: "0%", y: `${(3 * wave).toFixed(2)}%`, z: "1", r: "0deg" };
  }
  if (direction === "diagonal") {
    return { x: `${(2.5 * wave).toFixed(2)}%`, y: `${(-2 * cross).toFixed(2)}%`, z: "1.03", r: "0deg" };
  }
  if (direction === "orbit") {
    return { x: "0%", y: "0%", z: "1.03", r: `${(3 * wave).toFixed(2)}deg` };
  }
  if (direction === "liquid") {
    return { x: `${(1.5 * wave).toFixed(2)}%`, y: `${(1 * cross).toFixed(2)}%`, z: (1.025 + 0.045 * wave).toFixed(3), r: "0deg" };
  }
  return { x: `${(3 * wave).toFixed(2)}%`, y: "0%", z: "1", r: "0deg" };
}

function computeRuntimeConfig(sourceInput, hints, runtimeOptions) {
  const resolved = typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? evaluateVariantInput(sourceInput, mergeDeep, window.matchMedia.bind(window))
    : sourceInput;

  const mergedHints = mergeDeep(hints, runtimeOptions.monitoringHints || {});
  let config = normalizeConfig(resolved, mergedHints);
  if (runtimeOptions.reduceMotion ?? hints.prefersReducedMotion) {
    config = normalizeConfig(mergeDeep(resolved, { animate: { enabled: false } }), mergedHints);
  }
  return config;
}

function bindVariantListeners(sourceInput, onChange) {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return createNoopHandle();
  }

  const entries = collectVariantEntries(sourceInput);
  if (entries.length === 0) {
    return createNoopHandle();
  }

  const cleanups = [];
  for (const entry of entries) {
    let media;
    try {
      media = window.matchMedia(entry.query);
    } catch {
      continue;
    }
    const handler = () => onChange();
    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", handler);
      cleanups.push(() => media.removeEventListener("change", handler));
    } else if (typeof media.addListener === "function") {
      media.addListener(handler);
      cleanups.push(() => media.removeListener(handler));
    }
  }

  return {
    destroy() {
      for (const cleanup of cleanups) {
        cleanup();
      }
    }
  };
}

export function createGlassGradient(target, input = {}, runtimeOptions = {}) {
  if (typeof document === "undefined") {
    throw new Error("createGlassGradient can only run in a browser environment");
  }

  injectRuntimeStyle();
  const parsed = resolveInputConfig(input);
  const hints = getRuntimeHints();
  const elements = resolveElements(target);

  const instances = elements.map((element) => {
    let state = runtimeState.get(element);
    if (!state) {
      state = createLayer(element);
      runtimeState.set(element, state);
    }

    let sourceInput = parsed;
    let liveConfig = computeRuntimeConfig(sourceInput, hints, runtimeOptions);

    const applyCurrentConfig = () => {
      applyCssVariables(element, state, liveConfig);
    };

    applyCurrentConfig();

    let animator = startAnimator(element, liveConfig, runtimeOptions);
    let observer = bindAnimatorVisibility(
      element,
      animator,
      runtimeOptions.threshold ?? liveConfig.visibility.threshold,
      runtimeOptions.rootMargin || liveConfig.visibility.rootMargin
    );
    let interactivity = bindInteractiveGlare(element, liveConfig);
    let variantListeners = bindVariantListeners(sourceInput, () => {
      liveConfig = computeRuntimeConfig(sourceInput, hints, runtimeOptions);
      applyCurrentConfig();
      observer.disconnect();
      animator.destroy();
      interactivity.destroy();
      animator = startAnimator(element, liveConfig, runtimeOptions);
      observer = bindAnimatorVisibility(
        element,
        animator,
        runtimeOptions.threshold ?? liveConfig.visibility.threshold,
        runtimeOptions.rootMargin || liveConfig.visibility.rootMargin
      );
      interactivity = bindInteractiveGlare(element, liveConfig);
      instance.config = liveConfig;
    });

    const instance = {
      element,
      config: liveConfig,
      destroy() {
        variantListeners.destroy();
        observer.disconnect();
        animator.destroy();
        interactivity.destroy();
        if (state.layer?.isConnected) {
          state.layer.remove();
        }
        if (state.ornament?.isConnected) {
          state.ornament.remove();
        }
        for (const key of state.styleKeys) {
          element.style.removeProperty(key);
        }
        element.style.removeProperty("--ggx");
        element.style.removeProperty("--ggy");
        element.style.removeProperty("--ggh");
        element.style.removeProperty("--ggz");
        element.style.removeProperty("--gg-glare-x");
        element.style.removeProperty("--gg-glare-y");
        element.style.webkitBackdropFilter = "";
        element.style.backdropFilter = "";
        element.style.isolation = "";
        element.classList.remove(RUNTIME_CLASS, HIDDEN_CLASS);
        runtimeState.delete(element);
      },
      update(nextInput = {}) {
        const nextParsed = resolveInputConfig(nextInput);
        sourceInput = mergeDeep(sourceInput, nextParsed);
        liveConfig = computeRuntimeConfig(sourceInput, hints, runtimeOptions);
        applyCurrentConfig();
        variantListeners.destroy();
        observer.disconnect();
        animator.destroy();
        interactivity.destroy();
        animator = startAnimator(element, liveConfig, runtimeOptions);
        observer = bindAnimatorVisibility(
          element,
          animator,
          runtimeOptions.threshold ?? liveConfig.visibility.threshold,
          runtimeOptions.rootMargin || liveConfig.visibility.rootMargin
        );
        interactivity = bindInteractiveGlare(element, liveConfig);
        variantListeners = bindVariantListeners(sourceInput, () => instance.update({}));
        this.config = liveConfig;
      }
    };

    return instance;
  });

  if (instances.length === 1) {
    return instances[0];
  }

  return {
    instances,
    destroy() {
      for (const instance of instances) {
        instance.destroy();
      }
    },
    update(nextInput) {
      for (const instance of instances) {
        instance.update(nextInput);
      }
    }
  };
}

export function applyGlassGradient(target, input = {}, runtimeOptions = {}) {
  return createGlassGradient(target, input, runtimeOptions);
}

export function compileRuntimeInlineStyle(input = {}) {
  const config = normalizeConfig(resolveInputConfig(input));
  return {
    ...buildStyleVariables(config),
    WebkitBackdropFilter: buildBackdropFilter(config.glass),
    backdropFilter: buildBackdropFilter(config.glass),
    borderRadius: config.radius,
    isolation: config.isolate ? "isolate" : "auto"
  };
}
