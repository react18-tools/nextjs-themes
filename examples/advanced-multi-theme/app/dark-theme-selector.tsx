"use client";
import { useTheme } from "nextjs-themes";
import { useEffect } from "react";
import { darkThemes } from "./themes";
import styles from "./page.module.css";

export default function DarkThemeSelector() {
  const [colorSchemePref, defaultTheme, setDarkTheme] = useTheme(state => [
    state.colorSchemePref,
    state.darkTheme,
    state.setDarkTheme,
  ]);
  useEffect(() => {
    setDarkTheme(darkThemes[0]);
  }, []);
  const className = colorSchemePref === "dark" ? styles.active : colorSchemePref === "system" ? styles.dark : "";
  return (
    <p>
      Select default dark theme{" "}
      <select value={defaultTheme} onChange={e => setDarkTheme(e.target.value)} className={className}>
        {darkThemes.map(theme => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </p>
  );
}
