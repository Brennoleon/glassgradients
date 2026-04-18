# Integrations (Starter)

## React

```jsx
import { useEffect } from "react";
import { createGlassGradient } from "glassgradients";

export function Hero() {
  useEffect(() => {
    const fx = createGlassGradient(".hero", { preset: "soft", effect: "aurora" });
    return () => fx.destroy();
  }, []);

  return <section className="hero">...</section>;
}
```

## Next.js

Use client component for runtime mode:

```tsx
"use client";
```

For static mode, compile `.glass` at build step and import generated CSS globally.

## Tailwind / UnoCSS

Use library-generated class selector in your component classes and keep layout/spacing in utility classes.
