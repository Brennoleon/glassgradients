# Performance Guide

## Profile quick reference

- `quality`: strongest gradients, richer surface lighting, highest cost.
- `balanced`: sensible default for product UI.
- `eco`: lighter blur and lower animation pressure.
- `potato`: aggressive cut for constrained devices.
- `static`: no runtime animation, good for landing pages and low-risk fallback.
- `auto`: adaptive, with `eco` fallback on constrained devices.

## Cost drivers

Highest impact:

1. gradient blur
2. glass backdrop blur
3. runtime animation cadence
4. grain density and size
5. large full-screen surfaces
6. runtime pointer glare on many elements

## Separation matters

If you only need one layer, render only one layer:

```glass
mode: gradient
performance: balanced
```

```glass
mode: frost
contrastMode: safe
```

That is cheaper than using a composed surface everywhere.

## Recipe guidance

Use lower-cost recipes by default:

- `navbar`
- `toolbar`
- `badge`
- `sidebar` with `performance: static`

Reserve `hero` and heavier `surface` compositions for a few signature areas.

## Low-end recommended config

```glass
mode: gradient
performance: potato
effect: mesh
blur: 24
animate.fps: 24
animate.drift: 4%
grain.amount: 0.02
grain.motion: 0
```

## Stable fallback config

```glass
mode: surface
performance: static
contrastMode: safe
interactive.enabled: false
grain.enabled: false
```

## Runtime tuning tips

- Keep runtime regions limited to high-impact areas.
- Prefer compile mode for secondary blocks.
- Respect `prefers-reduced-motion`.
- Use `mode: gradient` for decorative backdrops.
- Use `mode: frost` for panels, sidebars, nav, and dialogs.
- Turn off `interactive.enabled` on dense lists or grids.
