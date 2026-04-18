export const PALETTES = {
  aurora: ["#66b3ff", "#8f7dff", "#45d6c8", "#f97db2"],
  ocean: ["#1f6feb", "#2ea8ff", "#23c9a9", "#7ce2ff"],
  sunset: ["#ff8a5c", "#ff5f6d", "#ffc371", "#fca5f1"],
  neon: ["#4df3ff", "#00ffa3", "#9f7aea", "#ff4ecd"],
  mono: ["#b7bcc8", "#8a93a6", "#677086", "#d7dbe5"],
  ember: ["#ff7b72", "#ff9b50", "#ffd28e", "#ff5d8f"],
  forest: ["#1fa971", "#55d48f", "#2cb67d", "#8ce99a"]
};

export const PERFORMANCE_PRESETS = {
  auto: { blurScale: 1, grainScale: 1, layerInset: "-22%", frameStep: 1, fpsCap: 60 },
  quality: { blurScale: 1.16, grainScale: 1.2, layerInset: "-25%", frameStep: 1, fpsCap: 60 },
  balanced: { blurScale: 1, grainScale: 1, layerInset: "-22%", frameStep: 1, fpsCap: 45 },
  eco: { blurScale: 0.84, grainScale: 0.64, layerInset: "-16%", frameStep: 2, fpsCap: 30 },
  potato: { blurScale: 0.72, grainScale: 0.5, layerInset: "-12%", frameStep: 3, fpsCap: 24 }
};

export const PRESETS = {
  default: {},
  cinematic: {
    palette: "aurora",
    effect: "prism",
    intensity: 1.2,
    frost: 0.85,
    vignette: 0.32,
    shadow: 0.34,
    animate: { mode: "orbit", hueShift: 42, drift: "10%" },
    grain: { amount: 0.1, size: "2px" }
  },
  frosted: {
    palette: "mono",
    effect: "mesh",
    monochrome: true,
    frost: 1.25,
    intensity: 1.05,
    brightness: "108%",
    grain: { amount: 0.14, size: "2px" }
  },
  soft: {
    palette: "ocean",
    effect: "aurora",
    intensity: 0.86,
    frost: 0.5,
    animate: { mode: "wave", hueShift: 18, drift: "6%" },
    grain: { amount: 0.05, size: "4px" }
  }
};

export const DEFAULT_CONFIG = {
  selector: ".glass-gradient",
  preset: "default",
  palette: "aurora",
  effect: "mesh",
  performance: "auto",
  intensity: 1,
  frost: 0.62,
  vignette: 0.22,
  shadow: 0.2,
  tint: "transparent",
  blur: "48px",
  opacity: 0.74,
  saturation: "138%",
  contrast: "109%",
  brightness: "102%",
  radius: "18px",
  blendMode: "normal",
  monochrome: false,
  speed: "18s",
  colors: PALETTES.aurora,
  visibility: {
    rootMargin: "120px 0px",
    threshold: 0.08
  },
  grain: {
    enabled: true,
    amount: 0.08,
    size: "3px",
    blend: "soft-light",
    motion: 0.2
  },
  animate: {
    enabled: true,
    mode: "wave",
    hueShift: 30,
    drift: "8%",
    speedMultiplier: 1,
    fps: 0,
    easing: "ease-in-out"
  }
};

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function toCssUnit(value, fallback) {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }
  if (typeof value === "number") {
    return `${value}px`;
  }
  return String(value).trim();
}

export function toPercentUnit(value, fallback) {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }
  if (typeof value === "number") {
    return `${value}%`;
  }
  const text = String(value).trim();
  if (/^-?\d+(\.\d+)?$/.test(text)) {
    return `${text}%`;
  }
  return text;
}

export function toNumber(value, fallback) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number.parseFloat(value.trim());
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }
  return fallback;
}

export function toBoolean(value, fallback) {
  if (typeof value === "boolean") {
    return value;
  }
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true" || normalized === "on" || normalized === "yes") {
      return true;
    }
    if (normalized === "false" || normalized === "off" || normalized === "no") {
      return false;
    }
  }
  return fallback;
}

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }
  if (typeof value === "string" && value.trim() !== "") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function pickPalette(name) {
  if (!name) {
    return null;
  }
  const key = String(name).toLowerCase();
  return PALETTES[key] || null;
}

function resolvePreset(config) {
  const key = String(config.preset || DEFAULT_CONFIG.preset).toLowerCase();
  return PRESETS[key] || PRESETS.default;
}

function mergeDeep(base, extra) {
  const out = { ...base };
  for (const [key, value] of Object.entries(extra || {})) {
    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      typeof out[key] === "object" &&
      out[key] !== null &&
      !Array.isArray(out[key])
    ) {
      out[key] = mergeDeep(out[key], value);
    } else {
      out[key] = value;
    }
  }
  return out;
}

export function resolveColors(config) {
  const paletteColors = pickPalette(config.palette);
  const list = normalizeList(config.colors);
  const source = list.length > 0 ? list : paletteColors || DEFAULT_CONFIG.colors;
  if (source.length >= 4) {
    return source.slice(0, 4);
  }
  return [...source, ...source, ...source, ...source].slice(0, 4);
}

export function normalizeConfig(input, runtimeHints = {}) {
  const raw = typeof input === "object" && input !== null ? input : {};
  const preset = resolvePreset(raw);
  const mergedRaw = mergeDeep(mergeDeep(DEFAULT_CONFIG, preset), raw);

  const rawAnimateInput = typeof raw.animate === "object" && raw.animate !== null ? raw.animate : {};
  const animateInput = typeof mergedRaw.animate === "object" && mergedRaw.animate !== null ? mergedRaw.animate : {};
  const grainInput = typeof mergedRaw.grain === "object" && mergedRaw.grain !== null ? mergedRaw.grain : {};
  const visibilityInput = typeof mergedRaw.visibility === "object" && mergedRaw.visibility !== null ? mergedRaw.visibility : {};

  const performanceKey = String(mergedRaw.performance || DEFAULT_CONFIG.performance).toLowerCase();
  let performance = PERFORMANCE_PRESETS[performanceKey] ? performanceKey : DEFAULT_CONFIG.performance;

  if (performance === "auto") {
    const isLowEnd =
      (runtimeHints.hardwareConcurrency && runtimeHints.hardwareConcurrency <= 4) ||
      (runtimeHints.deviceMemory && runtimeHints.deviceMemory <= 4);
    if (isLowEnd) {
      performance = "eco";
    }
  }

  const effect = String(mergedRaw.effect || DEFAULT_CONFIG.effect).toLowerCase();
  const palette = String(mergedRaw.palette || DEFAULT_CONFIG.palette).toLowerCase();
  const intensity = clamp(toNumber(mergedRaw.intensity, DEFAULT_CONFIG.intensity), 0.3, 2.4);
  const frost = clamp(toNumber(mergedRaw.frost, DEFAULT_CONFIG.frost), 0, 2.2);
  const colors = resolveColors({ ...mergedRaw, palette });
  const profile = PERFORMANCE_PRESETS[performance];
  const blurBase = toNumber(mergedRaw.blur, toNumber(DEFAULT_CONFIG.blur, 48));
  const monochrome = toBoolean(mergedRaw.monochrome, DEFAULT_CONFIG.monochrome);
  const grainAmount = clamp(
    toNumber(grainInput.amount ?? mergedRaw.grainAmount, DEFAULT_CONFIG.grain.amount) * profile.grainScale,
    0,
    0.7
  );

  const driftAlias =
    rawAnimateInput.drift ?? rawAnimateInput.dfirt ?? animateInput.drift ?? DEFAULT_CONFIG.animate.drift;

  return {
    selector: String(mergedRaw.selector || DEFAULT_CONFIG.selector),
    preset: String(mergedRaw.preset || DEFAULT_CONFIG.preset).toLowerCase(),
    palette,
    effect,
    performance,
    intensity,
    frost,
    vignette: clamp(toNumber(mergedRaw.vignette, DEFAULT_CONFIG.vignette), 0, 1),
    shadow: clamp(toNumber(mergedRaw.shadow, DEFAULT_CONFIG.shadow), 0, 1),
    tint: String(mergedRaw.tint || DEFAULT_CONFIG.tint),
    blur: toCssUnit(blurBase * profile.blurScale * (0.7 + frost * 0.52), DEFAULT_CONFIG.blur),
    opacity: clamp(toNumber(mergedRaw.opacity, DEFAULT_CONFIG.opacity) * (0.68 + intensity * 0.24), 0, 1),
    saturation: monochrome
      ? "0%"
      : toPercentUnit(toNumber(mergedRaw.saturation, 138) * (0.82 + intensity * 0.22), DEFAULT_CONFIG.saturation),
    contrast: toPercentUnit(toNumber(mergedRaw.contrast, 109) * (0.9 + intensity * 0.12), DEFAULT_CONFIG.contrast),
    brightness: toPercentUnit(toNumber(mergedRaw.brightness, 102), DEFAULT_CONFIG.brightness),
    radius: toCssUnit(mergedRaw.radius, DEFAULT_CONFIG.radius),
    blendMode: String(mergedRaw.blendMode || DEFAULT_CONFIG.blendMode),
    monochrome,
    speed: toCssUnit(mergedRaw.speed, DEFAULT_CONFIG.speed),
    colors,
    layerInset: mergedRaw.layerInset ? String(mergedRaw.layerInset) : profile.layerInset,
    frameStep: profile.frameStep,
    fpsCap: profile.fpsCap,
    visibility: {
      rootMargin: String(visibilityInput.rootMargin || DEFAULT_CONFIG.visibility.rootMargin),
      threshold: clamp(toNumber(visibilityInput.threshold, DEFAULT_CONFIG.visibility.threshold), 0, 1)
    },
    grain: {
      enabled: toBoolean(grainInput.enabled, DEFAULT_CONFIG.grain.enabled),
      amount: grainAmount,
      size: toCssUnit(grainInput.size, DEFAULT_CONFIG.grain.size),
      blend: String(grainInput.blend || DEFAULT_CONFIG.grain.blend),
      motion: clamp(toNumber(grainInput.motion, DEFAULT_CONFIG.grain.motion), 0, 2)
    },
    animate: {
      enabled: toBoolean(animateInput.enabled, DEFAULT_CONFIG.animate.enabled),
      mode: String(animateInput.mode || DEFAULT_CONFIG.animate.mode).toLowerCase(),
      hueShift: clamp(toNumber(animateInput.hueShift, DEFAULT_CONFIG.animate.hueShift), 0, 360),
      drift: toCssUnit(driftAlias, DEFAULT_CONFIG.animate.drift),
      speedMultiplier: clamp(toNumber(animateInput.speedMultiplier, DEFAULT_CONFIG.animate.speedMultiplier), 0.2, 4),
      fps: clamp(toNumber(animateInput.fps, DEFAULT_CONFIG.animate.fps), 0, 120),
      easing: String(animateInput.easing || DEFAULT_CONFIG.animate.easing)
    }
  };
}
