"use client";
import * as React from "react";
import { useEffect } from "react";
import { useTheme } from "../../store";

export function ForceTheme(props: { theme: string }) {
  const [setForcedTheme] = useTheme(state => [state.setForcedTheme]);
  useEffect(() => {
    setForcedTheme(props.theme);
    return () => {
      setForcedTheme(undefined);
    };
  }, [props.theme, setForcedTheme]);
  return null;
}
