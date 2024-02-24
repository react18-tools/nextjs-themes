"use client";
import * as React from "react";
import { useEffect } from "react";
import type { ColorSchemeType } from "../../constants";
import { useTheme } from "../../hooks";

export function ForceColorScheme(props: { colorScheme: ColorSchemeType }) {
  const { setForcedColorScheme } = useTheme();
  useEffect(() => {
    setForcedColorScheme(props.colorScheme);
    return () => {
      setForcedColorScheme(undefined);
    };
  }, [props.colorScheme, setForcedColorScheme]);
  return null;
}
