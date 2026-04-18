# Runtime vs Compile

## Use compile mode when

- The visual does not need dynamic updates after load.
- You want the lowest runtime overhead.
- You want plain CSS deployment and cacheability.

Command:

```bash
glassgradients build ./hero.glass -o ./hero.css --minify
```

## Use runtime mode when

- You need live updates (`update()`), dynamic presets/effects.
- You want adaptive behavior per device capability.
- You want to switch effects in real time (editor/playground use cases).

API:

```js
const fx = createGlassGradient(".hero", config);
fx.update(nextConfig);
fx.destroy();
```

## Hybrid recommendation

- Compile static defaults for most UI blocks.
- Use runtime only for interactive/high-impact regions (hero, modals, media containers).
