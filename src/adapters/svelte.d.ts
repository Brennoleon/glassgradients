import type { GlassConfig, GlassThemeTokens, RuntimeOptions, ThemeScriptOptions } from "../index.js";

export function glass(
  node: HTMLElement,
  value?: { input?: GlassConfig | string; runtimeOptions?: RuntimeOptions } | GlassConfig | string
): {
  update(nextValue?: { input?: GlassConfig | string; runtimeOptions?: RuntimeOptions } | GlassConfig | string): void;
  destroy(): void;
};

export function glassStyle(input?: GlassConfig | string): Record<string, string>;
export function glassTokens(input?: GlassConfig | string): GlassThemeTokens;
export function glassThemeScript(options?: ThemeScriptOptions): string;
