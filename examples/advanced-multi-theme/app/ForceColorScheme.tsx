"use client";
import { useThemeStore, ColorSchemeType } from "nextjs-themes";

const colorSchemes: ColorSchemeType[] = ["auto", "light", "dark"];

export default function ForceColorScheme() {
  const [forcedColorScheme, setForcedColorScheme] = useThemeStore(state => [
    state.forcedColorScheme,
    state.setForcedColorScheme,
  ]);
  return (
    <p>
      Force Color Scheme{" "}
      <select value={forcedColorScheme} onChange={e => setForcedColorScheme(e.target.value as ColorSchemeType)}>
        {colorSchemes.map(theme => (
          <option key={theme} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </p>
  );
}
