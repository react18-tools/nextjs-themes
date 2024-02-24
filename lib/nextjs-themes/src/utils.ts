import { ThemeSwitcherProps, UpdateProps } from "./client";
import { ThemeStoreType } from "./constants";

export function resolveTheme(state?: ThemeStoreType, props?: ThemeSwitcherProps): UpdateProps {
  const resolvedForcedTheme = props?.forcedTheme === undefined ? state?.forcedTheme : props.forcedTheme;
  const resolvedForcedColorScheme =
    props?.forcedColorScheme === undefined ? state?.forcedColorScheme : props.forcedColorScheme;
  const resolvedColorSchemePref =
    (resolvedForcedColorScheme === undefined ? state?.colorSchemePref : resolvedForcedColorScheme) || "";

  const isSystemDark = state?.systemColorScheme === "dark";

  let resolvedColorScheme: "dark" | "light" = isSystemDark ? "dark" : "light";
  let resolvedTheme = resolvedForcedTheme === undefined ? state?.theme || "" : resolvedForcedTheme;

  if (resolvedForcedTheme === undefined)
    switch (resolvedColorSchemePref) {
      case "system":
        resolvedTheme = (isSystemDark ? state?.darkTheme : state?.lightTheme) || "";
        break;
      case "dark":
        [resolvedTheme, resolvedColorScheme] = [state?.darkTheme || "", "dark"];
        break;
      case "light":
        [resolvedTheme, resolvedColorScheme] = [state?.lightTheme || "", "light"];
        break;
    }

  const th = resolvedForcedTheme === undefined ? state?.theme || "" : resolvedForcedTheme;
  return { resolvedTheme, resolvedColorScheme, resolvedColorSchemePref, th };
}

export function getResolvedTheme() {
  return document.documentElement.getAttribute("data-theme");
}

export function getResolvedColorScheme() {
  return document.documentElement.getAttribute("data-color-scheme");
}
