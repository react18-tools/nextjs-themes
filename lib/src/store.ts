import { useRGS } from "r18gs";
import { DARK, DEFAULT_ID, LIGHT, SYSTEM } from "./constants";
import { ColorSchemeType, ResolvedColorSchemeType } from "./types";

/** @internal */
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
  s: ResolvedColorSchemeType;

  /** forced theme */
  f?: string;
  /** forced colorScheme */
  fc?: ColorSchemeType;
}

/** @internal */
export const initialState: ThemeStoreType = {
  t: "",
  d: DARK,
  l: LIGHT,
  c: SYSTEM,
  s: LIGHT,
};

/** @internal store */
export const useThemeStore = (targetSelector?: string) => {
  const key = targetSelector ?? "#" + DEFAULT_ID;
  return useRGS<ThemeStoreType>(key, () => {
    const str = typeof m !== "undefined" && localStorage.getItem(key);
    return str ? { ...JSON.parse(str), s: m.matches ? DARK : LIGHT } : initialState;
  });
};
