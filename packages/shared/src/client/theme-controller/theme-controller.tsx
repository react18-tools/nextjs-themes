import styles from "./theme-controller.module.scss";
import { ColorSchemePreference } from "./color-scheme-preference";
import { ThemeSelector } from "./theme-selector";

export interface ThemeControllerProps {
  targetSelector?: string;
}

export function ThemeController({ targetSelector }: ThemeControllerProps) {
  return (
    <div className={[styles.center, styles.prefs].join(" ")}>
      <div>
        <ColorSchemePreference targetSelector={targetSelector} />
        <ThemeSelector scope="" targetSelector={targetSelector} />
      </div>
      <div>
        <ThemeSelector scope="dark" targetSelector={targetSelector} />
        <ThemeSelector scope="light" targetSelector={targetSelector} />
      </div>
    </div>
  );
}
