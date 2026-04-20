export {
  DEFAULT_CONFIG,
  EFFECT_COMPLEXITY,
  MER_TIERS,
  PALETTES,
  PERFORMANCE_PRESETS,
  PRESETS,
  RECIPES,
  RECIPE_CONTRACTS,
  getRecipeContract,
  normalizeConfig
} from "./index.js";

export function clamp(value: number, min: number, max: number): number;
export function toCssUnit(value: unknown, fallback: string): string;
export function toPercentUnit(value: unknown, fallback: string): string;
export function toNumber(value: unknown, fallback: number): number;
export function toBoolean(value: unknown, fallback: boolean): boolean;
export function mergeDeep<T extends Record<string, unknown>, U extends Record<string, unknown>>(base: T, extra: U): T & U;
export function resolveColors(config: { palette?: string; colors?: string[] | string }): string[];
