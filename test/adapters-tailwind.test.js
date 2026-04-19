import test from "node:test";
import assert from "node:assert/strict";
import { createGlassTailwindClass, createGlassTailwindComponents, createGlassTailwindPlugin, createGlassTailwindSafelist } from "../src/adapters/tailwind.js";

test("tailwind adapter emits static component selectors for semantic shells", () => {
  const components = createGlassTailwindComponents();

  assert.ok(components[".gg"]);
  assert.ok(components[".gg-workspace"]);
  assert.ok(components[".gg-terminal"]);
  assert.ok(components[".gg-command-palette::before"]);
  assert.ok(components["@supports not ((-webkit-backdrop-filter: blur(0)) or (backdrop-filter: blur(0)))"]);
});

test("tailwind adapter can generate a single custom class", () => {
  const classMap = createGlassTailwindClass("gg-custom-shell", { recipe: "dialog", strength: "strong" });

  assert.equal(classMap[".gg-custom-shell"].position, "relative");
  assert.match(classMap[".gg-custom-shell"].WebkitBackdropFilter, /blur\(/);
});

test("tailwind adapter plugin delegates components to host plugin factory", () => {
  let added = null;
  const plugin = createGlassTailwindPlugin((handler) => ({ run: handler }), { prefix: "galaxy" });

  plugin.run({
    addComponents(components) {
      added = components;
    }
  });

  assert.ok(added[".galaxy"]);
  assert.ok(added[".galaxy-dialog"]);
});

test("tailwind adapter safelist exposes generated class names", () => {
  const safelist = createGlassTailwindSafelist();

  assert.ok(safelist.includes("gg"));
  assert.ok(safelist.includes("gg-recipe-workspace"));
  assert.ok(safelist.includes("gg-contract-command-palette"));
  assert.ok(safelist.includes("gg-recipe-terminal"));
});
