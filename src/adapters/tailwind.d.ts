import type { GlassConfig } from "../index.js";

export interface GlassAdapterCatalogOptions {
  prefix?: string;
  includePresets?: boolean;
  includeRecipes?: boolean;
  includeStrengths?: boolean;
  includeContracts?: boolean;
  classes?: Record<string, GlassConfig | string>;
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
