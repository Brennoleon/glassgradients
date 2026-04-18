# Contributing

## Setup

```bash
npm install
npm test
```

## Branch and PR

- Use focused branches (`feat/...`, `fix/...`, `docs/...`).
- Keep PR scope small and coherent.
- Include test updates for parser/compiler/runtime behavior changes.
- Update `CHANGELOG.md` under `Unreleased`.

## Coding Rules

- Do not remove or rename public exports in `1.x`.
- Preserve backward compatibility of config keys.
- When adding aliases, document them in README/docs.
- Keep parser behavior deterministic and predictable.

## Test Expectations

Before PR:

```bash
npm test
```

For compiler/runtime behavior changes, add at least one new test.

## Docs Expectations

Update docs when changing:

- public config keys
- runtime behavior
- performance characteristics
- integration flow
