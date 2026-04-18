import { createGlassGradient } from "../../src/runtime.js";
import { parseGlass } from "../../src/parser.js";

let runtimeInstance = null;

const presetSelect = document.querySelector("#runtime-preset");
const effectSelect = document.querySelector("#runtime-effect");
const perfSelect = document.querySelector("#runtime-performance");
const speedSelect = document.querySelector("#runtime-speed");
const applyButton = document.querySelector("#runtime-apply");
const destroyButton = document.querySelector("#runtime-destroy");
const status = document.querySelector("#runtime-status");

const BASE_GLASS = `
preset: soft
palette: ocean
effect: aurora
performance: auto
intensity: 1.2
frost: 0.8
vignette: 0.24
shadow: 0.3
tint: rgba(180,220,255,0.02)
animate.mode: wave
animate.hueShift: 42
animate.drift: 13%
animate.speedMultiplier: 1.4
animate.fps: 60
grain.amount: 0.11
grain.motion: 0.45
visibility.rootMargin: 200px 0px
visibility.threshold: 0.12
`;

function getRuntimeConfig() {
  const base = parseGlass(BASE_GLASS);
  base.preset = presetSelect.value;
  base.effect = effectSelect.value;
  base.performance = perfSelect.value;
  base.speed = speedSelect.value;
  return base;
}

function mountRuntime() {
  if (runtimeInstance) {
    runtimeInstance.destroy();
  }

  runtimeInstance = createGlassGradient(".fx-runtime-base", getRuntimeConfig(), {
    threaded: true,
    reduceMotion: false
  });
  status.textContent = "Runtime ativo";
}

applyButton.addEventListener("click", () => {
  if (!runtimeInstance) {
    mountRuntime();
    return;
  }
  runtimeInstance.update(getRuntimeConfig());
  status.textContent = "Runtime atualizado";
});

destroyButton.addEventListener("click", () => {
  if (runtimeInstance) {
    runtimeInstance.destroy();
    runtimeInstance = null;
    status.textContent = "Runtime destruido";
  }
});

mountRuntime();
