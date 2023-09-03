import * as React from "react";
import { useEffect } from "react";
import type { ColorSchemeType } from "../../store";
import { useTheme } from "../../store";

export function ThemeSwitcher(props: {
	forcedTheme?: string;
	forcedColorScheme?: ColorSchemeType;
}) {
	const [theme, darkTheme, lightTheme, colorSchemePref, _forcedTheme, _forcedColorScheme] =
		useTheme(state => [
			state.theme,
			state.darkTheme,
			state.lightTheme,
			state.colorSchemePref,
			state.forcedTheme,
			state.forcedColorScheme,
		]);

	const forcedTheme = props.forcedTheme === undefined ? _forcedTheme : props.forcedTheme;
	const forcedColorScheme =
		props.forcedColorScheme === undefined ? _forcedColorScheme : props.forcedColorScheme;
	const colorScheme = forcedColorScheme === undefined ? colorSchemePref : forcedColorScheme;
	useEffect(() => {
		const media = matchMedia("(prefers-color-scheme: dark)");
		const updateTheme = () => {
			const restoreTransitions = disableAnimation();
			let newTheme;
			if (forcedTheme !== undefined) {
				newTheme = forcedTheme;
			} else {
				switch (colorScheme) {
					case "system":
						newTheme = media.matches ? darkTheme : lightTheme;
						break;
					case "dark":
						newTheme = darkTheme;
						break;
					case "light":
						newTheme = lightTheme;
						break;
					default:
				}
			}
			newTheme = newTheme === undefined ? theme : newTheme;
			document.documentElement.setAttribute("data-theme", newTheme);
			/** do not create cookie for forced page as they will interfere with normal prefs */
			if (!forcedColorScheme && forcedTheme === undefined)
				document.cookie = `data-theme=${newTheme}`;
			document.cookie = `data-theme-dark=${darkTheme}`;
			document.cookie = `data-theme-light=${lightTheme}`;
			document.cookie = `data-color-scheme=${media.matches ? "dark" : "light"}`;
			restoreTransitions();
		};
		media.addEventListener("change", updateTheme);
		updateTheme();
		return () => {
			media.removeEventListener("change", updateTheme);
		};
	}, [theme, darkTheme, lightTheme, forcedTheme, colorSchemePref, colorScheme, forcedColorScheme]);

	return null;
}

// todo: customizable transition time
const disableAnimation = () => {
	const css = document.createElement("style");
	css.appendChild(
		document.createTextNode(
			`*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
		),
	);
	document.head.appendChild(css);

	return () => {
		// Force restyle
		(() => window.getComputedStyle(document.body))();
		// Wait for next tick before removing
		setTimeout(() => {
			document.head.removeChild(css);
		}, 1);
	};
};
