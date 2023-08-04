"use client";
import { useThemeStore } from "nextjs-themes";
import { darkThemes } from "./themes";
import { useEffect } from "react";

export default function DarkThemeSelector() {
  const [defaultDarkTheme, setDefaultDarkTheme] = useThemeStore(state => [
    state.defaultDarkTheme,
    state.setDefaultDarkTheme,
  ]);
  useEffect(() => {
    setDefaultDarkTheme(darkThemes[0]);
  }, []);
  return (
    <p>
      Select default dark theme{" "}
      <select value={defaultDarkTheme} onChange={e => setDefaultDarkTheme(e.target.value)}>
        {darkThemes.map(theme => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </p>
  );
}
