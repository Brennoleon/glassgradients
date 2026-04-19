import test from "node:test";
import assert from "node:assert/strict";
import { compileRuntimeInlineStyle } from "../src/runtime.js";

test("runtime inline style exposes shared layer variables", () => {
  const style = compileRuntimeInlineStyle({
    mode: "frost",
    contrastMode: "safe"
  });

  assert.equal(style["--gg-gradient-background"], "none");
  assert.match(style["--gg-glass-fill"], /linear-gradient/);
  assert.equal(style.borderRadius, "18px");
  assert.match(style.WebkitBackdropFilter, /blur\(/);
});
