# Recipes

Recipes are additive configuration packs for real UI roles.

They do not replace presets.

- `preset` defines the visual language
- `recipe` defines the product usage pattern

## Available recipes

- `panel`
- `navbar`
- `sidebar`
- `modal`
- `toolbar`
- `badge`
- `hero`
- `card`
- `button`
- `popover`
- `dock`
- `input`
- `workspace`
- `form`
- `command-palette`
- `dialog`
- `table`
- `inspector`
- `terminal`
- `command-bar`

## Example

```glass
selector: .command-bar
preset: editor
recipe: toolbar
mode: surface
```

## Recommended pairing

- `panel` + `editor`
- `navbar` + `frosted`
- `sidebar` + `smoke`
- `modal` + `crystal`
- `hero` + `cinematic`
- `workspace` + `editor`
- `form` + `smoke`
- `command-palette` + `editor`
- `dialog` + `crystal`
- `table` + `smoke`
- `inspector` + `editor`
- `terminal` + `smoke`
- `command-bar` + `editor`

## Why recipes exist

They address a real gap in the market: many glass libraries show nice effects, but do not package reliable defaults for common product surfaces.

## Strength

You can also combine recipes with semantic strength tuning:

```glass
recipe: card
strength: strong
```

Available strengths:

- `soft`
- `medium`
- `strong`

## Contracts

Every recipe now has a semantic contract that can be consumed by adapters and design systems.

Examples:

- `navbar`: navigation, compact, passive
- `sidebar`: navigation-shell, dense, passive
- `workspace`: workspace-shell, dense, focus
- `form`: form-shell, comfortable, focus
- `command-palette`: command-center, comfortable, interactive
- `dialog`: dialog-shell, comfortable, focus
- `table`: data-grid, dense, scan
- `inspector`: inspector-panel, dense, focus
- `terminal`: terminal-shell, dense, focus
- `command-bar`: command-strip, compact, interactive
