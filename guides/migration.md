---
title: Migration Guide
---

# Migration Guide

## Migrating to V4

- No more cookies.
- You no longer need to use `NextJsSSGThemeSwitcher`, `NextJsServerTarget`, or `ServerSideWrapper`.
- Flash of Unstyled Content (FOUC) is now handled by an injected script.
- If you have been using these components, they will have no effect. We recommend removing them.
- There is no need to use sibling selectors. Without `NextJsSSGThemeSwitcher` or `NextJsServerTarget`, you are free to use any target, whether as a wrapper or a sibling.

### Breaking Changes

- `ForceColorScheme` and `ForceTheme` are no longer exported from `nextjs-themes` or `nextjs-themes/client`. Use `nextjs-themes/force-color-scheme` or `nextjs-themes/force-theme` instead.
- The class names for `ColorSwitch` have been shortened.

## Migrating from V1 to V2

### Major Changes

- Commit `6f17cce`: Added additional CSS combinations to ensure seamless support for Tailwind.

  - No changes are required for client-side code as `[data-theme=]` selectors function as before.
  - If you are using `ServerSideWrapper`, `NextJsServerTarget`, or `NextJsSSGThemeSwitcher`, you need to convert `forcedPages` elements to objects shaped like `{ pathMatcher: RegExp | string; props: ThemeSwitcherProps }`.
  - Use `resolvedColorScheme` for more robust dark/light/system modes.
  - Use combinations of `[data-th=""]` and `[data-color-scheme=""]` for dark/light theme variants.
  - Use `[data-csp=""]` to style based on color scheme preference.

### Minor Changes

- Support for custom `themeTransition`.

  - Provide the `themeTransition` prop to the `ThemeSwitcher` component to apply a smooth transition when changing the theme.
  - Use `setThemeSet` to set `lightTheme` and `darkTheme` together.

#### Motivation

For server-side syncing, cookies and headers are required. This means that this component and its children cannot be static and will be rendered server-side for each request. To avoid the wrapper, only the `NextJsSSGThemeSwitcher` will be rendered server-side for each request, while the rest of your app can be served statically.

Consider the following when migrating to V2:

- No changes are required for projects not using the `Next.js` app router or server components, aside from updating the cookies policy if needed.
- Persistent storage now uses cookies instead of `localStorage`. (You might need to update your cookies policy accordingly.)
- We have introduced `NextJsSSGThemeSwitcher` in addition to `ServerSideWrapper` for `Next.js`. You no longer need to use a wrapper component that breaks static generation and forces SSR.
- For more details, visit [With Next.js `app` router (Server Components)](#with-nextjs-app-router-server-components).

## Migrating from V0 to V1

- `defaultDarkTheme` has been renamed to `darkTheme`.
- `setDefaultDarkTheme` has been renamed to `setDarkTheme`.
- `defaultLightTheme` has been renamed to `lightTheme`.
- `setDefaultLightTheme` has been renamed to `setLightTheme`.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
