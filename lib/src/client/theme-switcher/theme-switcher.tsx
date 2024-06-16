import { ColorSchemeType } from "../../types";

export interface ThemeSwitcherProps {
  forcedTheme?: string;
  forcedColorScheme?: ColorSchemeType;
  targetSelector?: string;
  themeTransition?: string;
  /** provide styles object imported from CSS/SCSS modules, if you are using CSS/SCSS modules. */
  styles?: Record<string, string>;
}

/**
 *
 *
 * @example
 * ```tsx
 * <ThemeSwitcher />
 * ```
 *
 * @source - Source code
 */
export const ThemeSwitcher = ({ ...props }: ThemeSwitcherProps) => {
  return null;
};
