import { create } from "zustand";
import { persist } from "zustand/middleware";

type ThemeStoreType = {
  theme: string;
  defaultTheme: string;
  defaultDarkTheme: string;
  defaultLightTheme: string;
};

type ThemeStoreActionsType = {
  setTheme: (theme: string) => void;
  setDefaultTheme: (defaultTheme: string) => void;
  setDefaultDarkTheme: (defaultDarkTheme: string) => void;
  setDefaultLightTheme: (defaultLightTheme: string) => void;
};

export const useThemeStore = create<ThemeStoreType & ThemeStoreActionsType>()(
  persist(
    (set, get) => ({
      theme: "auto",
      defaultTheme: "",
      defaultDarkTheme: "dark",
      defaultLightTheme: "",
      setTheme: (theme: string) => set({ ...get(), theme }),
      setDefaultTheme: (defaultTheme: string) => set({ ...get(), defaultTheme }),
      setDefaultDarkTheme: (defaultDarkTheme: string) => set({ ...get(), defaultDarkTheme }),
      setDefaultLightTheme: (defaultLightTheme: string) => set({ ...get(), defaultLightTheme }),
    }),
    { name: "nextjs-themes" },
  ),
);
