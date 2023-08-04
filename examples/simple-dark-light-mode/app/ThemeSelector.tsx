"use client";
import { useTheme } from "nextjs-themes";

export default function ThemeSelector() {
  const [theme, setTheme] = useTheme(state => [state.theme, state.setTheme]);
  return (
    <p>
      <select value={theme} onChange={e => setTheme(e.target.value)}>
        {["auto", "dark", ""].map(theme => (
          <option key={theme} value={theme}>
            {/* using light theme as default - you can also set your own default theme */}
            {theme || "light"}
          </option>
        ))}
      </select>
    </p>
  );
}
