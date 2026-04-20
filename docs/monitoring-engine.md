# Monitoring Engine Reduces

MER (Monitoring Engine Reduces) is the adaptive safety layer added in `1.2.0`.

It only acts on `performance: auto`. Manual profiles such as `quality`, `balanced`, `eco`, `potato`, and `static` remain explicit user choices.

## Why It Exists

Heavy glass effects can look strong on high-end machines and still be too expensive on constrained devices. MER keeps the same public API while reducing cost when the runtime has signals that the current device should receive a lighter profile.

MER considers:

- `hardwareConcurrency`
- `deviceMemory`
- `devicePixelRatio`
- `prefers-reduced-motion`
- `navigator.connection.effectiveType`
- `navigator.connection.saveData`
- effect complexity
- gradient blur
- glass blur
- `mainFilter`
- Engine UP
- Motion Blurrin layer count

## Basic Usage

```glass
selector: .hero
effect: liquid
performance: auto
```

Runtime usage:

```js
import { createGlassGradient } from "glassgradients";

createGlassGradient(".hero", {
  effect: "liquid",
  performance: "auto"
});
```

## Testing Hints Manually

You can pass hints in runtime options when you need deterministic behavior in tests or previews:

```js
createGlassGradient(".hero", {
  effect: "liquid",
  performance: "auto",
  mainFilter: "blur-filters"
}, {
  monitoringHints: {
    hardwareConcurrency: 2,
    deviceMemory: 2,
    saveData: true
  }
});
```

## Filter Separation

Standard glass stays the default:

```glass
mainFilter: standard
```

Disable the frosted backdrop filter while keeping fill, border, shadow, and tokens:

```glass
mode: frost
mainFilter: none
```

Enable the heavier stack only when the user explicitly wants it:

```glass
main-filter: blur-filters
```

`blur-filters` is intentionally opt-in because it adds cost. It is available for visual-heavy use cases, not recommended as a default for dense product UI.

## Exposed Variables

Compiled CSS and runtime inline styles expose:

- `--gg-main-filter`
- `--gg-heavy-filter`
- `--gg-monitoring-tier`
- `--gg-monitoring-score`
- `--gg-monitoring-reason`

These variables are diagnostics and integration hooks. Existing CSS output remains valid without reading them.
