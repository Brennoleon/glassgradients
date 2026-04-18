# Accessibility and Fallbacks

## Motion

- Runtime checks `prefers-reduced-motion`.
- You can enforce behavior with runtime option:

```js
createGlassGradient(".hero", config, { reduceMotion: true });
```

## Blur fallback strategy

For constrained browsers/devices, use:

```glass
performance: potato
frost: 0.35
grain.enabled: false
```

## Readability over complex backgrounds

- Increase foreground contrast.
- Use solid/semi-solid foreground surfaces for text.
- Keep text overlays above `AA` contrast targets.

## Static fallback

Compile mode can be used as deterministic fallback when runtime animation is not desired.
