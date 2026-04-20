# Adapter Examples

- `react-basic.jsx`
- `vue-basic.vue`
- `solid-basic.tsx`
- `preact-basic.jsx`
- `svelte-basic.svelte`
- `tailwind.config.js`
- `tailwind-v4-css.js`
- `uno.config.ts`
- `shadcn-spec.js`
- `next-app.jsx`
- `nuxt-plugin.ts`
- `astro-head.astro`

These examples show the intended integration shape for each adapter layer.

They are not all standalone Node scripts. Tailwind examples expect `tailwindcss`; UnoCSS examples expect `unocss`; framework JSX/TSX/Vue/Svelte files expect the host framework and bundler. The core package keeps those dependencies optional.
