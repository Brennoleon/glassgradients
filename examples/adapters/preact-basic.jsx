import { GlassSurface } from "glassgradients/adapters/preact";

export function SidebarShell() {
  return (
    <GlassSurface as="aside" input={{ recipe: "workspace", preset: "editor" }}>
      ...
    </GlassSurface>
  );
}
