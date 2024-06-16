import type { ColorSchemeType } from "../types";
import { resolveTheme, useStore } from "../utils";

/** useTheme hook */
export const useTheme = (targetId?: string) => {
  const [themeState, setThemeState] = useStore(targetId);
  const [resolvedTheme, resolvedColorScheme] = resolveTheme(themeState);
  const setter =
    <T>(key: string) =>
    (arg: T) =>
      setThemeState(prev => ({ ...prev, [key]: arg }));
  return {
    ...themeState,
    resolvedColorScheme,
    resolvedTheme,
    setTheme: setter<string>("theme"),
    setDarkTheme: setter<string>("darkTheme"),
    setLightTheme: setter<string>("lightTheme"),
    setThemeSet: (themeSet: { darkTheme: string; lightTheme: string }) =>
      setThemeState(state => ({ ...state, ...themeSet })),
    setColorSchemePref: setter<ColorSchemeType>("colorSchemePref"),
    setForcedTheme: setter<string | undefined>("forcedTheme"),
    setForcedColorScheme: setter<ColorSchemeType | undefined>("forcedColorScheme"),
  };
};
