import type { GlassConfig, ThemeScriptOptions } from "../index.js";

export interface AstroGlassTagOptions extends GlassConfig {
  id?: string;
  nonce?: string;
  minify?: boolean;
}

export interface AstroGlassHeadOptions {
  selector?: string;
  input?: GlassConfig | string;
  includeThemeScript?: boolean;
  includeThemeStyle?: boolean;
  themeOptions?: ThemeScriptOptions & { id?: string; nonce?: string };
  styleOptions?: AstroGlassTagOptions;
}

export function createAstroGlassStyleTag(selector: string, input?: GlassConfig | string, options?: AstroGlassTagOptions): string;
export function createAstroGlassThemeStyleTag(selector?: string, input?: GlassConfig | string, options?: AstroGlassTagOptions): string;
export function createAstroGlassThemeScriptTag(options?: ThemeScriptOptions & { id?: string; nonce?: string }): string;
export function createAstroGlassHead(options?: AstroGlassHeadOptions): string;
export function createAstroGlassStyleObject(input?: GlassConfig | string): Record<string, string>;
