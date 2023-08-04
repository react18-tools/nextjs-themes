"use client";
import * as React from "react";

import { useEffect } from "react";
import { useTheme } from "../store";

export function ThemeSwitcher(props: { forcedTheme?: string }) {
  const [theme, defaultTheme, defaultDarkTheme, defaultLightTheme, forcedTheme, forcedColorScheme] = useTheme(state => [
    state.theme,
    state.defaultTheme,
    state.defaultDarkTheme,
    state.defaultLightTheme,
    state.forcedTheme,
    state.forcedColorScheme,
  ]);

  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)");
    const updateTheme = () => {
      const restoreTransitions = disableAnimation();
      if (props.forcedTheme !== undefined || forcedTheme) {
        document.documentElement.setAttribute("data-theme", props.forcedTheme || forcedTheme);
      } else if (theme === "auto") {
        let newTheme = "";
        switch (forcedColorScheme) {
          case "":
          case "auto":
            newTheme = media.matches ? defaultDarkTheme : defaultLightTheme;
            break;
          case "dark":
            newTheme = defaultDarkTheme;
            break;
          case "light":
            newTheme = defaultLightTheme;
        }
        document.documentElement.setAttribute("data-theme", newTheme || defaultTheme);
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
  }, [theme, defaultTheme, defaultDarkTheme, defaultLightTheme, forcedTheme, forcedColorScheme, props.forcedTheme]);

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
