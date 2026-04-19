import type { GlassConfig, GlassRecipe, GlassRecipeContract, GlassThemeTokens, RuntimeOptions } from "./index.js";

export interface GlassComponentDefinition {
  name: string;
  displayName: string;
  tag: string;
  className: string;
  recipe: GlassRecipe | string;
  attrs: Record<string, string>;
}

export interface GlassComponentOptions {
  input?: GlassConfig | string;
  className?: string;
  style?: Record<string, string>;
  attrs?: Record<string, unknown>;
  runtimeOptions?: RuntimeOptions;
  includeStyle?: boolean;
  includeDataAttributes?: boolean;
}

export interface GlassComponentResolvedProps {
  name: string;
  displayName: string;
  tag: string;
  recipe: string;
  input: GlassConfig;
  runtimeOptions: RuntimeOptions;
  className: string;
  style: Record<string, string>;
  attrs: Record<string, unknown>;
  tokens: GlassThemeTokens;
  contract: GlassRecipeContract;
}

export interface GlassComponentCatalogOptions {
  include?: string[];
  input?: GlassConfig | string;
  prefix?: string;
  suffix?: string;
  minify?: boolean;
}

export const GLASS_COMPONENTS: Record<string, GlassComponentDefinition>;
export const GLASS_COMPONENT_ALIASES: Record<string, string>;

export function listGlassComponents(): string[];
export function getGlassComponent(name?: string): GlassComponentDefinition;
export function createGlassComponentConfig(name?: string, input?: GlassConfig | string): GlassConfig;
export function createGlassComponentTokens(name?: string, input?: GlassConfig | string): GlassThemeTokens;
export function createGlassComponentProps(name?: string, options?: GlassComponentOptions): GlassComponentResolvedProps;
export function createGlassComponentCss(name?: string, selector?: string, input?: GlassConfig | string, options?: GlassConfig & { minify?: boolean }): string;
export function createGlassComponentCatalog(options?: GlassComponentCatalogOptions): Record<string, GlassComponentDefinition & { selector: string; input: GlassConfig; css: string }>;
export function createGlassComponentCatalogCss(options?: GlassComponentCatalogOptions): string;
