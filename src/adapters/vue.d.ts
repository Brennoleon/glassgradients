import type { ComputedRef, Directive, ShallowRef } from "vue";
import type { GlassConfig, GlassThemeTokens, RuntimeInstance, RuntimeGroup, RuntimeOptions, ThemeScriptOptions } from "../index.js";

export function useGlassGradient(
  targetRef: { value: Element | null } | (() => Element | null),
  input?: GlassConfig | string | { value: GlassConfig | string },
  runtimeOptions?: RuntimeOptions | { value: RuntimeOptions }
): ShallowRef<RuntimeInstance | RuntimeGroup | null>;

export function useGlassStyle(input?: GlassConfig | string | { value: GlassConfig | string }): ComputedRef<Record<string, string>>;
export function useGlassTokens(input?: GlassConfig | string | { value: GlassConfig | string }): ComputedRef<GlassThemeTokens>;
export function createGlassDirective(defaultRuntimeOptions?: RuntimeOptions): Directive;
export function createGlassThemeBootstrap(options?: ThemeScriptOptions): string;
