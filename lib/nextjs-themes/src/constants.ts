/** shared constants -- keep in separate files for better tree-shaking and dependency injection */
export const DEFAULT_ID = "nth";

export type ColorSchemeType = "" | "system" | "dark" | "light";

export interface ThemeStoreType {
  theme: string;
  darkTheme: string;
  lightTheme: string;
  colorSchemePref: ColorSchemeType;
  systemColorScheme: "dark" | "light";
  forcedTheme?: string;
  forcedColorScheme?: ColorSchemeType;
}

export type ThemeStoreActionsType = {
  setTheme: (theme: string) => void;
  setDarkTheme: (darkTheme: string) => void;
  setLightTheme: (lightTheme: string) => void;
  setThemeSet: (themeSet: { darkTheme: string; lightTheme: string }) => void;
  setColorSchemePref: (colorSchemePref: ColorSchemeType) => void;
  setForcedTheme: (forcedTheme?: string) => void;
  setForcedColorScheme: (forcedColorScheme?: ColorSchemeType) => void;
};

export const initialState: ThemeStoreType = {
  theme: "",
  darkTheme: "dark",
  lightTheme: "",
  colorSchemePref: "system",
  systemColorScheme: "light",
};
