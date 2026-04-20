import type { GlassConfig } from "../index.js";

export interface GlassShadcnComponentSpecOptions {
  name?: string;
  filePrefix?: string;
  componentName?: string;
  className?: string;
  classPrefix?: string;
  importBase?: string;
  cnImport?: string;
  children?: string;
  input?: GlassConfig | string;
  cssOptions?: GlassConfig & { minify?: boolean };
  minify?: boolean;
}

export interface GlassShadcnCatalogOptions extends Omit<GlassShadcnComponentSpecOptions, "name" | "componentName" | "className" | "children"> {
  include?: string[];
}

export interface GlassShadcnComponentSpec {
  name: string;
  componentName: string;
  glassComponent: string;
  import: string;
  className: string;
  css: string;
  usage: string;
  source: string;
  recipe: string;
  tag: string;
  attrs: Record<string, string>;
}

export function createGlassShadcnComponentSpec(name?: string, options?: GlassShadcnComponentSpecOptions): GlassShadcnComponentSpec;
export function createGlassShadcnCatalog(options?: GlassShadcnCatalogOptions): Record<string, GlassShadcnComponentSpec>;
export function createGlassShadcnCss(options?: GlassShadcnCatalogOptions): string;
