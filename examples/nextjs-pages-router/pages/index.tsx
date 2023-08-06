import ColorSchemePreference from "../components/ColorSchemePreference";
import DarkThemeSelector from "../components/DarkThemeSelector";
import LightThemeSelector from "../components/LightThemeSelector";
import ThemeSelector from "../components/ThemeSelector";

export default function Home() {
  return (
    <div>
      <ColorSchemePreference />
      <ThemeSelector />
      <DarkThemeSelector />
      <LightThemeSelector />
    </div>
  );
}
