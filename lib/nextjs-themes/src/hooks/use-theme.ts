import useRGS from "r18gs";
import { ColorSchemeType, DEFAULT_ID, ThemeStoreActionsType, ThemeStoreType, initialState } from "../constants";

export function useTheme(targetId?: string): ThemeStoreType & ThemeStoreActionsType {
  const [themeState, setThemeState] = useRGS<ThemeStoreType>(targetId ?? DEFAULT_ID, initialState);
  return {
    ...themeState,
    setTheme: (theme: string) => setThemeState(state => ({ ...state, theme })),
    setDarkTheme: (darkTheme: string) => setThemeState(state => ({ ...state, darkTheme })),
    setLightTheme: (lightTheme: string) => setThemeState(state => ({ ...state, lightTheme })),
    setThemeSet: (themeSet: { darkTheme: string; lightTheme: string }) =>
      setThemeState(state => ({ ...state, ...themeSet })),
    setColorSchemePref: (colorSchemePref: ColorSchemeType) => setThemeState(state => ({ ...state, colorSchemePref })),
    setForcedTheme: (forcedTheme?: string) => setThemeState(state => ({ ...state, forcedTheme })),
    setForcedColorScheme: (forcedColorScheme?: ColorSchemeType) =>
      setThemeState(state => ({ ...state, forcedColorScheme })),
  };
}
