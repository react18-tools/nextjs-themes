import { DARK, LIGHT, SYSTEM } from "../../constants";
import { HTMLProps } from "react";
import styles from "./color-switch.module.scss";
import { useStore } from "../../store";
import { ColorSchemeType } from "../../types";

export interface ColorSwitchProps extends HTMLProps<HTMLButtonElement> {
  /** Diameter of the color switch */
  size?: number;
  /** Skip system colorScheme while toggling */
  skipSystem?: boolean;
}

const colorSchemes = [SYSTEM, LIGHT, DARK] as ColorSchemeType[];

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
export const ColorSwitch = ({ size = 25, skipSystem, className, ...props }: ColorSwitchProps) => {
  const [state, setState] = useStore();
  /** toggle color scheme */
  const toggleColorScheme = () => {
    let index = state.c === "" ? 0 : colorSchemes.indexOf(state.c);
    const n = colorSchemes.length;
    if (skipSystem && index === n - 1) index = 0;
    setState({
      ...state,
      c: colorSchemes[(index + 1) % n],
    });
  };
  const cls = [styles["color-switch"], className].join(" ");
  return (
    <button
      className={cls}
      data-testid="color-switch"
      // skipcq: JS-0417
      onClick={toggleColorScheme}
      // @ts-expect-error -- setting custom attribute
      style={{ "--size": `${size}px` }}
      {...props}
    />
  );
};
