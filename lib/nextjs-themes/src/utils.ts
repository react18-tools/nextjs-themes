import useRGS from "r18gs";
import { ThemeSwitcherProps, UpdateProps } from "./client";
import { ColorSchemeType, DEFAULT_ID, ThemeStoreType, initialState } from "./constants";

export const resolveTheme = (state?: ThemeStoreType, props?: ThemeSwitcherProps): UpdateProps => {
  const resolvedForcedTheme = props?.forcedTheme === undefined ? state?.forcedTheme : props.forcedTheme;
  const resolvedForcedColorScheme =
    props?.forcedColorScheme === undefined ? state?.forcedColorScheme : props.forcedColorScheme;
  const resolvedColorSchemePref =
    (resolvedForcedColorScheme === undefined ? state?.colorSchemePref : resolvedForcedColorScheme) || "";

  const isSystemDark = state?.systemColorScheme === "dark";

  let resolvedColorScheme: "dark" | "light" = isSystemDark ? "dark" : "light";
  let resolvedTheme = resolvedForcedTheme === undefined ? state?.theme || "" : resolvedForcedTheme;

  if (resolvedForcedTheme === undefined)
    switch (resolvedColorSchemePref) {
      case "system":
        resolvedTheme = (isSystemDark ? state?.darkTheme : state?.lightTheme) || "";
        break;
      case "dark":
        [resolvedTheme, resolvedColorScheme] = [state?.darkTheme || "", "dark"];
        break;
      case "light":
        [resolvedTheme, resolvedColorScheme] = [state?.lightTheme || "", "light"];
        break;
    }

  const th = resolvedForcedTheme === undefined ? state?.theme || "" : resolvedForcedTheme;
  return { resolvedTheme, resolvedColorScheme, resolvedColorSchemePref, th };
};

export const getResolvedTheme = () => {
  return document.documentElement.getAttribute("data-theme");
};

export const getResolvedColorScheme = () => {
  return document.documentElement.getAttribute("data-color-scheme");
};

export const encodeState = (themeState: ThemeStoreType) => {
  const { colorSchemePref, systemColorScheme, darkTheme, lightTheme, theme } = themeState;
  return [colorSchemePref, systemColorScheme, darkTheme, lightTheme, theme].join(",");
};

type StrSplitType = [ColorSchemeType, "dark" | "light", string, string, string];
export const parseState = (str?: string | null): ThemeStoreType => {
  if (!str) return initialState;
  const [colorSchemePref, systemColorScheme, darkTheme, lightTheme, theme] = str.split(",") as StrSplitType;
  return { colorSchemePref, systemColorScheme, darkTheme, lightTheme, theme };
};

export const useStore = (targetId: string) => {
  const key = targetId ?? DEFAULT_ID;
  const [] = useRGS<ThemeStoreType>(key, () => {
    const str = typeof localStorage !== "undefined" ? localStorage.getItem(key) : null;
    if (str) {
      const [colorSchemePref, systemColorScheme, darkTheme, lightTheme, theme] = str.split(",") as StrSplitType;
      return { colorSchemePref, systemColorScheme, darkTheme, lightTheme, theme };
    }
    return initialState;
  });
};
