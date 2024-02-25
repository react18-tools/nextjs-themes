import * as React from "react";
import { useEffect } from "react";
import { resolveTheme, parseState, encodeState } from "../../utils";
import { ColorSchemeType, DEFAULT_ID, ThemeStoreType, initialState } from "../../constants";
import useRGS, { SetStateAction } from "r18gs";

/** todo - set persistance and cookies */
export interface ThemeSwitcherProps {
  forcedTheme?: string;
  forcedColorScheme?: ColorSchemeType;
  targetSelector?: string;
  themeTransition?: string;
}

function useMediaQuery(setThemeState: SetStateAction<ThemeStoreType>) {
  React.useEffect(() => {
    // set event listener for media
    const media = matchMedia("(prefers-color-scheme: dark)");
    const updateSystemColorScheme = () => {
      setThemeState(state => ({ ...state, systemColorScheme: media.matches ? "dark" : "light" }));
    };
    updateSystemColorScheme();
    media.addEventListener("change", updateSystemColorScheme);
    return () => {
      media.removeEventListener("change", updateSystemColorScheme);
    };
  }, [setThemeState]);
}

let tInit = 0;
function useLoadSyncedState(setThemeState: SetStateAction<ThemeStoreType>, targetSelector?: string) {
  React.useEffect(() => {
    tInit = Date.now();
    const key = targetSelector ?? DEFAULT_ID;
    setThemeState(state => ({ ...state, ...parseState(localStorage.getItem(key)) }));
    const storageListener = (e: StorageEvent) => {
      if (e.key === key) setThemeState(state => ({ ...state, ...parseState(e.newValue) }));
    };
    window.addEventListener("storage", storageListener);
    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, [targetSelector]);
}

export interface DataProps {
  className: string;
  "data-th"?: string;
  "data-theme"?: string;
  "data-color-scheme"?: "dark" | "light";
  "data-csp"?: ColorSchemeType /** color-scheme-preference */;
}

export interface UpdateProps {
  resolvedTheme: string;
  resolvedColorScheme: "dark" | "light";
  resolvedColorSchemePref: ColorSchemeType;
  th: string;
}

const updateDOM = (
  { resolvedTheme, resolvedColorScheme, resolvedColorSchemePref, th }: UpdateProps,
  targetSelector?: string,
) => {
  [document.querySelector(targetSelector || "#nextjs-themes"), document.documentElement].forEach(target => {
    /** ensuring that class 'dark' is always present when dark color scheme is applied to support Tailwind  */
    if (target)
      target.className = `${resolvedColorScheme} theme-${resolvedTheme} th-${th} csp-${resolvedColorSchemePref}`;
    target?.setAttribute("data-th", th);
    target?.setAttribute("data-theme", resolvedTheme);
    target?.setAttribute("data-color-scheme", resolvedColorScheme);
    target?.setAttribute("data-csp", resolvedColorSchemePref); /** color-scheme-preference */
  });
};

const disableAnimation = (themeTransition = "none") => {
  const css = document.createElement("style");
  /** split by ';' to prevent CSS injection */
  const transition = `transition: ${themeTransition.split(";")[0]} !important;`;
  css.appendChild(
    document.createTextNode(`*{-webkit-${transition}-moz-${transition}-o-${transition}-ms-${transition}${transition}}`),
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();
    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
};

/**
 * You can use this hook in place of `<ThemeSwitcher />` component.
 * Please note that you need to add "use client" on top of the component in which you are using this hook.
 */
export function useThemeSwitcher(props: ThemeSwitcherProps) {
  const [themeState, setThemeState] = useRGS<ThemeStoreType>(props.targetSelector ?? DEFAULT_ID, initialState);

  useMediaQuery(setThemeState);
  useLoadSyncedState(setThemeState, props.targetSelector);
  useEffect(() => {
    const restoreTransitions = disableAnimation(props.themeTransition);

    const resolvedData = resolveTheme(themeState, props);
    updateDOM(resolvedData, props.targetSelector);
    if (tInit < Date.now() - 300) {
      const stateStr = encodeState(themeState);
      const key = props.targetSelector || DEFAULT_ID;
      localStorage.setItem(key, stateStr);
      document.cookie = `${key}=${stateStr}; max-age=31536000; SameSite=Strict;`;
    }
    restoreTransitions();
  }, [props, themeState]);
}

/**
 * Use this component in your layout - `app/layout.tsx` or your custom layout or in `_app.tsx` file.
 * @component
 */
export function ThemeSwitcher(props: ThemeSwitcherProps) {
  useThemeSwitcher(props);
  return null;
}
