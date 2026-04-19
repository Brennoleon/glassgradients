import { defineConfig } from "unocss";
import { createGlassUnoPreset } from "glassgradients/adapters/unocss";

export default defineConfig({
  presets: [createGlassUnoPreset()],
  shortcuts: {
    "command-panel": "gg gg-command-palette"
  }
});
