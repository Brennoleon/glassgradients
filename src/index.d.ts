export type GlassEffect = "mesh" | "aurora" | "spotlight" | "plasma" | "prism";
export type GlassPreset = "default" | "cinematic" | "frosted" | "soft";
export type GlassPerformance = "auto" | "quality" | "balanced" | "eco" | "potato";
export type AnimateMode = "wave" | "pulse" | "orbit";

export interface AnimateConfig {
  enabled?: boolean;
  mode?: AnimateMode | string;
  hueShift?: number;
  drift?: string | number;
  dfirt?: string | number;
  speedMultiplier?: number;
  fps?: number;
  easing?: string;
}

export interface GrainConfig {
  enabled?: boolean;
  amount?: number;
  size?: string | number;
  blend?: string;
  motion?: number;
}

export interface VisibilityConfig {
  rootMargin?: string;
  threshold?: number;
}

export interface GlassConfig {
  selector?: string;
  preset?: GlassPreset | string;
  palette?: string;
  effect?: GlassEffect | string;
  performance?: GlassPerformance | string;
  intensity?: number;
  frost?: number;
  vignette?: number;
  shadow?: number;
  tint?: string;
  blur?: string | number;
  opacity?: number;
  saturation?: string | number;
  contrast?: string | number;
  brightness?: string | number;
  radius?: string | number;
  blendMode?: string;
  monochrome?: boolean;
  speed?: string | number;
  colors?: string[] | string;
  layerInset?: string;
  grain?: GrainConfig;
  animate?: AnimateConfig;
  visibility?: VisibilityConfig;
}

export interface RuntimeInstance {
  element: Element;
  config: GlassConfig;
  destroy(): void;
  update(nextInput?: GlassConfig | string): void;
}

export interface RuntimeGroup {
  instances: RuntimeInstance[];
  destroy(): void;
  update(nextInput?: GlassConfig | string): void;
}

export interface RuntimeOptions {
  threaded?: boolean;
  rootMargin?: string;
  threshold?: number;
  reduceMotion?: boolean;
}

export function parseGlass(source: string): GlassConfig;
export function parseGlassFile(filePath: string, encoding?: BufferEncoding): Promise<GlassConfig>;

export function compileGlass(input: string | GlassConfig, options?: GlassConfig & { minify?: boolean }): string;
export function compileGlassFile(
  filePath: string,
  options?: GlassConfig & { minify?: boolean },
  encoding?: BufferEncoding
): Promise<string>;

export function createGlassGradient(
  target: string | Element | NodeListOf<Element> | Element[],
  input?: GlassConfig | string,
  runtimeOptions?: RuntimeOptions
): RuntimeInstance | RuntimeGroup;

export function applyGlassGradient(
  target: string | Element | NodeListOf<Element> | Element[],
  input?: GlassConfig | string,
  runtimeOptions?: RuntimeOptions
): RuntimeInstance | RuntimeGroup;

export function compileRuntimeInlineStyle(input?: GlassConfig | string): Record<string, string>;

export const DEFAULT_CONFIG: Required<GlassConfig>;
export const PALETTES: Record<string, string[]>;
export const PRESETS: Record<string, GlassConfig>;
export const PERFORMANCE_PRESETS: Record<string, Record<string, string | number>>;

export function normalizeConfig(input?: GlassConfig | string, runtimeHints?: Record<string, unknown>): GlassConfig;
