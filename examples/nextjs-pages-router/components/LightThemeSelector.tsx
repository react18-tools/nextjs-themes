"use client";
import { useTheme } from "nextjs-themes";
import { lightThemes } from "../data/themes";
import { useEffect } from "react";

export default function LightThemeSelector() {
  const [defaultLightTheme, setDefaultLightTheme] = useTheme(state => [
    state.defaultLightTheme,
    state.setDefaultLightTheme,
  ]);
  useEffect(() => {
    setDefaultLightTheme(lightThemes[0]);
  }, []);
  return (
    <p>
      Select default light theme{" "}
      <select value={defaultLightTheme} onChange={e => setDefaultLightTheme(e.target.value)}>
        {lightThemes.map(theme => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </p>
  );
}
