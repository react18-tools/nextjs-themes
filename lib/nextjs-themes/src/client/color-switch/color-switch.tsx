import { ColorSchemeType, DARK, LIGHT, SYSTEM } from "../../constants";
import { useStore } from "../../utils";

export interface ColorSwitchProps {
  /** Diameter of the color switch */
  size?: number;
  /** Skip system colorScheme while toggling */
  skipSystem?: boolean;
  /** to target appropreate container/store */
  targetId?: string;
}

const colorSchemes: ColorSchemeType[] = [SYSTEM, DARK, LIGHT];

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
export const ColorSwitch = ({ size = 25, skipSystem, targetId }: ColorSwitchProps) => {
  const [{ colorSchemePref }, setThemeState] = useStore(targetId);
  const toggleColorScheme = () => {
    let index = colorSchemes.indexOf(colorSchemePref);
    const n = colorSchemes.length;
    if (skipSystem && index === n - 1) index = 0;
    setThemeState(state => ({ ...state, colorSchemePref: colorSchemes[(index + 1) % n] }));
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
