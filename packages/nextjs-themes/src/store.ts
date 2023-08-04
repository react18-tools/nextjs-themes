import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ColorSchemeType = "" | "auto" | "dark" | "light";

type ThemeStoreType = {
  theme: string;
  defaultTheme: string;
  defaultDarkTheme: string;
  defaultLightTheme: string;
  forcedColorScheme: ColorSchemeType;
};

type ThemeStoreActionsType = {
  setTheme: (theme: string) => void;
  setDefaultTheme: (defaultTheme: string) => void;
  setDefaultDarkTheme: (defaultDarkTheme: string) => void;
  setDefaultLightTheme: (defaultLightTheme: string) => void;
  setForcedColorScheme: (forcedColorScheme: ColorSchemeType) => void;
};

export const useThemeStore = create<ThemeStoreType & ThemeStoreActionsType>()(
  persist(
    (set, get) => ({
      theme: "auto",
      defaultTheme: "",
      defaultDarkTheme: "dark",
      defaultLightTheme: "",
      forcedColorScheme: "",
      setTheme: (theme: string) => set({ ...get(), theme }),
      setDefaultTheme: (defaultTheme: string) => set({ ...get(), defaultTheme }),
      setDefaultDarkTheme: (defaultDarkTheme: string) => set({ ...get(), defaultDarkTheme }),
      setDefaultLightTheme: (defaultLightTheme: string) => set({ ...get(), defaultLightTheme }),
      setForcedColorScheme: (forcedColorScheme: ColorSchemeType) => set({ ...get(), forcedColorScheme }),
    }),
    { name: "nextjs-themes" },
  ),
);
