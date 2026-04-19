export const BREAKPOINTS = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
};

const BREAKPOINT_ORDER = Object.keys(BREAKPOINTS);

function asObject(value) {
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    return value;
  }
  return {};
}

function sortResponsiveEntries(entries) {
  return entries.sort((a, b) => {
    const aIndex = BREAKPOINT_ORDER.indexOf(a[0]);
    const bIndex = BREAKPOINT_ORDER.indexOf(b[0]);
    const aRank = aIndex === -1 ? Number.MAX_SAFE_INTEGER : aIndex;
    const bRank = bIndex === -1 ? Number.MAX_SAFE_INTEGER : bIndex;
    return aRank - bRank;
  });
}

export function stripVariantConfig(input) {
  const source = typeof input === "object" && input !== null ? { ...input } : {};
  delete source.responsive;
  delete source.scheme;
  return source;
}

export function resolveMediaQuery(key) {
  const normalized = String(key || "").trim();
  if (!normalized) {
    return "";
  }
  if (BREAKPOINTS[normalized]) {
    return `(min-width: ${BREAKPOINTS[normalized]})`;
  }
  if (normalized.startsWith("@media")) {
    return normalized.replace(/^@media\s*/i, "").trim();
  }
  return normalized;
}

export function collectVariantEntries(input) {
  const source = typeof input === "object" && input !== null ? input : {};
  const entries = [];
  const responsive = sortResponsiveEntries(Object.entries(asObject(source.responsive)));
  const scheme = Object.entries(asObject(source.scheme));

  for (const [key, value] of responsive) {
    const query = resolveMediaQuery(key);
    if (!query) {
      continue;
    }
    entries.push({
      kind: "responsive",
      key,
      query,
      input: value
    });
  }

  for (const [key, value] of scheme) {
    const schemeKey = String(key).toLowerCase();
    if (schemeKey !== "dark" && schemeKey !== "light") {
      continue;
    }
    entries.push({
      kind: "scheme",
      key: schemeKey,
      query: `(prefers-color-scheme: ${schemeKey})`,
      input: value
    });
  }

  return entries;
}

export function evaluateVariantInput(input, mergeDeep, matchMediaFn) {
  const base = stripVariantConfig(input);
  const entries = collectVariantEntries(input);
  let resolved = base;

  for (const entry of entries) {
    if (typeof matchMediaFn !== "function") {
      continue;
    }
    try {
      if (matchMediaFn(entry.query).matches) {
        resolved = mergeDeep(resolved, entry.input);
      }
    } catch {
      // Ignore invalid media queries in runtime and keep the base config usable.
    }
  }

  return resolved;
}
