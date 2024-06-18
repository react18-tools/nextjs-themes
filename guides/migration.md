# Migration Guide

## Migrating from v1 to v2

### Major Changes

- 6f17cce: # Additonal CSS Combinations + Ensure seamless support for Tailwind

  - No changes required for client side code as `[data-theme=]` selectors work as before.
  - If you are using `ServerSideWrapper` or `NextJsServerTarget` or `NextJsSSGThemeSwitcher`, you need to convert `forcedPages` elements to objects of the shape `{ pathMatcher: RegExp | string; props: ThemeSwitcherProps }`.
  - Use `resolvedColorScheme` for more sturdy dark/light/system modes
  - Use combinations of `[data-th=""]` and `[data-color-scheme=""]` for dark/light varients of themes
  - Use `[data-csp=""]` to style based on colorSchemePreference.

### Minor Changes

- # Support custom themeTransition

  - Provide `themeTransition` prop to `ThemeSwitcher` component to apply smooth transition while changing theme.
  - Use `setThemeSet` to set `lightTheme` and `darkTheme` together.

#### Motivation:

For server side syncing, we need to use cookies and headers. This means that this component and its children can not be static. They will be rendered server side for each request. Thus, we are avoiding the wrapper. Now, only the `NextJsSSGThemeSwitcher` will be rendered server side for each request and rest of your app can be server statically.

Take care of the following while migrating to `v2`.

- No changes required for projects not using `Next.js` app router or server components other than updating cookies policy if needed.
- The persistent storage is realized with `cookies` in place of `localStorage`. (You might want to update cookies policy accordingly.)
- We have provided `NextJsSSGThemeSwitcher` in addition to `ServerSideWrapper` for `Next.js`. You no longer need to use a wrapper component which broke static generation and forced SSR.
- Visit [With Next.js `app` router (Server Components)](#with-nextjs-app-router-server-components)

## Migrating from v0 to v1

- `defaultDarkTheme` is renamed to `darkTheme`
- `setDefaultDarkTheme` is renamed to `setDarkTheme`
- `defaultLightTheme` is renamed to `lightTheme`
- `setDefaultLightTheme` is renamed to `setLightTheme`

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
