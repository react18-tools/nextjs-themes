"use client";
import * as React from "react";

import { useEffect } from "react";
import { ColorSchemeType, useTheme } from "../store";

export function ThemeSwitcher(props: { forcedTheme?: string; forcedColorScheme?: ColorSchemeType }) {
  const [theme, defaultTheme, defaultDarkTheme, defaultLightTheme, colorSchemePref, _forcedTheme, _forcedColorScheme] =
    useTheme(state => [
      state.theme,
      state.defaultTheme,
      state.defaultDarkTheme,
      state.defaultLightTheme,
      state.colorSchemePref,
      state.forcedTheme,
      state.forcedColorScheme,
    ]);

  const forcedTheme = props.forcedTheme === undefined ? _forcedTheme : props.forcedTheme;
  const forcedColorScheme = props.forcedColorScheme === undefined ? _forcedColorScheme : props.forcedColorScheme;
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => {
      const restoreTransitions = disableAnimation();
      let newTheme = "";
      if (forcedTheme) {
        newTheme = forcedTheme;
      } else if (forcedColorScheme || colorSchemePref) {
        switch (forcedColorScheme || colorSchemePref) {
          case "system":
            newTheme = media.matches ? defaultDarkTheme : defaultLightTheme;
            break;
          case "dark":
            newTheme = defaultDarkTheme;
            break;
          case "light":
            newTheme = defaultLightTheme;
        }
      }
      document.documentElement.setAttribute("data-theme", newTheme || theme || defaultTheme);
      restoreTransitions();
    };
    media.addEventListener("change", updateTheme);
    updateTheme();
    return () => {
      media.removeEventListener("change", updateTheme);
    };
  }, [theme, defaultTheme, defaultDarkTheme, defaultLightTheme, forcedTheme, colorSchemePref, forcedColorScheme]);

  return <></>;
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
