import {
  createGlassComponentCss,
  getGlassComponent,
  listGlassComponents
} from "../components.js";

function toPascalCase(value) {
  return String(value)
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join("");
}

function resolveSpecName(component, options) {
  if (options.name) {
    return options.name;
  }
  const filePrefix = options.filePrefix === undefined ? "glass" : options.filePrefix;
  return [filePrefix, component.name].filter(Boolean).join("-");
}

function resolveClassName(component, options) {
  if (options.className) {
    return options.className;
  }
  if (options.classPrefix) {
    return `${options.classPrefix}-${component.name}`;
  }
  return component.className;
}

function renderJsxAttributes(attrs) {
  return Object.entries(attrs)
    .map(([key, value]) => `${key}=${JSON.stringify(String(value))}`)
    .join(" ");
}

function renderSource({ componentName, tag, className, attrs, cnImport }) {
  const attrSource = renderJsxAttributes(attrs);
  const attrPrefix = attrSource ? `${attrSource}\n      ` : "";

  return `import { forwardRef } from "react";
${cnImport}

export const ${componentName} = forwardRef(function ${componentName}({ className, ...props }, ref) {
  return (
    <${tag}
      ref={ref}
      ${attrPrefix}className={cn(${JSON.stringify(className)}, className)}
      {...props}
    />
  );
});`;
}

function renderUsage({ importLine, componentName, tag, children }) {
  const body = tag === "input"
    ? `<${componentName} aria-label="Glass input" />`
    : `<${componentName}>${children}</${componentName}>`;

  return `${importLine}

export function Example() {
  return ${body};
}`;
}

export function createGlassShadcnComponentSpec(name = "panel", options = {}) {
  const component = getGlassComponent(name);
  const specName = resolveSpecName(component, options);
  const componentName = options.componentName || component.displayName || `Glass${toPascalCase(component.name)}`;
  const className = resolveClassName(component, options);
  const importBase = options.importBase || "@/components/ui";
  const importLine = `import { ${componentName} } from "${importBase}/${specName}";`;
  const cnImport = options.cnImport || 'import { cn } from "@/lib/utils";';
  const input = options.input || {};
  const cssOptions = {
    ...(options.cssOptions || {}),
    minify: options.minify ?? options.cssOptions?.minify
  };
  const css = createGlassComponentCss(component.name, `.${className}`, input, cssOptions);
  const source = renderSource({
    componentName,
    tag: component.tag,
    className,
    attrs: component.attrs,
    cnImport
  });
  const usage = renderUsage({
    importLine,
    componentName,
    tag: component.tag,
    children: options.children || component.displayName || componentName
  });

  return {
    name: specName,
    componentName,
    glassComponent: component.name,
    import: importLine,
    className,
    css,
    usage,
    source,
    recipe: component.recipe,
    tag: component.tag,
    attrs: { ...component.attrs }
  };
}

export function createGlassShadcnCatalog(options = {}) {
  const include = options.include || listGlassComponents();
  const { name, componentName, className, children, ...catalogOptions } = options;

  return include.reduce((acc, glassComponentName) => {
    const spec = createGlassShadcnComponentSpec(glassComponentName, catalogOptions);
    acc[spec.name] = spec;
    return acc;
  }, {});
}

export function createGlassShadcnCss(options = {}) {
  const catalog = createGlassShadcnCatalog(options);
  return Object.values(catalog)
    .map((spec) => spec.css)
    .join(options.minify ? "" : "\n\n");
}
