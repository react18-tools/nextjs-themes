"use client";
import { useThemeStore } from "nextjs-themes";
import { darkThemes, lightThemes } from "./themes";

export default function ThemeSelector() {
  const [theme, setTheme] = useThemeStore(state => [state.theme, state.setTheme]);
  return (
    <p>
      Select Theme{" "}
      <select value={theme} onChange={e => setTheme(e.target.value)}>
        {["auto", ...lightThemes, ...darkThemes].map(theme => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </p>
  );
}
