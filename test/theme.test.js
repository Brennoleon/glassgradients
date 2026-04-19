import test from "node:test";
import assert from "node:assert/strict";
import { compileGlassTheme, createGlassThemeScript, createGlassTokens } from "../src/theme.js";

test("compileGlassTheme emits selector variables and media queries", () => {
  const css = compileGlassTheme(
    ":root",
    {
      preset: "editor",
      responsive: {
        lg: { recipe: "sidebar" }
      }
    }
  );

  assert.match(css, /:root \{/);
  assert.match(css, /--gg-glass-fill:/);
  assert.match(css, /@media \(min-width: 1024px\)/);
});

test("createGlassTokens exposes semantic token buckets", () => {
  const tokens = createGlassTokens({ recipe: "modal" });

  assert.equal(tokens.recipe, "modal");
  assert.equal(tokens.contract.role, "overlay");
  assert.ok(tokens.surface.backdropFilter.includes("blur("));
  assert.ok(tokens.palette.length >= 4);
});

test("createGlassThemeScript includes storage key and attribute", () => {
  const script = createGlassThemeScript({
    storageKey: "gg-theme",
    attribute: "data-theme"
  });

  assert.match(script, /gg-theme/);
  assert.match(script, /data-theme/);
});
