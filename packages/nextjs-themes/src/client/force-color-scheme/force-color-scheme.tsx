"use client";
import * as React from "react";
import { useEffect } from "react";
import type { ColorSchemeType } from "../../store";
import { useTheme } from "../../store";

export function ForceColorScheme(props: { colorScheme: ColorSchemeType }) {
	const [setForcedColorScheme] = useTheme(state => [state.setForcedColorScheme]);
	useEffect(() => {
		setForcedColorScheme(props.colorScheme);
		return () => {
			setForcedColorScheme(undefined);
		};
	}, [props.colorScheme, setForcedColorScheme]);
	return null;
}
