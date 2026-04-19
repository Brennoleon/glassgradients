import test from "node:test";
import assert from "node:assert/strict";
import { createAstroGlassHead, createAstroGlassStyleObject, createAstroGlassStyleTag } from "../src/adapters/astro.js";
import { createNextGlassStaticCss, createNextGlassStyleProps, createNextGlassSurfaceProps, createNextGlassThemeScriptProps } from "../src/adapters/next.js";
import { createNuxtGlassHead, createNuxtGlassPlugin, createNuxtGlassStaticCss } from "../src/adapters/nuxt.js";

test("next adapter returns SSR-safe script and style props", () => {
  const script = createNextGlassThemeScriptProps({ storageKey: "gg-theme", nonce: "abc" });
  const style = createNextGlassStyleProps(":root", { recipe: "workspace" }, { minify: true });
  const surface = createNextGlassSurfaceProps({ recipe: "dialog" });
  const css = createNextGlassStaticCss(".next-panel", "recipe: panel", { minify: true });

  assert.equal(script.strategy, "beforeInteractive");
  assert.equal(script.nonce, "abc");
  assert.match(script.dangerouslySetInnerHTML.__html, /gg-theme/);
  assert.match(style.dangerouslySetInnerHTML.__html, /--gg-glass-fill/);
  assert.equal(surface.suppressHydrationWarning, true);
  assert.match(css, /\.next-panel\{/);
});

test("nuxt adapter exposes head object and installable directive plugin", () => {
  const head = createNuxtGlassHead({ input: { recipe: "terminal" }, cssOptions: { minify: true } });
  const plugin = createNuxtGlassPlugin({ directiveName: "glassSurface" });
  let registered = null;

  plugin.install({
    directive(name, directive) {
      registered = { name, directive };
    }
  });

  assert.match(head.script[0].children, /glass-theme/);
  assert.match(head.style[0].children, /--gg-glass-fill/);
  assert.equal(registered.name, "glassSurface");
  assert.equal(typeof registered.directive.mounted, "function");
  assert.match(createNuxtGlassStaticCss(".nuxt-shell", { recipe: "inspector" }, { minify: true }), /\.nuxt-shell\{/);
});

test("astro adapter emits inline-safe tags and style objects", () => {
  const head = createAstroGlassHead({ input: { recipe: "form" }, styleOptions: { minify: true } });
  const tag = createAstroGlassStyleTag(".astro-shell", { recipe: "command-bar" }, { nonce: "a<bc", minify: true });
  const style = createAstroGlassStyleObject({ recipe: "table" });

  assert.match(head, /<style/);
  assert.match(head, /<script/);
  assert.match(tag, /nonce="a&lt;bc"/);
  assert.match(tag, /\.astro-shell\{/);
  assert.match(style.WebkitBackdropFilter, /blur\(/);
});
