import type { ComponentChildren, Ref, VNode } from "preact";
import type { GlassConfig, RuntimeOptions } from "../index.js";

export interface GlassComponentPreactProps {
  as?: string | ((props: Record<string, unknown>) => VNode);
  input?: GlassConfig | string;
  runtimeOptions?: RuntimeOptions;
  className?: string;
  style?: Record<string, string>;
  children?: ComponentChildren;
  elementRef?: Ref<Element>;
  [key: string]: unknown;
}

export type GlassPreactComponent = (props: GlassComponentPreactProps) => VNode;

export const GlassPanel: GlassPreactComponent;
export const GlassCard: GlassPreactComponent;
export const GlassButton: GlassPreactComponent;
export const GlassNavbar: GlassPreactComponent;
export const GlassSidebar: GlassPreactComponent;
export const GlassModal: GlassPreactComponent;
export const GlassDialog: GlassPreactComponent;
export const GlassToolbar: GlassPreactComponent;
export const GlassCommandBar: GlassPreactComponent;
export const GlassCommandPalette: GlassPreactComponent;
export const GlassTable: GlassPreactComponent;
export const GlassDataGrid: GlassPreactComponent;
export const GlassChart: GlassPreactComponent;
export const GlassTimeline: GlassPreactComponent;
export const GlassKanban: GlassPreactComponent;
export const GlassCalendar: GlassPreactComponent;
export const GlassCombobox: GlassPreactComponent;
export const GlassDropdown: GlassPreactComponent;
export const GlassToast: GlassPreactComponent;
export const GlassTabs: GlassPreactComponent;
export const GlassResizablePanel: GlassPreactComponent;
export const GlassSpotlightOverlay: GlassPreactComponent;
export const GlassNotificationCenter: GlassPreactComponent;
export const GlassInspector: GlassPreactComponent;
export const GlassTerminal: GlassPreactComponent;
export const GlassInput: GlassPreactComponent;
export const GlassBadge: GlassPreactComponent;
export const GlassDock: GlassPreactComponent;
export const GlassHero: GlassPreactComponent;
export const GlassWorkspace: GlassPreactComponent;
export const GlassForm: GlassPreactComponent;
export const GlassPopover: GlassPreactComponent;

export function createGlassPreactComponent(name: string): GlassPreactComponent;
