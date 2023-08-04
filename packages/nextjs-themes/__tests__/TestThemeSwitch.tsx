import { useEffect } from "react";
import { ThemeSwitcher, useTheme } from "../src";

export default function TestUtil({ themes }: { themes: string[] }) {
  const { setTheme, setDefaultTheme, setDefaultDarkTheme, setDefaultLightTheme } = useTheme();
  useEffect(
    () => () => {
      setTheme("");
      setDefaultTheme("");
    },
    [],
  );
  return (
    <div>
      <ThemeSwitcher />
      {themes.map(th => (
        <button key={th} onClick={() => setTheme(th)} data-testid={`th-${th}`}>
          {th}
        </button>
      ))}
      <br />
      {themes.map(th => (
        <button key={th} onClick={() => setDefaultTheme(th)} data-testid={`default-th-${th}`}>
          {th}
        </button>
      ))}
      <br />
      {themes.map(th => (
        <button key={th} onClick={() => setDefaultDarkTheme(th)} data-testid={`default-dark-th-${th}`}>
          {th}
        </button>
      ))}
      <br />
      {themes.map(th => (
        <button key={th} onClick={() => setDefaultLightTheme(th)} data-testid={`default-light-th-${th}`}>
          {th}
        </button>
      ))}
    </div>
  );
}
