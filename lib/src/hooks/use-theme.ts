import { useState } from "react";

export interface UseThemeOptions {
  /** this is a dummy option */
  dummy?: string;
}

/**
 * 
 *
 * @example
 * ```tsx
 * const [] = useTheme(options);
 * ```
 * 
 * @source - Source code
 */

export const useTheme = (options?: UseThemeOptions) => {
  const [value, setValue] = useState(0);
  return {
    value, setValue
  }
}