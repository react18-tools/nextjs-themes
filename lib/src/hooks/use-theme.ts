import { useEffect } from "react";
import { useStore } from "../store";
import { ResolveFunc } from "../client/theme-switcher/no-fouc";
import { ColorSchemeType, ResolvedColorSchemeType } from "../types";
import { DARK, LIGHT, SYSTEM } from "../constants";

const colorSchemes = [SYSTEM, LIGHT, DARK] as ColorSchemeType[];
let resolveTheme: ResolveFunc;

interface UseThemeYield {
  theme: string;
  darkTheme: string;
  lightTheme: string;
  colorSchemePref: ColorSchemeType;
  systemColorScheme: ResolvedColorSchemeType;
  resolvedColorScheme: ResolvedColorSchemeType;
  resolvedTheme: string;
  // actions
  setTheme: (theme: string) => void;
  setDarkTheme: (darkTheme: string) => void;
  setLightTheme: (lightTheme: string) => void;
  setThemeSet: (themeSet: { darkTheme: string; lightTheme: string }) => void;
  setColorSchemePref: (colorSchemePref: ColorSchemeType) => void;
  toggleColorScheme: (skipSystem?: boolean) => void;
}

/**
 *
 *
 * @example
 * ```tsx
 * const [] = useTheme(options);
 * ```
 *
 * @source - Source code
 */

export const useTheme = (targetSelector?: string): UseThemeYield => {
  const [state, setState] = useStore(targetSelector);
  useEffect(() => {
    resolveTheme = r;
  }, []);

  /** helper */
  const setter =
    <T>(key: string) =>
    (arg: T) =>
      setState(state => ({ ...state, [key]: arg }));

  const hookResult: UseThemeYield = {
    theme: state.t,
    darkTheme: state.d,
    lightTheme: state.l,
    colorSchemePref: state.c,
    systemColorScheme: state.s,
    resolvedColorScheme: state.c === SYSTEM || state.c === "" ? state.s : state.c,
    resolvedTheme: state.t,
    setTheme: setter<string>("t"),
    setDarkTheme: setter<string>("d"),
    setLightTheme: setter<string>("l"),
    setThemeSet: ({ darkTheme: d, lightTheme: l }) => setState(state => ({ ...state, d, l })),
    setColorSchemePref: setter<ColorSchemeType>("c"),
    toggleColorScheme(skipSystem) {
      let index = colorSchemes.indexOf(state.c);
      const len = colorSchemes.length;
      if (index === -1 || (skipSystem && index === len - 1)) index = 0;
      setter("c")(colorSchemes[(index + 1) % len]);
    },
  };

  if (resolveTheme) {
    const resolvedValues = resolveTheme(state);
    hookResult.resolvedColorScheme = resolvedValues[0];
    hookResult.resolvedTheme = resolvedValues[1];
  }

  return hookResult;
};
