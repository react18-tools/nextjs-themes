import type { HTMLProps, ReactNode } from "react";
import { type ColorSchemeType } from "../../types";

type ForcedPage =
  | {
      pathMatcher: RegExp | string;
      props: { forcedTheme?: string; forcedColorScheme?: ColorSchemeType };
    }
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

/** Shared server component renderer for Next.js SSG and SSR */
const sharedServerComponentRenderer = (
  { children, tag, ...props }: NextJsSSRThemeSwitcherProps,
  defaultTag: "div" | "html",
) => {
  const Tag: keyof JSX.IntrinsicElements = tag || defaultTag;
  return (
    // @ts-expect-error -> svg props and html element props conflict
    <Tag {...props} data-testid="server-side-target">
      {children}
    </Tag>
  );
};

/**
 * @deprecated No longer need to add this component for avoiding FOUC.
 *
 * This component is deprecated and will be removed in the next major release. Use `ServerSideWrapper` instead.
 * This component is kept here only to ensure no sudden breaking changes are introduced.
 */
export const NextJsSSGThemeSwitcher = (props: NextJsSSRThemeSwitcherProps) => {
  return sharedServerComponentRenderer(props, "div");
};

/**
 * @deprecated No longer need to add this component for avoiding FOUC.
 *
 * This component is deprecated and will be removed in the next major release. Use `ServerSideWrapper` instead.
 * This component is kept here only to ensure no sudden breaking changes are introduced.
 */
export { NextJsSSGThemeSwitcher as NextJsServerTarget };

export interface ServerSideWrapperProps extends NextJsSSRThemeSwitcherProps {
  /** @defaultValue 'html' */
  tag?: keyof JSX.IntrinsicElements;
}

/**
 * @deprecated No longer need to add this component for avoiding FOUC.
 *
 * This component is deprecated and will be removed in the next major release. Use `ServerSideWrapper` instead.
 * This component is kept here only to ensure no sudden breaking changes are introduced.
 */
export const ServerSideWrapper = (props: ServerSideWrapperProps) => {
  return sharedServerComponentRenderer(props, "html");
};
