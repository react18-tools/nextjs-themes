"use client";
import { useTheme } from "nextjs-themes";
import { lightThemes } from "./themes";
import { useEffect } from "react";
import styles from "./page.module.css";

export default function LightThemeSelector() {
  const [colorSchemePref, defaultLightTheme, setDefaultLightTheme] = useTheme(state => [
    state.colorSchemePref,
    state.lightTheme,
    state.setLightTheme,
  ]);
  useEffect(() => {
    setDefaultLightTheme(lightThemes[0]);
  }, []);
  const className = colorSchemePref === "light" ? styles.active : colorSchemePref === "system" ? styles.light : "";
  return (
    <p>
      Select default light theme{" "}
      <select value={defaultLightTheme} onChange={e => setDefaultLightTheme(e.target.value)} className={className}>
        {lightThemes.map(theme => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </p>
  );
}
