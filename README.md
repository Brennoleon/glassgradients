# glassgradients

GlassGradients is a glassmorphism engine with a declarative `.glass` format, static CSS compilation, and optional runtime animation.

## Why it exists

- Simple config for fast adoption.
- Static compiler for predictable production CSS.
- Optional runtime for dynamic UIs.
- Performance-aware defaults for low-end and high-end devices.

## Install

```bash
npm i glassgradients
```

## Quick start

```bash
glassgradients init ./hero.glass --preset cinematic
glassgradients build ./hero.glass -o ./hero.css --minify
```

```html
<section class="hero">...</section>
```

## Runtime example

```js
import { createGlassGradient } from "glassgradients";

const fx = createGlassGradient(".hero", {
  preset: "cinematic",
  effect: "prism",
  performance: "auto",
  animate: { mode: "orbit", fps: 42, speedMultiplier: 1.15 }
});
```

## What is stable in 1.x

- Public exports are maintained.
- Existing config keys keep working.
- New features are additive.
- Legacy alias compatibility is preserved (`animate.dfirt` still works).

Release details:

- [CHANGELOG](./CHANGELOG.md)
- [Release Policy](./RELEASE_POLICY.md)
- [Roadmap](./ROADMAP.md)

## Docs

- [Runtime vs Compile](./docs/runtime-vs-compile.md)
- [Performance Guide](./docs/performance.md)
- [Accessibility](./docs/accessibility.md)
- [Benchmarks](./docs/benchmarks.md)
- [Integrations](./docs/integrations.md)
- [Positioning](./docs/positioning.md)

## CLI

```bash
glassgradients init [file.glass] [--preset cinematic]
glassgradients build <input.glass> [-o output.css] [--minify] [--watch]
                   [--selector .hero] [--preset frosted] [--effect prism] [--performance eco]
glassgradients inspect <input.glass>
```

## Effects

- `mesh`
- `aurora`
- `spotlight`
- `plasma`
- `prism`

## Presets

- `default`
- `cinematic`
- `frosted`
- `soft`

## Performance profiles

- `auto`
- `quality`
- `balanced`
- `eco`
- `potato`

## Official examples

- [UI examples](./examples/ui/README.md)
- [V1 Lab site](./site/v1/index.html)

## Public API

```js
import {
  parseGlass,
  parseGlassFile,
  compileGlass,
  compileGlassFile,
  createGlassGradient,
  applyGlassGradient,
  compileRuntimeInlineStyle,
  DEFAULT_CONFIG,
  PALETTES,
  PRESETS,
  PERFORMANCE_PRESETS,
  normalizeConfig
} from "glassgradients";
```

## Contributing and support

- [Contributing](./CONTRIBUTING.md)
- [Support](./SUPPORT.md)

## License

MIT
