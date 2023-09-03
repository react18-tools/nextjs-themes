"use client";
import { useTheme } from "nextjs-themes";
import { darkThemes, lightThemes } from "./themes";
import styles from "./page.module.css";

export default function ThemeSelector() {
  const [colorSchemePref, theme, setTheme] = useTheme(state => [state.colorSchemePref, state.theme, state.setTheme]);
  return (
    <p>
      Select Theme{" "}
      <select value={theme} onChange={e => setTheme(e.target.value)} className={colorSchemePref ? "" : styles.active}>
        {["auto", ...lightThemes, ...darkThemes].map(theme => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </p>
  );
}
