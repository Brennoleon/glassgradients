# Themes And SSR

## Theme CSS Export

Use `compileGlassTheme()` when you want a reusable contract of glass variables without compiling a specific component selector.

```js
import { compileGlassTheme } from "glassgradients";

const css = compileGlassTheme(":root", {
  preset: "editor",
  recipe: "panel",
  scheme: {
    dark: { preset: "smoke" }
  }
});
```

## Semantic Tokens

Use `createGlassTokens()` to feed design systems, adapters, or custom component wrappers.

```js
import { createGlassTokens } from "glassgradients";

const tokens = createGlassTokens({ recipe: "modal", preset: "crystal" });
```

Returned buckets:

- `surface`
- `gradient`
- `ornament`
- `palette`

## SSR Theme Bootstrap

Use `createGlassThemeScript()` before hydration when your app supports light/dark switching.

```js
import { createGlassThemeScript } from "glassgradients";

const script = createGlassThemeScript({
  storageKey: "glass-theme",
  attribute: "data-glass-theme"
});
```

This sets the theme attribute early and reduces theme flash in SSR apps.

## Scheme Variants In `.glass`

```glass
scheme:
  dark:
    preset: smoke
    contrastMode: safe
```

The compiler emits `prefers-color-scheme` media queries, and the runtime listens to scheme changes automatically.
