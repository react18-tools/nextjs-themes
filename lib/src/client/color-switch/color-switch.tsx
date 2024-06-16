import { HTMLProps } from "react";
import styles from "./color-switch.module.scss";

export interface ColorSwitchProps extends HTMLProps<HTMLDivElement> {
  /** Diameter of the color switch */
  size?: number;
  /** Skip system colorScheme while toggling */
  skipSystem?: boolean;
}

/**
 *
 *
 * @example
 * ```tsx
 * <ColorSwitch />
 * ```
 *
 * @source - Source code
 */
export const ColorSwitch = ({ children, ...props }: ColorSwitchProps) => {
  const className = [props.className, styles["color-switch"]].filter(Boolean).join(" ");
  return (
    <div {...props} className={className} data-testid="color-switch">
      {children}
    </div>
  );
};
