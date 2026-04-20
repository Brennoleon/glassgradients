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
    case "caustic":
      return [
        `radial-gradient(70% 58% at 18% 18%, ${c1} 0%, transparent 48%)`,
        `conic-gradient(from 145deg at 64% 42%, transparent 0deg, ${c2} 72deg, transparent 118deg, ${c3} 202deg, transparent 282deg)`,
        `linear-gradient(115deg, transparent 0%, ${c4} 44%, transparent 68%)`,
        `radial-gradient(120% 90% at 72% 92%, ${c2} 0%, transparent 58%)`
      ].join(", ");
    case "liquid":
      return [
        `radial-gradient(110% 82% at 18% 24%, ${c1} 0%, transparent 56%)`,
        `radial-gradient(96% 112% at 78% 18%, ${c2} 0%, transparent 54%)`,
        `conic-gradient(from 28deg at 48% 54%, ${c3} 0deg, transparent 88deg, ${c4} 164deg, transparent 252deg, ${c1} 330deg)`,
        `linear-gradient(148deg, transparent 0%, ${c2} 52%, transparent 76%)`
      ].join(", ");
    case "nebula":
      return [
        `radial-gradient(130% 120% at 20% 18%, ${c1} 0%, transparent 44%)`,
        `radial-gradient(120% 112% at 80% 22%, ${c2} 0%, transparent 48%)`,
        `radial-gradient(140% 130% at 42% 72%, ${c3} 0%, transparent 62%)`,
        `linear-gradient(136deg, transparent 8%, ${c4} 46%, transparent 84%)`
      ].join(", ");
    case "iridescent":
      return [
        `linear-gradient(104deg, ${c1} 0%, transparent 24%, ${c2} 46%, transparent 66%, ${c3} 100%)`,
        `linear-gradient(218deg, transparent 0%, ${c4} 38%, transparent 72%)`,
        `radial-gradient(90% 70% at 72% 24%, ${c2} 0%, transparent 54%)`,
        `radial-gradient(100% 82% at 22% 88%, ${c3} 0%, transparent 60%)`
      ].join(", ");
    case "conic":
      return [
        `conic-gradient(from 210deg at 50% 50%, ${c1}, ${c2}, ${c3}, ${c4}, ${c1})`,
        `radial-gradient(120% 120% at 50% 50%, transparent 0%, rgba(0,0,0,0.36) 74%)`,
        `linear-gradient(145deg, transparent 0%, ${c2} 52%, transparent 88%)`
      ].join(", ");
    case "noise":
      return [
        `radial-gradient(90% 90% at 18% 22%, ${c1} 0%, transparent 48%)`,
        `radial-gradient(100% 88% at 84% 24%, ${c2} 0%, transparent 48%)`,
        `repeating-linear-gradient(35deg, ${c3} 0 1px, transparent 1px 7px)`,
        `linear-gradient(180deg, transparent 0%, ${c4} 100%)`
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

function hasEngineFilter(frame) {
  return Boolean(frame.blur || frame.brightness || frame.saturation || frame.contrast || frame.hueRotate);
}

function formatEngineFilter(frame) {
  if (!hasEngineFilter(frame)) {
    return "var(--gg-gradient-filter)";
  }

  const parts = [];
  if (frame.blur) {
    parts.push(`blur(${frame.blur})`);
  }
  parts.push(`saturate(${frame.saturation || "100%"})`);
  parts.push(`contrast(${frame.contrast || "100%"})`);
  parts.push(`brightness(${frame.brightness || "100%"})`);
  if (frame.hueRotate) {
    parts.push(`hue-rotate(${frame.hueRotate})`);
  }
  return parts.join(" ");
}

function formatEngineFrame(frame) {
  const declarations = [
    `transform: translate3d(${frame.x || "0%"}, ${frame.y || "0%"}, 0) scale(${frame.scale || 1}) rotate(${frame.rotate || "0deg"});`,
    `filter: ${formatEngineFilter(frame)};`
  ];

  if (frame.opacity !== "") {
    declarations.push(`opacity: ${frame.opacity};`);
  }

  return `  ${frame.at} {\n    ${declarations.join("\n    ")}\n  }`;
}

function scaleCssValue(value, multiplier) {
  const text = String(value || "0").trim();
  const number = Number.parseFloat(text);
  if (!Number.isFinite(number)) {
    return text;
  }
  const unit = text.slice(String(number).length) || "";
  return `${Number((number * multiplier).toFixed(3))}${unit}`;
}

export function buildEngineUpFrames(config) {
  const engine = config.engineUp;
  if (engine.frames.length > 0) {
    return engine.frames.map(formatEngineFrame).join("\n");
  }

  const blur = engine.blur || "";
  const brightness = engine.brightness || "";
  const saturation = engine.saturation || "";
  const contrast = engine.contrast || "";
  const hueRotate = engine.hueRotate || "";

  return [
    {
      at: "0%",
      x: scaleCssValue(engine.x, -1),
      y: scaleCssValue(engine.y, -1),
      scale: 1,
      rotate: scaleCssValue(engine.rotate, -1),
      opacity: engine.opacity,
      blur,
      brightness,
      saturation,
      contrast,
      hueRotate
    },
    {
      at: "50%",
      x: engine.x,
      y: engine.y,
      scale: engine.scale,
      rotate: engine.rotate,
      opacity: engine.opacity,
      blur,
      brightness,
      saturation,
      contrast,
      hueRotate
    },
    {
      at: "100%",
      x: scaleCssValue(engine.x, 0.72),
      y: scaleCssValue(engine.y, -0.72),
      scale: Math.max(1, engine.scale - 0.02),
      rotate: scaleCssValue(engine.rotate, 0.5),
      opacity: engine.opacity,
      blur,
      brightness,
      saturation,
      contrast,
      hueRotate
    }
  ].map(formatEngineFrame).join("\n");
}

function seededUnit(layerIndex, itemIndex, salt) {
  const value = Math.sin((layerIndex + 1) * 97.13 + (itemIndex + 1) * 37.79 + salt * 17.17) * 10000;
  return value - Math.floor(value);
}

function formatMotionColor(alpha) {
  return `rgba(255, 255, 255, ${toFixedAlpha(alpha)})`;
}

export function buildMotionBlurrinBackground(motionBlurrin) {
  if (!motionBlurrin.enabled || motionBlurrin.layers.length === 0) {
    return "none";
  }

  const layers = [];
  const openStop = Math.round(14 + motionBlurrin.openness * 54);
  const fadeStop = Math.min(98, Math.round(openStop + 12 + motionBlurrin.edgeFade * 38));

  motionBlurrin.layers.forEach((layer, layerIndex) => {
    for (let index = 0; index < layer.count && layers.length < 48; index += 1) {
      const sizeUnit = seededUnit(layerIndex, index, 1);
      const xUnit = seededUnit(layerIndex, index, 2);
      const yUnit = seededUnit(layerIndex, index, 3);
      const size = layer.minSize + (layer.maxSize - layer.minSize) * sizeUnit;
      const x = 8 + xUnit * 84;
      const y = 8 + yUnit * 84;
      const alpha = motionBlurrin.opacity * layer.opacity * (0.42 + seededUnit(layerIndex, index, 4) * 0.36);
      const color = formatMotionColor(alpha);
      layers.push(
        `radial-gradient(circle ${size.toFixed(1)}px at ${x.toFixed(1)}% ${y.toFixed(1)}%, ${color} 0%, ${color} ${openStop}%, transparent ${fadeStop}%)`
      );
    }
  });

  return layers.join(", ");
}

export function buildMotionBlurrinFrames(motionBlurrin) {
  const direction = motionBlurrin.direction;
  if (direction === "left") {
    return "0% { transform: translate3d(3%, 0, 0); }\n  100% { transform: translate3d(-3%, 0, 0); }";
  }
  if (direction === "up") {
    return "0% { transform: translate3d(0, 3%, 0); }\n  100% { transform: translate3d(0, -3%, 0); }";
  }
  if (direction === "down") {
    return "0% { transform: translate3d(0, -3%, 0); }\n  100% { transform: translate3d(0, 3%, 0); }";
  }
  if (direction === "diagonal") {
    return "0% { transform: translate3d(-2.5%, 2%, 0) scale(1.02); }\n  100% { transform: translate3d(2.5%, -2%, 0) scale(1.04); }";
  }
  if (direction === "orbit") {
    return "0% { transform: rotate(0deg) scale(1.02); }\n  50% { transform: rotate(3deg) scale(1.05); }\n  100% { transform: rotate(-3deg) scale(1.02); }";
  }
  if (direction === "liquid") {
    return "0% { transform: scale(1) translate3d(-1.5%, 0, 0); }\n  50% { transform: scale(1.07) translate3d(1.5%, -1%, 0); }\n  100% { transform: scale(0.98) translate3d(0, 1%, 0); }";
  }
  return "0% { transform: translate3d(-3%, 0, 0); }\n  100% { transform: translate3d(3%, 0, 0); }";
}

export function buildBackdropFilter(glass) {
  if (!glass.enabled || glass.mainFilter === "none") {
    return "none";
  }
  const base = `blur(${glass.blur}) saturate(${glass.saturation}) contrast(${glass.contrast}) brightness(${glass.brightness})`;
  if (glass.mainFilter === "blur-filters") {
    return `${base} drop-shadow(0 0 18px rgba(255, 255, 255, 0.08))`;
  }
  return base;
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

  if (config.motionBlurrin.enabled) {
    layers.push(buildMotionBlurrinBackground(config.motionBlurrin));
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

  if (config.motionBlurrin.enabled) {
    modes.push(config.motionBlurrin.blend);
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
    "--gg-main-filter": config.mainFilter,
    "--gg-heavy-filter": config.glass.heavyFilter ? "1" : "0",
    "--gg-monitoring-tier": config.monitoring.tier,
    "--gg-monitoring-score": String(config.monitoring.score),
    "--gg-monitoring-reason": config.monitoring.reason,
    "--gg-engine-up": config.engineUp.enabled ? "1" : "0",
    "--gg-engine-up-duration": config.engineUp.duration,
    "--gg-motion-blurrin": config.motionBlurrin.enabled ? "1" : "0",
    "--gg-motion-blurrin-filter": config.motionBlurrin.enabled ? `blur(${config.motionBlurrin.blur})` : "none",
    "--gg-motion-blurrin-opacity": String(config.motionBlurrin.opacity),
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
