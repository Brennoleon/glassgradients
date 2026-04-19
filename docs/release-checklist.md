# Release Checklist

Use this before publishing a new version.

## Required Checks

```bash
npm run release:check
```

Equivalent manual checks:

```bash
npm test
npm run build
npm pack --dry-run
```

## Manual Review

- confirm `package.json` version matches `CHANGELOG.md`
- confirm `README.md` lists new public exports
- confirm `src/index.d.ts` includes new root types
- confirm all adapter subpaths have `.js` and `.d.ts`
- confirm optional framework peers are marked optional
- confirm `docs` and `examples` are included in `files`

## Publish

```bash
npm publish --access public
```

Do not publish until the package tarball looks correct in `npm pack --dry-run`.
