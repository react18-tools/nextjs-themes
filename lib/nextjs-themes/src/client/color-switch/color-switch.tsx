import * as React from "react";
import { useTheme } from "../../store";

export interface ColorSwitchProps {
  /** Diameter of the color switch */
  size?: number;
  /** Skip system colorScheme while toggling */
  skipSystem?: boolean;
}

/**
 * Color switch button to quickly set user preference
 *
 * @example
 * ```ts
 * <ColorSwitch />
 * ```
 *
 * Custom size & skipSystem
 *
 * ```ts
 * <ColorSwitch size={20} skipSystem />
 * ```
 */
export function ColorSwitch({ size = 25, skipSystem }: ColorSwitchProps) {
  const [colorSchemePref, setColorSchemePref] = useTheme(state => [state.colorSchemePref, state.setColorSchemePref]);
  const toggleColorScheme = () => {
    switch (colorSchemePref) {
      case "":
      case "system":
        setColorSchemePref("dark");
        break;
      case "dark":
        setColorSchemePref("light");
        break;
      case "light":
        setColorSchemePref(skipSystem ? "dark" : "system");
    }
  };
  return (
    <button
      className="nextjs-themes--color-switch"
      data-testid="color-switch"
      onClick={toggleColorScheme}
      type="button"
      // @ts-expect-error -- setting custom attribute
      style={{ "--size": `${size}px` }}
    />
  );
}
