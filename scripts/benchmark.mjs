import { performance } from "node:perf_hooks";
import { compileGlass } from "../src/compiler.js";
import { parseGlass } from "../src/parser.js";
import { normalizeConfig } from "../src/defaults.js";

const sample = `
selector: .bench
preset: cinematic
palette: aurora
effect: prism
performance: balanced
intensity: 1.2
frost: 0.9
vignette: 0.3
shadow: 0.34
animate.mode: orbit
animate.hueShift: 42
animate.drift: 11%
grain.amount: 0.11
`;

function bench(name, fn, iterations = 5000) {
  const start = performance.now();
  for (let i = 0; i < iterations; i += 1) {
    fn();
  }
  const end = performance.now();
  const ms = end - start;
  console.log(`${name}: ${ms.toFixed(2)}ms total | ${(ms / iterations).toFixed(4)}ms/op`);
}

bench("parseGlass", () => parseGlass(sample));
const parsed = parseGlass(sample);
bench("normalizeConfig", () => normalizeConfig(parsed));
bench("compileGlass", () => compileGlass(sample, { minify: true }), 1500);
