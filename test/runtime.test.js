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

test("runtime inline style exposes MER and heavy filter variables additively", () => {
  const style = compileRuntimeInlineStyle({
    effect: "caustic",
    mainFilter: "blur-filters"
  });

  assert.equal(style["--gg-main-filter"], "blur-filters");
  assert.equal(style["--gg-heavy-filter"], "1");
  assert.equal(style["--gg-monitoring-tier"], "auto");
  assert.equal(style["--gg-monitoring-reason"], "no-runtime-signals");
  assert.match(style.WebkitBackdropFilter, /drop-shadow/);
});

test("runtime inline style can keep frost fill while disabling backdrop filter", () => {
  const style = compileRuntimeInlineStyle({
    mode: "frost",
    mainFilter: "none"
  });

  assert.equal(style["--gg-main-filter"], "none");
  assert.equal(style["--gg-backdrop-filter"], "none");
  assert.equal(style["--gg-heavy-filter"], "0");
  assert.equal(style.WebkitBackdropFilter, "none");
  assert.match(style["--gg-glass-fill"], /linear-gradient/);
});

test("runtime inline style exposes Engine UP and Motion Blurrin variables", () => {
  const style = compileRuntimeInlineStyle({
    engineUp: { enabled: true, duration: "12s", blur: 24 },
    motionBlurrin: {
      layers: [{ count: 3, minSize: 20, maxSize: 40, direction: "liquid" }],
      blur: 18
    }
  });

  assert.equal(style["--gg-engine-up"], "1");
  assert.equal(style["--gg-engine-up-duration"], "12s");
  assert.equal(style["--gg-motion-blurrin"], "1");
  assert.equal(style["--gg-motion-blurrin-filter"], "blur(18px)");
  assert.match(style["--gg-ornament-background"], /radial-gradient\(circle/);
});
