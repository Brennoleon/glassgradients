import { createGlassShadcnComponentSpec } from "glassgradients/adapters/shadcn";

export const glassDialog = createGlassShadcnComponentSpec("dialog", {
  minify: true
});

console.log(glassDialog.import);
