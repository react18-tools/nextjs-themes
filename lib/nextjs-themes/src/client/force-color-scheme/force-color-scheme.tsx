"use client";
import * as React from "react";
import { useEffect } from "react";
import type { ColorSchemeType } from "../../constants";
import { useTheme } from "../../hooks";

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
