import { HTMLProps } from "react";
import styles from "./color-switch.module.scss";
import { useTheme } from "../../hooks";

export interface ColorSwitchProps extends HTMLProps<HTMLButtonElement> {
  /** Diameter of the color switch */
  size?: number;
  /** Skip system colorScheme while toggling */
  skipSystem?: boolean;
  targetSelector?: string;
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
export const ColorSwitch = ({
  size = 25,
  skipSystem,
  targetSelector,
  className,
  ...props
}: ColorSwitchProps) => {
  const { toggleColorScheme } = useTheme(targetSelector);

  const cls = [styles.s, className].join(" ");
  return (
    <button
      className={cls}
      data-testid="color-switch"
      // skipcq: JS-0417
      onClick={() => toggleColorScheme(skipSystem)}
      // @ts-expect-error -- setting custom attribute
      style={{ "--s": `${size}px` }}
      {...props}
    />
  );
};
