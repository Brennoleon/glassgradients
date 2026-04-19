import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

test("package is prepared as a minor feature release", () => {
  assert.equal(pkg.version, "1.1.0");
  assert.ok(pkg.files.includes("docs"));
  assert.match(pkg.scripts["release:check"], /npm pack --dry-run/);
});

test("package exports adapters through subpaths without changing root entry", () => {
  assert.equal(pkg.exports["."].default, "./src/index.js");
  assert.equal(pkg.exports["./components"].default, "./src/components.js");
  assert.equal(pkg.exports["./components/react"].default, "./src/components/react.js");
  assert.equal(pkg.exports["./components/preact"].default, "./src/components/preact.js");
  assert.equal(pkg.exports["./adapters/react"].default, "./src/adapters/react.js");
  assert.equal(pkg.exports["./adapters/vue"].default, "./src/adapters/vue.js");
  assert.equal(pkg.exports["./adapters/solid"].default, "./src/adapters/solid.js");
  assert.equal(pkg.exports["./adapters/preact"].default, "./src/adapters/preact.js");
  assert.equal(pkg.exports["./adapters/svelte"].default, "./src/adapters/svelte.js");
  assert.equal(pkg.exports["./adapters/tailwind"].default, "./src/adapters/tailwind.js");
  assert.equal(pkg.exports["./adapters/unocss"].default, "./src/adapters/unocss.js");
  assert.equal(pkg.exports["./adapters/next"].default, "./src/adapters/next.js");
  assert.equal(pkg.exports["./adapters/nuxt"].default, "./src/adapters/nuxt.js");
  assert.equal(pkg.exports["./adapters/astro"].default, "./src/adapters/astro.js");
  assert.equal(pkg.exports["./adapters/vanilla"].default, "./src/adapters/vanilla.js");
});

test("package keeps framework peers optional", () => {
  assert.equal(pkg.peerDependencies.preact, ">=10.19");
  assert.equal(pkg.peerDependencies.react, ">=18");
  assert.equal(pkg.peerDependencies["solid-js"], ">=1.8");
  assert.equal(pkg.peerDependencies.vue, ">=3.3");
  assert.equal(pkg.peerDependenciesMeta.preact.optional, true);
  assert.equal(pkg.peerDependenciesMeta.react.optional, true);
  assert.equal(pkg.peerDependenciesMeta["solid-js"].optional, true);
  assert.equal(pkg.peerDependenciesMeta.vue.optional, true);
});
