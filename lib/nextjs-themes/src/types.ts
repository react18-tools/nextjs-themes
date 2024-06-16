export type ColorSchemeType = "" | "system" | "dark" | "light";

export type ResolvedColorSchemeType = "dark" | "light";

export interface ThemeStoreType {
  /** theme */
  t: string;
  /** darkTheme */
  d: string;
  /** lightTheme */
  l: string;
  /** colorSchemePref */
  c: ColorSchemeType;
  /** systemColorScheme */
  s: "dark" | "light";
}

export interface ThemeStoreActionsType {
  setTheme: (theme: string) => void;
  setDarkTheme: (darkTheme: string) => void;
  setLightTheme: (lightTheme: string) => void;
  setThemeSet: (themeSet: { darkTheme: string; lightTheme: string }) => void;
  setColorSchemePref: (colorSchemePref: ColorSchemeType) => void;
  setForcedTheme: (forcedTheme?: string) => void;
  setForcedColorScheme: (forcedColorScheme?: ColorSchemeType) => void;
}
