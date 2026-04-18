import { normalizeConfig, toCssUnit } from "./defaults.js";
import { parseGlass } from "./parser.js";

const RUNTIME_CLASS = "gg-runtime-host";
const LAYER_CLASS = "gg-runtime-layer";
const GRAIN_CLASS = "gg-runtime-grain";
const HIDDEN_CLASS = "gg-runtime-paused";
const EFFECT_CLASS_PREFIX = "gg-effect-";

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
  --ggx: 0%;
  --ggy: 0%;
  --ggh: 0deg;
  --ggz: 1.05;
  --gg-base-filter: blur(var(--gg-blur, 48px)) saturate(var(--gg-saturation, 138%)) contrast(var(--gg-contrast, 109%)) brightness(var(--gg-brightness, 102%));
}

.${RUNTIME_CLASS} .${LAYER_CLASS},
.${RUNTIME_CLASS} .${GRAIN_CLASS} {
  position: absolute;
  inset: var(--gg-inset, -22%);
  pointer-events: none;
  z-index: -1;
}

.${RUNTIME_CLASS} .${LAYER_CLASS} {
  z-index: -2;
  opacity: var(--gg-opacity, 0.74);
  background-blend-mode: overlay, var(--gg-blend, normal);
  filter: var(--gg-base-filter) hue-rotate(var(--ggh, 0deg));
  transform: translate3d(var(--ggx), var(--ggy), 0) scale(var(--ggz));
  will-change: transform, filter;
}

.${RUNTIME_CLASS}.gg-effect-mesh .${LAYER_CLASS} {
  background-image:
    linear-gradient(0deg, var(--gg-tint, transparent), var(--gg-tint, transparent)),
    radial-gradient(140% 120% at 6% 4%, var(--gg-c1, #66b3ff) 0%, transparent 55%),
    radial-gradient(140% 130% at 88% 12%, var(--gg-c2, #8f7dff) 0%, transparent 58%),
    radial-gradient(160% 140% at 20% 92%, var(--gg-c3, #45d6c8) 0%, transparent 63%),
    radial-gradient(130% 130% at 84% 76%, var(--gg-c4, #f97db2) 0%, transparent 55%);
}

.${RUNTIME_CLASS}.gg-effect-aurora .${LAYER_CLASS} {
  background-image:
    linear-gradient(0deg, var(--gg-tint, transparent), var(--gg-tint, transparent)),
    linear-gradient(130deg, var(--gg-c1, #66b3ff) 0%, transparent 42%),
    linear-gradient(210deg, var(--gg-c2, #8f7dff) 12%, transparent 52%),
    radial-gradient(150% 130% at 80% 85%, var(--gg-c3, #45d6c8) 0%, transparent 60%),
    radial-gradient(140% 120% at 15% 85%, var(--gg-c4, #f97db2) 0%, transparent 58%);
}

.${RUNTIME_CLASS}.gg-effect-spotlight .${LAYER_CLASS} {
  background-image:
    linear-gradient(0deg, var(--gg-tint, transparent), var(--gg-tint, transparent)),
    radial-gradient(90% 90% at 50% 28%, var(--gg-c1, #66b3ff) 0%, transparent 55%),
    radial-gradient(80% 80% at 78% 72%, var(--gg-c2, #8f7dff) 0%, transparent 50%),
    radial-gradient(85% 85% at 22% 78%, var(--gg-c3, #45d6c8) 0%, transparent 52%),
    linear-gradient(140deg, transparent 0%, var(--gg-c4, #f97db2) 90%);
}

.${RUNTIME_CLASS}.gg-effect-plasma .${LAYER_CLASS} {
  background-image:
    linear-gradient(0deg, var(--gg-tint, transparent), var(--gg-tint, transparent)),
    radial-gradient(120% 110% at 10% 20%, var(--gg-c1, #66b3ff) 0%, transparent 60%),
    radial-gradient(115% 140% at 85% 25%, var(--gg-c2, #8f7dff) 0%, transparent 58%),
    radial-gradient(150% 130% at 30% 90%, var(--gg-c3, #45d6c8) 0%, transparent 62%),
    radial-gradient(130% 120% at 90% 85%, var(--gg-c4, #f97db2) 0%, transparent 56%);
}

.${RUNTIME_CLASS}.gg-effect-prism .${LAYER_CLASS} {
  background-image:
    linear-gradient(0deg, var(--gg-tint, transparent), var(--gg-tint, transparent)),
    linear-gradient(120deg, var(--gg-c1, #66b3ff) 0%, transparent 30%),
    linear-gradient(190deg, var(--gg-c2, #8f7dff) 10%, transparent 34%),
    linear-gradient(260deg, var(--gg-c3, #45d6c8) 20%, transparent 38%),
    radial-gradient(130% 130% at 80% 70%, var(--gg-c4, #f97db2) 0%, transparent 65%);
}

.${RUNTIME_CLASS} .${GRAIN_CLASS} {
  z-index: -1;
  opacity: var(--gg-grain, 0.08);
  mix-blend-mode: var(--gg-grain-blend, soft-light);
  background-image:
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.22), transparent 45%),
    radial-gradient(circle at 70% 65%, rgba(0, 0, 0, calc(0.2 + var(--gg-vignette, 0.2) * 0.35)), transparent 46%),
    repeating-radial-gradient(circle at 50% 50%, rgba(255, 255, 255, calc(0.06 + var(--gg-grain-motion, 0.2) * 0.03)) 0 1px, transparent 1px var(--gg-grain-size, 3px));
}

.${RUNTIME_CLASS}.${HIDDEN_CLASS} .${LAYER_CLASS} {
  will-change: auto;
}
`.trim();

  document.head.append(style);
  runtimeStyleInjected = true;
}

function createLayer(element) {
  const layer = document.createElement("div");
  layer.className = LAYER_CLASS;
  const grain = document.createElement("div");
  grain.className = GRAIN_CLASS;

  if (getComputedStyle(element).position === "static") {
    element.style.position = "relative";
  }

  element.classList.add(RUNTIME_CLASS);
  element.prepend(grain);
  element.prepend(layer);
  return { layer, grain };
}

function setEffectClass(element, effect) {
  const toDrop = Array.from(element.classList).filter((name) => name.startsWith(EFFECT_CLASS_PREFIX));
  for (const className of toDrop) {
    element.classList.remove(className);
  }
  element.classList.add(`${EFFECT_CLASS_PREFIX}${effect}`);
}

function applyCssVariables(element, config) {
  const [c1, c2, c3, c4] = config.colors;
  element.style.setProperty("--gg-c1", c1);
  element.style.setProperty("--gg-c2", c2);
  element.style.setProperty("--gg-c3", c3);
  element.style.setProperty("--gg-c4", c4);
  element.style.setProperty("--gg-opacity", String(config.opacity));
  element.style.setProperty("--gg-blur", config.blur);
  element.style.setProperty("--gg-saturation", config.saturation);
  element.style.setProperty("--gg-contrast", config.contrast);
  element.style.setProperty("--gg-brightness", config.brightness);
  element.style.setProperty("--gg-blend", config.blendMode);
  element.style.setProperty("--gg-tint", config.tint);
  element.style.setProperty("--gg-grain", String(config.grain.enabled ? config.grain.amount : 0));
  element.style.setProperty("--gg-grain-size", config.grain.size);
  element.style.setProperty("--gg-grain-blend", config.grain.blend);
  element.style.setProperty("--gg-grain-motion", String(config.grain.motion));
  element.style.setProperty("--gg-vignette", String(config.vignette));
  element.style.setProperty("--gg-inset", config.layerInset);
  element.style.borderRadius = config.radius;
  element.style.boxShadow = `0 18px 54px rgba(0,0,0,${(0.1 + config.shadow * 0.25).toFixed(3)})`;
  setEffectClass(element, config.effect);
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
  const fps = desiredFps > 0 ? Math.min(desiredFps, fpsCap || 60) : fpsCap || 60;
  return Math.max(1000 / fps, speedMs / 240);
}

function startAnimator(element, config, runtimeOptions = {}) {
  const speedMs = parseSpeed(config.speed) / config.animate.speedMultiplier;
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
    element.style.setProperty("--ggx", `${frame.x.toFixed(2)}%`);
    element.style.setProperty("--ggy", `${frame.y.toFixed(2)}%`);
    element.style.setProperty("--ggh", `${frame.hue.toFixed(2)}deg`);
    element.style.setProperty("--ggz", `${frame.z.toFixed(3)}`);
  };

  const runMainThread = () => {
    const step = (ts) => {
      if (lastTs && ts - lastTs < tickMs) {
        frameId = requestAnimationFrame(step);
        return;
      }
      lastTs = ts;
      phase += (16 / speedMs) * frameStep;
      applyFrame(computeFrame(mode, phase, driftPct, hueShift, config.intensity));
      frameId = requestAnimationFrame(step);
    };
    frameId = requestAnimationFrame(step);
  };

  const start = () => {
    if (!config.animate.enabled) {
      return;
    }
    if (threaded && !worker) {
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
        intensity: config.intensity,
        tickMs
      });
      return;
    }
    if (!frameId) {
      runMainThread();
    }
  };

  const stop = () => {
    if (worker) {
      worker.postMessage({ type: "stop" });
    }
    if (frameId) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }
  };

  const destroy = () => {
    stop();
    if (worker) {
      worker.terminate();
      worker = null;
    }
  };

  return { start, stop, destroy };
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

  return {
    hardwareConcurrency: navigator.hardwareConcurrency || 0,
    deviceMemory: navigator.deviceMemory || 0,
    prefersReducedMotion: prefersReduced
  };
}

export function createGlassGradient(target, input = {}, runtimeOptions = {}) {
  if (typeof document === "undefined") {
    throw new Error("createGlassGradient can only run in a browser environment");
  }

  injectRuntimeStyle();
  const parsed = resolveInputConfig(input);
  const hints = getRuntimeHints();
  const config = normalizeConfig(parsed, hints);
  const elements = resolveElements(target);
  const threshold = runtimeOptions.threshold ?? config.visibility.threshold;
  const rootMargin = runtimeOptions.rootMargin || config.visibility.rootMargin;
  const reduceMotion = runtimeOptions.reduceMotion ?? hints.prefersReducedMotion;

  const instances = elements.map((element) => {
    let state = runtimeState.get(element);
    if (!state) {
      state = createLayer(element);
      runtimeState.set(element, state);
    }

    const liveConfig = reduceMotion
      ? normalizeConfig({ ...config, animate: { ...config.animate, enabled: false } }, hints)
      : config;

    applyCssVariables(element, liveConfig);
    const animator = startAnimator(element, liveConfig, runtimeOptions);
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

    return {
      element,
      config: liveConfig,
      destroy() {
        observer.disconnect();
        animator.destroy();
        if (state.layer?.isConnected) {
          state.layer.remove();
        }
        if (state.grain?.isConnected) {
          state.grain.remove();
        }
        element.classList.remove(RUNTIME_CLASS, HIDDEN_CLASS);
        runtimeState.delete(element);
      },
      update(nextInput = {}) {
        const nextParsed = resolveInputConfig(nextInput);
        const nextConfig = normalizeConfig({ ...liveConfig, ...nextParsed }, hints);
        applyCssVariables(element, nextConfig);
      }
    };
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
    "--gg-opacity": String(config.opacity),
    "--gg-blur": config.blur,
    "--gg-saturation": config.saturation,
    "--gg-contrast": config.contrast,
    "--gg-brightness": config.brightness,
    "--gg-grain": String(config.grain.enabled ? config.grain.amount : 0),
    "--gg-grain-size": config.grain.size,
    "--gg-grain-blend": config.grain.blend,
    "--gg-grain-motion": String(config.grain.motion),
    "--gg-vignette": String(config.vignette),
    "--gg-inset": config.layerInset,
    "--gg-tint": config.tint,
    borderRadius: toCssUnit(config.radius, "18px")
  };
}
