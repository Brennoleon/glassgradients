import type { ComponentChildren, Ref, RefObject, VNode } from "preact";
import type { GlassConfig, GlassThemeTokens, RuntimeInstance, RuntimeGroup, RuntimeOptions, ThemeScriptOptions } from "../index.js";

export function useGlassGradient(
  targetRef: RefObject<Element | null>,
  input?: GlassConfig | string,
  runtimeOptions?: RuntimeOptions
): RefObject<RuntimeInstance | RuntimeGroup | null>;

export function useGlassStyle(input?: GlassConfig | string): Record<string, string>;
export function useGlassTokens(input?: GlassConfig | string): GlassThemeTokens;

export interface GlassSurfaceProps {
  as?: string | ((props: Record<string, unknown>) => VNode);
  input?: GlassConfig | string;
  runtimeOptions?: RuntimeOptions;
  style?: Record<string, string>;
  children?: ComponentChildren;
  elementRef?: Ref<Element>;
  [key: string]: unknown;
}

export function GlassSurface(props: GlassSurfaceProps): VNode;
export function GlassThemeScript(props?: ThemeScriptOptions): VNode;
