import { compileGlass } from "./compiler.js";
import { getRecipeContract, mergeDeep } from "./defaults.js";
import { parseGlass } from "./parser.js";
import { compileRuntimeInlineStyle } from "./runtime.js";
import { createGlassTokens } from "./theme.js";

export const GLASS_COMPONENTS = {
  panel: {
    name: "panel",
    displayName: "GlassPanel",
    tag: "section",
    className: "gg-panel",
    recipe: "panel",
    attrs: { role: "region" }
  },
  card: {
    name: "card",
    displayName: "GlassCard",
    tag: "article",
    className: "gg-card",
    recipe: "card",
    attrs: {}
  },
  button: {
    name: "button",
    displayName: "GlassButton",
    tag: "button",
    className: "gg-button",
    recipe: "button",
    attrs: { type: "button" }
  },
  navbar: {
    name: "navbar",
    displayName: "GlassNavbar",
    tag: "nav",
    className: "gg-navbar",
    recipe: "navbar",
    attrs: {}
  },
  sidebar: {
    name: "sidebar",
    displayName: "GlassSidebar",
    tag: "aside",
    className: "gg-sidebar",
    recipe: "sidebar",
    attrs: {}
  },
  modal: {
    name: "modal",
    displayName: "GlassModal",
    tag: "section",
    className: "gg-modal",
    recipe: "modal",
    attrs: { role: "dialog", "aria-modal": "true" }
  },
  dialog: {
    name: "dialog",
    displayName: "GlassDialog",
    tag: "section",
    className: "gg-dialog",
    recipe: "dialog",
    attrs: { role: "dialog", "aria-modal": "true" }
  },
  toolbar: {
    name: "toolbar",
    displayName: "GlassToolbar",
    tag: "div",
    className: "gg-toolbar",
    recipe: "toolbar",
    attrs: { role: "toolbar" }
  },
  "command-bar": {
    name: "command-bar",
    displayName: "GlassCommandBar",
    tag: "div",
    className: "gg-command-bar",
    recipe: "command-bar",
    attrs: { role: "toolbar" }
  },
  "command-palette": {
    name: "command-palette",
    displayName: "GlassCommandPalette",
    tag: "section",
    className: "gg-command-palette",
    recipe: "command-palette",
    attrs: { role: "dialog", "aria-modal": "true" }
  },
  table: {
    name: "table",
    displayName: "GlassTable",
    tag: "div",
    className: "gg-table",
    recipe: "table",
    attrs: { role: "region" }
  },
  "data-grid": {
    name: "data-grid",
    displayName: "GlassDataGrid",
    tag: "div",
    className: "gg-data-grid",
    recipe: "table",
    attrs: { role: "grid" }
  },
  chart: {
    name: "chart",
    displayName: "GlassChart",
    tag: "figure",
    className: "gg-chart",
    recipe: "panel",
    attrs: {}
  },
  timeline: {
    name: "timeline",
    displayName: "GlassTimeline",
    tag: "ol",
    className: "gg-timeline",
    recipe: "panel",
    attrs: {}
  },
  kanban: {
    name: "kanban",
    displayName: "GlassKanban",
    tag: "section",
    className: "gg-kanban",
    recipe: "workspace",
    attrs: { role: "region" }
  },
  calendar: {
    name: "calendar",
    displayName: "GlassCalendar",
    tag: "section",
    className: "gg-calendar",
    recipe: "table",
    attrs: { role: "grid" }
  },
  combobox: {
    name: "combobox",
    displayName: "GlassCombobox",
    tag: "div",
    className: "gg-combobox",
    recipe: "input",
    attrs: { role: "combobox", "aria-expanded": "false" }
  },
  dropdown: {
    name: "dropdown",
    displayName: "GlassDropdown",
    tag: "div",
    className: "gg-dropdown",
    recipe: "popover",
    attrs: { role: "menu" }
  },
  toast: {
    name: "toast",
    displayName: "GlassToast",
    tag: "section",
    className: "gg-toast",
    recipe: "popover",
    attrs: { role: "status", "aria-live": "polite" }
  },
  tabs: {
    name: "tabs",
    displayName: "GlassTabs",
    tag: "div",
    className: "gg-tabs",
    recipe: "toolbar",
    attrs: { role: "tablist" }
  },
  "resizable-panel": {
    name: "resizable-panel",
    displayName: "GlassResizablePanel",
    tag: "section",
    className: "gg-resizable-panel",
    recipe: "panel",
    attrs: { role: "region" }
  },
  "spotlight-overlay": {
    name: "spotlight-overlay",
    displayName: "GlassSpotlightOverlay",
    tag: "section",
    className: "gg-spotlight-overlay",
    recipe: "modal",
    attrs: { role: "dialog", "aria-modal": "true" }
  },
  "notification-center": {
    name: "notification-center",
    displayName: "GlassNotificationCenter",
    tag: "aside",
    className: "gg-notification-center",
    recipe: "popover",
    attrs: { role: "region", "aria-live": "polite" }
  },
  inspector: {
    name: "inspector",
    displayName: "GlassInspector",
    tag: "aside",
    className: "gg-inspector",
    recipe: "inspector",
    attrs: {}
  },
  terminal: {
    name: "terminal",
    displayName: "GlassTerminal",
    tag: "section",
    className: "gg-terminal",
    recipe: "terminal",
    attrs: { role: "log" }
  },
  input: {
    name: "input",
    displayName: "GlassInput",
    tag: "input",
    className: "gg-input",
    recipe: "input",
    attrs: {}
  },
  badge: {
    name: "badge",
    displayName: "GlassBadge",
    tag: "span",
    className: "gg-badge",
    recipe: "badge",
    attrs: {}
  },
  dock: {
    name: "dock",
    displayName: "GlassDock",
    tag: "nav",
    className: "gg-dock",
    recipe: "dock",
    attrs: {}
  },
  hero: {
    name: "hero",
    displayName: "GlassHero",
    tag: "section",
    className: "gg-hero",
    recipe: "hero",
    attrs: {}
  },
  workspace: {
    name: "workspace",
    displayName: "GlassWorkspace",
    tag: "main",
    className: "gg-workspace",
    recipe: "workspace",
    attrs: {}
  },
  form: {
    name: "form",
    displayName: "GlassForm",
    tag: "form",
    className: "gg-form",
    recipe: "form",
    attrs: {}
  },
  popover: {
    name: "popover",
    displayName: "GlassPopover",
    tag: "section",
    className: "gg-popover",
    recipe: "popover",
    attrs: { role: "dialog" }
  }
};

export const GLASS_COMPONENT_ALIASES = {
  commandBar: "command-bar",
  commandPalette: "command-palette",
  comboBox: "combobox",
  dataGrid: "data-grid",
  "data-grid-panel": "data-grid",
  "data-table": "table",
  dataTable: "table",
  "data-table-grid": "data-grid",
  dataTableGrid: "data-grid",
  "date-picker": "calendar",
  dataVisual: "chart",
  datePicker: "calendar",
  "dropdown-menu": "dropdown",
  dropdownMenu: "dropdown",
  "notification-panel": "notification-center",
  notificationCenter: "notification-center",
  notificationPanel: "notification-center",
  resizable: "resizable-panel",
  resizablePanel: "resizable-panel",
  "split-pane": "resizable-panel",
  splitPane: "resizable-panel",
  spotlight: "spotlight-overlay",
  spotlightOverlay: "spotlight-overlay",
  "tab-list": "tabs",
  tabList: "tabs",
  toaster: "toast",
  autocomplete: "combobox",
  board: "kanban",
  graph: "chart",
  grid: "data-grid",
  menu: "dropdown",
  notifications: "notification-center",
  overlay: "spotlight-overlay",
  surface: "panel",
  shell: "panel"
};

function resolveComponentInput(input) {
  if (typeof input === "function") {
    return resolveComponentInput(input());
  }
  if (typeof input === "string") {
    return input.includes(":") ? parseGlass(input) : {};
  }
  return input ?? {};
}

function canonicalComponentName(name) {
  const key = String(name || "panel").trim();
  const normalized = key
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
  const withoutGlassPrefix = key.replace(/^Glass(?=[A-Z])/, "");
  const normalizedWithoutGlassPrefix = withoutGlassPrefix
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

  return (
    GLASS_COMPONENT_ALIASES[key] ||
    GLASS_COMPONENT_ALIASES[normalized] ||
    (GLASS_COMPONENTS[normalized] ? normalized : undefined) ||
    GLASS_COMPONENT_ALIASES[normalizedWithoutGlassPrefix] ||
    (GLASS_COMPONENTS[normalizedWithoutGlassPrefix] ? normalizedWithoutGlassPrefix : undefined) ||
    normalized
  );
}

function joinClassNames(...values) {
  return values
    .flatMap((value) => {
      if (!value) {
        return [];
      }
      if (Array.isArray(value)) {
        return value;
      }
      return String(value).split(/\s+/);
    })
    .map((value) => String(value).trim())
    .filter(Boolean)
    .join(" ");
}

export function listGlassComponents() {
  return Object.keys(GLASS_COMPONENTS);
}

export function getGlassComponent(name = "panel") {
  const key = canonicalComponentName(name);
  const component = GLASS_COMPONENTS[key];
  if (!component) {
    const available = listGlassComponents().join(", ");
    throw new Error(`Unknown GlassGradients component "${name}". Available components: ${available}`);
  }
  return { ...component, attrs: { ...component.attrs } };
}

export function createGlassComponentConfig(name = "panel", input = {}) {
  const component = getGlassComponent(name);
  const base = {
    recipe: component.recipe
  };
  return mergeDeep(base, resolveComponentInput(input));
}

export function createGlassComponentTokens(name = "panel", input = {}) {
  return createGlassTokens(createGlassComponentConfig(name, input));
}

export function createGlassComponentProps(name = "panel", options = {}) {
  const component = getGlassComponent(name);
  const {
    input = {},
    className,
    style,
    attrs = {},
    runtimeOptions = {},
    includeStyle = true,
    includeDataAttributes = true
  } = options;
  const config = createGlassComponentConfig(component.name, input);
  const inlineStyle = includeStyle ? compileRuntimeInlineStyle(config) : {};
  const tokens = createGlassTokens(config);
  const dataAttrs = includeDataAttributes
    ? {
        "data-glass-component": component.name,
        "data-glass-recipe": config.recipe || component.recipe,
        "data-glass-mode": tokens.mode
      }
    : {};

  return {
    name: component.name,
    displayName: component.displayName,
    tag: component.tag,
    recipe: component.recipe,
    input: config,
    runtimeOptions,
    className: joinClassNames(component.className, className),
    style: { ...inlineStyle, ...(style || {}) },
    attrs: {
      ...component.attrs,
      ...dataAttrs,
      ...attrs
    },
    tokens,
    contract: getRecipeContract(config.recipe, config)
  };
}

export function createGlassComponentCss(name = "panel", selector, input = {}, options = {}) {
  const component = getGlassComponent(name);
  const targetSelector = selector || `.${component.className}`;
  return compileGlass(createGlassComponentConfig(component.name, input), { ...options, selector: targetSelector });
}

export function createGlassComponentCatalog(options = {}) {
  const {
    include = listGlassComponents(),
    input = {},
    prefix = "",
    suffix = "",
    minify = false
  } = options;
  return include.reduce((acc, name) => {
    const component = getGlassComponent(name);
    const selector = `.${prefix}${component.className}${suffix}`;
    acc[component.name] = {
      ...component,
      selector,
      input: createGlassComponentConfig(component.name, input),
      css: createGlassComponentCss(component.name, selector, input, { minify })
    };
    return acc;
  }, {});
}

export function createGlassComponentCatalogCss(options = {}) {
  const catalog = createGlassComponentCatalog(options);
  return Object.values(catalog)
    .map((entry) => entry.css)
    .join(options.minify ? "" : "\n\n");
}
