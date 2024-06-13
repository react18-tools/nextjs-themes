import useRGS from "r18gs";
import { ThemeSwitcherProps, UpdateProps } from "./client";
import { DARK, DEFAULT_ID, ResolvedColorSchemeType, ThemeStoreType, initialState } from "./constants";

/** resolve props and state to a final attributes that should be applied to the DOM */
export const resolveTheme = (state?: ThemeStoreType, props?: ThemeSwitcherProps): UpdateProps => {
  const resolvedForcedTheme = props?.forcedTheme ?? state?.forcedTheme;
  const resolvedForcedColorScheme = props?.forcedColorScheme ?? state?.forcedColorScheme;
  const resolvedColorSchemePref = (resolvedForcedColorScheme ?? state?.colorSchemePref) || "";

  const isSystemDark = state?.systemColorScheme === DARK;

  /** these will be modified in the switch statement */
  let resolvedColorScheme: ResolvedColorSchemeType = isSystemDark ? "dark" : "light";
  let resolvedTheme = (resolvedForcedTheme ?? state?.theme) || "";

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
};

const isServer = typeof localStorage === "undefined";
export const media = matchMedia("(prefers-color-scheme: dark)");

/** internal store API */
export const useStore = (targetId?: string) => {
  const key = targetId ?? DEFAULT_ID;
  return useRGS<ThemeStoreType>(key, () => {
    const str = isServer ? null : localStorage.getItem(key);
    return str ? { ...JSON.parse(str), systemColorScheme: media.matches ? "dark" : "light" } : initialState;
  });
};
