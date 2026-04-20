# CLI

GlassGradients ships a stable `glassgradients` command for `.glass` authoring, validation, formatting, inspection, token export, and CSS compilation.

## Compatibility

The existing `init`, `build`, and `inspect` commands remain compatible with the 1.1 CLI behavior. Existing flags keep their meaning, and unknown flags or extra positional arguments are ignored for LTS safety.

```bash
glassgradients init [file.glass] [--preset editor] [--recipe panel] [--mode surface]
glassgradients build <file.glass> [-o output.css] [--selector .hero] [--minify] [--watch]
glassgradients inspect <file.glass>
```

## Lint

Validate a `.glass` file before compiling or committing it.

```bash
glassgradients lint ./hero.glass
```

`lint` checks:

- useful known keys, including nested keys such as `animate.mode`, `glass.blur`, and `visibility.threshold`
- known presets, recipes, palettes, effects, modes, strengths, contrast modes, main filters, and performance profiles
- variant blocks under `responsive` and `scheme`
- potentially heavy configs, such as `performance: quality`, large blur values, dense grain, or high animation FPS

Warnings do not fail the command. Errors return exit code `1`.

## Format

Rewrite a `.glass` file using a stable key order.

```bash
glassgradients format ./hero.glass
glassgradients format ./hero.glass -o ./hero.formatted.glass
glassgradients format ./hero.glass --check
```

Without `-o`, `format` updates the input file in place. With `--check`, it only verifies formatting and returns exit code `1` when the file needs changes.

The formatter keeps a simple structure: root keys first, nested sections after, and variants under `responsive` and `scheme` in stable order.

## Inspect

The original inspect behavior prints parsed `.glass` JSON.

```bash
glassgradients inspect ./hero.glass
```

Add `--score` for a compact quality report based on lint errors, lint warnings, and normalized config metadata.

```bash
glassgradients inspect ./hero.glass --score
```

## Tokens

Export theme CSS variables using the existing theme helpers.

```bash
glassgradients tokens ./hero.glass
glassgradients tokens ./hero.glass --selector :root -o ./tokens.css
```

`tokens` uses `compileGlassTheme()` and defaults to `:root` when no selector is provided.

## Help

```bash
glassgradients --help
glassgradients help
```

The help output lists every command, major option, examples, and exit codes.

Subcommand help is safe:

```bash
glassgradients build --help
glassgradients lint --help
```

Flags that require values fail early instead of consuming another flag as the value.
