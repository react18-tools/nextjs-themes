import * as React from "react";
import type { HTMLProps, ReactNode } from "react";
import { cookies, headers } from "next/headers";
import type { ColorSchemeType, ThemeStoreType } from "../../../store";
import { resolveThemeFromColorScheme } from "../../../utils";

export type ForcedPage = [pathMatcher: RegExp | string, themes: { theme?: string; colorScheme?: ColorSchemeType }];

export interface NextJsSSRThemeSwitcherProps extends HTMLProps<HTMLElement> {
  children?: ReactNode;
  /** @defaultValue 'div' */
  tag?: keyof JSX.IntrinsicElements;
  forcedPages?: ForcedPage[];
}

function sharedServerComponentRenderer(
  { children, tag, forcedPages, ...props }: NextJsSSRThemeSwitcherProps,
  defaultTag: "div" | "html",
) {
  const Tag: keyof JSX.IntrinsicElements = tag || defaultTag;
  const state = cookies().get("nextjs-themes")?.value;

  const path = headers().get("referer");
  const forcedPageData = forcedPages?.find(forcedPage => path?.match(forcedPage[0]));

  const themeState = state ? (JSON.parse(state) as ThemeStoreType) : undefined;
  const isSystemDark = cookies().get("data-color-scheme-system")?.value === "dark";
  const { dataTheme, dataColorScheme } =
    forcedPageData === undefined
      ? getTheme(themeState, isSystemDark)
      : getForcedPageTheme(themeState, forcedPageData, isSystemDark);

  const dataProps: { "data-theme"?: string; "data-color-scheme"?: ColorSchemeType; className?: string } = {
    className: "",
  };
  if (dataTheme !== undefined) {
    dataProps["data-theme"] = dataTheme;
    dataProps.className = dataTheme;
  }
  if (dataColorScheme !== undefined) {
    dataProps["data-color-scheme"] = dataColorScheme;
    dataProps.className += ` cs-${dataColorScheme}`;
  }

  return (
    // @ts-expect-error -> svg props and html element props conflict
    <Tag id="nextjs-themes" {...dataProps} {...props} data-testid="server-side-target">
      {children}
    </Tag>
  );
}

/**
 * @example
 * ```tsx
 * <NextJsSSGThemeSwitcher />
 * ```
 */
export function NextJsSSGThemeSwitcher(props: NextJsSSRThemeSwitcherProps) {
  return sharedServerComponentRenderer(props, "div");
}

/** For naming consistancy, clarity, and minimizing API updates */
export { NextJsSSGThemeSwitcher as NextJsServerTarget };

export interface ServerSideWrapperProps extends NextJsSSRThemeSwitcherProps {
  /** @defaultValue 'html' */
  tag?: keyof JSX.IntrinsicElements;
}

/**
 * Server side wrapper for Next.js to replace &#x60;html&#x60; tag
 * @example
 * ```tsx
 * <ServerSideWrapperProps lang="en">
 *  <body>
 *    <ThemeSwitcher />
 *    {children}
 *  </body>
 * </ServerSideWrapperProps>
 * ```
 */
export function ServerSideWrapper(props: ServerSideWrapperProps) {
  return sharedServerComponentRenderer(props, "html");
}

interface Theme {
  dataTheme?: string;
  dataColorScheme?: ColorSchemeType;
}

function getTheme(themeState: ThemeStoreType | undefined, isSystemDark: boolean): Theme {
  if (!themeState) return {};
  const dataTheme = resolveThemeFromColorScheme(themeState, isSystemDark);
  return { dataTheme, dataColorScheme: themeState.colorSchemePref };
}

function getForcedPageTheme(
  themeState: ThemeStoreType | undefined,
  forcedPageData: ForcedPage,
  isSystemDark: boolean,
): Theme {
  const dataColorScheme =
    forcedPageData[1].colorScheme === undefined ? themeState?.colorSchemePref : forcedPageData[1].colorScheme;

  let dataTheme;
  if (forcedPageData[1].theme) {
    dataTheme = forcedPageData[1].theme;
  } else if (dataColorScheme !== undefined && themeState !== undefined) {
    dataTheme = resolveThemeFromColorScheme({ ...themeState, colorSchemePref: dataColorScheme }, isSystemDark);
  }
  return { dataTheme, dataColorScheme };
}
