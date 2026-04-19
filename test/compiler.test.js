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
