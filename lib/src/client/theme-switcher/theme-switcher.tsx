import { useEffect } from "react";
import { ColorSchemeType } from "../../types";
import { ResolveFunc, UpdateDOMFunc, UpdateForcedPropsFunc, noFOUCScript } from "./no-fouc";
import { initialState, useForcedStore, useThemeStore } from "../../store";
import { DARK, DEFAULT_ID, LIGHT } from "../../constants";

export interface ThemeSwitcherProps {
  /**
   * Forced theme name for the current page
   * @see [Force per page theme and color-scheme](https://github.com/react18-tools/nextjs-themes?tab=readme-ov-file#force-per-page-theme-and-color-scheme)
   */
  forcedTheme?: string;
  /**
   * Forced color scheme for the current page
   * @see [Force per page theme and color-scheme](https://github.com/react18-tools/nextjs-themes?tab=readme-ov-file#force-per-page-theme-and-color-scheme)
   */
  forcedColorScheme?: ColorSchemeType;
  /**
   * CSS selector for the target element to apply the theme.
   * Use this to specify a different target element than the default (html or documentElement).
   * This is particularly useful for controlling the theme of different parts of the page independently.
   */
  targetSelector?: string;
  /**
   * The transition property to enforce on all elements, preventing unwanted transitions during theme changes.
   * @example 'background .3s'
   * @defaultValue 'none'
   */
  themeTransition?: string;
  /**
   * Provide a styles object imported from CSS/SCSS modules if you are using these modules to define theme and color-scheme classes.
   * All classes applied to the target are modified using the styles object as follows:
   * `if (styles) classes = classes.map(cls => styles[cls] ?? cls);`
   */
  styles?: Record<string, string>;
  /** The nonce value for your Content Security Policy. */
  nonce?: string;
}

let media: MediaQueryList;
let updateDOM: UpdateDOMFunc;
let resolveTheme: ResolveFunc;
let updateForcedProps: UpdateForcedPropsFunc;
let updateForcedState: UpdateForcedPropsFunc;

/** Script component to inject script before hydration */
const Script = ({
  targetSelector,
  nonce,
  styles,
  forcedTheme,
  forcedColorScheme,
}: ThemeSwitcherProps) => {
  const k = targetSelector || `#${DEFAULT_ID}`;
  // handle client side exceptions when script is not run. <- for client side apps like vite or CRA
  if (typeof window !== "undefined" && !window.m)
    noFOUCScript(k, initialState, styles, forcedTheme, forcedColorScheme);
  if (typeof m !== "undefined")
    [media, updateDOM, resolveTheme, updateForcedProps, updateForcedState] = [m, u, r, f, g];
  return (
    <script
      // skipcq: JS-0440
      dangerouslySetInnerHTML={{
        __html: `(${noFOUCScript})(${JSON.stringify([k, initialState, styles, forcedTheme, forcedColorScheme]).slice(1, -1)})`,
      }}
      nonce={nonce}
    />
  );
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

/** Root switcher */
const Switcher = ({
  forcedTheme,
  forcedColorScheme,
  targetSelector,
  themeTransition,
}: ThemeSwitcherProps) => {
  const k = targetSelector || `#${DEFAULT_ID}`;

  const [state, setState] = useThemeStore(targetSelector);
  const [forced] = useForcedStore(targetSelector);

  useEffect(() => {
    media.addEventListener("change", () =>
      setState(state => ({ ...state, s: media.matches ? DARK : LIGHT })),
    );
    addEventListener("storage", e => {
      if (e.key === k) setState(state => ({ ...state, ...JSON.parse(e.newValue || "{}") }));
    });
  }, []);

  useEffect(() => {
    const restoreThansitions = modifyTransition(themeTransition);
    updateDOM(resolveTheme(state));
    restoreThansitions();
    localStorage.setItem(k, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    updateForcedProps(forcedTheme, forcedColorScheme);
    updateDOM(resolveTheme(state));
  }, [forcedColorScheme, forcedTheme]);

  useEffect(() => {
    updateForcedState(forced.f, forced.fc);
    updateDOM(resolveTheme(state));
  }, [forced]);
  return null;
};

/**
 * The Core component wich applies classes and transitions.
 *
 * @example
 * ```tsx
 * <ThemeSwitcher [...props] />
 * ```
 */
export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  return (
    <>
      <Script {...props} />
      <Switcher {...props} />
    </>
  );
};
