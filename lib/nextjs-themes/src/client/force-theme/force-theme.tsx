"use client";
import * as React from "react";
import { useEffect } from "react";
import { useTheme } from "../../hooks";

export function ForceTheme(props: { theme: string }) {
  const { setForcedTheme } = useTheme();
  useEffect(() => {
    setForcedTheme(props.theme);
    return () => {
      setForcedTheme(undefined);
    };
  }, [props.theme]);
  return null;
}
