import test from "node:test";
import assert from "node:assert/strict";
import {
  createGlassComponentCatalog,
  createGlassComponentCatalogCss,
  createGlassComponentConfig,
  createGlassComponentCss,
  createGlassComponentProps,
  createGlassComponentTokens,
  getGlassComponent,
  listGlassComponents
} from "../src/components.js";

test("components catalog exposes official product primitives", () => {
  const names = listGlassComponents();

  assert.ok(names.includes("button"));
  assert.ok(names.includes("command-palette"));
  assert.ok(names.includes("terminal"));
  assert.equal(getGlassComponent("commandPalette").name, "command-palette");
});

test("component config merges recipe defaults with user overrides", () => {
  const config = createGlassComponentConfig("button", {
    strength: "strong"
  });

  assert.equal(config.recipe, "button");
  assert.equal(config.strength, "strong");
});

test("component props are ready for framework wrappers", () => {
  const props = createGlassComponentProps("dialog", {
    className: "settings-dialog",
    attrs: { "aria-label": "Settings" },
    input: { strength: "strong" }
  });

  assert.equal(props.tag, "section");
  assert.match(props.className, /gg-dialog/);
  assert.match(props.className, /settings-dialog/);
  assert.equal(props.attrs.role, "dialog");
  assert.equal(props.attrs["aria-label"], "Settings");
  assert.equal(props.tokens.recipe, "dialog");
  assert.equal(props.contract.role, "dialog-shell");
  assert.match(props.style.WebkitBackdropFilter, /blur\(/);
});

test("component tokens and css are generated from the same component contract", () => {
  const tokens = createGlassComponentTokens("terminal");
  const css = createGlassComponentCss("terminal", ".terminal-window", {}, { minify: true });

  assert.equal(tokens.recipe, "terminal");
  assert.equal(tokens.contract.role, "terminal-shell");
  assert.match(css, /\.terminal-window\{/);
  assert.match(css, /--gg-glass-fill:/);
});

test("component catalog css can emit selected primitives", () => {
  const catalog = createGlassComponentCatalog({ include: ["panel", "button"], minify: true });
  const css = createGlassComponentCatalogCss({ include: ["panel", "button"], minify: true });

  assert.ok(catalog.panel.css.includes(".gg-panel"));
  assert.ok(catalog.button.css.includes(".gg-button"));
  assert.match(css, /\.gg-panel\{/);
  assert.match(css, /\.gg-button\{/);
});
