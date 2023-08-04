import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ColorSchemeType = "" | "auto" | "dark" | "light";

type ThemeStoreType = {
  theme: string;
  defaultTheme: string;
  defaultDarkTheme: string;
  defaultLightTheme: string;
  forcedTheme: string;
  forcedColorScheme: ColorSchemeType;
};

type ThemeStoreActionsType = {
  setTheme: (theme: string) => void;
  setDefaultTheme: (defaultTheme: string) => void;
  setDefaultDarkTheme: (defaultDarkTheme: string) => void;
  setDefaultLightTheme: (defaultLightTheme: string) => void;
  setForcedTheme: (forcedTheme: string) => void;
  setForcedColorScheme: (forcedColorScheme: ColorSchemeType) => void;
};

export const useTheme = create<ThemeStoreType & ThemeStoreActionsType>()(
  persist(
    (set, get) => ({
      theme: "auto",
      defaultTheme: "",
      defaultDarkTheme: "dark",
      defaultLightTheme: "",
      forcedTheme: "",
      forcedColorScheme: "",
      setTheme: (theme: string) => set({ ...get(), theme }),
      setDefaultTheme: (defaultTheme: string) => set({ ...get(), defaultTheme }),
      setDefaultDarkTheme: (defaultDarkTheme: string) => set({ ...get(), defaultDarkTheme }),
      setDefaultLightTheme: (defaultLightTheme: string) => set({ ...get(), defaultLightTheme }),
      setForcedTheme: (forcedTheme: string) => set({ ...get(), forcedTheme }),
      setForcedColorScheme: (forcedColorScheme: ColorSchemeType) => set({ ...get(), forcedColorScheme }),
    }),
    { name: "nextjs-themes" },
  ),
);
