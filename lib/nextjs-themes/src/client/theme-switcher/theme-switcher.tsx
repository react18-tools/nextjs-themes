import * as React from "react";
import { useEffect } from "react";
import type { ColorSchemeType } from "../../store";
import { useTheme } from "../../store";
import { resolveThemeFromColorScheme } from "../../utils";

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
    const { colorSchemePref, forcedTheme, forcedColorScheme, setResolved } = themeState;
    const resolvedForcedTheme = props.forcedTheme === undefined ? forcedTheme : props.forcedTheme;
    const resolvedForcedColorScheme =
      props.forcedColorScheme === undefined ? forcedColorScheme : props.forcedColorScheme;
    const colorScheme = resolvedForcedColorScheme === undefined ? colorSchemePref : resolvedForcedColorScheme;

    const media = matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => {
      const restoreTransitions = disableAnimation();

      const newTheme =
        resolvedForcedTheme !== undefined
          ? resolvedForcedTheme
          : resolveThemeFromColorScheme({ ...themeState, colorSchemePref: colorScheme }, media.matches);

      setResolved({ resolvedTheme: newTheme, resolvedColorScheme: colorScheme });
      updateDOM({ newTheme, colorScheme, media }, props.targetSelector);

      restoreTransitions();
    };

    if (colorScheme === "system") media.addEventListener("change", updateTheme);
    else media.removeEventListener("change", updateTheme);

    updateTheme();
    return () => {
      media.removeEventListener("change", updateTheme);
    };
  }, [props.forcedColorScheme, props.forcedTheme, props.targetSelector, ...depArray]);
}

interface UpdateDOMProps {
  newTheme: string;
  media: MediaQueryList;
  colorScheme: ColorSchemeType;
}

function updateDOM({ newTheme, colorScheme, media }: UpdateDOMProps, targetSelector?: string) {
  [document.querySelector(targetSelector || "#nextjs-themes"), document.documentElement].forEach(target => {
    if (target) target.className = `${newTheme} cs-${colorScheme}`; /** cs == color-scheme */
    target?.setAttribute("data-theme", newTheme);
    target?.setAttribute("data-color-scheme", colorScheme);
  });

  /** store system preference for computing data-theme on server side */
  document.cookie = `data-color-scheme-system=${media.matches ? "dark" : "light"}`;
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