import DarkThemeSelector from "./DarkThemeSelector";
import ForceColorScheme from "./ForceColorScheme";
import LightThemeSelector from "./LightThemeSelector";
import ThemeSelector from "./ThemeSelector";

export default function Page() {
  return (
    <div className="container">
      <h1>Simple Multi Theme</h1>
      <hr />
      <p>
        Example showing how to use <code>nextjs-themes</code> to implement simple multi theme switching
      </p>
      <div>
        <ForceColorScheme />
        <ThemeSelector />
        <DarkThemeSelector />
        <LightThemeSelector />
      </div>
    </div>
  );
}
