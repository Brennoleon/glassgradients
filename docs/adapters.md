# Adapters

GlassGradients keeps the engine in the core and exposes optional adapters through subpath imports.

If you want ready product primitives instead of low-level adapters, use [Components](./components.md).

## Install

Core only:

```bash
npm i glassgradients
```

With framework adapters:

```bash
npm i glassgradients react
npm i glassgradients vue
npm i glassgradients solid-js
npm i glassgradients preact
```

The React, Vue, Solid, and Preact entry points are optional subpath exports. They are only meant to be imported inside apps that already use those frameworks.

Adapter examples are integration snippets, not standalone CLIs. Tailwind examples expect `tailwindcss`; UnoCSS examples expect `unocss`; framework JSX/TSX/Vue/Svelte examples expect the host framework and bundler.

## React

```jsx
import { GlassSurface, GlassThemeScript, useGlassGradient, useGlassStyle, useGlassTokens } from "glassgradients/adapters/react";
import { useRef } from "react";

export function CommandBar() {
  const ref = useRef(null);
  useGlassGradient(ref, { recipe: "toolbar", preset: "editor" });

  return <div ref={ref}>...</div>;
}

export function HeroCard() {
  return (
    <GlassSurface as="section" input={{ recipe: "card", preset: "crystal" }}>
      ...
    </GlassSurface>
  );
}
```

## Vue

```js
import { createGlassDirective, useGlassStyle, useGlassTokens } from "glassgradients/adapters/vue";

export const vGlass = createGlassDirective();
```

```vue
<script setup>
import { ref } from "vue";
import { useGlassGradient } from "glassgradients/adapters/vue";

const panel = ref(null);
useGlassGradient(panel, { recipe: "panel", preset: "editor" });
</script>

<template>
  <section ref="panel">...</section>
</template>
```

## Svelte

```svelte
<script>
  import { glass, glassStyle } from "glassgradients/adapters/svelte";
  const style = glassStyle({ recipe: "button" });
</script>

<button use:glass={{ input: { recipe: "button" } }} style={style}>Save</button>
```

## Solid

```tsx
import { createSignal } from "solid-js";
import { createGlassStyle, glass } from "glassgradients/adapters/solid";

const style = createGlassStyle(() => ({ recipe: "workspace" }));
```

```tsx
<section use:glass={() => ({ input: { recipe: "dialog" } })} style={style()}>
  ...
</section>
```

## Preact

```jsx
import { GlassSurface, useGlassGradient } from "glassgradients/adapters/preact";
import { useRef } from "preact/hooks";

export function Shell() {
  const ref = useRef(null);
  useGlassGradient(ref, { recipe: "workspace", preset: "editor" });
  return <GlassSurface as="section" elementRef={ref} input={{ recipe: "workspace" }}>...</GlassSurface>;
}
```

## Tailwind

JavaScript plugin path:

```js
import plugin from "tailwindcss/plugin";
import { createGlassTailwindPlugin } from "glassgradients/adapters/tailwind";

export default {
  plugins: [createGlassTailwindPlugin(plugin)]
};
```

Generated classes include:

- `gg`
- `gg-surface`
- `gg-gradient`
- `gg-frost`
- `gg-navbar`
- `gg-sidebar`
- `gg-workspace`
- `gg-form`
- `gg-command-palette`
- `gg-dialog`
- `gg-table`
- `gg-inspector`
- `gg-terminal`
- `gg-command-bar`

Tailwind v4 CSS-first path:

```js
import { createGlassTailwindV4Css, createGlassTailwindV4Preset } from "glassgradients/adapters/tailwind";

export const glassCss = createGlassTailwindV4Css({
  includeImport: true
});

export const glassPreset = createGlassTailwindV4Preset();
```

The generated CSS is meant to be copied into your app stylesheet or written by your build script:

```css
@import "tailwindcss";

@theme inline {
  --radius-glass: var(--gg-radius);
  --shadow-glass: var(--gg-shadow-stack);
  --animate-glass: var(--gg-animation);
}

@utility gg {
  /* GlassGradients surface variables and structural CSS */
}
```

Use the CSS-first helpers when your Tailwind v4 project prefers stylesheet-owned presets. Keep using `createGlassTailwindPlugin()` when you already rely on the Tailwind plugin API.

## shadcn-style Specs

The shadcn-style adapter does not publish components. It returns copyable specs for your local `components/ui` folder.

```js
import { createGlassShadcnComponentSpec, createGlassShadcnCss } from "glassgradients/adapters/shadcn";

const dialog = createGlassShadcnComponentSpec("dialog", {
  minify: true
});

console.log(dialog.import);
console.log(dialog.className);
console.log(dialog.css);
console.log(dialog.usage);

const css = createGlassShadcnCss({
  include: ["panel", "button", "terminal"],
  minify: true
});
```

Each spec includes:

- `name`
- `componentName`
- `import`
- `className`
- `css`
- `usage`
- `source`

## UnoCSS

```ts
import { defineConfig } from "unocss";
import { createGlassUnoPreset } from "glassgradients/adapters/unocss";

export default defineConfig({
  presets: [createGlassUnoPreset()]
});
```

Useful shortcuts:

- `gg-shell-stack`
- `gg-workspace-shell`
- `gg-form-shell`
- `gg-dialog-shell`
- `gg-command-shell`
- `gg-data-shell`
- `gg-inspector-shell`
- `gg-terminal-shell`
- `gg-command-strip`

## Next

The Next adapter returns props you can pass to `next/script`, `<style>`, or app-router layouts.

```jsx
import Script from "next/script";
import { createNextGlassThemeScriptProps, createNextGlassStyleProps } from "glassgradients/adapters/next";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script {...createNextGlassThemeScriptProps()} />
        <style {...createNextGlassStyleProps(":root", { recipe: "workspace" })} />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## Nuxt

The Nuxt adapter returns a head object and an installable directive plugin without importing Nuxt internals.

```ts
import { createNuxtGlassHead, createNuxtGlassPlugin } from "glassgradients/adapters/nuxt";

export const glassHead = createNuxtGlassHead({ input: { recipe: "workspace" } });
export const glassPlugin = createNuxtGlassPlugin();
```

## Astro

The Astro adapter emits inline-safe tags for layouts and islands.

```astro
---
import { createAstroGlassHead } from "glassgradients/adapters/astro";
const glassHead = createAstroGlassHead({ input: { recipe: "terminal" } });
---

<Fragment set:html={glassHead} />
```

## Vanilla

```js
import { mountGlass, createGlassStyleObject } from "glassgradients/adapters/vanilla";

const style = createGlassStyleObject({ recipe: "navbar" });
Object.assign(document.querySelector(".topbar").style, style);
mountGlass(".topbar", { recipe: "navbar" });
```

## Why subpaths

This avoids forcing `react`, `vue`, `solid-js`, or `preact` on users who only want the core engine.
