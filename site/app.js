const metricIds = {
  "metric-version": (data) => data.package.version,
  "metric-tests": (data) => data.counts.tests,
  "metric-adapters": (data) => data.counts.adapters,
  "metric-components": (data) => data.counts.components,
  "metric-exports": (data) => data.package.publicExports,
  "parse-ops": (data) => data.performance.find((item) => item.name === "parseGlass")?.opsPerSecond,
  "normalize-ops": (data) => data.performance.find((item) => item.name === "normalizeConfig")?.opsPerSecond,
  "compile-ops": (data) => data.performance.find((item) => item.name === "compileGlass")?.opsPerSecond
};

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) {
    element.textContent = value;
  }
}

async function hydrateMetrics() {
  const response = await fetch("./data/metrics.json", { cache: "no-store" });
  const data = await response.json();

  for (const [id, resolver] of Object.entries(metricIds)) {
    setText(id, resolver(data));
  }

  setText("build-time", `metrics: ${new Date(data.generatedAt).toLocaleString()}`);

  const list = document.getElementById("integration-list");
  if (list) {
    list.innerHTML = "";
    for (const name of data.integrationMatrix) {
      const item = document.createElement("span");
      item.textContent = name;
      list.append(item);
    }
  }
}

function currentRuntimeInput() {
  return {
    mode: document.getElementById("runtime-mode")?.value || "surface",
    recipe: document.getElementById("runtime-recipe")?.value || "command-palette",
    strength: document.getElementById("runtime-strength")?.value || "strong",
    contrastMode: "safe",
    performance: "balanced",
    interactive: { enabled: true, glare: 0.12 }
  };
}

async function setupRuntime() {
  const status = document.getElementById("runtime-status");
  const target = document.getElementById("runtime-preview");
  const button = document.getElementById("runtime-apply");

  if (!target || !button) {
    return;
  }

  if (location.protocol === "file:") {
    if (status) {
      status.textContent = "runtime disabled on file://; serve site over HTTP";
    }
    return;
  }

  try {
    const { createGlassGradient } = await import("./source/runtime.js");
    const instance = createGlassGradient(target, currentRuntimeInput(), { threaded: false, reduceMotion: true });
    if (status) {
      status.textContent = "runtime active";
    }
    button.addEventListener("click", () => {
      instance.update(currentRuntimeInput());
      if (status) {
        status.textContent = `updated: ${new Date().toLocaleTimeString()}`;
      }
    });
    window.addEventListener("beforeunload", () => instance.destroy());
  } catch (error) {
    if (status) {
      status.textContent = `runtime import failed: ${error.message}`;
    }
  }
}

hydrateMetrics().catch((error) => {
  setText("build-time", `metrics unavailable: ${error.message}`);
});
setupRuntime();
