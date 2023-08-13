import { HTMLProps, ReactNode } from "react";
import { cookies } from "next/headers";
import * as React from "react";

/**
 * Next.js specific Server Side Wrapper
 */

export function SSCWrapper({
  children,
  tag,
  ...props
}: { children: ReactNode; tag?: keyof JSX.IntrinsicElements } & HTMLProps<HTMLElement>) {
  const dataTheme = cookies().get("data-theme")?.value || "";
  const Tag: keyof JSX.IntrinsicElements = tag || "div";
  return (
    // @ts-ignore -> svg props and html element props conflict
    <Tag data-theme={dataTheme} {...props}>
      {children}
    </Tag>
  );
}
