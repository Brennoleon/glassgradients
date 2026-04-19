import {
  GlassButton,
  GlassCommandPalette,
  GlassInspector,
  GlassPanel,
  GlassTerminal
} from "glassgradients/components/react";

export function CommandCenter() {
  return (
    <GlassCommandPalette aria-label="Command palette">
      <GlassPanel input={{ recipe: "workspace" }}>Workspace</GlassPanel>
      <GlassInspector>Properties</GlassInspector>
      <GlassTerminal>npm run build</GlassTerminal>
      <GlassButton>Run</GlassButton>
    </GlassCommandPalette>
  );
}
