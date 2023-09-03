import type { HTMLProps, ReactNode } from "react";
import { cookies, headers } from "next/headers";
import * as React from "react";
import type { ColorSchemeType } from "../../../store";

export type ForcedPage = [
	pathMatcher: RegExp | string,
	themes: { theme?: string; colorScheme?: ColorSchemeType },
];

type ServerSideWrapperProps = {
	children: ReactNode;
	tag?: keyof JSX.IntrinsicElements;
	forcedPages?: ForcedPage[];
} & HTMLProps<HTMLElement>;

/**
 * # ServerSideWrapper
 * Server side wrapper for Next.js to replace &#x60;html&#x60; tag
 */
export function ServerSideWrapper({
	children,
	tag,
	forcedPages,
	...props
}: ServerSideWrapperProps) {
	const Tag: keyof JSX.IntrinsicElements = tag || "html";
	const dataTheme = cookies().get("data-theme")?.value || "";
	const path = headers().get("x-invoke-path");
	let theme;
	if (forcedPages) {
		const dataThemeDark = cookies().get("data-theme-dark")?.value || "";
		const dataThemeLight = cookies().get("data-theme-light")?.value || "";
		const dataColorScheme = cookies().get("data-color-scheme")?.value || "";
		for (const f of forcedPages) {
			if (path?.match(f[0])) {
				if (f[1].theme) {
					theme = f[1].theme;
				} else if (f[1].colorScheme === "") {
					theme = dataTheme;
				} else {
					const colorScheme = f[1].colorScheme === "system" ? dataColorScheme : f[1].colorScheme;
					theme = colorScheme === "dark" ? dataThemeDark : dataThemeLight;
				}
			}
		}
	}
	return (
		// @ts-expect-error -> svg props and html element props conflict
		<Tag
			data-theme={theme === undefined ? dataTheme : theme}
			{...props}
			data-testid="server-side-wrapper">
			{children}
		</Tag>
	);
}
