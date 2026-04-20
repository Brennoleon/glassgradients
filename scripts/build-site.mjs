import { copyFile, mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createGlassComponentCatalogCss } from "../src/components.js";
import { compileGlassTheme } from "../src/theme.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const generatedDir = path.join(root, "site", "generated");
const siteSourceDir = path.join(root, "site", "source");
const srcDir = path.join(root, "src");

await mkdir(generatedDir, { recursive: true });
await rm(siteSourceDir, { recursive: true, force: true });
await mkdir(siteSourceDir, { recursive: true });

const componentCss = createGlassComponentCatalogCss({
  include: [
    "panel",
    "button",
    "command-palette",
    "terminal",
    "inspector",
    "table",
    "data-grid",
    "chart",
    "tabs",
    "notification-center",
    "workspace",
    "command-bar"
  ],
  minify: false
});

const themeCss = compileGlassTheme(":root", {
  recipe: "workspace",
  preset: "editor",
  scheme: {
    dark: { recipe: "workspace", preset: "editor" },
    light: { recipe: "panel", preset: "soft" }
  }
});

await writeFile(path.join(generatedDir, "glass-components.css"), `${themeCss}\n\n${componentCss}`.trimEnd() + "\n");

const browserRuntimeFiles = (await readdir(srcDir))
  .filter((file) => file.endsWith(".js") && file !== "cli.js");

await Promise.all(
  browserRuntimeFiles.map((file) => copyFile(path.join(srcDir, file), path.join(siteSourceDir, file)))
);

console.log("site generated CSS written to site/generated/glass-components.css");
console.log(`site runtime source copied to site/source (${browserRuntimeFiles.length} files)`);
