import { createNuxtGlassHead, createNuxtGlassPlugin } from "glassgradients/adapters/nuxt";

export const glassHead = createNuxtGlassHead({
  input: { recipe: "workspace", preset: "editor" }
});

export default createNuxtGlassPlugin({
  directiveName: "glass"
});
