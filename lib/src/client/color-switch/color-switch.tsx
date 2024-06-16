import { HTMLProps, ReactNode } from "react";
import styles from "./color-switch.module.scss";

export interface ColorSwitchProps extends HTMLProps<HTMLDivElement> {
	children?: ReactNode;
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
}
