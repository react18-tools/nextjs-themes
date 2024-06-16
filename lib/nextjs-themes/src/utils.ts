import useRGS from "r18gs";
import { ThemeSwitcherProps, UpdateProps } from "./client";
import { DARK, DEFAULT_ID, LIGHT, SYSTEM, initialState } from "./constants";
import { ResolvedColorSchemeType, ThemeStoreType } from "./types";

/** resolve props and state to a final attributes that should be applied to the DOM */
export const resolveTheme = (state?: ThemeStoreType, props?: ThemeSwitcherProps): UpdateProps => {
  const resolvedForcedTheme = props?.forcedTheme ?? state?.ft;
  const resolvedForcedColorScheme = props?.forcedColorScheme ?? state?.fc;
  const resolvedColorSchemePref = (resolvedForcedColorScheme ?? state?.c) || "";

  const isSystemDark = state?.s === DARK;

  /** these will be modified in the switch statement */
  let resolvedColorScheme: ResolvedColorSchemeType = isSystemDark ? DARK : LIGHT;
  let resolvedTheme = (resolvedForcedTheme ?? state?.t) || "";

  if (resolvedForcedTheme === undefined)
    switch (resolvedColorSchemePref) {
      case SYSTEM:
        resolvedTheme = (isSystemDark ? state?.d : state?.l) || "";
        break;
      case DARK:
        [resolvedTheme, resolvedColorScheme] = [state?.d || "", DARK];
        break;
      case LIGHT:
        [resolvedTheme, resolvedColorScheme] = [state?.l || "", LIGHT];
        break;
    }

  const th = resolvedForcedTheme === undefined ? state?.t || "" : resolvedForcedTheme;
  return [resolvedTheme, resolvedColorScheme, resolvedColorSchemePref, th];
};

const isServer = typeof localStorage === "undefined";
export const MEDIA = "(prefers-color-scheme: dark)";

/** internal store API */
export const useStore = (targetId?: string) => {
  const key = targetId ?? DEFAULT_ID;
  return useRGS<ThemeStoreType>(key, () => {
    const str = isServer ? null : localStorage.getItem(key);
    return str ? { ...JSON.parse(str), s: matchMedia(MEDIA).matches ? DARK : LIGHT } : initialState;
  });
};
