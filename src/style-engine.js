function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function toFixedAlpha(value) {
  return clampNumber(value, 0, 1).toFixed(3);
}

export function hash(value) {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (Math.imul(31, h) + value.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function minifyCss(css) {
  return css
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

export function buildGradientByEffect(effect, colors) {
  const [c1, c2, c3, c4] = colors;

  switch (effect) {
    case "aurora":
      return [
        `linear-gradient(130deg, ${c1} 0%, transparent 42%)`,
        `linear-gradient(210deg, ${c2} 12%, transparent 52%)`,
        `radial-gradient(150% 130% at 80% 85%, ${c3} 0%, transparent 60%)`,
        `radial-gradient(140% 120% at 15% 85%, ${c4} 0%, transparent 58%)`
      ].join(", ");
    case "spotlight":
      return [
        `radial-gradient(90% 90% at 50% 28%, ${c1} 0%, transparent 55%)`,
        `radial-gradient(80% 80% at 78% 72%, ${c2} 0%, transparent 50%)`,
        `radial-gradient(85% 85% at 22% 78%, ${c3} 0%, transparent 52%)`,
        `linear-gradient(140deg, transparent 0%, ${c4} 90%)`
      ].join(", ");
    case "plasma":
      return [
        `radial-gradient(120% 110% at 10% 20%, ${c1} 0%, transparent 60%)`,
        `radial-gradient(115% 140% at 85% 25%, ${c2} 0%, transparent 58%)`,
        `radial-gradient(150% 130% at 30% 90%, ${c3} 0%, transparent 62%)`,
        `radial-gradient(130% 120% at 90% 85%, ${c4} 0%, transparent 56%)`
      ].join(", ");
    case "prism":
      return [
        `linear-gradient(120deg, ${c1} 0%, transparent 30%)`,
        `linear-gradient(190deg, ${c2} 10%, transparent 34%)`,
        `linear-gradient(260deg, ${c3} 20%, transparent 38%)`,
        `radial-gradient(130% 130% at 80% 70%, ${c4} 0%, transparent 65%)`
      ].join(", ");
    case "halo":
      return [
        `radial-gradient(80% 80% at 18% 20%, ${c1} 0%, transparent 52%)`,
        `radial-gradient(95% 95% at 84% 18%, ${c2} 0%, transparent 54%)`,
        `radial-gradient(90% 90% at 50% 55%, ${c3} 0%, transparent 60%)`,
        `radial-gradient(120% 120% at 50% 105%, ${c4} 0%, transparent 62%)`
      ].join(", ");
    case "ribbon":
      return [
        `linear-gradient(118deg, ${c1} 0%, transparent 32%)`,
        `linear-gradient(158deg, transparent 8%, ${c2} 34%, transparent 62%)`,
        `linear-gradient(228deg, transparent 18%, ${c3} 48%, transparent 72%)`,
        `linear-gradient(288deg, ${c4} 6%, transparent 40%)`
      ].join(", ");
    case "bloom":
      return [
        `radial-gradient(90% 90% at 20% 18%, ${c1} 0%, transparent 48%)`,
        `radial-gradient(70% 70% at 82% 24%, ${c2} 0%, transparent 45%)`,
        `radial-gradient(105% 105% at 36% 82%, ${c3} 0%, transparent 56%)`,
        `radial-gradient(115% 115% at 86% 78%, ${c4} 0%, transparent 58%)`
      ].join(", ");
    case "mesh":
    default:
      return [
        `radial-gradient(140% 120% at 6% 4%, ${c1} 0%, transparent 55%)`,
        `radial-gradient(140% 130% at 88% 12%, ${c2} 0%, transparent 58%)`,
        `radial-gradient(160% 140% at 20% 92%, ${c3} 0%, transparent 63%)`,
        `radial-gradient(130% 130% at 84% 76%, ${c4} 0%, transparent 55%)`
      ].join(", ");
  }
}

export function buildAnimationFrames(mode, hueShift, motionAmp) {
  if (mode === "pulse") {
    return `
  0% {
    transform: translate3d(0, 0, 0) scale(calc(1.01 + ${motionAmp} * 0.01));
    filter: var(--gg-gradient-filter) hue-rotate(0deg);
  }
  50% {
    transform: translate3d(calc(1% * ${motionAmp}), calc(-1% * ${motionAmp}), 0) scale(calc(1.08 + ${motionAmp} * 0.03));
    filter: var(--gg-gradient-filter) hue-rotate(${hueShift}deg);
  }
  100% {
    transform: translate3d(calc(-1% * ${motionAmp}), calc(1.2% * ${motionAmp}), 0) scale(calc(1.02 + ${motionAmp} * 0.02));
    filter: var(--gg-gradient-filter) hue-rotate(${hueShift * -1}deg);
  }`.trim();
  }

  if (mode === "orbit") {
    return `
  0% {
    transform: translate3d(calc(-2.5% * ${motionAmp}), calc(-1.2% * ${motionAmp}), 0) scale(1.04);
    filter: var(--gg-gradient-filter) hue-rotate(0deg);
  }
  25% {
    transform: translate3d(calc(2.8% * ${motionAmp}), calc(-0.8% * ${motionAmp}), 0) scale(1.06);
    filter: var(--gg-gradient-filter) hue-rotate(${hueShift * 0.5}deg);
  }
  50% {
    transform: translate3d(calc(3.4% * ${motionAmp}), calc(2.7% * ${motionAmp}), 0) scale(1.08);
    filter: var(--gg-gradient-filter) hue-rotate(${hueShift}deg);
  }
  75% {
    transform: translate3d(calc(-1.8% * ${motionAmp}), calc(2.5% * ${motionAmp}), 0) scale(1.05);
    filter: var(--gg-gradient-filter) hue-rotate(${hueShift * -0.4}deg);
  }
  100% {
    transform: translate3d(calc(-2.5% * ${motionAmp}), calc(-1.2% * ${motionAmp}), 0) scale(1.04);
    filter: var(--gg-gradient-filter) hue-rotate(${hueShift * -1}deg);
  }`.trim();
  }

  return `
  0% {
    transform: translate3d(calc(-1.8% * ${motionAmp}), calc(-1% * ${motionAmp}), 0) scale(1.03);
    filter: var(--gg-gradient-filter) hue-rotate(0deg);
  }
  50% {
    transform: translate3d(calc(1.5% * ${motionAmp}), calc(1.8% * ${motionAmp}), 0) scale(1.06);
    filter: var(--gg-gradient-filter) hue-rotate(${hueShift}deg);
  }
  100% {
    transform: translate3d(calc(2.2% * ${motionAmp}), calc(-1.2% * ${motionAmp}), 0) scale(1.04);
    filter: var(--gg-gradient-filter) hue-rotate(${hueShift * -1}deg);
  }`.trim();
}

export function buildBackdropFilter(glass) {
  if (!glass.enabled) {
    return "none";
  }
  return `blur(${glass.blur}) saturate(${glass.saturation}) contrast(${glass.contrast}) brightness(${glass.brightness})`;
}

export function buildGradientFilter(config) {
  if (!config.gradient.enabled) {
    return "none";
  }

  const grayscale = config.monochrome ? " grayscale(1)" : "";
  return `blur(${config.gradient.blur}) saturate(${config.gradient.saturation}) contrast(${config.gradient.contrast}) brightness(${config.gradient.brightness})${grayscale}`;
}

export function buildGlassFill(glass) {
  if (!glass.enabled) {
    return "transparent";
  }
  return `linear-gradient(${glass.fillAngle}, ${glass.fill}, ${glass.fillSecondary})`;
}

export function buildFallbackFill(glass) {
  if (!glass.enabled) {
    return "transparent";
  }
  return `linear-gradient(${glass.fillAngle}, ${glass.fallbackFill}, ${glass.fallbackSecondary})`;
}

export function formatBoxShadow(glass) {
  if (!glass.enabled) {
    return "none";
  }

  const outerAlpha = toFixedAlpha(0.12 + glass.shadow * 0.28);
  const midAlpha = toFixedAlpha(0.04 + glass.shadow * 0.16);
  const innerGlow = toFixedAlpha(glass.innerGlow);
  const highlight = toFixedAlpha(glass.highlight);

  return [
    `0 20px 56px rgba(0, 0, 0, ${outerAlpha})`,
    `0 6px 18px rgba(0, 0, 0, ${midAlpha})`,
    `inset 0 1px 0 rgba(255, 255, 255, ${highlight})`,
    `inset 0 18px 28px rgba(255, 255, 255, ${innerGlow})`
  ].join(", ");
}

export function buildGradientBackground(config) {
  if (!config.gradient.enabled) {
    return "none";
  }

  const effectGradient = buildGradientByEffect(config.gradient.effect, config.gradient.colors);
  return `linear-gradient(0deg, ${config.gradient.tint}, ${config.gradient.tint}), ${effectGradient}`;
}

export function buildOverlayBackground(config) {
  const layers = [];

  if (config.interactive.enabled && config.interactive.glare > 0) {
    layers.push(
      `radial-gradient(${config.interactive.radius} ${config.interactive.radius} at var(--gg-glare-x, 50%) var(--gg-glare-y, 50%), rgba(255, 255, 255, ${toFixedAlpha(config.interactive.glare)}) 0%, transparent 72%)`
    );
  }

  if (config.glass.enabled && config.glass.highlight > 0) {
    layers.push(
      `linear-gradient(180deg, rgba(255, 255, 255, ${toFixedAlpha(config.glass.highlight * 0.95)}) 0%, rgba(255, 255, 255, 0) 22%)`
    );
  }

  if (config.shine.enabled && config.shine.opacity > 0) {
    layers.push(
      `linear-gradient(${config.shine.angle}, rgba(255, 255, 255, ${toFixedAlpha(config.shine.opacity)}) 0%, rgba(255, 255, 255, ${toFixedAlpha(config.shine.opacity * 0.24)}) 24%, transparent 58%)`
    );
  }

  if (config.vignette > 0) {
    layers.push(
      `radial-gradient(135% 120% at 50% 118%, rgba(0, 0, 0, ${toFixedAlpha(config.vignette * 0.9)}) 0%, transparent 54%)`
    );
  }

  if (config.grain.enabled && config.grain.amount > 0) {
    layers.push(
      `repeating-radial-gradient(circle at 50% 50%, rgba(255, 255, 255, ${toFixedAlpha(0.03 + config.grain.motion * 0.02)}) 0 1px, transparent 1px ${config.grain.size})`
    );
  }

  return layers.length > 0 ? layers.join(", ") : "none";
}

export function buildOverlayBlendModes(config) {
  const modes = [];

  if (config.interactive.enabled && config.interactive.glare > 0) {
    modes.push(config.interactive.blend);
  }

  if (config.glass.enabled && config.glass.highlight > 0) {
    modes.push("screen");
  }

  if (config.shine.enabled && config.shine.opacity > 0) {
    modes.push(config.shine.blend);
  }

  if (config.vignette > 0) {
    modes.push("multiply");
  }

  if (config.grain.enabled && config.grain.amount > 0) {
    modes.push("normal");
  }

  return modes.length > 0 ? modes.join(", ") : "normal";
}

export function buildStyleVariables(config) {
  const gradientOpacity = config.gradient.enabled ? config.gradient.opacity : 0;
  const hasOrnaments =
    (config.interactive.enabled && config.interactive.glare > 0) ||
    (config.glass.enabled && config.glass.highlight > 0) ||
    (config.shine.enabled && config.shine.opacity > 0) ||
    config.vignette > 0 ||
    (config.grain.enabled && config.grain.amount > 0);

  return {
    "--gg-radius": config.radius,
    "--gg-z-index": config.zIndex,
    "--gg-glare-x": "50%",
    "--gg-glare-y": "50%",
    "--gg-glass-fill": buildGlassFill(config.glass),
    "--gg-fallback-fill": buildFallbackFill(config.glass),
    "--gg-glass-border": config.glass.enabled ? `${config.glass.strokeWidth} solid ${config.glass.strokeColor}` : "0 solid transparent",
    "--gg-shadow-stack": formatBoxShadow(config.glass),
    "--gg-backdrop-filter": buildBackdropFilter(config.glass),
    "--gg-gradient-background": buildGradientBackground(config),
    "--gg-gradient-blend": config.gradient.blendMode,
    "--gg-gradient-opacity": String(gradientOpacity),
    "--gg-gradient-filter": buildGradientFilter(config),
    "--gg-gradient-inset": config.gradient.inset,
    "--gg-ornament-background": buildOverlayBackground(config),
    "--gg-ornament-blend": buildOverlayBlendModes(config),
    "--gg-ornament-opacity": hasOrnaments ? "1" : "0"
  };
}
