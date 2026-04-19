import { createElement, forwardRef } from "react";
import { createGlassComponentProps } from "../components.js";
import { GlassSurface } from "../adapters/react.js";

function createReactGlassComponent(name) {
  return forwardRef(function ReactGlassComponent(props = {}, ref) {
    const {
      as,
      input,
      runtimeOptions,
      className,
      style,
      children,
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
        ...component.attrs,
        ref
      },
      children
    );
  });
}

export const GlassPanel = createReactGlassComponent("panel");
export const GlassCard = createReactGlassComponent("card");
export const GlassButton = createReactGlassComponent("button");
export const GlassNavbar = createReactGlassComponent("navbar");
export const GlassSidebar = createReactGlassComponent("sidebar");
export const GlassModal = createReactGlassComponent("modal");
export const GlassDialog = createReactGlassComponent("dialog");
export const GlassToolbar = createReactGlassComponent("toolbar");
export const GlassCommandBar = createReactGlassComponent("command-bar");
export const GlassCommandPalette = createReactGlassComponent("command-palette");
export const GlassTable = createReactGlassComponent("table");
export const GlassInspector = createReactGlassComponent("inspector");
export const GlassTerminal = createReactGlassComponent("terminal");
export const GlassInput = createReactGlassComponent("input");
export const GlassBadge = createReactGlassComponent("badge");
export const GlassDock = createReactGlassComponent("dock");
export const GlassHero = createReactGlassComponent("hero");
export const GlassWorkspace = createReactGlassComponent("workspace");
export const GlassForm = createReactGlassComponent("form");
export const GlassPopover = createReactGlassComponent("popover");

export function createGlassReactComponent(name) {
  return createReactGlassComponent(name);
}
