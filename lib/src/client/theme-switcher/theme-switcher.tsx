import { ColorSchemeType } from "../../types";
import { noFOUCScript } from "./no-fouc";
import { initialState } from "../../store";
import { DEFAULT_ID } from "../../constants";
import { Switcher } from "../switcher";

export interface ThemeSwitcherProps {
  /**
   * Forced theme name for the current page
   * @see [Force per page theme and color-scheme](https://github.com/react18-tools/nextjs-themes?tab=readme-ov-file#force-per-page-theme-and-color-scheme)
   */
  forcedTheme?: string;
  /**
   * Forced color scheme for the current page
   * @see [Force per page theme and color-scheme](https://github.com/react18-tools/nextjs-themes?tab=readme-ov-file#force-per-page-theme-and-color-scheme)
   */
  forcedColorScheme?: ColorSchemeType;
  /**
   * CSS selector for the target element to apply the theme.
   * Use this to specify a different target element than the default (html or documentElement).
   * This is particularly useful for controlling the theme of different parts of the page independently.
   */
  targetSelector?: string;
  /**
   * The transition property to enforce on all elements, preventing unwanted transitions during theme changes.
   * @example 'background .3s'
   * @defaultValue 'none'
   */
  themeTransition?: string;
  /**
   * Provide a styles object imported from CSS/SCSS modules if you are using these modules to define theme and color-scheme classes.
   * All classes applied to the target are modified using the styles object as follows:
   * `if (styles) classes = classes.map(cls => styles[cls] ?? cls);`
   */
  styles?: Record<string, string>;
  /** The nonce value for your Content Security Policy. */
  nonce?: string;
}

/** Script component to inject script before hydration */
const Script = ({
  targetSelector,
  nonce,
  styles,
  forcedTheme,
  forcedColorScheme,
}: ThemeSwitcherProps) => {
  const k = targetSelector || `#${DEFAULT_ID}`;
  // handle client side exceptions when script is not run. <- for client side apps like vite or CRA
  if (typeof window !== "undefined" && !window.m)
    noFOUCScript(k, initialState, styles, forcedTheme, forcedColorScheme);
  return (
    <script
      // skipcq: JS-0440
      dangerouslySetInnerHTML={{
        __html: `(${noFOUCScript})(${JSON.stringify([k, initialState, styles, forcedTheme, forcedColorScheme]).slice(1, -1)})`,
      }}
      nonce={nonce}
    />
  );
};

/**
 * The Core component wich applies classes and transitions.
 *
 * @example
 * ```tsx
 * <ThemeSwitcher [...props] />
 * ```
 */
export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  return (
    <>
      <Script {...props} />
      <Switcher {...props} />
    </>
  );
};
