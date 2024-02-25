import useRGS from "r18gs";
import { ColorSchemeType, DEFAULT_ID, ThemeStoreType, initialState } from "../constants";
import { resolveTheme } from "../utils";
import { useCallback } from "react";

export function useTheme(targetId?: string) {
  const [themeState, setThemeState] = useRGS<ThemeStoreType>(targetId ?? DEFAULT_ID, initialState);
  const { resolvedColorScheme, resolvedTheme } = resolveTheme(themeState);
  return {
    ...themeState,
    resolvedColorScheme,
    resolvedTheme,
    setTheme: useCallback((theme: string) => setThemeState(state => ({ ...state, theme })), []),
    setDarkTheme: useCallback((darkTheme: string) => setThemeState(state => ({ ...state, darkTheme })), []),
    setLightTheme: useCallback((lightTheme: string) => setThemeState(state => ({ ...state, lightTheme })), []),
    setThemeSet: useCallback(
      (themeSet: { darkTheme: string; lightTheme: string }) => setThemeState(state => ({ ...state, ...themeSet })),
      [],
    ),
    setColorSchemePref: useCallback(
      (colorSchemePref: ColorSchemeType) => setThemeState(state => ({ ...state, colorSchemePref })),
      [],
    ),
    setForcedTheme: useCallback((forcedTheme?: string) => setThemeState(state => ({ ...state, forcedTheme })), []),
    setForcedColorScheme: useCallback(
      (forcedColorScheme?: ColorSchemeType) => setThemeState(state => ({ ...state, forcedColorScheme })),
      [],
    ),
  };
}
