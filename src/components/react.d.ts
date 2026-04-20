import type { CSSProperties, ElementType, ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import type { GlassConfig, RuntimeOptions } from "../index.js";

export interface GlassComponentReactProps {
  as?: ElementType;
  input?: GlassConfig | string;
  runtimeOptions?: RuntimeOptions;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
}

export type GlassReactComponent = ForwardRefExoticComponent<GlassComponentReactProps & RefAttributes<Element>>;

export const GlassPanel: GlassReactComponent;
export const GlassCard: GlassReactComponent;
export const GlassButton: GlassReactComponent;
export const GlassNavbar: GlassReactComponent;
export const GlassSidebar: GlassReactComponent;
export const GlassModal: GlassReactComponent;
export const GlassDialog: GlassReactComponent;
export const GlassToolbar: GlassReactComponent;
export const GlassCommandBar: GlassReactComponent;
export const GlassCommandPalette: GlassReactComponent;
export const GlassTable: GlassReactComponent;
export const GlassDataGrid: GlassReactComponent;
export const GlassChart: GlassReactComponent;
export const GlassTimeline: GlassReactComponent;
export const GlassKanban: GlassReactComponent;
export const GlassCalendar: GlassReactComponent;
export const GlassCombobox: GlassReactComponent;
export const GlassDropdown: GlassReactComponent;
export const GlassToast: GlassReactComponent;
export const GlassTabs: GlassReactComponent;
export const GlassResizablePanel: GlassReactComponent;
export const GlassSpotlightOverlay: GlassReactComponent;
export const GlassNotificationCenter: GlassReactComponent;
export const GlassInspector: GlassReactComponent;
export const GlassTerminal: GlassReactComponent;
export const GlassInput: GlassReactComponent;
export const GlassBadge: GlassReactComponent;
export const GlassDock: GlassReactComponent;
export const GlassHero: GlassReactComponent;
export const GlassWorkspace: GlassReactComponent;
export const GlassForm: GlassReactComponent;
export const GlassPopover: GlassReactComponent;

export function createGlassReactComponent(name: string): GlassReactComponent;
