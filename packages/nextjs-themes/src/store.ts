import { create } from "zustand";
import { persistNSync } from "persist-and-sync";

export type ColorSchemeType = "" | "system" | "dark" | "light";

type ThemeStoreType = {
	theme: string;
	darkTheme: string;
	lightTheme: string;
	colorSchemePref: ColorSchemeType;
	forcedTheme?: string;
	forcedColorScheme?: ColorSchemeType;
};

type ThemeStoreActionsType = {
	setTheme: (theme: string) => void;
	setDarkTheme: (defaultDarkTheme: string) => void;
	setLightTheme: (defaultLightTheme: string) => void;
	setColorSchemePref: (colorSchemePref: ColorSchemeType) => void;
	setForcedTheme: (forcedTheme?: string) => void;
	setForcedColorScheme: (forcedColorScheme?: ColorSchemeType) => void;
};

export const initialState: ThemeStoreType = {
	theme: "",
	darkTheme: "dark",
	lightTheme: "",
	colorSchemePref: "system",
};

export const useTheme = create<ThemeStoreType & ThemeStoreActionsType>()(
	persistNSync(
		(set, get) => ({
			...initialState,
			setTheme: theme => set({ ...get(), theme }),
			setDarkTheme: darkTheme => set({ ...get(), darkTheme }),
			setLightTheme: lightTheme => set({ ...get(), lightTheme }),
			setForcedTheme: forcedTheme => set({ ...get(), forcedTheme }),
			setForcedColorScheme: forcedColorScheme => set({ ...get(), forcedColorScheme }),
			setColorSchemePref: colorSchemePref => set({ ...get(), colorSchemePref }),
		}),
		{ name: "nextjs-themes", regExpToIgnore: /forced/ },
	),
);
