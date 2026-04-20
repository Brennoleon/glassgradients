import { createElement } from "preact";
import { createGlassComponentProps } from "../components.js";
import { GlassSurface } from "../adapters/preact.js";

function createPreactGlassComponent(name) {
  return function PreactGlassComponent(props = {}) {
    const {
      as,
      input,
      runtimeOptions,
      className,
      style,
      children,
      elementRef,
      ...attrs
    } = props;
    const component = createGlassComponentProps(name, {
      input,
      runtimeOptions,
      className,
      style,
      attrs,
      includeStyle: false
    });

    return createElement(
      GlassSurface,
      {
        as: as || component.tag,
        input: component.input,
        runtimeOptions: component.runtimeOptions,
        className: component.className,
        style,
        elementRef,
        ...component.attrs
      },
      children
    );
  };
}

export const GlassPanel = createPreactGlassComponent("panel");
export const GlassCard = createPreactGlassComponent("card");
export const GlassButton = createPreactGlassComponent("button");
export const GlassNavbar = createPreactGlassComponent("navbar");
export const GlassSidebar = createPreactGlassComponent("sidebar");
export const GlassModal = createPreactGlassComponent("modal");
export const GlassDialog = createPreactGlassComponent("dialog");
export const GlassToolbar = createPreactGlassComponent("toolbar");
export const GlassCommandBar = createPreactGlassComponent("command-bar");
export const GlassCommandPalette = createPreactGlassComponent("command-palette");
export const GlassTable = createPreactGlassComponent("table");
export const GlassDataGrid = createPreactGlassComponent("data-grid");
export const GlassChart = createPreactGlassComponent("chart");
export const GlassTimeline = createPreactGlassComponent("timeline");
export const GlassKanban = createPreactGlassComponent("kanban");
export const GlassCalendar = createPreactGlassComponent("calendar");
export const GlassCombobox = createPreactGlassComponent("combobox");
export const GlassDropdown = createPreactGlassComponent("dropdown");
export const GlassToast = createPreactGlassComponent("toast");
export const GlassTabs = createPreactGlassComponent("tabs");
export const GlassResizablePanel = createPreactGlassComponent("resizable-panel");
export const GlassSpotlightOverlay = createPreactGlassComponent("spotlight-overlay");
export const GlassNotificationCenter = createPreactGlassComponent("notification-center");
export const GlassInspector = createPreactGlassComponent("inspector");
export const GlassTerminal = createPreactGlassComponent("terminal");
export const GlassInput = createPreactGlassComponent("input");
export const GlassBadge = createPreactGlassComponent("badge");
export const GlassDock = createPreactGlassComponent("dock");
export const GlassHero = createPreactGlassComponent("hero");
export const GlassWorkspace = createPreactGlassComponent("workspace");
export const GlassForm = createPreactGlassComponent("form");
export const GlassPopover = createPreactGlassComponent("popover");

export function createGlassPreactComponent(name) {
  return createPreactGlassComponent(name);
}
