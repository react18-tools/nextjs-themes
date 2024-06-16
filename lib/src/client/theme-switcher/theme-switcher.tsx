import { HTMLProps, ReactNode } from "react";
import styles from "./theme-switcher.module.scss";

export interface ThemeSwitcherProps extends HTMLProps<HTMLDivElement> {
	children?: ReactNode;
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
export const ThemeSwitcher = ({ children, ...props }: ThemeSwitcherProps) => {
  const className = [props.className, styles["theme-switcher"]].filter(Boolean).join(" ");
	return (
		<div {...props} className={className} data-testid="theme-switcher">
			{children}
		</div>
	);
}
