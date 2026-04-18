import { normalizeConfig } from "./defaults.js";
import { parseGlass } from "./parser.js";

function resolveInput(input) {
  if (typeof input === "string") {
    return parseGlass(input);
  }
  return input ?? {};
}

function hash(value) {
  let h = 0;
  for (let i = 0; i < value.length; i += 1) {
    h = (Math.imul(31, h) + value.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function buildGradientByEffect(effect, colors) {
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

function buildAnimationFrames(mode, hueShift, motionAmp) {
  if (mode === "pulse") {
    return `
  0% {
    transform: translate3d(0, 0, 0) scale(calc(1.01 + ${motionAmp} * 0.01));
    filter: var(--gg-base-filter) hue-rotate(0deg);
  }
  50% {
    transform: translate3d(calc(1% * ${motionAmp}), calc(-1% * ${motionAmp}), 0) scale(calc(1.08 + ${motionAmp} * 0.03));
    filter: var(--gg-base-filter) hue-rotate(${hueShift}deg);
  }
  100% {
    transform: translate3d(calc(-1% * ${motionAmp}), calc(1.2% * ${motionAmp}), 0) scale(calc(1.02 + ${motionAmp} * 0.02));
    filter: var(--gg-base-filter) hue-rotate(${hueShift * -1}deg);
  }`.trim();
  }

  if (mode === "orbit") {
    return `
  0% {
    transform: translate3d(calc(-2.5% * ${motionAmp}), calc(-1.2% * ${motionAmp}), 0) scale(1.04);
    filter: var(--gg-base-filter) hue-rotate(0deg);
  }
  25% {
    transform: translate3d(calc(2.8% * ${motionAmp}), calc(-0.8% * ${motionAmp}), 0) scale(1.06);
    filter: var(--gg-base-filter) hue-rotate(${hueShift * 0.5}deg);
  }
  50% {
    transform: translate3d(calc(3.4% * ${motionAmp}), calc(2.7% * ${motionAmp}), 0) scale(1.08);
    filter: var(--gg-base-filter) hue-rotate(${hueShift}deg);
  }
  75% {
    transform: translate3d(calc(-1.8% * ${motionAmp}), calc(2.5% * ${motionAmp}), 0) scale(1.05);
    filter: var(--gg-base-filter) hue-rotate(${hueShift * -0.4}deg);
  }
  100% {
    transform: translate3d(calc(-2.5% * ${motionAmp}), calc(-1.2% * ${motionAmp}), 0) scale(1.04);
    filter: var(--gg-base-filter) hue-rotate(${hueShift * -1}deg);
  }`.trim();
  }

  return `
  0% {
    transform: translate3d(calc(-1.8% * ${motionAmp}), calc(-1% * ${motionAmp}), 0) scale(1.03);
    filter: var(--gg-base-filter) hue-rotate(0deg);
  }
  50% {
    transform: translate3d(calc(1.5% * ${motionAmp}), calc(1.8% * ${motionAmp}), 0) scale(1.06);
    filter: var(--gg-base-filter) hue-rotate(${hueShift}deg);
  }
  100% {
    transform: translate3d(calc(2.2% * ${motionAmp}), calc(-1.2% * ${motionAmp}), 0) scale(1.04);
    filter: var(--gg-base-filter) hue-rotate(${hueShift * -1}deg);
  }`.trim();
}

function minifyCss(css) {
  return css
    .replace(/\s+/g, " ")
    .replace(/\s*([{}:;,])\s*/g, "$1")
    .replace(/;}/g, "}")
    .trim();
}

export function compileGlass(input, options = {}) {
  const parsed = resolveInput(input);
  const merged = { ...parsed, ...options };
  const config = normalizeConfig(merged);
  const selector = config.selector;
  const gradient = buildGradientByEffect(config.effect, config.colors);
  const animationName = `gg-shift-${hash(selector + config.speed + config.colors.join("|") + config.effect)}`;
  const animationRule = config.animate.enabled
    ? `${animationName} ${config.speed} ${config.animate.easing} infinite alternate`
    : "none";
  const frames = buildAnimationFrames(config.animate.mode, config.animate.hueShift, config.intensity);

  const css = `
${selector} {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border-radius: ${config.radius};
  --gg-opacity: ${config.opacity};
  --gg-blur: ${config.blur};
  --gg-saturation: ${config.saturation};
  --gg-contrast: ${config.contrast};
  --gg-brightness: ${config.brightness};
  --gg-grain: ${config.grain.enabled ? config.grain.amount : 0};
  --gg-vignette: ${config.vignette};
  --gg-shadow: ${config.shadow};
  --gg-tint: ${config.tint};
  --gg-grain-motion: ${config.grain.motion};
  --gg-base-filter: blur(var(--gg-blur)) saturate(var(--gg-saturation)) contrast(var(--gg-contrast)) brightness(var(--gg-brightness));
  box-shadow: 0 18px 54px rgba(0, 0, 0, calc(0.1 + var(--gg-shadow) * 0.25));
}

${selector}::before,
${selector}::after {
  content: "";
  position: absolute;
  inset: ${config.layerInset};
  pointer-events: none;
}

${selector}::before {
  z-index: -2;
  background-image: linear-gradient(0deg, var(--gg-tint), var(--gg-tint)), ${gradient};
  background-blend-mode: overlay, ${config.blendMode};
  opacity: var(--gg-opacity);
  filter: var(--gg-base-filter);
  transform: translate3d(0, 0, 0);
  animation: ${animationRule};
  will-change: transform, filter, opacity, background-position;
}

${selector}::after {
  z-index: -1;
  opacity: var(--gg-grain);
  mix-blend-mode: ${config.grain.blend};
  background-image:
    radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.22), transparent 45%),
    radial-gradient(circle at 70% 65%, rgba(0, 0, 0, calc(0.2 + var(--gg-vignette) * 0.35)), transparent 46%),
    repeating-radial-gradient(circle at 50% 50%, rgba(255, 255, 255, calc(0.06 + var(--gg-grain-motion) * 0.03)) 0 1px, transparent 1px ${config.grain.size});
}

@keyframes ${animationName} {
${frames}
}
`.trimStart();

  return options.minify ? minifyCss(css) : css;
}

export async function compileGlassFile(filePath, options = {}, encoding = "utf8") {
  const { readFile } = await import("node:fs/promises");
  const source = await readFile(filePath, encoding);
  return compileGlass(source, options);
}
