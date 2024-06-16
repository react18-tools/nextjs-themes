import { useEffect } from "react";
import { resolveTheme, MEDIA, useStore, ThemeStoreType } from "../../utils";
import { DARK, DEFAULT_ID, LIGHT } from "../../constants";
import { ColorSchemeType, ResolvedColorSchemeType } from "../../types";

export interface ThemeSwitcherProps {
  forcedTheme?: string;
  forcedColorScheme?: ColorSchemeType;
  /** @deprecated use targetId */
  targetSelector?: string;
  targetId?: string;
  themeTransition?: string;
  /** provide styles object imported from CSS/SCSS modules, if you are using CSS/SCSS modules. */
  styles?: Record<string, string>;
}

export type UpdateProps = [
  resolvedColorScheme: ResolvedColorSchemeType,
  resolvedColorSchemePref: ColorSchemeType,
  resolvedTheme: string,
  theme: string,
];

let updateDOM: (values: UpdateProps) => void;
declare global {
  var u: (values: UpdateProps) => void;
  var m: MediaQueryList;
  var i: ThemeStoreType;
}

/** Script to inject to avoid FOUC (Flash of Unstyled Content) */
const NoFOUCScript = (key: string, styles?: Record<string, string>) => {
  window.i = { t: "", d: DARK, l: "", c: SYSTEM, s: LIGHT };
  const keys = ["color-scheme", "csp", "theme", "th"];
  window.u = values => {
    const target = document.querySelector(key) ?? document.documentElement;

    let classes = [];
    keys.forEach((key, index) => {
      classes.push(`${key}-${values[index]}`);
      target.setAttribute(`data-${key}`, values[index]);
    });
    classes[0] = values[0];
    if (styles) classes = classes.map(cls => styles[cls] ?? cls);
    target.className = classes.join(" ");
  };
  window.m = matchMedia("(prefers-color-scheme: dark)");
};

/** disable transition while switching theme */
const modifyTransition = (themeTransition = "none") => {
  const css = document.createElement("style");
  /** split by ';' to prevent CSS injection */
  css.textContent = `transition: ${themeTransition.split(";")[0]} !important;`;
  document.head.appendChild(css);

  return () => {
    // Force restyle
    getComputedStyle(document.body);
    // Wait for next tick before removing
    setTimeout(() => document.head.removeChild(css), 1);
  };
};

/**
 * You can use this hook in place of `<ThemeSwitcher />` component.
 * Please note that you need to add "use client" on top of the component in which you are using this hook.
 */
export const useThemeSwitcher = (props: ThemeSwitcherProps) => {
  // not using ?? as we don't want key to be an empty string ever
  const key = props.targetSelector || `#${props.targetId || DEFAULT_ID}`;
  const [themeState, setThemeState] = useStore(key);
  /** set listeners for system preference and syncing store */
  useEffect(() => {
    const media = matchMedia(MEDIA);
    media.addEventListener("change", () => setThemeState(state => ({ ...state, s: media.matches ? DARK : LIGHT })));
    addEventListener("storage", e => {
      if (e.key === key) setThemeState(state => ({ ...state, ...JSON.parse(e.newValue || "{}") }));
    });
  }, []);

  useEffect(() => {
    const restoreTransitions = modifyTransition(props.themeTransition);
    const resolvedData = resolveTheme(themeState, props);
    updateDOM(resolvedData, props);
    const stateStr = JSON.stringify(themeState);
    localStorage.setItem(key, stateStr);
    restoreTransitions();
  }, [props, themeState]);
};

/**
 * Use this component in your layout - `app/layout.tsx` or your custom layout or in `_app.tsx` file.
 * @component
 */
export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  useThemeSwitcher(props);
  return null;
};
