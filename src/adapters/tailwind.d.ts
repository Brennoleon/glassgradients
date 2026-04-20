import type { GlassConfig } from "../index.js";

export interface GlassAdapterCatalogOptions {
  prefix?: string;
  includePresets?: boolean;
  includeRecipes?: boolean;
  includeStrengths?: boolean;
  includeContracts?: boolean;
  classes?: Record<string, GlassConfig | string>;
}

export interface GlassTailwindV4Options extends GlassAdapterCatalogOptions {
  includeImport?: boolean;
  importStatement?: string;
  includeTheme?: boolean;
  includeUtilities?: boolean;
  includeKeyframes?: boolean;
  minify?: boolean;
  themeName?: string;
  themeDirective?: string;
  themeTokens?: Record<string, string>;
}

export function createGlassTailwindClass(className: string, input?: GlassConfig | string): Record<string, unknown>;
export function createGlassTailwindComponents(options?: GlassAdapterCatalogOptions): Record<string, unknown>;
export function createGlassTailwindSafelist(options?: GlassAdapterCatalogOptions): string[];
export function createGlassTailwindPlugin(
  pluginFactory: (handler: (api: { addComponents(components: Record<string, unknown>): void }) => void) => unknown,
  options?: GlassAdapterCatalogOptions
): unknown;
export function createGlassTailwindTheme(
  selector?: string,
  input?: GlassConfig | string,
  options?: GlassConfig & { minify?: boolean }
): string;
export function createGlassTailwindV4Utility(className: string, input?: GlassConfig | string, options?: Pick<GlassTailwindV4Options, "minify">): string;
export function createGlassTailwindV4Keyframes(options?: Pick<GlassTailwindV4Options, "minify">): string;
export function createGlassTailwindV4Theme(options?: Pick<GlassTailwindV4Options, "minify" | "themeName" | "themeDirective" | "themeTokens">): string;
export function createGlassTailwindV4Utilities(options?: GlassTailwindV4Options): string;
export function createGlassTailwindV4Css(options?: GlassTailwindV4Options): string;
export function createGlassTailwindV4Preset(options?: GlassTailwindV4Options): {
  name: "glassgradients-tailwind-v4";
  css: string;
  theme: string;
  utilities: string;
  safelist: string[];
  usage: string;
};
