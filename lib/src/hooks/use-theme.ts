import { useEffect } from "react";
import { useStore } from "../store";
import { ResolveFunc } from "../client/theme-switcher/no-fouc";
import { ColorSchemeType, ResolvedColorSchemeType } from "../types";

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

  const [resolvedColorScheme, _, resolvedTheme] = resolveTheme(state);

  /** helper */
  const setter =
    <T>(key: string) =>
    (arg: T) =>
      setState(state => ({ ...state, [key]: arg }));

  return {
    theme: state.t,
    darkTheme: state.d,
    lightTheme: state.l,
    colorSchemePref: state.c,
    systemColorScheme: state.s,
    resolvedColorScheme,
    resolvedTheme,
    setTheme: setter<string>("t"),
    setDarkTheme: setter<string>("d"),
    setLightTheme: setter<string>("l"),
    setThemeSet: ({ darkTheme: d, lightTheme: l }) => setState(state => ({ ...state, d, l })),
    setColorSchemePref: setter<ColorSchemeType>("c"),
  };
};
