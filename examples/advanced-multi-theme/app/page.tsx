import DarkThemeSelector from "./DarkThemeSelector";
import ColorSchemePreference from "./ColorSchemePreference";
import LightThemeSelector from "./LightThemeSelector";
import ThemeSelector from "./ThemeSelector";

export default function Page() {
  return (
    <div>
      <ColorSchemePreference />
      <ThemeSelector />
      <DarkThemeSelector />
      <LightThemeSelector />
    </div>
  );
}
