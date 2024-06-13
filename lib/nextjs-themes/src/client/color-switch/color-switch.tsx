import * as React from "react";
import { useTheme } from "../../hooks";
import { DARK, LIGHT, SYSTEM } from "../../constants";

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
export const ColorSwitch = ({ size = 25, skipSystem }: ColorSwitchProps) => {
  const { colorSchemePref, setColorSchemePref } = useTheme();
  const toggleColorScheme = () => {
    switch (colorSchemePref) {
      case "":
      case SYSTEM:
        setColorSchemePref(DARK);
        break;
      case DARK:
        setColorSchemePref(LIGHT);
        break;
      case LIGHT:
        setColorSchemePref(skipSystem ? DARK : SYSTEM);
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
};
