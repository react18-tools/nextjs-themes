import * as React from "react";
import { useEffect } from "react";
import type { ColorSchemeType } from "../../store";
import { useTheme } from "../../store";
import { resolveTheme } from "../../utils";
import { StorageType } from "persist-and-sync";

export interface ThemeSwitcherProps {
  forcedTheme?: string;
  forcedColorScheme?: ColorSchemeType;
  targetSelector?: string;
  themeTransition?: string;
  /**
   * defaultValue `"cookies"`
   * set storage to `localStorage` or `sessionsStorage` when using only client side or when you must avoid using cookies
   */
  storage?: StorageType;
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
  isSystemDark: boolean,
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

  /** store system preference for computing data-theme on server side */
  document.cookie = `data-color-scheme-system=${isSystemDark ? "dark" : "light"}`;
};

const disableAnimation = (themeTransition = "none") => {
  const css = document.createElement("style");
  const transition = `transition: ${themeTransition} !important;`;
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
  const [setStorage, ...depArray] = useTheme(state => [
    state.setStorage,
    state.theme,
    state.darkTheme,
    state.lightTheme,
    state.colorSchemePref,
    state.forcedColorScheme,
    state.forcedTheme,
  ]);

  useEffect(() => {
    setStorage(props.storage ?? "cookies");
  }, [props.storage]);

  useEffect(() => {
    const themeState = useTheme.getState();
    const media = matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => {
      const restoreTransitions = disableAnimation(props.themeTransition);

      const resolvedData = resolveTheme(media.matches, themeState, props);
      themeState.setResolved(resolvedData);
      updateDOM(resolvedData, media.matches, props.targetSelector);

      restoreTransitions();
    };

    media.addEventListener("change", updateTheme);
    updateTheme();
    return () => {
      media.removeEventListener("change", updateTheme);
    };
  }, [props.forcedColorScheme, props.forcedTheme, props.targetSelector, ...depArray]);
}

/**
 * Use this component in your layout - `app/layout.tsx` or your custom layout or in `_app.tsx` file.
 * @component
 */
export function ThemeSwitcher(props: ThemeSwitcherProps) {
  useThemeSwitcher(props);
  return null;
}
