import { HTMLProps, ReactNode } from "react";
import styles from "./server-side-wrapper.module.scss";

export interface ServerSideWrapperProps extends HTMLProps<HTMLDivElement> {
	children?: ReactNode;
}

/**
 * 
 *
 * @example
 * ```tsx
 * <ServerSideWrapper />
 * ```
 * 
 * @source - Source code
 */
export const ServerSideWrapper = ({ children, ...props }: ServerSideWrapperProps) => {
  const className = [props.className, styles["server-side-wrapper"]].filter(Boolean).join(" ");
	return (
		<div {...props} className={className} data-testid="server-side-wrapper">
			{children}
		</div>
	);
}
