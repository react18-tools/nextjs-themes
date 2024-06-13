import * as React from "react";
import type { HTMLProps, ReactNode } from "react";
import { cookies, headers } from "next/headers";
import { DEFAULT_ID, type ColorSchemeType, type ThemeStoreType } from "../../../constants";
import { resolveTheme } from "../../../utils";
import { DataProps, UpdateProps } from "../../../client";

export type ForcedPage =
  | { pathMatcher: RegExp | string; props: { forcedTheme?: string; forcedColorScheme?: ColorSchemeType } }
  | [pathMatcher: RegExp | string, themes: { theme?: string; colorScheme?: ColorSchemeType }];

export interface NextJsSSRThemeSwitcherProps extends HTMLProps<HTMLElement> {
  children?: ReactNode;
  /** @defaultValue 'div' */
  tag?: keyof JSX.IntrinsicElements;
  forcedPages?: ForcedPage[];
  /** id of target element to apply classes to. This is useful when you want to apply theme only to specific container. */
  targetId?: string;
  /** provide styles object imported from CSS/SCSS modules, if you are using CSS/SCSS modules. */
  styles?: Record<string, string>;
}

const getDataProps = (resolvedData: UpdateProps, styles?: Record<string, string>) => {
  const dataProps: DataProps = { className: "" };
  let classeNames = [];
  if (resolvedData.resolvedColorScheme !== undefined) {
    dataProps["data-color-scheme"] = resolvedData.resolvedColorScheme;
    classeNames.push(resolvedData.resolvedColorScheme);
  }
  if (resolvedData.resolvedTheme !== undefined) {
    dataProps["data-theme"] = resolvedData.resolvedTheme;
    classeNames.push(`theme-${resolvedData.resolvedTheme}`);
  }
  if (resolvedData.th) {
    dataProps["data-th"] = resolvedData.th;
    classeNames.push(`th-${resolvedData.th}`);
  }
  if (resolvedData.resolvedColorSchemePref !== undefined) {
    dataProps["data-csp"] = resolvedData.resolvedColorSchemePref;
    classeNames.push(`csp-${resolvedData.resolvedColorSchemePref}`);
  }
  if (styles) classeNames = classeNames.map(cls => styles[cls] ?? cls);
  dataProps.className = classeNames.join(" ");
  return dataProps;
};

const sharedServerComponentRenderer = (
  { children, tag, forcedPages, targetId, styles, ...props }: NextJsSSRThemeSwitcherProps,
  defaultTag: "div" | "html",
) => {
  const Tag: keyof JSX.IntrinsicElements = tag || defaultTag;
  const key = targetId ? `#${targetId}` : DEFAULT_ID;
  const state = cookies().get(key)?.value;

  const path = headers().get("referer");
  const forcedPage = forcedPages?.find(forcedPage =>
    path?.match(Array.isArray(forcedPage) ? forcedPage[0] : forcedPage.pathMatcher),
  );
  const forcedPageProps = Array.isArray(forcedPage)
    ? { forcedTheme: forcedPage[1].theme, forcedColorScheme: forcedPage[1].colorScheme }
    : forcedPage?.props;
  const themeState = state ? (JSON.parse(state) as ThemeStoreType) : undefined;
  const resolvedData = resolveTheme(themeState, forcedPageProps);
  const dataProps = getDataProps(resolvedData, styles);
  if (targetId) dataProps.className += styles?.[" nth-scoped"] ?? " nth-scoped";

  return (
    // @ts-expect-error -> svg props and html element props conflict
    <Tag id={targetId || DEFAULT_ID} {...dataProps} {...props} data-nth="next" data-testid="server-side-target">
      {children}
    </Tag>
  );
};

/**
 * @example
 * ```tsx
 * <NextJsSSGThemeSwitcher />
 * ```
 */
export const NextJsSSGThemeSwitcher = (props: NextJsSSRThemeSwitcherProps) => {
  return sharedServerComponentRenderer(props, "div");
};

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
export const ServerSideWrapper = (props: ServerSideWrapperProps) => {
  return sharedServerComponentRenderer(props, "html");
};
