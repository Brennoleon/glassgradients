import type { CSSProperties, ElementType, ForwardRefExoticComponent, ReactElement, ReactNode, RefAttributes, RefObject } from "react";
import type { GlassConfig, GlassThemeTokens, RuntimeInstance, RuntimeGroup, RuntimeOptions, ThemeScriptOptions } from "../index.js";

export function useGlassGradient(
  targetRef: RefObject<Element | null>,
  input?: GlassConfig | string,
  runtimeOptions?: RuntimeOptions
): RefObject<RuntimeInstance | RuntimeGroup | null>;

export function useGlassStyle(input?: GlassConfig | string): CSSProperties;
export function useGlassTokens(input?: GlassConfig | string): GlassThemeTokens;

export interface GlassSurfaceProps {
  as?: ElementType;
  input?: GlassConfig | string;
  runtimeOptions?: RuntimeOptions;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
}

export const GlassSurface: ForwardRefExoticComponent<GlassSurfaceProps & RefAttributes<Element>>;
export function GlassThemeScript(props?: ThemeScriptOptions): ReactElement;
