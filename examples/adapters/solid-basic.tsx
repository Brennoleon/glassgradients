import { createGlassStyle, glass } from "glassgradients/adapters/solid";

export function CommandPalette() {
  const style = createGlassStyle(() => ({ recipe: "command-palette", preset: "editor" }));

  return (
    <section use:glass={() => ({ input: { recipe: "command-palette", preset: "editor" } })} style={style()}>
      ...
    </section>
  );
}
