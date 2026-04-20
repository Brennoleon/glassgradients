# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project follows Semantic Versioning.

## [Unreleased]

## [1.2.0] - 2026-04-20

### Added
- Monitoring Engine Reduces (MER), an additive adaptive layer for `performance: auto` that uses runtime hints to reduce expensive effects on constrained devices.
- New optional `mainFilter` / `main-filter` control with `standard`, `none`, and opt-in `blur-filters` modes.
- New gradient effects: `caustic`, `liquid`, `nebula`, `iridescent`, `conic`, and `noise`.
- Tailwind v4 CSS-first helpers through the existing `glassgradients/adapters/tailwind` subpath.
- shadcn-style copyable component specs through `glassgradients/adapters/shadcn`.
- Advanced component shells for data grids, charts, timelines, kanban, calendars, comboboxes, dropdowns, toasts, tabs, resizable panels, spotlight overlays, and notification centers.
- CLI commands for `lint`, `format`, `tokens`, and `inspect --score` while keeping `init`, `build`, and plain `inspect` compatible.

### Changed
- GitHub metrics now track all effects from the engine source instead of a static hand-written list.
- Site generated CSS now includes representative advanced primitives.
- Runtime hints now include device pixel ratio, network effective type, and data-saver signals for MER.

### Fixed
- `mainFilter: "none"` now disables the backdrop filter while preserving the frosted fill layer.
- CLI lint now accepts new `1.2.0` effects and validates `mainFilter` values.

## [1.1.0] - 2026-04-19

### Added
- Separated surface modes for `surface`, `gradient`, and `frost` while preserving the stable runtime API.
- New effects: `halo`, `ribbon`, and `bloom`.
- New presets: `editor`, `crystal`, and `smoke`.
- Semantic strengths: `soft`, `medium`, and `strong`.
- Product recipes for `workspace`, `form`, `command-palette`, `dialog`, `table`, `inspector`, `terminal`, and `command-bar`.
- Recipe contracts through `RECIPE_CONTRACTS`, `getRecipeContract()`, and `createGlassTokens().contract`.
- Responsive and color-scheme variants in `.glass` configs.
- Theme and SSR helpers through `compileGlassTheme()`, `createGlassThemeScript()`, and `createGlassTokens()`.
- Optional framework adapters for React, Vue, Solid, Preact, Svelte, Vanilla, Tailwind, UnoCSS, Next, Nuxt, and Astro.
- Official component primitives through `glassgradients/components`, `glassgradients/components/react`, and `glassgradients/components/preact`.
- Static adapter class generation with pseudo-elements, fallback blocks, and shared animation keyframes for Tailwind and UnoCSS.

### Changed
- Runtime and compiler now share the same style model for more predictable output.
- Safari/WebKit backdrop filtering now writes direct `-webkit-backdrop-filter` values where needed.
- Documentation now covers recipes, themes, framework adapters, SSR usage, and integration patterns.

### Fixed
- Better fallback fills for browsers without `backdrop-filter`.
- Stronger contrast-safe defaults for production UI surfaces.

## [1.0.1] - 2026-04-18

### Added
- Governance docs (`RELEASE_POLICY.md`, `CONTRIBUTING.md`, `SUPPORT.md`).
- GitHub templates for bugs, features, and pull requests.
- Technical docs for runtime vs compile, performance, accessibility, and benchmarks.
- Official UI examples (`hero`, `card`, `sidebar`, `modal`, `dashboard`).
- TypeScript declarations for public API (`src/index.d.ts`).

### Changed
- README restructured for adoption and stable 1.x communication.

## [1.0.0] - 2026-04-18

### Added
- Stable public API for parser, compiler, runtime, and defaults.
- New effects: `plasma`, `prism`.
- New config controls: `preset`, `tint`, `shadow`, `visibility.*`, `grain.motion`, `animate.speedMultiplier`, `animate.fps`, `animate.easing`.
- Performance profiles: `auto`, `quality`, `balanced`, `eco`, `potato`.
- Runtime low-end adaptation and reduced-motion awareness.
- Legacy compatibility alias: `animate.dfirt` -> `animate.drift`.
- Site V1 Lab with static + runtime scenarios.

### Fixed
- Browser-safe module imports to avoid `node:fs` load in runtime demo.
- `.glass` parser handling for `rgba(...)` and comma-separated values.

## [0.2.0] - 2026-04-18

### Added
- `.glass` dot-notation support.
- Inline list parsing in `.glass`.
- New CLI commands and flags (`init`, `--watch`, `--minify`).
- Presets/effects/performance options and richer runtime controls.

## [0.1.0] - 2026-04-18

### Added
- Initial package release.
- `.glass` parser.
- Static CSS compiler.
- Runtime engine with visibility pause and worker fallback.
- CLI build/inspect and basic tests.
