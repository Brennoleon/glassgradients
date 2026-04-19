# GitHub Lab

The GitHub repository is the technical lab for GlassGradients. NPM stays focused on installation and API usage; GitHub carries the heavier validation material: metrics, generated charts, the Pages site, CI, and release evidence.

## What It Shows

- generated performance metrics for parser, normalizer, and compiler
- minified CSS size samples for `surface`, `frost`, `gradient`, and `static`
- package coverage counts for exports, adapters, recipes, components, tests, examples, and docs
- committed SVG charts used directly by the README
- a GitHub Pages site with component previews, adapter matrix, runtime lab, and test matrix

## Commands

```bash
npm run metrics
npm run site:build
npm run release:check
```

`npm run metrics` writes:

- `docs/metrics/report.json`
- `docs/metrics/report.md`
- `docs/assets/chart-ops.svg`
- `docs/assets/chart-css-size.svg`
- `docs/assets/chart-capability.svg`
- `site/data/metrics.json`
- `site/assets/*.svg`

`npm run site:build` also writes:

- `site/generated/glass-components.css`
- `site/source/*.js` for the Pages runtime lab artifact

`site/source` is intentionally ignored by git. The Pages workflow generates it before deploy so the runtime demo can import local browser-safe modules from inside the deployed artifact.

## Deployment

The site deploys from `.github/workflows/pages.yml` on every push to `main`. The workflow builds the lab first and uploads the `site` directory as the Pages artifact.

If GitHub Pages is disabled in repository settings, enable Pages with GitHub Actions as the source.

## CI Contract

The repository CI runs:

- `npm run site:build`
- `npm test`
- `npm run build`
- `npm pack --dry-run`

This keeps the README charts, metrics report, Pages lab, package exports, CLI, and npm package contents aligned before release.
