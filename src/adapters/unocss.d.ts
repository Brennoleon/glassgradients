import type { GlassConfig } from "../index.js";
import type { GlassAdapterCatalogOptions } from "./tailwind.js";

export function createGlassUnoClass(className: string, input?: GlassConfig | string): string;
export function createGlassUnoCss(options?: GlassAdapterCatalogOptions): string;
export function createGlassUnoShortcuts(options?: GlassAdapterCatalogOptions): Record<string, string>;
export function createGlassUnoPreset(options?: GlassAdapterCatalogOptions): {
  name: string;
  shortcuts: Record<string, string>;
  preflights: Array<{
    layer: string;
    getCSS(): string;
  }>;
};
export function createGlassUnoTheme(
  selector?: string,
  input?: GlassConfig | string,
  options?: GlassConfig & { minify?: boolean }
): string;
