"use client";
import { useTheme } from "nextjs-themes";
import { darkThemes } from "../data/themes";
import { useEffect } from "react";

export default function DarkThemeSelector() {
  const [darkTheme, setDarkTheme] = useTheme(state => [state.darkTheme, state.setDarkTheme]);
  useEffect(() => {
    setDarkTheme(darkThemes[0]);
  }, []);
  return (
    <p>
      Select default dark theme{" "}
      <select value={darkTheme} onChange={e => setDarkTheme(e.target.value)}>
        {darkThemes.map(theme => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </p>
  );
}
