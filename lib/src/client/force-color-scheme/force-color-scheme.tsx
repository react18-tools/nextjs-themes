import { HTMLProps } from "react";
import { ColorSchemeType } from "../../types";

export interface ForceColorSchemeProps extends HTMLProps<HTMLDivElement> {
  colorScheme: ColorSchemeType;
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
  return (
    <div {...props} data-testid="force-color-scheme">
      {children}
    </div>
  );
};
