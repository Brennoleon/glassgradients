import type { GlassConfig, RuntimeOptions, ThemeScriptOptions } from "../index.js";

export interface NextGlassThemeScriptOptions extends ThemeScriptOptions {
  id?: string;
  strategy?: "beforeInteractive" | "afterInteractive" | "lazyOnload" | "worker" | string;
  nonce?: string;
}

export interface NextGlassStyleOptions extends GlassConfig {
  id?: string;
  nonce?: string;
  minify?: boolean;
}

export function createNextGlassThemeScriptProps(options?: NextGlassThemeScriptOptions): {
  id: string;
  strategy: string;
  nonce?: string;
  dangerouslySetInnerHTML: { __html: string };
};

export function createNextGlassStyleProps(
  selector?: string,
  input?: GlassConfig | string,
  options?: NextGlassStyleOptions
): {
  id: string;
  nonce?: string;
  dangerouslySetInnerHTML: { __html: string };
};

export function createNextGlassSurfaceProps(
  input?: GlassConfig | string,
  options?: RuntimeOptions & { suppressHydrationWarning?: boolean }
): {
  style: Record<string, string>;
  suppressHydrationWarning: boolean;
};

export function createNextGlassStaticCss(selector: string, input?: GlassConfig | string, options?: GlassConfig & { minify?: boolean }): string;
export function createNextGlassThemeCss(selector?: string, input?: GlassConfig | string, options?: GlassConfig & { minify?: boolean }): string;
