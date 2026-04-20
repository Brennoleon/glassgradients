import test from "node:test";
import assert from "node:assert/strict";
import { getRecipeContract, normalizeConfig } from "../src/defaults.js";

test("normalize supports dfirt alias without breaking drift", () => {
  const config = normalizeConfig({
    animate: {
      dfirt: "12%"
    }
  });

  assert.equal(config.animate.drift, "12%");
});

test("normalize auto performance can downshift for low-end hints", () => {
  const config = normalizeConfig(
    {
      performance: "auto"
    },
    {
      hardwareConcurrency: 2,
      deviceMemory: 2
    }
  );

  assert.equal(config.performance, "eco");
});

test("MER reduces heavy effects only when performance is automatic", () => {
  const auto = normalizeConfig(
    {
      performance: "auto",
      effect: "liquid",
      "main-filter": "blur-filters"
    },
    {
      hardwareConcurrency: 2,
      deviceMemory: 2
    }
  );
  const manual = normalizeConfig(
    {
      performance: "quality",
      effect: "liquid",
      mainFilter: "blur-filters"
    },
    {
      hardwareConcurrency: 2,
      deviceMemory: 2,
      prefersReducedMotion: true
    }
  );

  assert.equal(auto.performance, "static");
  assert.equal(auto.monitoring.engine, "MER");
  assert.equal(auto.monitoring.reduced, true);
  assert.equal(auto.glass.mainFilter, "blur-filters");
  assert.equal(manual.performance, "quality");
  assert.equal(manual.monitoring.reason, "manual-performance");
});

test("normalize supports separated gradient-only mode while preserving legacy keys", () => {
  const config = normalizeConfig({
    mode: "gradient",
    effect: "halo"
  });

  assert.equal(config.mode, "gradient");
  assert.equal(config.gradient.enabled, true);
  assert.equal(config.glass.enabled, false);
  assert.equal(config.effect, "halo");
  assert.match(config.blur, /px$/);
});

test("normalize accepts new 1.2 effects without dropping old effects", () => {
  const liquid = normalizeConfig({ effect: "liquid" });
  const caustic = normalizeConfig({ effect: "caustic" });
  const old = normalizeConfig({ effect: "prism" });

  assert.equal(liquid.effect, "liquid");
  assert.equal(caustic.effect, "caustic");
  assert.equal(old.effect, "prism");
});

test("normalize supports Engine UP and Motion Blurrin without changing old defaults", () => {
  const plain = normalizeConfig({});
  const advanced = normalizeConfig({
    engineUp: {
      enabled: true,
      duration: "12s",
      x: "4%",
      blur: 28,
      frames: [
        { at: "0%", x: "-2%", y: "0%", blur: 12 },
        { at: "50%", x: "2%", y: "1%", blur: 34 }
      ]
    },
    motionBlurrin: {
      layers: [
        { count: 6, minSize: 40, maxSize: 90, speed: 0.6, direction: "right" },
        { count: 10, minSize: 12, maxSize: 36, speed: 1.1, direction: "diagonal" }
      ],
      blur: 20,
      openness: 0.4,
      edgeFade: 0.2
    }
  });

  assert.equal(plain.engineUp.enabled, false);
  assert.equal(plain.motionBlurrin.enabled, false);
  assert.equal(advanced.engineUp.enabled, true);
  assert.equal(advanced.engineUp.duration, "12s");
  assert.equal(advanced.engineUp.frames.length, 2);
  assert.equal(advanced.engineUp.frames[1].blur, "34px");
  assert.equal(advanced.motionBlurrin.enabled, true);
  assert.equal(advanced.motionBlurrin.layers.length, 2);
  assert.equal(advanced.motionBlurrin.layers[0].count, 6);
  assert.equal(advanced.motionBlurrin.blur, "20px");
});

test("normalize supports frost-only mode with safe contrast tuning", () => {
  const config = normalizeConfig({
    mode: "frost",
    contrastMode: "safe"
  });

  assert.equal(config.mode, "frost");
  assert.equal(config.gradient.enabled, false);
  assert.equal(config.glass.enabled, true);
  assert.equal(config.contrastMode, "safe");
  assert.match(config.glass.fill, /rgba/);
});

test("normalize keeps static profile opt-in", () => {
  const config = normalizeConfig({
    performance: "static"
  });

  assert.equal(config.performance, "static");
  assert.equal(config.animate.enabled, false);
});

test("normalize applies recipes additively", () => {
  const config = normalizeConfig({
    recipe: "navbar",
    glass: { blur: 22 }
  });

  assert.equal(config.recipe, "navbar");
  assert.equal(config.mode, "frost");
  assert.equal(config.contrastMode, "safe");
  assert.match(config.radius, /999px/);
  assert.match(config.glass.blur, /px$/);
});

test("normalize supports semantic strength tuning", () => {
  const soft = normalizeConfig({ strength: "soft" });
  const strong = normalizeConfig({ strength: "strong" });

  assert.equal(soft.strength, "soft");
  assert.equal(strong.strength, "strong");
  assert.ok(strong.shadow > soft.shadow);
  assert.ok(strong.opacity > soft.opacity);
});

test("normalize ships semantic workspace and command recipes", () => {
  const workspace = normalizeConfig({ recipe: "workspace" });
  const command = normalizeConfig({ recipe: "command-palette" });
  const terminal = normalizeConfig({ recipe: "terminal" });

  assert.equal(workspace.recipe, "workspace");
  assert.equal(workspace.performance, "static");
  assert.equal(command.recipe, "command-palette");
  assert.equal(command.strength, "strong");
  assert.equal(terminal.recipe, "terminal");
  assert.equal(terminal.monochrome, true);
});

test("recipe contracts expose intended product roles", () => {
  const contract = getRecipeContract("dialog");
  const table = getRecipeContract("table");
  const fallback = getRecipeContract("unknown-shell", { mode: "frost", strength: "soft", performance: "eco" });

  assert.equal(contract.role, "dialog-shell");
  assert.equal(contract.recommendedMode, "surface");
  assert.equal(table.role, "data-grid");
  assert.equal(fallback.name, "unknown-shell");
  assert.equal(fallback.recommendedPerformance, "eco");
});
