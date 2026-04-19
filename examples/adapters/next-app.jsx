import Script from "next/script";
import { createNextGlassStyleProps, createNextGlassThemeScriptProps } from "glassgradients/adapters/next";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script {...createNextGlassThemeScriptProps()} />
        <style {...createNextGlassStyleProps(":root", { recipe: "workspace" })} />
      </head>
      <body>{children}</body>
    </html>
  );
}
