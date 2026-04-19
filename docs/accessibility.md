# Accessibility and Fallbacks

## Contrast-safe mode

Use `contrastMode: safe` when the surface will host real content.

```glass
mode: frost
contrastMode: safe
preset: frosted
```

Safe mode increases surface density, reinforces the edge highlight, and reduces noisy gradient pressure.

## Motion

- Runtime checks `prefers-reduced-motion`.
- You can enforce behavior with a runtime option:

```js
createGlassGradient(".hero", config, { reduceMotion: true });
```

## Browser fallback

Compiled CSS and runtime both ship a `backdrop-filter` fallback.
When blur is unsupported, GlassGradients falls back to a denser fill instead of collapsing to an unreadable transparent panel.

Safari support still benefits from explicit `-webkit-backdrop-filter`, so the engine emits direct values instead of relying only on CSS variables for that property.

## Readability over decoration

- Use `mode: frost` or `contrastMode: safe` for panels with text and form controls.
- Keep decorative gradients behind content surfaces instead of inside every component.
- Treat `surface` as a premium layer, not the default for every block.
- Prefer `recipe: navbar`, `sidebar`, `modal`, or `panel` over ad-hoc tuning for core product chrome.

## Static fallback

Compile mode is the deterministic fallback when runtime animation is not desired.
`performance: static` is the safest profile for multi-panel layouts and enterprise UI.
