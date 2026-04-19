import { GlassButton, GlassCommandBar } from "glassgradients/components/preact";

export function Toolbar() {
  return (
    <GlassCommandBar>
      <GlassButton>Save</GlassButton>
      <GlassButton input={{ strength: "strong" }}>Deploy</GlassButton>
    </GlassCommandBar>
  );
}
