# Performance Guide

## Profile quick reference

- `quality`: best visuals, highest cost.
- `balanced`: default practical baseline.
- `eco`: lower cost for common low-end environments.
- `potato`: minimal cost profile.
- `auto`: adaptive (`eco` fallback on constrained devices).

## Cost drivers

Highest impact:

1. `blur`
2. `animate.drift`
3. `animate.fps`
4. `grain.amount` + `grain.size`
5. complex effects (`prism`, `plasma`)

## Low-end recommended config

```glass
performance: potato
effect: mesh
blur: 32px
animate.fps: 24
animate.drift: 4%
grain.amount: 0.03
grain.motion: 0
```

## Runtime tuning tips

- Keep runtime regions limited to high-impact areas.
- Prefer compile mode for secondary background blocks.
- Respect `prefers-reduced-motion`.
- Use `visibility.rootMargin` conservatively.
