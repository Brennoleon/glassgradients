import test from "node:test";
import assert from "node:assert/strict";
import { createGlassStyleObject, createGlassTokenObject, mergeGlassInputs, stableSerialize } from "../src/adapters/shared.js";

test("adapter shared style object exposes backdrop filter", () => {
  const style = createGlassStyleObject({ recipe: "button" });

  assert.match(style.WebkitBackdropFilter, /blur\(/);
  assert.equal(style.borderRadius, "12px");
});

test("adapter shared token object exposes recipe buckets", () => {
  const tokens = createGlassTokenObject({ recipe: "dock" });

  assert.equal(tokens.recipe, "dock");
  assert.ok(tokens.surface.fill.includes("linear-gradient("));
});

test("adapter shared merge keeps later overrides", () => {
  const merged = mergeGlassInputs({ recipe: "navbar", mode: "frost" }, { mode: "surface" });

  assert.equal(merged.recipe, "navbar");
  assert.equal(merged.mode, "surface");
});

test("adapter shared serialization is stable across key order", () => {
  const a = stableSerialize({ b: 1, a: { d: 2, c: 3 } });
  const b = stableSerialize({ a: { c: 3, d: 2 }, b: 1 });

  assert.equal(a, b);
});
