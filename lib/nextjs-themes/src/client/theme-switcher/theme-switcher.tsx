import * as React from "react";
import { useEffect } from "react";
import type { ColorSchemeType } from "../../store";
import { useTheme } from "../../store";
import { resolveTheme } from "../../utils";

export interface ThemeSwitcherProps {
  forcedTheme?: string;
  forcedColorScheme?: ColorSchemeType;
  targetSelector?: string;
}

export function ThemeSwitcher(props: ThemeSwitcherProps) {
  useThemeSwitcher(props);
  return null;
}

export function useThemeSwitcher(props: ThemeSwitcherProps) {
  const depArray = useTheme(state => [
    state.theme,
    state.darkTheme,
    state.lightTheme,
    state.colorSchemePref,
    state.forcedColorScheme,
    state.forcedTheme,
  ]);

  useEffect(() => {
    const themeState = useTheme.getState();
    const media = matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => {
      const restoreTransitions = disableAnimation();

      const resolvedData = resolveTheme(media.matches, themeState, props);
      const { resolvedColorScheme, resolvedTheme } = resolvedData;
      themeState.setResolved({ resolvedColorScheme, resolvedTheme });
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

function updateDOM(
  { resolvedTheme, resolvedColorScheme, resolvedColorSchemePref, th }: UpdateProps,
  isSystemDark: boolean,
  targetSelector?: string,
) {
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
}

// todo: customizable transition time
const disableAnimation = () => {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      `*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
    ),
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
