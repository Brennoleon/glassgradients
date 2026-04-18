import test from "node:test";
import assert from "node:assert/strict";
import { normalizeConfig } from "../src/defaults.js";

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
