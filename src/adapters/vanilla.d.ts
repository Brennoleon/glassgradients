import type { GlassConfig, GlassThemeTokens, RuntimeInstance, RuntimeGroup, RuntimeOptions, ThemeScriptOptions } from "../index.js";

export function resolveGlassInput(input?: GlassConfig | string | (() => GlassConfig | string)): GlassConfig;
export function mergeGlassInputs(base?: GlassConfig | string, extra?: GlassConfig | string): GlassConfig;
export function createGlassStyleObject(input?: GlassConfig | string): Record<string, string>;
export function createGlassTokenObject(input?: GlassConfig | string): GlassThemeTokens;
export function createGlassThemeBootstrap(options?: ThemeScriptOptions): string;
export function mountGlass(target: string | Element | NodeListOf<Element> | Element[], input?: GlassConfig | string, runtimeOptions?: RuntimeOptions): RuntimeInstance | RuntimeGroup;
export function stableSerialize(value: unknown): string;
