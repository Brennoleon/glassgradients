import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);

function readJson(path) {
  return JSON.parse(readFileSync(new URL(path, root), "utf8"));
}

test("github lab metrics expose release, coverage, and chart data", () => {
  const report = readJson("docs/metrics/report.json");

  assert.equal(report.package.version, "1.1.0");
  assert.equal(report.counts.adapters, 11);
  assert.ok(report.counts.components >= 20);
  assert.ok(report.counts.recipes >= 20);
  assert.ok(report.counts.tests >= 50);
  assert.ok(report.performance.every((item) => item.opsPerSecond > 0));
  assert.ok(report.cssSamples.every((item) => item.bytes > 0));
});

test("github lab site ships committed charts and generated CSS", () => {
  for (const asset of [
    "docs/assets/chart-ops.svg",
    "docs/assets/chart-css-size.svg",
    "docs/assets/chart-capability.svg",
    "site/assets/chart-ops.svg",
    "site/assets/chart-css-size.svg",
    "site/assets/chart-capability.svg",
    "site/generated/glass-components.css"
  ]) {
    assert.equal(existsSync(new URL(asset, root)), true, `${asset} should exist`);
  }
});

test("github lab page loads metrics, runtime, and generated component CSS", () => {
  const html = readFileSync(new URL("site/index.html", root), "utf8");
  const app = readFileSync(new URL("site/app.js", root), "utf8");

  assert.match(html, /GlassGradients Lab/);
  assert.match(html, /\.\/generated\/glass-components\.css/);
  assert.match(html, /\.\/app\.js/);
  assert.match(app, /\.\/data\/metrics\.json/);
  assert.match(app, /\.\/source\/runtime\.js/);
});
