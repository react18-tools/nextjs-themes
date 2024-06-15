import { SetStateAction } from "r18gs";
import { ColorSchemeType, ThemeStoreType } from "../constants";
import { resolveTheme, useStore } from "../utils";
import { useMemo } from "react";

/** create setter for memoized setter */
const createSetter = (setThemeState: SetStateAction<ThemeStoreType>) => {
  return <T>(key: string) =>
    (arg: T) =>
      setThemeState(state => ({ ...state, [key]: arg }));
};

/** useTheme hook */
export const useTheme = (targetId?: string) => {
  const [themeState, setThemeState] = useStore(targetId);
  const { resolvedColorScheme, resolvedTheme } = resolveTheme(themeState);
  const setter = useMemo(() => createSetter(setThemeState), []);
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
