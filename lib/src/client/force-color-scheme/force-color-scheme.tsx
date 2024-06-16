import { HTMLProps, ReactNode } from "react";
import styles from "./force-color-scheme.module.scss";

export interface ForceColorSchemeProps extends HTMLProps<HTMLDivElement> {
	children?: ReactNode;
}

/**
 * 
 *
 * @example
 * ```tsx
 * <ForceColorScheme />
 * ```
 * 
 * @source - Source code
 */
export const ForceColorScheme = ({ children, ...props }: ForceColorSchemeProps) => {
  const className = [props.className, styles["force-color-scheme"]].filter(Boolean).join(" ");
	return (
		<div {...props} className={className} data-testid="force-color-scheme">
			{children}
		</div>
	);
}
