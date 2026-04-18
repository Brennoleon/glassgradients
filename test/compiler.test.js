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
  assert.match(css, /background-image:linear-gradient/);
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
