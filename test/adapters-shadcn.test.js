import test from "node:test";
import assert from "node:assert/strict";
import {
  createGlassShadcnCatalog,
  createGlassShadcnComponentSpec,
  createGlassShadcnCss
} from "../src/adapters/shadcn.js";

test("shadcn-style adapter emits a copyable component spec", () => {
  const spec = createGlassShadcnComponentSpec("dialog", { minify: true });

  assert.equal(spec.name, "glass-dialog");
  assert.equal(spec.componentName, "GlassDialog");
  assert.equal(spec.className, "gg-dialog");
  assert.equal(spec.import, 'import { GlassDialog } from "@/components/ui/glass-dialog";');
  assert.match(spec.css, /\.gg-dialog\{/);
  assert.match(spec.css, /--gg-glass-fill:/);
  assert.match(spec.usage, /<GlassDialog>GlassDialog<\/GlassDialog>/);
  assert.match(spec.source, /import \{ cn \} from "@\/lib\/utils";/);
  assert.match(spec.source, /role="dialog"/);
  assert.match(spec.source, /aria-modal="true"/);
});

test("shadcn-style adapter supports class prefixes and selected catalogs", () => {
  const catalog = createGlassShadcnCatalog({
    include: ["panel", "terminal"],
    classPrefix: "ui-glass",
    filePrefix: "surface",
    minify: true
  });

  assert.deepEqual(Object.keys(catalog), ["surface-panel", "surface-terminal"]);
  assert.equal(catalog["surface-panel"].className, "ui-glass-panel");
  assert.match(catalog["surface-terminal"].css, /\.ui-glass-terminal\{/);
  assert.match(catalog["surface-terminal"].import, /@\/components\/ui\/surface-terminal/);
});

test("shadcn-style css helper concatenates selected spec css", () => {
  const css = createGlassShadcnCss({ include: ["button", "command-palette"], minify: true });

  assert.match(css, /\.gg-button\{/);
  assert.match(css, /\.gg-command-palette\{/);
  assert.doesNotMatch(css, /\.gg-terminal\{/);
});
