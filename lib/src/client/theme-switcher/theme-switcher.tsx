import { memo, useEffect } from "react";
import { ColorSchemeType } from "../../types";
import { ResolveFunc, UpdateDOMFunc, noFOUCScript } from "./no-fouc";
import { initialState, useStore } from "../../store";
import { DARK, DEFAULT_ID, LIGHT } from "../../constants";

export interface ThemeSwitcherProps {
  forcedTheme?: string;
  forcedColorScheme?: ColorSchemeType;
  targetSelector?: string;
  themeTransition?: string;
  /** provide styles object imported from CSS/SCSS modules, if you are using CSS/SCSS modules. */
  styles?: Record<string, string>;
  /** The nonce value for your Content Security Policy. @defaultValue '' */
  nonce?: string;
}

interface ScriptProps {
  /** key */
  k: string;
  /** nonce */
  n?: string;
  /** styles */
  s?: Record<string, string>;
  /** forcedTheme */
  t?: string;
  /** forcedColorScheme */
  c?: ColorSchemeType;
}

let media: MediaQueryList;
let updateDOM: UpdateDOMFunc;
let resolveTheme: ResolveFunc;

const Script = memo(({ k, n = "", s, t, c }: ScriptProps) => {
  if (typeof m !== "undefined") [media, updateDOM, resolveTheme] = [m, u, r];
  return (
    <script
      suppressHydrationWarning
      // skipcq: JS-0440
      dangerouslySetInnerHTML={{
        __html: `(${noFOUCScript.toString()})(${JSON.stringify([k, initialState, s, t, c]).slice(1, -1)})`,
      }}
      nonce={n}
    />
  );
});

/** disable transition while switching theme */
const modifyTransition = (themeTransition = "none") => {
  const css = document.createElement("style");
  /** split by ';' to prevent CSS injection */
  css.textContent = `transition: ${themeTransition.split(";")[0]} !important;`;
  document.head.appendChild(css);

  return () => {
    // Force restyle
    getComputedStyle(document.body);
    // Wait for next tick before removing
    setTimeout(() => document.head.removeChild(css), 1);
  };
};

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
export const ThemeSwitcher = ({
  forcedTheme,
  forcedColorScheme,
  targetSelector,
  themeTransition,
  styles,
  nonce,
}: ThemeSwitcherProps) => {
  const k = targetSelector || `#${DEFAULT_ID}`;
  // handle client side exceptions when script is not run. <- for client side apps like vite or CRA
  if (typeof window !== "undefined" && !window.m)
    noFOUCScript(k, initialState, styles, forcedTheme, forcedColorScheme);

  const [state, setState] = useStore(targetSelector);

  useEffect(() => {
    media.addEventListener("change", () =>
      setState(state => ({ ...state, s: media.matches ? DARK : LIGHT })),
    );
    addEventListener("storage", e => {
      if (e.key === k) setState(state => ({ ...state, ...JSON.parse(e.newValue || "{}") }));
    });
  }, []);

  useEffect(() => {
    const restoreThansitions = modifyTransition(themeTransition);
    updateDOM(resolveTheme(state));
    restoreThansitions();
    localStorage.setItem(k, JSON.stringify(state));
  }, [state]);

  return <Script {...{ k, n: nonce, s: styles, t: forcedTheme, c: forcedColorScheme }} />;
};
