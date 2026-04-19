import type { GlassConfig, RuntimeOptions, ThemeScriptOptions } from "../index.js";

export interface NuxtGlassHeadOptions {
  script?: boolean;
  style?: boolean;
  scriptId?: string;
  styleId?: string;
  selector?: string;
  input?: GlassConfig | string;
  themeOptions?: ThemeScriptOptions;
  cssOptions?: GlassConfig & { minify?: boolean };
}

export function createNuxtGlassDirective(defaultRuntimeOptions?: RuntimeOptions): Record<string, unknown>;
export function createNuxtGlassPlugin(options?: { directiveName?: string; runtimeOptions?: RuntimeOptions }): {
  install(app: { directive(name: string, directive: Record<string, unknown>): void }): void;
};
export function createNuxtGlassHead(options?: NuxtGlassHeadOptions): {
  script?: Array<Record<string, string>>;
  style?: Array<Record<string, string>>;
};
export function createNuxtGlassStaticCss(selector: string, input?: GlassConfig | string, options?: GlassConfig & { minify?: boolean }): string;
export function createNuxtGlassThemeCss(selector?: string, input?: GlassConfig | string, options?: GlassConfig & { minify?: boolean }): string;
