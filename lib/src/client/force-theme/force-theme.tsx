import { HTMLProps } from "react";

export interface ForceThemeProps extends HTMLProps<HTMLDivElement> {
  theme: string;
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
  return (
    <div {...props} data-testid="force-theme">
      {children}
    </div>
  );
};
