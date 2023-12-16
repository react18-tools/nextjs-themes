import * as React from "react";
import type { HTMLProps, ReactNode } from "react";
import { cookies, headers } from "next/headers";
import type { ColorSchemeType, ThemeStoreType } from "../../../store";
import { resolveTheme } from "../../../utils";
import { DataProps, ThemeSwitcherProps, UpdateProps } from "../../../client";

export type ForcedPage =
  | { pathMatcher: RegExp | string; props: ThemeSwitcherProps }
  | [pathMatcher: RegExp | string, themes: { theme?: string; colorScheme?: ColorSchemeType }];

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
  const forcedPage = forcedPages?.find(
    forcedPage => path?.match(Array.isArray(forcedPage) ? forcedPage[0] : forcedPage.pathMatcher),
  );
  const forcedPageProps = Array.isArray(forcedPage)
    ? { forcedTheme: forcedPage[1].theme, forcedColorScheme: forcedPage[1].colorScheme }
    : forcedPage?.props;
  const themeState = state ? (JSON.parse(state) as ThemeStoreType) : undefined;
  const isSystemDark = cookies().get("data-color-scheme-system")?.value === "dark";
  const resolvedData = resolveTheme(isSystemDark, themeState, forcedPageProps);
  const dataProps = getDataProps(resolvedData);

  return (
    // @ts-expect-error -> svg props and html element props conflict
    <Tag id="nextjs-themes" {...dataProps} {...props} data-testid="server-side-target">
      {children}
    </Tag>
  );
}

function getDataProps(resolvedData: UpdateProps) {
  const dataProps: DataProps = { className: "" };
  if (resolvedData.resolvedColorScheme !== undefined) {
    dataProps["data-color-scheme"] = resolvedData.resolvedColorScheme;
    dataProps.className = resolvedData.resolvedColorScheme;
  }
  if (resolvedData.resolvedTheme !== undefined) {
    dataProps["data-theme"] = resolvedData.resolvedTheme;
    dataProps.className += `theme-${resolvedData.resolvedTheme}`;
  }
  if (resolvedData.th) {
    dataProps["data-th"] = resolvedData.th;
    dataProps.className += ` th-${resolvedData.th}`;
  }
  if (resolvedData.resolvedColorSchemePref !== undefined) {
    dataProps["data-csp"] = resolvedData.resolvedColorSchemePref;
    dataProps.className += ` csp-${resolvedData.resolvedColorSchemePref}`;
  }
  return dataProps;
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
