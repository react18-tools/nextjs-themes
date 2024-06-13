import useRGS, { SetStateAction } from "r18gs";
import { ColorSchemeType, DEFAULT_ID, ThemeStoreType, initialState } from "../constants";
import { resolveTheme } from "../utils";
import { useCallback, useMemo } from "react";

const DELAY = 200; // ms - delay to allow reading from localStorage so that local storage does not override the new state
const map: Record<string, Function | number> = {};
const createSetterWithFirstTimeDelay = (setThemeState: SetStateAction<ThemeStoreType>) => {
  return <T>(key: string) => {
    if (map[key] === undefined) {
      map[key] = 1;
      return (arg: T) => setTimeout(() => setThemeState(state => ({ ...state, [key]: arg })), DELAY);
    } else if (map[key] === 1) {
      const fn = (arg: T) => setThemeState(state => ({ ...state, [key]: arg }));
      map[key] = fn;
    }
    return map[key] as (arg: T) => void;
  };
}

export const useTheme = (targetId?: string) => {
  const [themeState, setThemeState] = useRGS<ThemeStoreType>(targetId ?? DEFAULT_ID, initialState);
  const { resolvedColorScheme, resolvedTheme } = resolveTheme(themeState);
  const setterWithFirstTimeDelay = useMemo(() => createSetterWithFirstTimeDelay(setThemeState), []);
  return {
    ...themeState,
    resolvedColorScheme,
    resolvedTheme,
    setTheme: setterWithFirstTimeDelay<string>("theme"),
    setDarkTheme: setterWithFirstTimeDelay<string>("darkTheme"),
    setLightTheme: setterWithFirstTimeDelay<string>("lightTheme"),
    setThemeSet: useCallback(
      (themeSet: { darkTheme: string; lightTheme: string }) => setThemeState(state => ({ ...state, ...themeSet })),
      [],
    ),
    setColorSchemePref: setterWithFirstTimeDelay<ColorSchemeType>("colorSchemePref"),
    setForcedTheme: setterWithFirstTimeDelay<string | undefined>("forcedTheme"),
    setForcedColorScheme: setterWithFirstTimeDelay<ColorSchemeType | undefined>("forcedColorScheme"),
  };
}
