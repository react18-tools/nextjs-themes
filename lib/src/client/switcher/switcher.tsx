import { useEffect } from "react";
import { ThemeSwitcherProps } from "../theme-switcher";
import { DARK, DEFAULT_ID, LIGHT } from "../../constants";
import { useForcedStore, useThemeStore } from "../../store";
import type { ResolveFunc, UpdateDOMFunc, UpdateForcedPropsFunc } from "../theme-switcher/no-fouc";

let media: MediaQueryList;
let updateDOM: UpdateDOMFunc;
let resolveTheme: ResolveFunc;
let updateForcedProps: UpdateForcedPropsFunc;
let updateForcedState: UpdateForcedPropsFunc;

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
 * The Core component applies classes and transitions without injecting any scripts. Use ThemeSwitcher only once per page. For scoped styles, use this component instead.
 *
 * Please note that you need to use suitable techniques to increase specificity of CSS selecors when using data- attributes for targetting a container which is within another themed container (including the html if you have used ThemeSwitcher without targetSelector)
 *
 * @example
 * ```tsx
 * <Switcher targetSelector="#container1" />
 * ```
 */
export const Switcher = ({
  forcedTheme,
  forcedColorScheme,
  targetSelector,
  themeTransition,
}: ThemeSwitcherProps) => {
  const k = targetSelector || `#${DEFAULT_ID}`;

  const [state, setState] = useThemeStore(targetSelector);
  const [forced] = useForcedStore(targetSelector);

  useEffect(() => {
    if (typeof m !== "undefined")
      [media, updateDOM, resolveTheme, updateForcedProps, updateForcedState] = [m, u, r, f, g];

    media.addEventListener("change", () =>
      setState(state => ({ ...state, s: media.matches ? DARK : LIGHT })),
    );
    addEventListener("storage", e => {
      if (e.key === k) setState(state => ({ ...state, ...JSON.parse(e.newValue || "{}") }));
    });
  }, []);

  useEffect(() => {
    const restoreThansitions = modifyTransition(themeTransition);
    updateDOM(resolveTheme(state), k);
    restoreThansitions();
    localStorage.setItem(k, JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    updateForcedProps(forcedTheme, forcedColorScheme);
    updateDOM(resolveTheme(state), k);
  }, [forcedColorScheme, forcedTheme]);

  useEffect(() => {
    updateForcedState(forced.f, forced.fc);
    updateDOM(resolveTheme(state), k);
  }, [forced]);
  return null;
};
