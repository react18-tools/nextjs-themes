"use client";
import type { ColorSchemeType } from "nextjs-themes";
import { useTheme } from "nextjs-themes";
import styles from "./page.module.css";

const colorSchemes: ColorSchemeType[] = ["", "system", "light", "dark"];

export default function ColorSchemePreference() {
  const [colorSchemePref, setColorSchemePref] = useTheme(state => [state.colorSchemePref, state.setColorSchemePref]);
  return (
    <p>
      ColorScheme Preference{" "}
      <select
        value={colorSchemePref}
        onChange={e => setColorSchemePref(e.target.value as ColorSchemeType)}
        className={styles.active}>
        {colorSchemes.map(theme => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </p>
  );
}
