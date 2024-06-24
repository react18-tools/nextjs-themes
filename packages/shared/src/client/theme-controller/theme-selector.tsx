"use client";
import type { ColorSchemeType } from "nextjs-themes";
import { useTheme } from "nextjs-themes/hooks";
import { useEffect, useMemo } from "react";
import type { ChangeEvent } from "react";
import { Select } from "../select";
import styles from "./theme-controller.module.scss";
import { darkThemes, lightThemes } from "./themes";
import { ThemeControllerProps } from "./theme-controller";

interface ThemeSelectorProps extends ThemeControllerProps {
  scope: "" | "dark" | "light";
}

export function ThemeSelector({ scope, targetSelector }: ThemeSelectorProps) {
  const { colorSchemePref, theme, setTheme } = useThemeStates(scope, targetSelector);
  const themes = useMemo(() => {
    switch (scope) {
      case "":
        return ["auto", ...lightThemes, ...darkThemes];
      case "dark":
        return darkThemes;
      case "light":
        return lightThemes;
    }
  }, [scope]);

  useEffect(() => {
    if (!theme) setTheme(themes[0]);
  }, [setTheme, themes, theme]);

  const handleChange: (e: ChangeEvent<HTMLSelectElement>) => void = e => setTheme(e.target.value);

  return (
    <p>
      Select {scope} theme{" "}
      <Select
        className={getClassName(scope, colorSchemePref)}
        onChange={handleChange}
        options={themes}
        value={theme}
      />
    </p>
  );
}

function getClassName(scope: ThemeSelectorProps["scope"], colorSchemePref: ColorSchemeType) {
  if (scope === "") return colorSchemePref ? "" : styles.active;
  if (colorSchemePref === scope) return styles.active;
  return colorSchemePref === "system" ? styles[scope] : "";
}

function useThemeStates(scope: ThemeSelectorProps["scope"], targetSelector?: string) {
  const { colorSchemePref, theme, darkTheme, lightTheme, setTheme, setDarkTheme, setLightTheme } =
    useTheme(targetSelector);
  switch (scope) {
    case "":
      return { colorSchemePref, theme, setTheme };
    case "dark":
      return { colorSchemePref, theme: darkTheme, setTheme: setDarkTheme };
    case "light":
      return { colorSchemePref, theme: lightTheme, setTheme: setLightTheme };
  }
}
