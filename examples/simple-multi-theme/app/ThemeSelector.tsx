"use client";
import { useTheme } from "nextjs-themes";
import { darkThemes, lightThemes } from "shared-ui";
import styles from "shared-ui/src/root-layout.module.css";

export default function ThemeSelector() {
  const [theme, setTheme] = useTheme(state => [state.theme, state.setTheme]);
  return (
    <p className={styles.center}>
      <select value={theme} onChange={e => setTheme(e.target.value)}>
        {[...darkThemes, ...lightThemes].map(theme => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </p>
  );
}
