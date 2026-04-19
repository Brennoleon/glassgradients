import type { Accessor, Memo } from "solid-js";
import type { GlassConfig, GlassThemeTokens, RuntimeInstance, RuntimeGroup, RuntimeOptions, ThemeScriptOptions } from "../index.js";

type MaybeAccessor<T> = T | Accessor<T>;
type GlassPayload = { input?: GlassConfig | string; runtimeOptions?: RuntimeOptions } | GlassConfig | string;

export function useGlassGradient(
  target: Accessor<Element | null> | (() => Element | null),
  input?: MaybeAccessor<GlassConfig | string>,
  runtimeOptions?: MaybeAccessor<RuntimeOptions>
): Accessor<RuntimeInstance | RuntimeGroup | null>;

export function createGlassStyle(input?: MaybeAccessor<GlassConfig | string>): Memo<Record<string, string>>;
export function createGlassTokens(input?: MaybeAccessor<GlassConfig | string>): Memo<GlassThemeTokens>;
export function glass(node: HTMLElement, value?: MaybeAccessor<GlassPayload>): void;
export function createGlassThemeBootstrap(options?: ThemeScriptOptions): string;
