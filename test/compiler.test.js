import test from "node:test";
import assert from "node:assert/strict";
import { compileGlass } from "../src/compiler.js";

test("compile .glass to CSS", () => {
  const css = compileGlass(`
selector: .hero
colors:
  - #ff0000
  - #00ff00
  - #0000ff
  - #ffffff
`.trim());

  assert.match(css, /\.hero\s*\{/);
  assert.match(css, /@keyframes/);
  assert.match(css, /#ff0000/);
});

test("compile with effect and minify", () => {
  const css = compileGlass(
    `
selector: .card
effect: aurora
animate.mode: pulse
colors: #101010, #202020, #303030, #404040
`.trim(),
    { minify: true }
  );

  assert.match(css, /\.card\{/);
  assert.match(css, /--gg-gradient-background:linear-gradient/);
  assert.match(css, /@keyframes/);
});

test("compile with preset and new effect", () => {
  const css = compileGlass(
    `
selector: .stage
preset: cinematic
effect: prism
animate.dfirt: 11%
`.trim(),
    { minify: true }
  );

  assert.match(css, /\.stage\{/);
  assert.match(css, /linear-gradient\(120deg/);
  assert.match(css, /@keyframes/);
});

test("compile supports 1.2 liquid effects and optional heavy main filter", () => {
  const css = compileGlass(
    `
selector: .liquid
effect: liquid
main-filter: blur-filters
`.trim(),
    { minify: true }
  );

  assert.match(css, /\.liquid\{/);
  assert.match(css, /conic-gradient/);
  assert.match(css, /drop-shadow/);
  assert.match(css, /--gg-main-filter:blur-filters/);
  assert.match(css, /--gg-heavy-filter:1/);
});

test("compile can disable the frosted backdrop filter without disabling glass fill", () => {
  const css = compileGlass(
    `
selector: .flat-glass
mode: frost
mainFilter: none
`.trim(),
    { minify: true }
  );

  assert.match(css, /\.flat-glass\{/);
  assert.match(css, /--gg-main-filter:none/);
  assert.match(css, /--gg-backdrop-filter:none/);
  assert.match(css, /--gg-glass-fill:linear-gradient/);
});

test("compile emits Engine UP frames and Motion Blurrin layers", () => {
  const css = compileGlass(
    `
selector: .motion-card
effect: liquid
engineUp:
  enabled: true
  duration: 12s
  x: 4%
  y: 2%
  blur: 28
  brightness: 112%
motionBlurrin:
  layers:
    - count: 6
      minSize: 40
      maxSize: 90
      speed: 0.6
      direction: right
    - count: 10
      minSize: 12
      maxSize: 36
      speed: 1.1
      direction: diagonal
  blur: 20
  openness: 0.4
  edgeFade: 0.2
`.trim()
  );

  assert.match(css, /--gg-engine-up: 1/);
  assert.match(css, /--gg-motion-blurrin: 1/);
  assert.match(css, /--gg-motion-blurrin-filter: blur\(20px\)/);
  assert.match(css, /radial-gradient\(circle [0-9.]+px/);
  assert.match(css, /@keyframes gg-motion-blurrin-/);
  assert.match(css, /filter: blur\(28px\) saturate\(100%\) contrast\(100%\) brightness\(112%\)/);
});

test("compile supports gradient-only mode", () => {
  const css = compileGlass(
    `
selector: .banner
mode: gradient
effect: ribbon
`.trim(),
    { minify: true }
  );

  assert.match(css, /-webkit-backdrop-filter:none/);
  assert.match(css, /--gg-gradient-background:linear-gradient/);
});

test("compile supports frost-only mode", () => {
  const css = compileGlass(
    `
selector: .panel
mode: frost
contrastMode: safe
`.trim(),
    { minify: true }
  );

  assert.match(css, /--gg-gradient-background:none/);
  assert.match(css, /--gg-fallback-fill:linear-gradient/);
});

test("compile emits responsive and scheme media queries", () => {
  const css = compileGlass(`
selector: .adaptive
responsive:
  md:
    mode: frost
    contrastMode: safe
scheme:
  dark:
    preset: smoke
`.trim());

  assert.match(css, /@media \(min-width: 768px\)/);
  assert.match(css, /@media \(prefers-color-scheme: dark\)/);
});

test("compile writes direct backdrop-filter for Safari compatibility", () => {
  const css = compileGlass(`selector: .safe`).replace(/\s+/g, " ");

  assert.match(css, /-webkit-backdrop-filter: blur\(/);
  assert.doesNotMatch(css, /-webkit-backdrop-filter: var\(--gg-backdrop-filter\)/);
});
