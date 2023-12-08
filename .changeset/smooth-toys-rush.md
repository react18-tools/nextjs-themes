---
"nextjs-themes": major
---

# Additonal CSS Combinations + Ensure seamless support for Tailwind

- No changes required for client side code as `[data-theme=]` selectors work as before.
- If you are using `ServerSideWrapper` or `NextJsServerTarget` or `NextJsSSGThemeSwitcher`, you need to convert `forcedPages` elements to objects of the shape `{ pathMatcher: RegExp | string; props: ThemeSwitcherProps }`.
- Use `resolvedColorScheme` for more sturdy dark/light/system modes
- Use combinations of `[data-th=""]` and `[data-color-scheme=""]` for dark/light varients of themes
- Use `[data-csp=""]` to style based on colorSchemePreference.
