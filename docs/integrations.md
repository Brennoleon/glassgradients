# Integrations

For ready-made product primitives, prefer `glassgradients/components` or `glassgradients/components/react`.

## React

```jsx
import { useEffect } from "react";
import { createGlassGradient } from "glassgradients";

export function EditorPanel() {
  useEffect(() => {
    const fx = createGlassGradient(".editor-panel", {
      preset: "editor",
      recipe: "panel",
      mode: "surface",
      contrastMode: "safe"
    });
    return () => fx.destroy();
  }, []);

  return <section className="editor-panel">...</section>;
}
```

Adapter alternative:

```jsx
import { GlassSurface } from "glassgradients/adapters/react";
```

## Next.js

Use a client component for runtime mode.
For static mode, compile `.glass` at build step and import the generated CSS globally.

For theme flash prevention, inject `createGlassThemeScript()` before hydration when you support light/dark switching.

## Tailwind / UnoCSS

Use the library-generated selector for the visual surface and keep layout, spacing, and typography in utilities.

If you want library-owned glass classes instead of hand-written selectors, use:

- `glassgradients/adapters/tailwind`
- `glassgradients/adapters/unocss`

## Design system adapters

Use `createGlassTokens()` when you want to map GlassGradients into your own component primitives.
Use `compileGlassTheme()` when you want to expose a theme contract as CSS variables.
Use subpath adapters when you want framework-specific DX without changing the engine:

- `glassgradients/adapters/react`
- `glassgradients/adapters/vue`
- `glassgradients/adapters/solid`
- `glassgradients/adapters/preact`
- `glassgradients/adapters/svelte`
- `glassgradients/adapters/tailwind`
- `glassgradients/adapters/unocss`
- `glassgradients/adapters/next`
- `glassgradients/adapters/nuxt`
- `glassgradients/adapters/astro`
- `glassgradients/adapters/vanilla`

## Separation by role

Recommended split:

- `mode: gradient` for decorative backgrounds
- `mode: frost` for shells, panels, nav, sidebars, and dialogs
- `mode: surface` for premium hero sections and signature containers
- `recipe` for product-role defaults instead of repetitive manual tuning
- `contract` from `createGlassTokens()` when you need semantic metadata in a design system
