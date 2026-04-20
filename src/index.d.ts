export type GlassEffect = "mesh" | "aurora" | "spotlight" | "plasma" | "prism" | "halo" | "ribbon" | "bloom" | "caustic" | "liquid" | "nebula" | "iridescent" | "conic" | "noise";
export type GlassPreset = "default" | "cinematic" | "frosted" | "soft" | "editor" | "crystal" | "smoke";
export type GlassRecipe = "panel" | "navbar" | "sidebar" | "modal" | "toolbar" | "badge" | "hero" | "card" | "button" | "popover" | "dock" | "input" | "workspace" | "form" | "command-palette" | "dialog" | "table" | "inspector" | "terminal" | "command-bar";
export type GlassPerformance = "auto" | "quality" | "balanced" | "eco" | "potato" | "static";
export type AnimateMode = "wave" | "pulse" | "orbit";
export type GlassMode = "surface" | "gradient" | "frost";
export type GlassStrength = "soft" | "medium" | "strong";
export type ContrastMode = "balanced" | "safe";
export type GlassScheme = "light" | "dark";
export type GlassMainFilter = "standard" | "none" | "blur-filters";

export interface GlassRecipeContract {
  name: string;
  role: string;
  density: string;
  emphasis: string;
  interaction: string;
  recommendedMode: string;
  recommendedStrength: string;
  recommendedPerformance: string;
}

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

export interface EngineUpFrame {
  at?: string;
  offset?: string;
  x?: string | number;
  y?: string | number;
  translateX?: string | number;
  translateY?: string | number;
  scale?: number;
  rotate?: string | number;
  opacity?: number;
  blur?: string | number;
  brightness?: string | number;
  saturation?: string | number;
  contrast?: string | number;
  hueRotate?: string | number;
}

export interface EngineUpConfig {
  enabled?: boolean;
  duration?: string | number;
  easing?: string;
  direction?: string;
  iteration?: string | number;
  fillMode?: string;
  x?: string | number;
  y?: string | number;
  translateX?: string | number;
  translateY?: string | number;
  scale?: number;
  rotate?: string | number;
  opacity?: number;
  blur?: string | number;
  brightness?: string | number;
  saturation?: string | number;
  contrast?: string | number;
  hueRotate?: string | number;
  frames?: EngineUpFrame[];
}

export interface MotionBlurrinLayer {
  count?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  direction?: "right" | "left" | "up" | "down" | "diagonal" | "drift" | "orbit" | "liquid" | string;
  opacity?: number;
  color?: string;
}

export interface MotionBlurrinConfig {
  enabled?: boolean;
  layers?: MotionBlurrinLayer[];
  blur?: string | number;
  openness?: number;
  edgeFade?: number;
  opacity?: number;
  blend?: string;
  direction?: "right" | "left" | "up" | "down" | "diagonal" | "drift" | "orbit" | "liquid" | string;
  duration?: string | number;
  easing?: string;
}

export interface NormalizedEngineUpConfig {
  enabled: boolean;
  duration: string;
  easing: string;
  direction: string;
  iteration: string;
  fillMode: string;
  x: string;
  y: string;
  scale: number;
  rotate: string;
  opacity: string;
  blur: string;
  brightness: string;
  saturation: string;
  contrast: string;
  hueRotate: string;
  frames: Required<Omit<EngineUpFrame, "offset" | "translateX" | "translateY">>[];
}

export interface NormalizedMotionBlurrinLayer {
  count: number;
  minSize: number;
  maxSize: number;
  speed: number;
  direction: string;
  opacity: number;
  color: string;
}

export interface NormalizedMotionBlurrinConfig extends Required<Omit<MotionBlurrinConfig, "layers" | "duration" | "blur">> {
  layers: NormalizedMotionBlurrinLayer[];
  blur: string;
  duration: string;
  animated: boolean;
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

export interface GlassMonitoringConfig {
  enabled?: boolean;
  engine?: "MER" | string;
  strategy?: "auto" | string;
  minPerformance?: GlassPerformance | string;
}

export interface NormalizedGlassMonitoringConfig {
  enabled: boolean;
  engine: string;
  strategy: string;
  score: number;
  tier: string;
  reason: string;
  recommendedPerformance: string;
  reduced: boolean;
}

export interface ShineConfig {
  enabled?: boolean;
  opacity?: number;
  angle?: string | number;
  blend?: string;
}

export interface InteractiveConfig {
  enabled?: boolean;
  glare?: number;
  radius?: string | number;
  blend?: string;
}

export interface GradientConfig {
  enabled?: boolean;
  palette?: string;
  effect?: GlassEffect | string;
  intensity?: number;
  opacity?: number;
  tint?: string;
  blur?: string | number;
  saturation?: string | number;
  contrast?: string | number;
  brightness?: string | number;
  blendMode?: string;
  inset?: string;
  colors?: string[] | string;
  monochrome?: boolean;
}

export interface FrostedGlassConfig {
  enabled?: boolean;
  frost?: number;
  blur?: string | number;
  saturation?: string | number;
  contrast?: string | number;
  brightness?: string | number;
  opacity?: number;
  fill?: string;
  fillSecondary?: string;
  fallbackFill?: string;
  fallbackSecondary?: string;
  fillAngle?: string | number;
  strokeWidth?: string | number;
  strokeOpacity?: number;
  strokeColor?: string;
  highlight?: number;
  innerGlow?: number;
  shadow?: number;
  mainFilter?: GlassMainFilter | string;
  heavyFilter?: boolean;
}

export interface GlassResponsiveConfig {
  sm?: GlassConfig;
  md?: GlassConfig;
  lg?: GlassConfig;
  xl?: GlassConfig;
  "2xl"?: GlassConfig;
  [mediaQuery: string]: GlassConfig | undefined;
}

export interface GlassSchemeConfig {
  light?: GlassConfig;
  dark?: GlassConfig;
}

export interface GlassConfig {
  selector?: string;
  preset?: GlassPreset | string;
  recipe?: GlassRecipe | string;
  mode?: GlassMode | string;
  strength?: GlassStrength | string;
  contrastMode?: ContrastMode | string;
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
  zIndex?: string | number;
  isolate?: boolean;
  mainFilter?: GlassMainFilter | string;
  "main-filter"?: GlassMainFilter | string;
  monitoring?: GlassMonitoringConfig | boolean;
  engineUp?: EngineUpConfig | boolean;
  "engine-up"?: EngineUpConfig | boolean;
  motionBlurrin?: MotionBlurrinConfig | boolean;
  motionBlur?: MotionBlurrinConfig | boolean;
  "motion-blurrin"?: MotionBlurrinConfig | boolean;
  responsive?: GlassResponsiveConfig;
  scheme?: GlassSchemeConfig;
  grain?: GrainConfig;
  shine?: ShineConfig;
  interactive?: InteractiveConfig;
  animate?: AnimateConfig;
  visibility?: VisibilityConfig;
  gradient?: GradientConfig | boolean;
  glass?: FrostedGlassConfig | boolean;
}

export interface NormalizedGlassConfig extends GlassConfig {
  selector: string;
  preset: string;
  recipe: string;
  mode: string;
  strength: string;
  contrastMode: string;
  palette: string;
  effect: string;
  performance: string;
  intensity: number;
  frost: number;
  vignette: number;
  shadow: number;
  tint: string;
  blur: string;
  opacity: number;
  saturation: string;
  contrast: string;
  brightness: string;
  radius: string;
  blendMode: string;
  monochrome: boolean;
  speed: string;
  colors: string[];
  layerInset: string;
  frameStep: number;
  fpsCap: number;
  mainFilter: string;
  monitoring: NormalizedGlassMonitoringConfig;
  engineUp: NormalizedEngineUpConfig;
  motionBlurrin: NormalizedMotionBlurrinConfig;
  zIndex: string;
  isolate: boolean;
  responsive: GlassResponsiveConfig;
  scheme: GlassSchemeConfig;
  visibility: Required<VisibilityConfig>;
  grain: Required<GrainConfig>;
  shine: Required<ShineConfig>;
  interactive: Required<InteractiveConfig>;
  animate: Required<AnimateConfig>;
  gradient: Required<GradientConfig>;
  glass: Required<FrostedGlassConfig>;
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
  monitoringHints?: Record<string, unknown>;
}

export interface ThemeScriptOptions {
  attribute?: string;
  storageKey?: string;
  defaultMode?: "light" | "dark" | "system";
}

export interface GlassThemeTokens {
  recipe: string;
  strength: string;
  mode: string;
  contrastMode: string;
  contract: GlassRecipeContract;
  radius: string;
  zIndex: string;
  surface: {
    fill: string;
    fallbackFill: string;
    border: string;
    shadow: string;
    backdropFilter: string;
  };
  gradient: {
    background: string;
    blendMode: string;
    opacity: string;
    filter: string;
    inset: string;
  };
  ornament: {
    background: string;
    blendMode: string;
    opacity: string;
  };
  palette: string[];
}

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

export function parseGlass(source: string): GlassConfig;
export function parseGlassFile(filePath: string, encoding?: BufferEncoding): Promise<GlassConfig>;

export function compileGlass(input: string | GlassConfig, options?: GlassConfig & { minify?: boolean }): string;
export function compileGlassFile(
  filePath: string,
  options?: GlassConfig & { minify?: boolean },
  encoding?: BufferEncoding
): Promise<string>;

export function compileGlassTheme(selector?: string, input?: GlassConfig | string, options?: GlassConfig & { minify?: boolean }): string;
export function createGlassThemeScript(options?: ThemeScriptOptions): string;
export function createGlassTokens(input?: GlassConfig | string): GlassThemeTokens;

export function listGlassComponents(): string[];
export function getGlassComponent(name?: string): GlassComponentDefinition;
export function createGlassComponentConfig(name?: string, input?: GlassConfig | string): GlassConfig;
export function createGlassComponentTokens(name?: string, input?: GlassConfig | string): GlassThemeTokens;
export function createGlassComponentProps(name?: string, options?: GlassComponentOptions): GlassComponentResolvedProps;
export function createGlassComponentCss(name?: string, selector?: string, input?: GlassConfig | string, options?: GlassConfig & { minify?: boolean }): string;
export function createGlassComponentCatalog(options?: GlassComponentCatalogOptions): Record<string, GlassComponentDefinition & { selector: string; input: GlassConfig; css: string }>;
export function createGlassComponentCatalogCss(options?: GlassComponentCatalogOptions): string;

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

export const DEFAULT_CONFIG: NormalizedGlassConfig;
export const BREAKPOINTS: Record<string, string>;
export const PALETTES: Record<string, string[]>;
export const PRESETS: Record<string, GlassConfig>;
export const RECIPES: Record<string, GlassConfig>;
export const RECIPE_CONTRACTS: Record<string, GlassRecipeContract>;
export const GLASS_COMPONENTS: Record<string, GlassComponentDefinition>;
export const GLASS_COMPONENT_ALIASES: Record<string, string>;
export const PERFORMANCE_PRESETS: Record<string, Record<string, string | number | boolean>>;
export const MER_TIERS: Record<string, { performance: string; reason: string; minScore: number }>;
export const EFFECT_COMPLEXITY: Record<string, number>;

export function normalizeConfig(input?: GlassConfig | string, runtimeHints?: Record<string, unknown>): NormalizedGlassConfig;
export function getRecipeContract(recipe?: string, fallbackConfig?: Partial<Pick<GlassConfig, "recipe" | "mode" | "strength" | "performance">>): GlassRecipeContract;
