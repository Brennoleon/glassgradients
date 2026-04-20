import { createGlassTailwindV4Css } from "glassgradients/adapters/tailwind";

export const glassTailwindCss = createGlassTailwindV4Css({
  includeImport: true,
  includeTheme: true,
  includeUtilities: true,
  minify: false
});
