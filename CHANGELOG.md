# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog, and this project follows Semantic Versioning.

## [Unreleased]

### Added
- Governance docs (`RELEASE_POLICY.md`, `ROADMAP.md`, `CONTRIBUTING.md`, `SUPPORT.md`).
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
