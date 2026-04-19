import { createElement } from "preact";
import { useEffect, useMemo, useRef } from "preact/hooks";
import { createGlassThemeScript } from "../theme.js";
import { createGlassStyleObject, createGlassTokenObject, mountGlass, stableSerialize } from "./shared.js";

function assignRef(ref, value) {
  if (!ref) {
    return;
  }
  if (typeof ref === "function") {
    ref(value);
    return;
  }
  ref.current = value;
}

export function useGlassGradient(targetRef, input = {}, runtimeOptions = {}) {
  const instanceRef = useRef(null);
  const inputSignature = stableSerialize(input);
  const runtimeSignature = stableSerialize(runtimeOptions);

  useEffect(() => {
    const node = targetRef?.current;
    if (!node) {
      return undefined;
    }

    const instance = mountGlass(node, input, runtimeOptions);
    instanceRef.current = instance;

    return () => {
      if (instanceRef.current === instance) {
        instanceRef.current = null;
      }
      instance.destroy();
    };
  }, [targetRef, runtimeSignature]);

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update(input);
    }
  }, [inputSignature]);

  return instanceRef;
}

export function useGlassStyle(input = {}) {
  const signature = stableSerialize(input);
  return useMemo(() => createGlassStyleObject(input), [signature]);
}

export function useGlassTokens(input = {}) {
  const signature = stableSerialize(input);
  return useMemo(() => createGlassTokenObject(input), [signature]);
}

export function GlassSurface(props) {
  const {
    as = "div",
    input = {},
    runtimeOptions = {},
    style,
    children,
    elementRef,
    ...rest
  } = props || {};

  const localRef = useRef(null);
  useGlassGradient(localRef, input, runtimeOptions);
  const glassStyle = useGlassStyle(input);

  return createElement(
    as,
    {
      ...rest,
      ref: (node) => {
        localRef.current = node;
        assignRef(elementRef, node);
      },
      style: { ...glassStyle, ...style }
    },
    children
  );
}

export function GlassThemeScript(props = {}) {
  return createElement("script", {
    dangerouslySetInnerHTML: {
      __html: createGlassThemeScript(props)
    }
  });
}
