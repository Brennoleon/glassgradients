import test from "node:test";
import assert from "node:assert/strict";
import { createGlassUnoClass, createGlassUnoCss, createGlassUnoPreset, createGlassUnoShortcuts } from "../src/adapters/unocss.js";

test("unocss adapter emits preflight css for semantic classes", () => {
  const css = createGlassUnoCss();

  assert.match(css, /\.gg-workspace \{/);
  assert.match(css, /\.gg-terminal \{/);
  assert.match(css, /\.gg-command-palette::before \{/);
  assert.match(css, /@keyframes gg-wave/);
});

test("unocss adapter can generate a single custom class css block", () => {
  const css = createGlassUnoClass("gg-inline-panel", { recipe: "form" });

  assert.match(css, /\.gg-inline-panel \{/);
  assert.match(css, /backdrop-filter: blur\(/);
});

test("unocss adapter exposes shortcuts and preset shape", () => {
  const shortcuts = createGlassUnoShortcuts({ prefix: "galaxy" });
  const preset = createGlassUnoPreset({ prefix: "galaxy" });

  assert.equal(shortcuts["galaxy-dialog-shell"], "galaxy galaxy-dialog");
  assert.equal(shortcuts["galaxy-terminal-shell"], "galaxy galaxy-terminal");
  assert.equal(preset.name, "glassgradients");
  assert.match(preset.preflights[0].getCSS(), /\.galaxy-dialog \{/);
});
