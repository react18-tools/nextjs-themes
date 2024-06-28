import type { ThemeStoreType } from "../../store";
import type { ColorSchemeType, ResolvedColorSchemeType } from "../../types";

type ValuesType = [ResolvedColorSchemeType, ColorSchemeType, string, string];
export type UpdateDOMFunc = (values: ValuesType, targetSelector: string) => void;

export type ResolveFunc = (store: ThemeStoreType) => ValuesType;

export type UpdateForcedPropsFunc = (
  forcedThemeProp?: string,
  forcedColorSchemeProp?: ColorSchemeType,
) => void;

declare global {
  // skipcq: JS-0102, JS-C1002, JS-0239
  var m: MediaQueryList;
  // skipcq: JS-0102, JS-C1002, JS-0239
  var u: UpdateDOMFunc;
  // skipcq: JS-0102, JS-C1002, JS-0239
  var r: ResolveFunc;
  // skipcq: JS-0102, JS-C1002, JS-0239
  var f: UpdateForcedPropsFunc;
  // skipcq: JS-0102, JS-C1002, JS-0239 update forcedState
  var g: UpdateForcedPropsFunc;
}

export type ScriptArgs = [
  string,
  ThemeStoreType,
  Record<string, string> | undefined,
  string | undefined,
  ColorSchemeType | undefined,
];

/** @internal Script to be injected for avoiding FOUC */
export const noFOUCScript = (
  key: string,
  initialState: ThemeStoreType,
  styles?: Record<string, string>,
  forcedTheme_?: string,
  forcedColorScheme_?: ColorSchemeType,
) => {
  window.m = matchMedia("(prefers-color-scheme: dark)");
  const keys = ["color-scheme", "csp", "theme", "th"];
  window.u = (values, key) => {
    const el = document.querySelector(key) ?? document.documentElement;
    let classes = [];
    keys.forEach((key, index) => {
      classes.push(key + "-" + values[index]);
      el.setAttribute("data-" + key, values[index]);
    });
    classes[0] = values[0];
    if (styles) classes = classes.map(cls => styles[cls] ?? cls);
    el.className = classes.join(" ");
  };

  const str = localStorage.getItem(key);
  const store: ThemeStoreType = {
    ...(str ? JSON.parse(str) : initialState),
    s: m.matches ? initialState.d : initialState.l,
  };

  let forcedColorScheme: ColorSchemeType | undefined,
    forcedTheme: string | undefined,
    forcedColorSchemeProp_: ColorSchemeType | undefined,
    forcedThemeProps_: string | undefined;

  window.f = (forcedThemeProp, forcedColorSchemeProp) => {
    forcedTheme = forcedThemeProps_ = forcedThemeProp;
    forcedColorScheme = forcedColorSchemeProp_ = forcedColorSchemeProp;
  };

  window.g = (forcedThemeState, forcedColorSchemeState) => {
    forcedTheme = forcedThemeProps_ ?? forcedThemeState;
    forcedColorScheme = forcedColorSchemeProp_ ?? forcedColorSchemeState;
  };

  f(forcedTheme_, forcedColorScheme_);
  window.r = (store: ThemeStoreType) => {
    const colorSchemePref = forcedColorScheme ?? store.c;
    const colorScheme = colorSchemePref === initialState.c ? store.s : colorSchemePref;
    const theme = colorScheme === "" ? store.t : colorScheme === initialState.d ? store.d : store.l;
    const resolvedTheme = forcedTheme ?? theme;
    return [
      colorScheme || store.s,
      colorSchemePref,
      resolvedTheme,
      forcedTheme ?? store.t,
    ] as ValuesType;
  };
  u(r(store), key);
};
