import { useEffect } from "react";
import { resolveTheme, MEDIA, useStore } from "../../utils";
import { ColorSchemeType, DARK, DEFAULT_ID, LIGHT, ResolvedColorSchemeType } from "../../constants";

export interface ThemeSwitcherProps {
  forcedTheme?: string;
  forcedColorScheme?: ColorSchemeType;
  targetSelector?: string;
  themeTransition?: string;
  /** provide styles object imported from CSS/SCSS modules, if you are using CSS/SCSS modules. */
  styles?: Record<string, string>;
}

export interface DataProps {
  className: string;
  "data-th"?: string;
  "data-theme"?: string;
  "data-color-scheme"?: ResolvedColorSchemeType;
  /** color-scheme-preference */
  "data-csp"?: ColorSchemeType;
}

export interface UpdateProps {
  resolvedTheme: string;
  resolvedColorScheme: ResolvedColorSchemeType;
  resolvedColorSchemePref: ColorSchemeType;
  th: string;
}

const updateDOM = (
  { resolvedTheme, resolvedColorScheme, resolvedColorSchemePref, th }: UpdateProps,
  props: ThemeSwitcherProps,
) => {
  const { targetSelector, styles } = props;
  const target = document.querySelector(targetSelector || `#${DEFAULT_ID}`);
  let classes = [resolvedColorScheme, `theme-${resolvedTheme}`, `th-${th}`, `csp-${resolvedColorSchemePref}`];
  if (styles) classes = classes.map(cls => styles[cls] ?? cls);
  /** don't apply theme to documentElement for localized targets */
  [target, targetSelector && target ? null : document.documentElement].forEach(target => {
    /** ensuring that class 'dark' is always present when dark color scheme is applied to support Tailwind  */
    if (target) target.className = classes.join(" ");
    target?.setAttribute("data-th", th);
    target?.setAttribute("data-theme", resolvedTheme);
    target?.setAttribute("data-color-scheme", resolvedColorScheme);
    target?.setAttribute("data-csp", resolvedColorSchemePref); /** color-scheme-preference */
  });
  const shouldCreateCookie = target?.getAttribute("data-nth") === "next";
  return shouldCreateCookie;
};

/** disable transition while switching theme */
const disableTransition = (themeTransition = "none") => {
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
 * You can use this hook in place of `<ThemeSwitcher />` component.
 * Please note that you need to add "use client" on top of the component in which you are using this hook.
 */
export const useThemeSwitcher = (props: ThemeSwitcherProps) => {
  const [themeState, setThemeState] = useStore(props.targetSelector);
  // not using ?? as we don't want key to be an empty string ever
  const key = props.targetSelector || DEFAULT_ID;
  /** set listeners for system preference and syncing store */
  useEffect(() => {
    const media = matchMedia(MEDIA);
    media.addEventListener("change", () =>
      setThemeState(state => ({ ...state, systemColorScheme: media.matches ? DARK : LIGHT })),
    );
    addEventListener("storage", e => {
      if (e.key === key) setThemeState(state => ({ ...state, ...JSON.parse(e.newValue || "{}") }));
    });
  }, []);

  useEffect(() => {
    const restoreTransitions = disableTransition(props.themeTransition);
    const resolvedData = resolveTheme(themeState, props);
    const shouldCreateCookie = updateDOM(resolvedData, props);
    const stateStr = JSON.stringify(themeState);
    localStorage.setItem(key, stateStr);
    if (shouldCreateCookie) document.cookie = `${key}=${stateStr};max-age=31536000;SameSite=Strict;`;
    restoreTransitions();
  }, [props, themeState]);
};

/**
 * Use this component in your layout - `app/layout.tsx` or your custom layout or in `_app.tsx` file.
 * @component
 */
export const ThemeSwitcher = (props: ThemeSwitcherProps) => {
  useThemeSwitcher(props);
  return null;
};
