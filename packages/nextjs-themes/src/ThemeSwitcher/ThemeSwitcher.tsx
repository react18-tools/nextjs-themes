"use client";
import * as React from "react";

import { useEffect } from "react";
import { useThemeStore } from "../store";

export function ThemeSwitcher() {
  const [theme, defaultTheme, defaultDarkTheme, defaultLightTheme] = useThemeStore(state => [
    state.theme,
    state.defaultTheme,
    state.defaultDarkTheme,
    state.defaultLightTheme,
  ]);

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => {
      const restoreTransitions = disableAnimation();
      if (theme === "auto") {
        document.documentElement.setAttribute("data-theme", media.matches ? defaultDarkTheme : defaultLightTheme);
      } else {
        document.documentElement.setAttribute("data-theme", theme || defaultTheme);
      }
      restoreTransitions();
    };
    media.addEventListener("change", updateTheme);
    updateTheme();
    return () => {
      media.removeEventListener("change", updateTheme);
    };
  }, [theme, defaultTheme, defaultDarkTheme, defaultLightTheme]);

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
