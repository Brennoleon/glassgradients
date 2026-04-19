import { GlassSurface, GlassThemeScript, useGlassGradient } from "glassgradients/adapters/react";
import { useRef } from "react";

export function ReactPanel() {
  const ref = useRef(null);
  useGlassGradient(ref, { recipe: "panel", preset: "editor" });

  return <section ref={ref}>React panel</section>;
}

export function ReactHero() {
  return (
    <>
      <GlassThemeScript storageKey="glass-theme" attribute="data-glass-theme" />
      <GlassSurface as="article" input={{ recipe: "hero", preset: "cinematic" }}>
        React hero surface
      </GlassSurface>
    </>
  );
}
