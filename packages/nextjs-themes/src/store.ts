import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ColorSchemeType = "" | "system" | "dark" | "light";

type ThemeStoreType = {
  theme: string;
  defaultTheme: string;
  defaultDarkTheme: string;
  defaultLightTheme: string;
  colorSchemePref: ColorSchemeType;
  forcedTheme: string;
  forcedColorScheme: ColorSchemeType;
};

type ThemeStoreActionsType = {
  setTheme: (theme: string) => void;
  setDefaultTheme: (defaultTheme: string) => void;
  setDefaultDarkTheme: (defaultDarkTheme: string) => void;
  setDefaultLightTheme: (defaultLightTheme: string) => void;
  setColorSchemePref: (colorSchemePref: ColorSchemeType) => void;
  setForcedTheme: (forcedTheme: string) => void;
  setForcedColorScheme: (forcedColorScheme: ColorSchemeType) => void;
};

export const useTheme = create<ThemeStoreType & ThemeStoreActionsType>()(
  persist(
    (set, get) => ({
      theme: "",
      defaultTheme: "",
      defaultDarkTheme: "dark",
      defaultLightTheme: "",
      colorSchemePref: "system",
      forcedTheme: "",
      forcedColorScheme: "",
      setTheme: (theme: string) => set({ ...get(), theme }),
      setDefaultTheme: (defaultTheme: string) => set({ ...get(), defaultTheme }),
      setDefaultDarkTheme: (defaultDarkTheme: string) => set({ ...get(), defaultDarkTheme }),
      setDefaultLightTheme: (defaultLightTheme: string) => set({ ...get(), defaultLightTheme }),
      setForcedTheme: (forcedTheme: string) => set({ ...get(), forcedTheme }),
      setForcedColorScheme: (forcedColorScheme: ColorSchemeType) => set({ ...get(), forcedColorScheme }),
      setColorSchemePref: colorSchemePref => set({ ...get(), colorSchemePref }),
    }),
    { name: "nextjs-themes" },
  ),
);
