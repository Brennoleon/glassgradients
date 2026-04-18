import test from "node:test";
import assert from "node:assert/strict";
import { parseGlass } from "../src/parser.js";

test("parse .glass with nested object and list", () => {
  const result = parseGlass(`
selector: .hero
opacity: 0.8
colors:
  - #111111
  - #222222
animate:
  enabled: true
  hueShift: 32
`.trim());

  assert.equal(result.selector, ".hero");
  assert.equal(result.opacity, 0.8);
  assert.deepEqual(result.colors, ["#111111", "#222222"]);
  assert.equal(result.animate.enabled, true);
  assert.equal(result.animate.hueShift, 32);
});

test("parse .glass with dot keys and inline list", () => {
  const result = parseGlass(`
selector: .banner
animate.mode: orbit
animate.hueShift: 48
colors: #111111, #222222, #333333, #444444
grain.enabled: false
`.trim());

  assert.equal(result.selector, ".banner");
  assert.equal(result.animate.mode, "orbit");
  assert.equal(result.animate.hueShift, 48);
  assert.deepEqual(result.colors, ["#111111", "#222222", "#333333", "#444444"]);
  assert.equal(result.grain.enabled, false);
});

test("parse keeps rgba scalar intact", () => {
  const result = parseGlass(`
tint: rgba(255,255,255,0.03)
`.trim());

  assert.equal(result.tint, "rgba(255,255,255,0.03)");
});
