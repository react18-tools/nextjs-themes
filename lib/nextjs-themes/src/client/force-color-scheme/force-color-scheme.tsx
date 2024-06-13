"use client";
import { useEffect } from "react";
import type { ColorSchemeType } from "../../constants";
import { useTheme } from "../../hooks";

/** Force color scheme on a page */
export const ForceColorScheme = (props: { colorScheme: ColorSchemeType }) => {
  const { setForcedColorScheme } = useTheme();
  useEffect(() => {
    setForcedColorScheme(props.colorScheme);
    return () => {
      setForcedColorScheme(undefined);
    };
  }, [props.colorScheme]);
  return null;
};
