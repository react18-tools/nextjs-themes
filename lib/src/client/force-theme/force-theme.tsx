import { HTMLProps, ReactNode } from "react";
import styles from "./force-theme.module.scss";

export interface ForceThemeProps extends HTMLProps<HTMLDivElement> {
	children?: ReactNode;
}

/**
 * 
 *
 * @example
 * ```tsx
 * <ForceTheme />
 * ```
 * 
 * @source - Source code
 */
export const ForceTheme = ({ children, ...props }: ForceThemeProps) => {
  const className = [props.className, styles["force-theme"]].filter(Boolean).join(" ");
	return (
		<div {...props} className={className} data-testid="force-theme">
			{children}
		</div>
	);
}
