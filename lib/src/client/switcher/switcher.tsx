import { ThemeSwitcherProps } from "../theme-switcher";
import { DARK, DEFAULT_ID, LIGHT } from "../../constants";
import { UNDEFINED, useThemeStore } from "../../store";
import type { ResolveFunc, UpdateDOMFunc, UpdateForcedPropsFunc } from "../theme-switcher/no-fouc";

let media: MediaQueryList;
let updateDOM: UpdateDOMFunc;
let resolveTheme: ResolveFunc;
let updateForcedProps: UpdateForcedPropsFunc;

/** disable transition while switching theme */
const modifyTransition = (themeTransition = "none") => {
  const css = document.createElement("style");
  /** split by ';' to prevent CSS injection */
  css.textContent = `transition:${themeTransition.split(";")[0]}!important;`;
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
  const k = targetSelector || "#" + DEFAULT_ID;

  const [state, setState] = useThemeStore(targetSelector);

  if (typeof m != UNDEFINED && !updateForcedProps) {
    [media, updateDOM, resolveTheme, updateForcedProps] = [m, u, r, f];

    media.addEventListener("change", () =>
      setState(state => ({ ...state, s: media.matches ? DARK : LIGHT })),
    );
    addEventListener("storage", e => {
      if (e.key === k) setState(state => ({ ...state, ...JSON.parse(e.newValue || "{}") }));
    });
  }
  if (updateForcedProps) {
    updateForcedProps(forcedTheme, forcedColorScheme);
    const restoreThansitions = modifyTransition(themeTransition);
    updateDOM(resolveTheme(state), k);
    restoreThansitions();
    const { f, fc, ...others } = state;
    localStorage.setItem(k, JSON.stringify(others));
  }
  return null;
};
