"use client";
import * as React from "react";

import { useEffect } from "react";
import { ColorSchemeType, useTheme } from "../store";

export function ForceColorScheme(props: { colorScheme: ColorSchemeType }) {
  const [setForcedColorScheme] = useTheme(state => [state.setForcedColorScheme]);
  useEffect(() => {
    setForcedColorScheme(props.colorScheme);
    console.log(props);
    return () => {
      setForcedColorScheme("auto");
    };
  }, []);
  return <></>;
}
