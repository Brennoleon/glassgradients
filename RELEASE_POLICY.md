# Release Policy

## Versioning

This project uses Semantic Versioning.

- `PATCH` (`1.0.x`): bug fixes, docs, internal improvements, no behavior break on public API.
- `MINOR` (`1.x.0`): new features and new config keys without breaking existing usage.
- `MAJOR` (`x.0.0`): breaking public API changes.

## Compatibility Promise (Stable 1.x)

Within major version `1.x`:

- Existing public exports are not removed.
- Existing config keys continue to work.
- Existing behavior is preserved except for bug fixes or documented security/performance corrections.
- Legacy aliases may be deprecated but are not removed without major version.

## Release Cadence

- Group related changes into coherent releases.
- Avoid rapid-fire multiple public releases without meaningful changelog.
- Every release must update `CHANGELOG.md`.

## Breaking Changes Process

Before any future major release:

1. Mark deprecated API/keys in docs.
2. Publish migration guide.
3. Keep deprecation period across at least one minor release.
