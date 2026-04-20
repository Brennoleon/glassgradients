import test from "node:test";
import assert from "node:assert/strict";
import {
  createGlassTailwindClass,
  createGlassTailwindComponents,
  createGlassTailwindPlugin,
  createGlassTailwindSafelist,
  createGlassTailwindV4Css,
  createGlassTailwindV4Preset,
  createGlassTailwindV4Theme,
  createGlassTailwindV4Utility
} from "../src/adapters/tailwind.js";

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

test("tailwind v4 helper emits css-first theme tokens", () => {
  const css = createGlassTailwindV4Theme({ themeName: "panel" });
  const plainCss = createGlassTailwindV4Theme({ themeDirective: "" });

  assert.match(css, /@theme inline \{/);
  assert.match(css, /--radius-panel: var\(--gg-radius\);/);
  assert.match(css, /--shadow-panel: var\(--gg-shadow-stack\);/);
  assert.match(css, /--animate-panel: var\(--gg-animation\);/);
  assert.match(plainCss, /@theme \{/);
});

test("tailwind v4 helper emits a single custom utility", () => {
  const css = createGlassTailwindV4Utility("gg-inline-panel", { recipe: "dialog", strength: "strong" });

  assert.match(css, /@utility gg-inline-panel \{/);
  assert.match(css, /&::before, &::after \{/);
  assert.match(css, /-webkit-backdrop-filter: blur\(/);
  assert.match(css, /@supports not \(\(-webkit-backdrop-filter: blur\(0\)\) or \(backdrop-filter: blur\(0\)\)\)/);
});

test("tailwind v4 css helper combines theme, utilities, and keyframes", () => {
  const css = createGlassTailwindV4Css({
    prefix: "galaxy",
    includeImport: true,
    themeName: "glass",
    classes: {
      "galaxy-inline": { recipe: "terminal" }
    }
  });

  assert.match(css, /@import "tailwindcss";/);
  assert.match(css, /@theme inline \{/);
  assert.match(css, /@utility galaxy \{/);
  assert.match(css, /@utility galaxy-inline \{/);
  assert.match(css, /@keyframes gg-wave/);
});

test("tailwind v4 preset is optional and keeps the legacy plugin path separate", () => {
  const preset = createGlassTailwindV4Preset({ prefix: "galaxy", minify: true });

  assert.equal(preset.name, "glassgradients-tailwind-v4");
  assert.match(preset.css, /@theme inline\{/);
  assert.match(preset.utilities, /@utility galaxy\{/);
  assert.ok(preset.safelist.includes("galaxy"));
  assert.equal(preset.usage, '<section class="galaxy galaxy-workspace rounded-glass shadow-glass">...</section>');
});
