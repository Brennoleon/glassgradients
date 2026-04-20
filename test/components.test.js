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
  assert.ok(names.includes("data-grid"));
  assert.ok(names.includes("chart"));
  assert.ok(names.includes("notification-center"));
  assert.equal(getGlassComponent("commandPalette").name, "command-palette");
  assert.equal(getGlassComponent("dataTable").name, "table");
});

test("advanced components are additive aliases over stable recipe fallbacks", () => {
  assert.equal(getGlassComponent("dataGrid").name, "data-grid");
  assert.equal(getGlassComponent("DataGrid").name, "data-grid");
  assert.equal(getGlassComponent("GlassDataGrid").name, "data-grid");
  assert.equal(getGlassComponent("comboBox").name, "combobox");
  assert.equal(getGlassComponent("splitPane").name, "resizable-panel");
  assert.equal(getGlassComponent("notificationCenter").name, "notification-center");

  assert.equal(createGlassComponentConfig("data-grid").recipe, "table");
  assert.equal(createGlassComponentConfig("chart").recipe, "panel");
  assert.equal(createGlassComponentConfig("kanban").recipe, "workspace");
  assert.equal(createGlassComponentConfig("dropdown").recipe, "popover");
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

test("advanced component props expose semantic attrs without new defaults recipes", () => {
  const dataGrid = createGlassComponentProps("dataGrid", {
    className: "orders-grid",
    attrs: { "aria-label": "Orders" }
  });
  const toast = createGlassComponentProps("toast");
  const tabs = createGlassComponentProps("tabs");
  const spotlight = createGlassComponentProps("spotlightOverlay");

  assert.equal(dataGrid.name, "data-grid");
  assert.equal(dataGrid.displayName, "GlassDataGrid");
  assert.equal(dataGrid.recipe, "table");
  assert.equal(dataGrid.input.recipe, "table");
  assert.equal(dataGrid.tokens.recipe, "table");
  assert.equal(dataGrid.contract.role, "data-grid");
  assert.equal(dataGrid.attrs.role, "grid");
  assert.equal(dataGrid.attrs["aria-label"], "Orders");
  assert.match(dataGrid.className, /gg-data-grid/);
  assert.match(dataGrid.className, /orders-grid/);

  assert.equal(toast.attrs.role, "status");
  assert.equal(toast.attrs["aria-live"], "polite");
  assert.equal(tabs.attrs.role, "tablist");
  assert.equal(spotlight.attrs.role, "dialog");
  assert.equal(spotlight.attrs["aria-modal"], "true");
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

test("component catalog css can emit advanced primitives", () => {
  const catalog = createGlassComponentCatalog({
    include: ["data-grid", "chart", "notification-center"],
    minify: true
  });
  const css = createGlassComponentCatalogCss({
    include: ["data-grid", "chart", "notification-center"],
    minify: true
  });

  assert.equal(catalog["data-grid"].recipe, "table");
  assert.equal(catalog.chart.recipe, "panel");
  assert.equal(catalog["notification-center"].recipe, "popover");
  assert.ok(catalog["data-grid"].css.includes(".gg-data-grid"));
  assert.match(css, /\.gg-data-grid\{/);
  assert.match(css, /\.gg-chart\{/);
  assert.match(css, /\.gg-notification-center\{/);
});
