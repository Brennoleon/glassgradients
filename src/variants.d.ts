import type { GlassConfig } from "./index.js";

export const BREAKPOINTS: Record<string, string>;

export interface GlassVariantEntry {
  kind: "responsive" | "scheme";
  key: string;
  query: string;
  input: GlassConfig;
}

export function stripVariantConfig<T extends Record<string, unknown>>(input: T): Omit<T, "responsive" | "scheme">;
export function resolveMediaQuery(key: string): string;
export function collectVariantEntries(input?: GlassConfig): GlassVariantEntry[];
export function evaluateVariantInput(
  input: GlassConfig,
  mergeDeep: (base: GlassConfig, extra: GlassConfig) => GlassConfig,
  matchMediaFn?: (query: string) => { matches: boolean }
): GlassConfig;
