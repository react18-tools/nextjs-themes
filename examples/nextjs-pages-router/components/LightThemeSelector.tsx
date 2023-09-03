"use client";
import { useTheme } from "nextjs-themes";
import { lightThemes } from "../data/themes";
import { useEffect } from "react";

export default function LightThemeSelector() {
  const [lightTheme, setLightTheme] = useTheme(state => [state.lightTheme, state.setLightTheme]);
  useEffect(() => {
    setLightTheme(lightThemes[0]);
  }, []);
  return (
    <p>
      Select default light theme{" "}
      <select value={lightTheme} onChange={e => setLightTheme(e.target.value)}>
        {lightThemes.map(theme => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </p>
  );
}
