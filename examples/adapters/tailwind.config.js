import plugin from "tailwindcss/plugin";
import { createGlassTailwindPlugin } from "glassgradients/adapters/tailwind";

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx,vue,svelte,html}"],
  plugins: [
    createGlassTailwindPlugin(plugin, {
      prefix: "gg",
      classes: {
        "gg-console": { recipe: "workspace", preset: "editor", strength: "medium" }
      }
    })
  ]
};
