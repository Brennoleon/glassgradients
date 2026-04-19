# Official UI Examples

This folder provides ready-to-use `.glass` configs for common product UI parts.

## Files

- `hero.glass`
- `card-premium.glass`
- `sidebar.glass`
- `modal.glass`
- `dashboard-widget.glass`
- `../gradient-only.glass`
- `../frost-only.glass`
- `../editor-panel.glass`
- `../navbar.glass`
- `../workspace.glass`
- `../form.glass`
- `../dialog.glass`
- `../command-palette.glass`
- `../table.glass`
- `../inspector.glass`
- `../terminal.glass`
- `../command-bar.glass`

## Compile quickly

```bash
glassgradients build ./examples/ui/hero.glass -o ./examples/ui/hero.css --minify
glassgradients build ./examples/gradient-only.glass -o ./examples/gradient-only.css --minify
glassgradients build ./examples/frost-only.glass -o ./examples/frost-only.css --minify
glassgradients build ./examples/navbar.glass -o ./examples/navbar.css --minify
glassgradients build ./examples/workspace.glass -o ./examples/workspace.css --minify
glassgradients build ./examples/form.glass -o ./examples/form.css --minify
glassgradients build ./examples/dialog.glass -o ./examples/dialog.css --minify
glassgradients build ./examples/command-palette.glass -o ./examples/command-palette.css --minify
glassgradients build ./examples/table.glass -o ./examples/table.css --minify
glassgradients build ./examples/inspector.glass -o ./examples/inspector.css --minify
glassgradients build ./examples/terminal.glass -o ./examples/terminal.css --minify
glassgradients build ./examples/command-bar.glass -o ./examples/command-bar.css --minify
```

## Minimal HTML usage

```html
<section class="hero-block">...</section>
```
