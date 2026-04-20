export const PALETTES = {
  aurora: ["#66b3ff", "#8f7dff", "#45d6c8", "#f97db2"],
  ocean: ["#1f6feb", "#2ea8ff", "#23c9a9", "#7ce2ff"],
  sunset: ["#ff8a5c", "#ff5f6d", "#ffc371", "#fca5f1"],
  mono: ["#b7bcc8", "#8a93a6", "#677086", "#d7dbe5"],
  ember: ["#ff7b72", "#ff9b50", "#ffd28e", "#ff5d8f"],
  forest: ["#1fa971", "#55d48f", "#2cb67d", "#8ce99a"],
  studio: ["#5b8cff", "#4c6fff", "#35c4c8", "#9b6bff"],
  opaline: ["#8bc4ff", "#7fa4ff", "#8ff0db", "#ffd0e1"],
  graphite: ["#7d8799", "#5a667a", "#94a0b8", "#c7cedc"]
};

export const PERFORMANCE_PRESETS = {
  auto: { blurScale: 1, glassBlurScale: 1, grainScale: 1, layerInset: "-22%", frameStep: 1, fpsCap: 60, animationEnabled: true },
  quality: { blurScale: 1.16, glassBlurScale: 1.1, grainScale: 1.18, layerInset: "-25%", frameStep: 1, fpsCap: 60, animationEnabled: true },
  balanced: { blurScale: 1, glassBlurScale: 1, grainScale: 1, layerInset: "-20%", frameStep: 1, fpsCap: 45, animationEnabled: true },
  eco: { blurScale: 0.82, glassBlurScale: 0.86, grainScale: 0.64, layerInset: "-16%", frameStep: 2, fpsCap: 30, animationEnabled: true },
  potato: { blurScale: 0.68, glassBlurScale: 0.72, grainScale: 0.45, layerInset: "-12%", frameStep: 3, fpsCap: 24, animationEnabled: true },
  static: { blurScale: 0.88, glassBlurScale: 0.92, grainScale: 0.54, layerInset: "-12%", frameStep: 4, fpsCap: 0, animationEnabled: false }
};

export const MER_TIERS = {
  ultra: { performance: "quality", reason: "high-capability-device", minScore: 86 },
  stable: { performance: "balanced", reason: "balanced-device", minScore: 66 },
  reduced: { performance: "eco", reason: "constrained-device", minScore: 38 },
  critical: { performance: "potato", reason: "low-end-device", minScore: 24 },
  static: { performance: "static", reason: "motion-or-data-reduction", minScore: 0 }
};

export const EFFECT_COMPLEXITY = {
  mesh: 1,
  aurora: 1.08,
  spotlight: 0.94,
  plasma: 1.26,
  prism: 1.18,
  halo: 1.08,
  ribbon: 1.12,
  bloom: 1.02,
  caustic: 1.34,
  liquid: 1.38,
  nebula: 1.3,
  iridescent: 1.28,
  conic: 1.16,
  noise: 1.1
};

export const PRESETS = {
  default: {},
  cinematic: {
    palette: "aurora",
    effect: "prism",
    intensity: 1.2,
    frost: 0.9,
    vignette: 0.3,
    shadow: 0.34,
    gradient: {
      opacity: 0.82,
      tint: "rgba(255,255,255,0.03)",
      blendMode: "screen"
    },
    glass: {
      fill: "rgba(17,21,34,0.26)",
      fillSecondary: "rgba(255,255,255,0.08)"
    },
    animate: { mode: "orbit", hueShift: 42, drift: "10%" },
    grain: { amount: 0.1, size: "2px" },
    shine: { opacity: 0.26 }
  },
  frosted: {
    palette: "mono",
    effect: "mesh",
    monochrome: true,
    contrastMode: "safe",
    intensity: 0.88,
    frost: 1.28,
    gradient: {
      enabled: false,
      opacity: 0
    },
    glass: {
      fill: "rgba(22,26,34,0.54)",
      fillSecondary: "rgba(255,255,255,0.12)",
      highlight: 0.22,
      innerGlow: 0.18,
      shadow: 0.22
    },
    grain: { amount: 0.12, size: "2px" },
    shine: { opacity: 0.14 }
  },
  soft: {
    palette: "ocean",
    effect: "aurora",
    intensity: 0.86,
    frost: 0.58,
    gradient: {
      opacity: 0.66,
      tint: "rgba(255,255,255,0.02)"
    },
    animate: { mode: "wave", hueShift: 18, drift: "6%" },
    grain: { amount: 0.05, size: "4px" },
    shine: { opacity: 0.16 }
  },
  editor: {
    palette: "studio",
    effect: "ribbon",
    contrastMode: "safe",
    performance: "balanced",
    intensity: 0.98,
    frost: 0.94,
    speed: "22s",
    vignette: 0.18,
    shadow: 0.3,
    gradient: {
      opacity: 0.44,
      tint: "rgba(11,15,24,0.12)",
      blendMode: "screen"
    },
    glass: {
      fill: "rgba(18,23,33,0.66)",
      fillSecondary: "rgba(255,255,255,0.05)",
      blur: 20,
      highlight: 0.16,
      strokeOpacity: 0.24,
      shadow: 0.3
    },
    animate: { mode: "wave", hueShift: 12, drift: "4%", fps: 30 },
    grain: { amount: 0.03, size: "4px" },
    shine: { opacity: 0.08 }
  },
  crystal: {
    palette: "opaline",
    effect: "halo",
    intensity: 1.08,
    frost: 1.08,
    gradient: {
      opacity: 0.72,
      tint: "rgba(255,255,255,0.04)",
      blendMode: "screen"
    },
    glass: {
      fill: "rgba(28,32,44,0.32)",
      fillSecondary: "rgba(255,255,255,0.12)",
      highlight: 0.24,
      innerGlow: 0.2
    },
    grain: { amount: 0.06, size: "2px" },
    shine: { opacity: 0.22 }
  },
  smoke: {
    palette: "graphite",
    effect: "bloom",
    contrastMode: "safe",
    intensity: 0.72,
    frost: 1.16,
    gradient: {
      opacity: 0.34,
      tint: "rgba(11,15,24,0.16)",
      blendMode: "normal"
    },
    glass: {
      fill: "rgba(17,20,27,0.72)",
      fillSecondary: "rgba(255,255,255,0.04)",
      blur: 24,
      highlight: 0.14,
      shadow: 0.36
    },
    animate: { enabled: false },
    grain: { amount: 0.04, size: "5px" },
    shine: { opacity: 0.06 }
  }
};

export const RECIPES = {
  panel: {
    mode: "surface",
    preset: "editor",
    strength: "medium",
    contrastMode: "safe",
    performance: "balanced",
    radius: "16px"
  },
  navbar: {
    mode: "frost",
    strength: "soft",
    contrastMode: "safe",
    performance: "balanced",
    radius: "999px",
    frost: 0.92,
    grain: { amount: 0.03, size: "4px" },
    shine: { opacity: 0.08 },
    glass: {
      blur: 18,
      fill: "rgba(19,24,35,0.56)",
      fillSecondary: "rgba(255,255,255,0.08)",
      highlight: 0.14,
      shadow: 0.18
    }
  },
  sidebar: {
    mode: "frost",
    strength: "strong",
    contrastMode: "safe",
    performance: "static",
    radius: "20px",
    frost: 1.12,
    grain: { amount: 0.04, size: "4px" },
    shine: { opacity: 0.06 },
    glass: {
      blur: 26,
      fill: "rgba(16,20,28,0.78)",
      fillSecondary: "rgba(255,255,255,0.04)",
      highlight: 0.12,
      shadow: 0.3
    }
  },
  modal: {
    mode: "surface",
    preset: "crystal",
    strength: "strong",
    contrastMode: "safe",
    performance: "balanced",
    radius: "24px",
    shadow: 0.34,
    glass: {
      blur: 24,
      highlight: 0.22
    }
  },
  toolbar: {
    mode: "surface",
    preset: "editor",
    strength: "soft",
    contrastMode: "safe",
    performance: "eco",
    radius: "14px",
    grain: { amount: 0.02, size: "4px" },
    shine: { opacity: 0.05 }
  },
  badge: {
    mode: "frost",
    strength: "soft",
    contrastMode: "safe",
    performance: "static",
    radius: "999px",
    frost: 0.82,
    grain: { enabled: false },
    shine: { opacity: 0.04 },
    glass: {
      blur: 14,
      fill: "rgba(17,22,31,0.66)",
      fillSecondary: "rgba(255,255,255,0.06)",
      highlight: 0.1,
      shadow: 0.12
    }
  },
  hero: {
    mode: "surface",
    preset: "cinematic",
    strength: "strong",
    performance: "quality",
    radius: "28px",
    shadow: 0.36
  },
  card: {
    mode: "surface",
    preset: "soft",
    strength: "medium",
    contrastMode: "safe",
    performance: "balanced",
    radius: "20px",
    interactive: { enabled: true, glare: 0.1 }
  },
  button: {
    mode: "frost",
    strength: "soft",
    contrastMode: "safe",
    performance: "eco",
    radius: "12px",
    grain: { amount: 0.015, size: "4px" },
    shine: { opacity: 0.05 },
    interactive: { enabled: true, glare: 0.1 },
    glass: {
      blur: 14,
      fill: "rgba(19,24,35,0.58)",
      fillSecondary: "rgba(255,255,255,0.06)",
      highlight: 0.1,
      shadow: 0.12
    }
  },
  popover: {
    mode: "frost",
    strength: "medium",
    contrastMode: "safe",
    performance: "balanced",
    radius: "18px",
    shadow: 0.28,
    glass: {
      blur: 22,
      fill: "rgba(18,23,33,0.72)",
      fillSecondary: "rgba(255,255,255,0.06)",
      highlight: 0.14
    }
  },
  dock: {
    mode: "surface",
    preset: "crystal",
    strength: "medium",
    contrastMode: "safe",
    performance: "balanced",
    radius: "999px",
    interactive: { enabled: true, glare: 0.12 },
    grain: { amount: 0.025, size: "4px" }
  },
  input: {
    mode: "frost",
    strength: "soft",
    contrastMode: "safe",
    performance: "static",
    radius: "12px",
    grain: { enabled: false },
    shine: { opacity: 0.03 },
    glass: {
      blur: 12,
      fill: "rgba(17,22,31,0.74)",
      fillSecondary: "rgba(255,255,255,0.04)",
      highlight: 0.08,
      shadow: 0.08
    }
  },
  workspace: {
    mode: "surface",
    preset: "editor",
    strength: "medium",
    contrastMode: "safe",
    performance: "static",
    radius: "22px",
    shadow: 0.28,
    grain: { amount: 0.025, size: "4px" },
    shine: { opacity: 0.05 },
    glass: {
      blur: 22,
      fill: "rgba(15,19,27,0.78)",
      fillSecondary: "rgba(255,255,255,0.04)",
      highlight: 0.1,
      shadow: 0.24
    }
  },
  form: {
    mode: "frost",
    preset: "smoke",
    strength: "soft",
    contrastMode: "safe",
    performance: "static",
    radius: "18px",
    grain: { enabled: false },
    shine: { opacity: 0.04 },
    glass: {
      blur: 16,
      fill: "rgba(17,22,31,0.8)",
      fillSecondary: "rgba(255,255,255,0.05)",
      highlight: 0.08,
      innerGlow: 0.06,
      shadow: 0.12
    }
  },
  "command-palette": {
    mode: "surface",
    preset: "editor",
    strength: "strong",
    contrastMode: "safe",
    performance: "balanced",
    radius: "24px",
    shadow: 0.34,
    interactive: { enabled: true, glare: 0.12 },
    glass: {
      blur: 24,
      fill: "rgba(16,20,29,0.82)",
      fillSecondary: "rgba(255,255,255,0.06)",
      highlight: 0.16,
      innerGlow: 0.12,
      shadow: 0.28
    }
  },
  dialog: {
    mode: "surface",
    preset: "crystal",
    strength: "strong",
    contrastMode: "safe",
    performance: "balanced",
    radius: "26px",
    shadow: 0.36,
    glass: {
      blur: 24,
      fill: "rgba(18,23,33,0.7)",
      fillSecondary: "rgba(255,255,255,0.08)",
      highlight: 0.18,
      innerGlow: 0.14,
      shadow: 0.3
    }
  },
  table: {
    mode: "frost",
    preset: "smoke",
    strength: "soft",
    contrastMode: "safe",
    performance: "static",
    radius: "16px",
    grain: { enabled: false },
    shine: { opacity: 0.02 },
    glass: {
      blur: 14,
      fill: "rgba(15,19,27,0.84)",
      fillSecondary: "rgba(255,255,255,0.035)",
      highlight: 0.06,
      innerGlow: 0.04,
      shadow: 0.1
    }
  },
  inspector: {
    mode: "surface",
    preset: "editor",
    strength: "medium",
    contrastMode: "safe",
    performance: "static",
    radius: "18px",
    shadow: 0.24,
    grain: { amount: 0.02, size: "4px" },
    shine: { opacity: 0.04 },
    glass: {
      blur: 20,
      fill: "rgba(14,18,26,0.82)",
      fillSecondary: "rgba(255,255,255,0.035)",
      highlight: 0.08,
      innerGlow: 0.06,
      shadow: 0.22
    }
  },
  terminal: {
    mode: "frost",
    preset: "smoke",
    strength: "strong",
    contrastMode: "safe",
    performance: "static",
    radius: "18px",
    monochrome: true,
    grain: { amount: 0.025, size: "3px" },
    shine: { opacity: 0.02 },
    glass: {
      blur: 18,
      fill: "rgba(10,14,20,0.88)",
      fillSecondary: "rgba(255,255,255,0.025)",
      highlight: 0.05,
      innerGlow: 0.04,
      shadow: 0.24
    }
  },
  "command-bar": {
    mode: "frost",
    preset: "editor",
    strength: "medium",
    contrastMode: "safe",
    performance: "eco",
    radius: "14px",
    grain: { amount: 0.015, size: "4px" },
    shine: { opacity: 0.04 },
    interactive: { enabled: true, glare: 0.08 },
    glass: {
      blur: 16,
      fill: "rgba(17,22,31,0.72)",
      fillSecondary: "rgba(255,255,255,0.05)",
      highlight: 0.09,
      innerGlow: 0.05,
      shadow: 0.14
    }
  }
};

export const RECIPE_CONTRACTS = {
  panel: {
    name: "panel",
    role: "content-shell",
    density: "comfortable",
    emphasis: "balanced",
    interaction: "passive",
    recommendedMode: "surface",
    recommendedStrength: "medium",
    recommendedPerformance: "balanced"
  },
  navbar: {
    name: "navbar",
    role: "navigation",
    density: "compact",
    emphasis: "subtle",
    interaction: "passive",
    recommendedMode: "frost",
    recommendedStrength: "soft",
    recommendedPerformance: "balanced"
  },
  sidebar: {
    name: "sidebar",
    role: "navigation-shell",
    density: "dense",
    emphasis: "balanced",
    interaction: "passive",
    recommendedMode: "frost",
    recommendedStrength: "strong",
    recommendedPerformance: "static"
  },
  modal: {
    name: "modal",
    role: "overlay",
    density: "comfortable",
    emphasis: "strong",
    interaction: "focus",
    recommendedMode: "surface",
    recommendedStrength: "strong",
    recommendedPerformance: "balanced"
  },
  toolbar: {
    name: "toolbar",
    role: "action-strip",
    density: "compact",
    emphasis: "subtle",
    interaction: "interactive",
    recommendedMode: "surface",
    recommendedStrength: "soft",
    recommendedPerformance: "eco"
  },
  badge: {
    name: "badge",
    role: "status",
    density: "compact",
    emphasis: "subtle",
    interaction: "passive",
    recommendedMode: "frost",
    recommendedStrength: "soft",
    recommendedPerformance: "static"
  },
  hero: {
    name: "hero",
    role: "signature-surface",
    density: "airy",
    emphasis: "strong",
    interaction: "immersive",
    recommendedMode: "surface",
    recommendedStrength: "strong",
    recommendedPerformance: "quality"
  },
  card: {
    name: "card",
    role: "content-card",
    density: "comfortable",
    emphasis: "balanced",
    interaction: "interactive",
    recommendedMode: "surface",
    recommendedStrength: "medium",
    recommendedPerformance: "balanced"
  },
  button: {
    name: "button",
    role: "action-control",
    density: "compact",
    emphasis: "subtle",
    interaction: "interactive",
    recommendedMode: "frost",
    recommendedStrength: "soft",
    recommendedPerformance: "eco"
  },
  popover: {
    name: "popover",
    role: "overlay-popover",
    density: "comfortable",
    emphasis: "balanced",
    interaction: "focus",
    recommendedMode: "frost",
    recommendedStrength: "medium",
    recommendedPerformance: "balanced"
  },
  dock: {
    name: "dock",
    role: "launcher",
    density: "compact",
    emphasis: "balanced",
    interaction: "interactive",
    recommendedMode: "surface",
    recommendedStrength: "medium",
    recommendedPerformance: "balanced"
  },
  input: {
    name: "input",
    role: "field-shell",
    density: "compact",
    emphasis: "subtle",
    interaction: "focus",
    recommendedMode: "frost",
    recommendedStrength: "soft",
    recommendedPerformance: "static"
  },
  workspace: {
    name: "workspace",
    role: "workspace-shell",
    density: "dense",
    emphasis: "balanced",
    interaction: "focus",
    recommendedMode: "surface",
    recommendedStrength: "medium",
    recommendedPerformance: "static"
  },
  form: {
    name: "form",
    role: "form-shell",
    density: "comfortable",
    emphasis: "subtle",
    interaction: "focus",
    recommendedMode: "frost",
    recommendedStrength: "soft",
    recommendedPerformance: "static"
  },
  "command-palette": {
    name: "command-palette",
    role: "command-center",
    density: "comfortable",
    emphasis: "strong",
    interaction: "interactive",
    recommendedMode: "surface",
    recommendedStrength: "strong",
    recommendedPerformance: "balanced"
  },
  dialog: {
    name: "dialog",
    role: "dialog-shell",
    density: "comfortable",
    emphasis: "strong",
    interaction: "focus",
    recommendedMode: "surface",
    recommendedStrength: "strong",
    recommendedPerformance: "balanced"
  },
  table: {
    name: "table",
    role: "data-grid",
    density: "dense",
    emphasis: "subtle",
    interaction: "scan",
    recommendedMode: "frost",
    recommendedStrength: "soft",
    recommendedPerformance: "static"
  },
  inspector: {
    name: "inspector",
    role: "inspector-panel",
    density: "dense",
    emphasis: "balanced",
    interaction: "focus",
    recommendedMode: "surface",
    recommendedStrength: "medium",
    recommendedPerformance: "static"
  },
  terminal: {
    name: "terminal",
    role: "terminal-shell",
    density: "dense",
    emphasis: "strong",
    interaction: "focus",
    recommendedMode: "frost",
    recommendedStrength: "strong",
    recommendedPerformance: "static"
  },
  "command-bar": {
    name: "command-bar",
    role: "command-strip",
    density: "compact",
    emphasis: "balanced",
    interaction: "interactive",
    recommendedMode: "frost",
    recommendedStrength: "medium",
    recommendedPerformance: "eco"
  }
};

export const DEFAULT_CONFIG = {
  selector: ".glass-gradient",
  preset: "default",
  recipe: "",
  mode: "surface",
  strength: "medium",
  contrastMode: "balanced",
  palette: "aurora",
  effect: "mesh",
  performance: "auto",
  intensity: 1,
  frost: 0.62,
  vignette: 0.22,
  shadow: 0.2,
  tint: "rgba(255,255,255,0.02)",
  blur: 48,
  opacity: 0.74,
  saturation: "138%",
  contrast: "109%",
  brightness: "102%",
  radius: "18px",
  blendMode: "normal",
  monochrome: false,
  speed: "18s",
  colors: PALETTES.aurora,
  layerInset: "-22%",
  zIndex: "auto",
  isolate: true,
  mainFilter: "standard",
  monitoring: {
    enabled: true,
    engine: "MER",
    strategy: "auto",
    minPerformance: "static"
  },
  responsive: {},
  scheme: {},
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
  shine: {
    enabled: true,
    opacity: 0.18,
    angle: "135deg",
    blend: "screen"
  },
  interactive: {
    enabled: false,
    glare: 0.14,
    radius: "42%",
    blend: "screen"
  },
  animate: {
    enabled: true,
    mode: "wave",
    hueShift: 30,
    drift: "8%",
    speedMultiplier: 1,
    fps: 0,
    easing: "ease-in-out"
  },
  engineUp: {
    enabled: false,
    duration: "",
    easing: "",
    direction: "alternate",
    iteration: "infinite",
    fillMode: "both",
    x: "2%",
    y: "1.4%",
    scale: 1.08,
    rotate: "0deg",
    opacity: "",
    blur: "",
    brightness: "",
    saturation: "",
    contrast: "",
    hueRotate: "",
    frames: []
  },
  motionBlurrin: {
    enabled: false,
    layers: [],
    blur: 20,
    openness: 0.4,
    edgeFade: 0.2,
    opacity: 0.42,
    blend: "screen",
    direction: "right",
    duration: "18s",
    easing: "ease-in-out"
  },
  gradient: {
    enabled: true,
    palette: "aurora",
    effect: "mesh",
    intensity: 1,
    opacity: 0.74,
    tint: "rgba(255,255,255,0.02)",
    blur: 48,
    saturation: "138%",
    contrast: "109%",
    brightness: "102%",
    blendMode: "normal",
    inset: "-22%"
  },
  glass: {
    enabled: true,
    frost: 0.62,
    blur: 18,
    saturation: "155%",
    contrast: "112%",
    brightness: "104%",
    opacity: 1,
    fill: "rgba(20,24,34,0.24)",
    fillSecondary: "rgba(255,255,255,0.07)",
    fallbackFill: "rgba(20,24,34,0.42)",
    fallbackSecondary: "rgba(255,255,255,0.09)",
    fillAngle: "180deg",
    strokeWidth: "1px",
    strokeOpacity: 0.18,
    strokeColor: "rgba(255,255,255,0.18)",
    highlight: 0.16,
    innerGlow: 0.14,
    shadow: 0.2,
    mainFilter: "standard"
  }
};

const VALID_MODES = new Set(["surface", "gradient", "frost"]);
const VALID_STRENGTHS = new Set(["soft", "medium", "strong"]);
const VALID_CONTRAST_MODES = new Set(["balanced", "safe"]);
const VALID_EFFECTS = new Set(Object.keys(EFFECT_COMPLEXITY));
const VALID_ANIMATE_MODES = new Set(["wave", "pulse", "orbit"]);
const VALID_MAIN_FILTERS = new Set(["standard", "none", "blur-filters"]);
const VALID_MOTION_DIRECTIONS = new Set(["right", "left", "up", "down", "diagonal", "drift", "orbit", "liquid"]);

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

function asObject(value) {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value;
  }
  if (typeof value === "boolean") {
    return { enabled: value };
  }
  return {};
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

function resolveRecipe(config) {
  const key = String(config.recipe || "").toLowerCase();
  return RECIPES[key] || {};
}

export function getRecipeContract(recipe, fallbackConfig = {}) {
  const key = String(recipe || fallbackConfig.recipe || "").toLowerCase();
  if (RECIPE_CONTRACTS[key]) {
    return RECIPE_CONTRACTS[key];
  }
  return {
    name: key || "custom",
    role: key ? "custom-surface" : "unscoped-surface",
    density: "comfortable",
    emphasis: "balanced",
    interaction: "passive",
    recommendedMode: String(fallbackConfig.mode || DEFAULT_CONFIG.mode),
    recommendedStrength: String(fallbackConfig.strength || DEFAULT_CONFIG.strength),
    recommendedPerformance: String(fallbackConfig.performance || DEFAULT_CONFIG.performance)
  };
}

export function mergeDeep(base, extra) {
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

function toAlpha(value, fallback) {
  return clamp(toNumber(value, fallback), 0, 1);
}

function resolveMode(mode, gradientEnabled, glassEnabled) {
  const candidate = String(mode || DEFAULT_CONFIG.mode).toLowerCase();
  if (VALID_MODES.has(candidate)) {
    return candidate;
  }
  if (gradientEnabled && !glassEnabled) {
    return "gradient";
  }
  if (!gradientEnabled && glassEnabled) {
    return "frost";
  }
  return DEFAULT_CONFIG.mode;
}

function resolveTextMode(value) {
  const candidate = String(value || DEFAULT_CONFIG.contrastMode).toLowerCase();
  return VALID_CONTRAST_MODES.has(candidate) ? candidate : DEFAULT_CONFIG.contrastMode;
}

function resolveStrength(value) {
  const candidate = String(value || DEFAULT_CONFIG.strength).toLowerCase();
  return VALID_STRENGTHS.has(candidate) ? candidate : DEFAULT_CONFIG.strength;
}

function resolveMainFilter(value) {
  const candidate = String(value || DEFAULT_CONFIG.mainFilter)
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();
  return VALID_MAIN_FILTERS.has(candidate) ? candidate : DEFAULT_CONFIG.mainFilter;
}

function normalizeZIndex(value) {
  if (value === undefined || value === null || value === "") {
    return DEFAULT_CONFIG.zIndex;
  }
  if (typeof value === "number" && Number.isFinite(value)) {
    return String(value);
  }
  return String(value).trim();
}

function firstDefined(...values) {
  for (const value of values) {
    if (value !== undefined) {
      return value;
    }
  }
  return undefined;
}

function normalizeMotionDirection(value, fallback = "right") {
  const candidate = String(value || fallback)
    .trim()
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();
  return VALID_MOTION_DIRECTIONS.has(candidate) ? candidate : fallback;
}

function normalizeEngineUpFrames(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((frame) => typeof frame === "object" && frame !== null && !Array.isArray(frame))
    .map((frame, index) => ({
      at: String(frame.at || frame.offset || `${Math.round((index / Math.max(1, value.length - 1)) * 100)}%`),
      x: toCssUnit(frame.x ?? frame.translateX, "0%"),
      y: toCssUnit(frame.y ?? frame.translateY, "0%"),
      scale: clamp(toNumber(frame.scale, 1), 0.2, 3),
      rotate: toCssUnit(frame.rotate, "0deg"),
      opacity: frame.opacity === undefined ? "" : String(clamp(toNumber(frame.opacity, 1), 0, 1)),
      blur: frame.blur === undefined ? "" : toCssUnit(frame.blur, "0px"),
      brightness: frame.brightness === undefined ? "" : toPercentUnit(frame.brightness, "100%"),
      saturation: frame.saturation === undefined ? "" : toPercentUnit(frame.saturation, "100%"),
      contrast: frame.contrast === undefined ? "" : toPercentUnit(frame.contrast, "100%"),
      hueRotate: frame.hueRotate === undefined ? "" : toCssUnit(frame.hueRotate, "0deg")
    }));
}

function normalizeEngineUp(input, speed) {
  const engine = asObject(input);
  const frames = normalizeEngineUpFrames(engine.frames);
  const enabled = toBoolean(engine.enabled, frames.length > 0);

  return {
    enabled,
    duration: toCssUnit(engine.duration || speed, DEFAULT_CONFIG.speed),
    easing: String(engine.easing || DEFAULT_CONFIG.animate.easing),
    direction: String(engine.direction || DEFAULT_CONFIG.engineUp.direction),
    iteration: String(engine.iteration || DEFAULT_CONFIG.engineUp.iteration),
    fillMode: String(engine.fillMode || DEFAULT_CONFIG.engineUp.fillMode),
    x: toCssUnit(engine.x ?? engine.translateX, DEFAULT_CONFIG.engineUp.x),
    y: toCssUnit(engine.y ?? engine.translateY, DEFAULT_CONFIG.engineUp.y),
    scale: clamp(toNumber(engine.scale, DEFAULT_CONFIG.engineUp.scale), 0.2, 3),
    rotate: toCssUnit(engine.rotate, DEFAULT_CONFIG.engineUp.rotate),
    opacity: engine.opacity === undefined ? "" : String(clamp(toNumber(engine.opacity, 1), 0, 1)),
    blur: engine.blur === undefined ? "" : toCssUnit(engine.blur, "0px"),
    brightness: engine.brightness === undefined ? "" : toPercentUnit(engine.brightness, "100%"),
    saturation: engine.saturation === undefined ? "" : toPercentUnit(engine.saturation, "100%"),
    contrast: engine.contrast === undefined ? "" : toPercentUnit(engine.contrast, "100%"),
    hueRotate: engine.hueRotate === undefined ? "" : toCssUnit(engine.hueRotate, "0deg"),
    frames
  };
}

function normalizeMotionBlurrinLayers(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((layer) => typeof layer === "object" && layer !== null && !Array.isArray(layer))
    .slice(0, 8)
    .map((layer) => {
      const minSize = clamp(toNumber(layer.minSize, 18), 2, 220);
      const maxSize = clamp(toNumber(layer.maxSize, Math.max(minSize, 64)), minSize, 260);
      return {
        count: Math.round(clamp(toNumber(layer.count, 4), 1, 24)),
        minSize,
        maxSize,
        speed: clamp(toNumber(layer.speed, 1), 0.05, 6),
        direction: normalizeMotionDirection(layer.direction, "right"),
        opacity: clamp(toNumber(layer.opacity, 1), 0, 1),
        color: String(layer.color || "rgba(255,255,255,1)")
      };
    });
}

function normalizeMotionBlurrin(input) {
  const motion = asObject(input);
  let layers = normalizeMotionBlurrinLayers(motion.layers);
  const enabled = toBoolean(motion.enabled, layers.length > 0);
  if (enabled && layers.length === 0) {
    layers = normalizeMotionBlurrinLayers([
      { count: 6, minSize: 28, maxSize: 72, speed: 0.8, direction: motion.direction || "right" },
      { count: 5, minSize: 14, maxSize: 34, speed: 1.1, direction: "diagonal" }
    ]);
  }
  return {
    enabled,
    layers,
    blur: toCssUnit(motion.blur, `${DEFAULT_CONFIG.motionBlurrin.blur}px`),
    openness: clamp(toNumber(motion.openness, DEFAULT_CONFIG.motionBlurrin.openness), 0.05, 0.95),
    edgeFade: clamp(toNumber(motion.edgeFade, DEFAULT_CONFIG.motionBlurrin.edgeFade), 0, 0.8),
    opacity: clamp(toNumber(motion.opacity, DEFAULT_CONFIG.motionBlurrin.opacity), 0, 1),
    blend: String(motion.blend || DEFAULT_CONFIG.motionBlurrin.blend),
    direction: normalizeMotionDirection(motion.direction, DEFAULT_CONFIG.motionBlurrin.direction),
    duration: toCssUnit(motion.duration, DEFAULT_CONFIG.motionBlurrin.duration),
    easing: String(motion.easing || DEFAULT_CONFIG.motionBlurrin.easing)
  };
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

function hasMonitoringSignals(runtimeHints = {}) {
  return Boolean(
    runtimeHints.hardwareConcurrency ||
      runtimeHints.deviceMemory ||
      runtimeHints.devicePixelRatio ||
      runtimeHints.effectiveType ||
      runtimeHints.saveData ||
      runtimeHints.prefersReducedMotion
  );
}

function scoreMonitoringCapacity({
  runtimeHints,
  effect,
  intensity,
  gradientBlurBase,
  glassBlurBase,
  mainFilter,
  motionBlurrinLayerCount = 0,
  engineUpEnabled = false
}) {
  let score = 82;
  const cores = toNumber(runtimeHints.hardwareConcurrency, 0);
  const memory = toNumber(runtimeHints.deviceMemory, 0);
  const dpr = toNumber(runtimeHints.devicePixelRatio, 1);
  const effectiveType = String(runtimeHints.effectiveType || "").toLowerCase();

  if (cores > 0) {
    if (cores <= 2) {
      score -= 20;
    } else if (cores <= 4) {
      score -= 18;
    } else if (cores >= 8) {
      score += 8;
    }
  }

  if (memory > 0) {
    if (memory <= 2) {
      score -= 22;
    } else if (memory <= 4) {
      score -= 14;
    } else if (memory >= 8) {
      score += 6;
    }
  }

  if (runtimeHints.prefersReducedMotion) {
    score -= 46;
  }
  if (runtimeHints.saveData) {
    score -= 32;
  }
  if (effectiveType === "slow-2g" || effectiveType === "2g") {
    score -= 24;
  } else if (effectiveType === "3g") {
    score -= 10;
  }
  if (dpr >= 2.5) {
    score -= 8;
  }

  score -= Math.max(0, EFFECT_COMPLEXITY[effect] - 1) * 28;
  score -= Math.max(0, intensity - 1.2) * 10;
  score -= Math.max(0, gradientBlurBase - 54) * 0.22;
  score -= Math.max(0, glassBlurBase - 24) * 0.35;

  if (mainFilter === "blur-filters") {
    score -= 18;
  }
  if (motionBlurrinLayerCount > 0) {
    score -= Math.min(26, motionBlurrinLayerCount * 1.4);
  }
  if (engineUpEnabled) {
    score -= 8;
  }

  return clamp(Math.round(score), 0, 100);
}

function pickMerTier(score, runtimeHints = {}) {
  if (runtimeHints.prefersReducedMotion || runtimeHints.saveData) {
    return { tier: "static", ...MER_TIERS.static };
  }
  if (score >= MER_TIERS.ultra.minScore) {
    return { tier: "ultra", ...MER_TIERS.ultra };
  }
  if (score >= MER_TIERS.stable.minScore) {
    return { tier: "stable", ...MER_TIERS.stable };
  }
  if (score >= MER_TIERS.reduced.minScore) {
    return { tier: "reduced", ...MER_TIERS.reduced };
  }
  if (score >= MER_TIERS.critical.minScore) {
    return { tier: "critical", ...MER_TIERS.critical };
  }
  return { tier: "static", ...MER_TIERS.static };
}

export function normalizeConfig(input, runtimeHints = {}) {
  const raw = typeof input === "object" && input !== null ? input : {};
  const preset = resolvePreset(raw);
  const recipe = resolveRecipe(raw);
  const mergedRaw = mergeDeep(mergeDeep(mergeDeep(DEFAULT_CONFIG, preset), recipe), raw);

  const rawGradientInput = asObject(raw.gradient);
  const rawGlassInput = asObject(raw.glass);
  const rawAnimateInput = asObject(raw.animate);

  const gradientInput = asObject(mergedRaw.gradient);
  const glassInput = asObject(mergedRaw.glass);
  const grainInput = asObject(mergedRaw.grain);
  const shineInput = asObject(mergedRaw.shine);
  const interactiveInput = asObject(mergedRaw.interactive);
  const animateInput = asObject(mergedRaw.animate);
  const visibilityInput = asObject(mergedRaw.visibility);
  const monitoringInput = asObject(mergedRaw.monitoring);
  const speed = toCssUnit(mergedRaw.speed, DEFAULT_CONFIG.speed);
  const engineUpInput = firstDefined(raw.engineUp, raw["engine-up"], mergedRaw.engineUp);
  const motionBlurrinInput = firstDefined(raw.motionBlurrin, raw.motionBlur, raw["motion-blurrin"], mergedRaw.motionBlurrin);

  const performanceKey = String(mergedRaw.performance || DEFAULT_CONFIG.performance).toLowerCase();
  let performance = PERFORMANCE_PRESETS[performanceKey] ? performanceKey : DEFAULT_CONFIG.performance;

  let gradientEnabled = toBoolean(gradientInput.enabled, DEFAULT_CONFIG.gradient.enabled);
  let glassEnabled = toBoolean(glassInput.enabled, DEFAULT_CONFIG.glass.enabled);
  let mode = resolveMode(mergedRaw.mode, gradientEnabled, glassEnabled);

  if (mode === "gradient") {
    gradientEnabled = true;
    glassEnabled = false;
  }
  if (mode === "frost") {
    gradientEnabled = false;
    glassEnabled = true;
  }
  if (!raw.mode && gradientEnabled !== glassEnabled) {
    mode = gradientEnabled ? "gradient" : "frost";
  }

  const contrastMode = resolveTextMode(mergedRaw.contrastMode);
  const safeMode = contrastMode === "safe";
  const strength = resolveStrength(mergedRaw.strength);
  const strengthScale =
    strength === "soft"
      ? { gradient: 0.82, frost: 0.86, highlight: 0.82, shadow: 0.84, grain: 0.82, glare: 0.8 }
      : strength === "strong"
        ? { gradient: 1.18, frost: 1.16, highlight: 1.18, shadow: 1.12, grain: 1.08, glare: 1.14 }
        : { gradient: 1, frost: 1, highlight: 1, shadow: 1, grain: 1, glare: 1 };
  const palette = String(
    firstDefined(rawGradientInput.palette, raw.palette, mergedRaw.palette, gradientInput.palette, DEFAULT_CONFIG.palette)
  ).toLowerCase();
  const effectCandidate = String(
    firstDefined(rawGradientInput.effect, raw.effect, mergedRaw.effect, gradientInput.effect, DEFAULT_CONFIG.effect)
  ).toLowerCase();
  const effect = VALID_EFFECTS.has(effectCandidate) ? effectCandidate : DEFAULT_CONFIG.effect;
  const mainFilter = resolveMainFilter(
    firstDefined(rawGlassInput.mainFilter, raw.mainFilter, raw["main-filter"], mergedRaw.mainFilter, glassInput.mainFilter)
  );
  const intensity = clamp(
    toNumber(firstDefined(rawGradientInput.intensity, raw.intensity, mergedRaw.intensity, gradientInput.intensity), DEFAULT_CONFIG.intensity),
    0.3,
    2.6
  );
  const frost = clamp(
    toNumber(firstDefined(rawGlassInput.frost, raw.frost, mergedRaw.frost, glassInput.frost), DEFAULT_CONFIG.frost),
    0,
    2.2
  );
  const monochrome = toBoolean(mergedRaw.monochrome ?? gradientInput.monochrome, DEFAULT_CONFIG.monochrome);
  const colors = resolveColors({
    palette,
    colors: firstDefined(rawGradientInput.colors, raw.colors, mergedRaw.colors, gradientInput.colors)
  });
  const engineUpBase = normalizeEngineUp(engineUpInput, speed);
  const motionBlurrinBase = normalizeMotionBlurrin(motionBlurrinInput);

  const gradientBlurBase = toNumber(
    firstDefined(rawGradientInput.blur, raw.blur, mergedRaw.blur, gradientInput.blur),
    DEFAULT_CONFIG.gradient.blur
  );
  const glassBlurBase = toNumber(firstDefined(rawGlassInput.blur, glassInput.blur), DEFAULT_CONFIG.glass.blur);
  const monitoringEnabled = toBoolean(monitoringInput.enabled, DEFAULT_CONFIG.monitoring.enabled);
  const monitoringSignals = hasMonitoringSignals(runtimeHints);
  const motionBlurrinLayerCount = motionBlurrinBase.enabled
    ? motionBlurrinBase.layers.reduce((sum, layer) => sum + layer.count, 0)
    : 0;
  const monitoringScore = scoreMonitoringCapacity({
    runtimeHints,
    effect,
    intensity,
    gradientBlurBase,
    glassBlurBase,
    mainFilter,
    motionBlurrinLayerCount,
    engineUpEnabled: engineUpBase.enabled
  });
  const merPick = pickMerTier(monitoringScore, runtimeHints);
  let monitoringReason = performance === "auto" ? "no-runtime-signals" : "manual-performance";
  let monitoringTier = performance === "auto" ? "auto" : "manual";
  let monitoringReduced = false;

  if (monitoringEnabled && performance === "auto" && monitoringSignals) {
    performance = merPick.performance;
    monitoringTier = merPick.tier;
    monitoringReason = merPick.reason;
    monitoringReduced = performance !== "quality" && performance !== "balanced";
  } else if (performance === "auto") {
    const lowEnd =
      (runtimeHints.hardwareConcurrency && runtimeHints.hardwareConcurrency <= 4) ||
      (runtimeHints.deviceMemory && runtimeHints.deviceMemory <= 4);

    if (lowEnd) {
      performance = "eco";
      monitoringTier = "reduced";
      monitoringReason = "legacy-auto-low-end";
      monitoringReduced = true;
    }
  }

  const profile = PERFORMANCE_PRESETS[performance];
  const gradientOpacityBase = toAlpha(
    firstDefined(rawGradientInput.opacity, raw.opacity, mergedRaw.opacity, gradientInput.opacity),
    DEFAULT_CONFIG.gradient.opacity
  );
  const shadow = clamp(
    toNumber(firstDefined(rawGlassInput.shadow, raw.shadow, mergedRaw.shadow, glassInput.shadow), DEFAULT_CONFIG.glass.shadow),
    0,
    1
  );
  const vignette = clamp(toNumber(mergedRaw.vignette, DEFAULT_CONFIG.vignette), 0, 1);

  const driftAlias =
    rawAnimateInput.drift ?? rawAnimateInput.dfirt ?? animateInput.drift ?? DEFAULT_CONFIG.animate.drift;

  const gradientOpacity = gradientEnabled
    ? clamp(gradientOpacityBase * (0.66 + intensity * 0.2) * strengthScale.gradient * (safeMode ? 0.84 : 1), 0, 1)
    : 0;

  const fillAlpha = glassEnabled
    ? clamp(
        (0.12 + frost * 0.15) * strengthScale.frost * toAlpha(glassInput.opacity, DEFAULT_CONFIG.glass.opacity) + (safeMode ? 0.12 : 0),
        0.12,
        0.88
      )
    : 0;
  const fillSecondaryAlpha = glassEnabled
    ? clamp((0.04 + frost * 0.05 + (safeMode ? 0.04 : 0)) * strengthScale.frost, 0.04, 0.32)
    : 0;
  const fallbackAlpha = glassEnabled ? clamp(fillAlpha + 0.16, 0.24, 0.94) : 0;
  const fallbackSecondaryAlpha = glassEnabled ? clamp(fillSecondaryAlpha + 0.03, 0.06, 0.36) : 0;
  const darkSurface = safeMode ? "16, 22, 31" : "18, 24, 34";

  const glassHighlight = glassEnabled
    ? clamp(toNumber(glassInput.highlight, DEFAULT_CONFIG.glass.highlight) * strengthScale.highlight * (safeMode ? 1.18 : 1), 0, 0.42)
    : 0;
  const glassInnerGlow = glassEnabled
    ? clamp(toNumber(glassInput.innerGlow, DEFAULT_CONFIG.glass.innerGlow) * strengthScale.highlight * (safeMode ? 1.1 : 1), 0, 0.36)
    : 0;
  const strokeOpacity = glassEnabled
    ? clamp(
        toNumber(glassInput.strokeOpacity, DEFAULT_CONFIG.glass.strokeOpacity) * strengthScale.highlight + frost * 0.04 + (safeMode ? 0.05 : 0),
        0,
        0.42
      )
    : 0;

  const glass = {
    enabled: glassEnabled,
    frost,
    blur: glassEnabled
      ? toCssUnit(glassBlurBase * profile.glassBlurScale * (0.78 + frost * 0.32), toCssUnit(DEFAULT_CONFIG.glass.blur, "18px"))
      : "0px",
    saturation: glassEnabled
      ? toPercentUnit(
          toNumber(firstDefined(rawGlassInput.saturation, raw.saturation, mergedRaw.saturation, glassInput.saturation), 155) *
            (0.9 + frost * 0.1),
          DEFAULT_CONFIG.glass.saturation
        )
      : "100%",
    contrast: glassEnabled
      ? toPercentUnit(
          toNumber(firstDefined(rawGlassInput.contrast, raw.contrast, mergedRaw.contrast, glassInput.contrast), 112) *
            (safeMode ? 1.05 : 1),
          DEFAULT_CONFIG.glass.contrast
        )
      : "100%",
    brightness: glassEnabled
      ? toPercentUnit(
          toNumber(firstDefined(rawGlassInput.brightness, raw.brightness, mergedRaw.brightness, glassInput.brightness), 104) *
            (safeMode ? 1.03 : 1),
          DEFAULT_CONFIG.glass.brightness
        )
      : "100%",
    opacity: toAlpha(glassInput.opacity, DEFAULT_CONFIG.glass.opacity),
    fill: glassEnabled ? String(glassInput.fill || `rgba(${darkSurface}, ${fillAlpha.toFixed(3)})`) : "transparent",
    fillSecondary: glassEnabled
      ? String(glassInput.fillSecondary || `rgba(255,255,255,${fillSecondaryAlpha.toFixed(3)})`)
      : "transparent",
    fallbackFill: glassEnabled
      ? String(glassInput.fallbackFill || `rgba(${darkSurface}, ${fallbackAlpha.toFixed(3)})`)
      : "transparent",
    fallbackSecondary: glassEnabled
      ? String(glassInput.fallbackSecondary || `rgba(255,255,255,${fallbackSecondaryAlpha.toFixed(3)})`)
      : "transparent",
    fillAngle: toCssUnit(glassInput.fillAngle, DEFAULT_CONFIG.glass.fillAngle),
    strokeWidth: glassEnabled ? toCssUnit(glassInput.strokeWidth, DEFAULT_CONFIG.glass.strokeWidth) : "0px",
    strokeOpacity,
    strokeColor: glassEnabled ? String(glassInput.strokeColor || `rgba(255,255,255,${strokeOpacity.toFixed(3)})`) : "transparent",
    highlight: glassHighlight,
    innerGlow: glassInnerGlow,
    shadow: clamp(shadow * strengthScale.shadow, 0, 1),
    mainFilter,
    heavyFilter: mainFilter === "blur-filters"
  };

  const gradient = {
    enabled: gradientEnabled,
    palette,
    effect,
    intensity,
    colors,
    opacity: gradientOpacity,
    tint: String(firstDefined(rawGradientInput.tint, raw.tint, mergedRaw.tint, gradientInput.tint, DEFAULT_CONFIG.gradient.tint)),
    blur: gradientEnabled
      ? toCssUnit(gradientBlurBase * profile.blurScale * (0.72 + intensity * 0.42), DEFAULT_CONFIG.blur)
      : "0px",
    saturation: monochrome
      ? "0%"
      : toPercentUnit(
          toNumber(firstDefined(rawGradientInput.saturation, raw.saturation, mergedRaw.saturation, gradientInput.saturation), 138) *
            (0.84 + intensity * 0.18),
          DEFAULT_CONFIG.gradient.saturation
        ),
    contrast: toPercentUnit(
      toNumber(firstDefined(rawGradientInput.contrast, raw.contrast, mergedRaw.contrast, gradientInput.contrast), 109) *
        (0.9 + intensity * 0.08),
      DEFAULT_CONFIG.gradient.contrast
    ),
    brightness: toPercentUnit(
      toNumber(firstDefined(rawGradientInput.brightness, raw.brightness, mergedRaw.brightness, gradientInput.brightness), 102),
      DEFAULT_CONFIG.gradient.brightness
    ),
    blendMode: String(
      firstDefined(rawGradientInput.blendMode, raw.blendMode, mergedRaw.blendMode, gradientInput.blendMode, DEFAULT_CONFIG.gradient.blendMode)
    ),
    inset: gradientEnabled
      ? String(firstDefined(rawGradientInput.inset, raw.layerInset, mergedRaw.layerInset, gradientInput.inset, profile.layerInset))
      : "0%"
  };

  const grain = {
    enabled: toBoolean(grainInput.enabled, DEFAULT_CONFIG.grain.enabled) && (gradientEnabled || glassEnabled),
    amount: clamp(
      toNumber(grainInput.amount ?? mergedRaw.grainAmount, DEFAULT_CONFIG.grain.amount) *
        profile.grainScale *
        strengthScale.grain *
        (safeMode ? 0.92 : 1),
      0,
      0.7
    ),
    size: toCssUnit(grainInput.size, DEFAULT_CONFIG.grain.size),
    blend: String(grainInput.blend || DEFAULT_CONFIG.grain.blend),
    motion: clamp(toNumber(grainInput.motion, DEFAULT_CONFIG.grain.motion), 0, 2)
  };

  const shine = {
    enabled: toBoolean(shineInput.enabled, DEFAULT_CONFIG.shine.enabled) && glassEnabled,
    opacity: clamp(toNumber(shineInput.opacity, DEFAULT_CONFIG.shine.opacity) * (safeMode ? 0.86 : 1), 0, 0.48),
    angle: toCssUnit(shineInput.angle, DEFAULT_CONFIG.shine.angle),
    blend: String(shineInput.blend || DEFAULT_CONFIG.shine.blend)
  };

  const interactive = {
    enabled: toBoolean(interactiveInput.enabled, DEFAULT_CONFIG.interactive.enabled),
    glare: clamp(toNumber(interactiveInput.glare, DEFAULT_CONFIG.interactive.glare) * strengthScale.glare, 0, 0.42),
    radius: toCssUnit(interactiveInput.radius, DEFAULT_CONFIG.interactive.radius),
    blend: String(interactiveInput.blend || DEFAULT_CONFIG.interactive.blend)
  };

  const animateModeCandidate = String(animateInput.mode || DEFAULT_CONFIG.animate.mode).toLowerCase();
  const animateMode = VALID_ANIMATE_MODES.has(animateModeCandidate) ? animateModeCandidate : DEFAULT_CONFIG.animate.mode;
  const animationEnabled =
    gradientEnabled && profile.animationEnabled !== false && toBoolean(animateInput.enabled, DEFAULT_CONFIG.animate.enabled);
  const engineUp = {
    ...engineUpBase,
    enabled: engineUpBase.enabled && gradientEnabled && profile.animationEnabled !== false
  };
  const motionBlurrin = {
    ...motionBlurrinBase,
    enabled: motionBlurrinBase.enabled && glassEnabled,
    animated: motionBlurrinBase.enabled && glassEnabled && profile.animationEnabled !== false
  };

  return {
    selector: String(mergedRaw.selector || DEFAULT_CONFIG.selector),
    preset: String(mergedRaw.preset || DEFAULT_CONFIG.preset).toLowerCase(),
    recipe: String(mergedRaw.recipe || ""),
    mode,
    strength,
    contrastMode,
    palette,
    effect,
    performance,
    intensity,
    frost,
    vignette,
    shadow: glass.shadow,
    tint: gradient.tint,
    blur: gradient.blur,
    opacity: gradient.opacity,
    saturation: glass.saturation,
    contrast: glass.contrast,
    brightness: glass.brightness,
    radius: toCssUnit(mergedRaw.radius, DEFAULT_CONFIG.radius),
    blendMode: gradient.blendMode,
    monochrome,
    speed,
    colors,
    layerInset: gradient.inset,
    frameStep: profile.frameStep,
    fpsCap: profile.fpsCap,
    mainFilter,
    monitoring: {
      enabled: monitoringEnabled,
      engine: String(monitoringInput.engine || DEFAULT_CONFIG.monitoring.engine),
      strategy: String(monitoringInput.strategy || DEFAULT_CONFIG.monitoring.strategy),
      score: monitoringScore,
      tier: monitoringTier,
      reason: monitoringReason,
      recommendedPerformance: merPick.performance,
      reduced: monitoringReduced
    },
    zIndex: normalizeZIndex(mergedRaw.zIndex),
    isolate: toBoolean(mergedRaw.isolate, DEFAULT_CONFIG.isolate),
    visibility: {
      rootMargin: String(visibilityInput.rootMargin || DEFAULT_CONFIG.visibility.rootMargin),
      threshold: clamp(toNumber(visibilityInput.threshold, DEFAULT_CONFIG.visibility.threshold), 0, 1)
    },
    responsive: asObject(mergedRaw.responsive),
    scheme: asObject(mergedRaw.scheme),
    grain,
    shine,
    interactive,
    animate: {
      enabled: animationEnabled,
      mode: animateMode,
      hueShift: clamp(toNumber(animateInput.hueShift, DEFAULT_CONFIG.animate.hueShift), 0, 360),
      drift: toCssUnit(driftAlias, DEFAULT_CONFIG.animate.drift),
      speedMultiplier: clamp(toNumber(animateInput.speedMultiplier, DEFAULT_CONFIG.animate.speedMultiplier), 0.2, 4),
      fps: clamp(toNumber(animateInput.fps, DEFAULT_CONFIG.animate.fps), 0, 120),
      easing: String(animateInput.easing || DEFAULT_CONFIG.animate.easing)
    },
    engineUp,
    motionBlurrin,
    gradient,
    glass
  };
}
