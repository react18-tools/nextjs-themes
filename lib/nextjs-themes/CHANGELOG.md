# nextjs-themes

## 3.1.1

### Patch Changes

- Update dependencies

## 3.1.0

### Minor Changes

- Add support for CSS modules and minor fixes.

## 3.0.0

### Major Changes

- 9f30638: Replaced Zustand with r18gs. Added more functionality and perfomance improvements. Minor changes to existing APIs.

  better support for tree-shaking
  reduced package size
  improved performance
  Ability to create localized themes

### Patch Changes

- 9f30638: Create cookies only if ServerTarget is used.

## 2.1.2

### Patch Changes

- Upgrade dependencies

## 2.1.1

### Patch Changes

- Add npm provance

## 2.1.0

### Minor Changes

- Add support for changing storage

## 2.0.1

### Patch Changes

- 6de3493: Add option to skip System colorScheme | Make forcedPage options backward compatible

## 2.0.0

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

## 1.2.1

### Patch Changes

- Add resolvedTheme and resolvedColorScheme to useTheme state.

## 1.2.0

### Minor Changes

- Support Tailwind CSS

## 1.1.1

### Patch Changes

- bc71a4a: Update examples, enhancements

## 1.1.0

### Minor Changes

- da1cdd9: Add SSG optimization for Next.js app router
