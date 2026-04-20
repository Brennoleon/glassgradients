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
  GlassDataGrid,
  GlassCommandPalette,
  GlassPanel,
  GlassTerminal
} from "glassgradients/components/react";

export function CommandCenter() {
  return (
    <GlassCommandPalette aria-label="Command palette">
      <GlassPanel input={{ recipe: "inspector" }}>Inspector</GlassPanel>
      <GlassDataGrid aria-label="Recent builds">Builds</GlassDataGrid>
      <GlassTerminal>npm run build</GlassTerminal>
      <GlassButton>Run</GlassButton>
    </GlassCommandPalette>
  );
}
```

## Advanced Components

`1.2.0` adds advanced sellable shells while keeping the LTS API additive. They do not add behavior, state management, sorting, gestures, portals, or charting logic. They provide stable component names, framework wrappers, classes, semantic attrs, and recipe fallbacks.

```jsx
import {
  GlassCalendar,
  GlassChart,
  GlassDataGrid,
  GlassNotificationCenter,
  GlassResizablePanel,
  GlassTabs
} from "glassgradients/components/react";

export function OpsSuite() {
  return (
    <GlassResizablePanel aria-label="Operations">
      <GlassTabs aria-label="Views" />
      <GlassChart aria-label="Throughput" />
      <GlassDataGrid aria-label="Jobs" />
      <GlassCalendar aria-label="Deploy calendar" />
      <GlassNotificationCenter aria-label="Notifications" />
    </GlassResizablePanel>
  );
}
```

Current recipe fallbacks:

| Component | Name | Fallback recipe |
| --- | --- | --- |
| `GlassDataGrid` | `data-grid` | `table` |
| `GlassChart` | `chart` | `panel` |
| `GlassTimeline` | `timeline` | `panel` |
| `GlassKanban` | `kanban` | `workspace` |
| `GlassCalendar` | `calendar` | `table` |
| `GlassCombobox` | `combobox` | `input` |
| `GlassDropdown` | `dropdown` | `popover` |
| `GlassToast` | `toast` | `popover` |
| `GlassTabs` | `tabs` | `toolbar` |
| `GlassResizablePanel` | `resizable-panel` | `panel` |
| `GlassSpotlightOverlay` | `spotlight-overlay` | `modal` |
| `GlassNotificationCenter` | `notification-center` | `popover` |

Useful aliases include `dataGrid`, `grid`, `comboBox`, `autocomplete`, `dropdownMenu`, `menu`, `splitPane`, `spotlight`, `notificationCenter`, `notifications`, and display names such as `GlassDataGrid`.

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
- `data-grid`
- `chart`
- `timeline`
- `kanban`
- `calendar`
- `combobox`
- `dropdown`
- `toast`
- `tabs`
- `resizable-panel`
- `spotlight-overlay`
- `notification-center`
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
  include: ["panel", "button", "terminal", "data-grid", "chart"],
  minify: true
});
```

Use static CSS when you want no runtime motion and maximum framework portability.

## Desired Future Recipes

No new defaults recipes are required for `1.2.0`. If the defaults contract expands later, the advanced shells would benefit from dedicated recipes named:

- `data-grid`
- `chart`
- `timeline`
- `kanban`
- `calendar`
- `combobox`
- `dropdown`
- `toast`
- `tabs`
- `resizable-panel`
- `spotlight-overlay`
- `notification-center`
