import { createGlassComponentCatalogCss } from "glassgradients/components";

export const css = createGlassComponentCatalogCss({
  include: ["panel", "button", "terminal", "command-palette", "data-grid", "chart", "notification-center"],
  minify: true
});
