"use client";
import { useTheme } from "nextjs-themes";
import { darkThemes } from "./themes";
import { useEffect } from "react";
import styles from "./page.module.css";

export default function DarkThemeSelector() {
  const [colorSchemePref, defaultDarkTheme, setDefaultDarkTheme] = useTheme(state => [
    state.colorSchemePref,
    state.defaultDarkTheme,
    state.setDefaultDarkTheme,
  ]);
  useEffect(() => {
    setDefaultDarkTheme(darkThemes[0]);
  }, []);
  const className = colorSchemePref === "dark" ? styles.active : colorSchemePref === "system" ? styles.dark : "";
  return (
    <p>
      Select default dark theme{" "}
      <select value={defaultDarkTheme} onChange={e => setDefaultDarkTheme(e.target.value)} className={className}>
        {darkThemes.map(theme => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </p>
  );
}
