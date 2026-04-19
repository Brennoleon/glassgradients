# Components

GlassGradients now ships official component primitives.

These are not a separate design system. They are thin product primitives built on the same recipes, tokens, runtime, and static compiler used by the core engine.

## Install Latest

Use the maintained `1.x` line:

```bash
npm i glassgradients@latest
```

Older `0.x` versions may show more accumulated downloads because they were published earlier. New projects should install `latest`.

## Core Helpers

```js
import {
  createGlassComponentProps,
  createGlassComponentCss,
  createGlassComponentCatalogCss,
  listGlassComponents
} from "glassgradients/components";
```

## React

```jsx
import {
  GlassButton,
  GlassCommandPalette,
  GlassPanel,
  GlassTerminal
} from "glassgradients/components/react";

export function CommandCenter() {
  return (
    <GlassCommandPalette aria-label="Command palette">
      <GlassPanel input={{ recipe: "inspector" }}>Inspector</GlassPanel>
      <GlassTerminal>npm run build</GlassTerminal>
      <GlassButton>Run</GlassButton>
    </GlassCommandPalette>
  );
}
```

## Preact

```jsx
import { GlassButton, GlassPanel } from "glassgradients/components/preact";

export function Toolbar() {
  return (
    <GlassPanel input={{ recipe: "command-bar" }}>
      <GlassButton>Save</GlassButton>
    </GlassPanel>
  );
}
```

## Available Primitives

- `panel`
- `card`
- `button`
- `navbar`
- `sidebar`
- `modal`
- `dialog`
- `toolbar`
- `command-bar`
- `command-palette`
- `table`
- `inspector`
- `terminal`
- `input`
- `badge`
- `dock`
- `hero`
- `workspace`
- `form`
- `popover`

## Static CSS

```js
import { createGlassComponentCatalogCss } from "glassgradients/components";

const css = createGlassComponentCatalogCss({
  include: ["panel", "button", "terminal"],
  minify: true
});
```

Use static CSS when you want no runtime motion and maximum framework portability.
