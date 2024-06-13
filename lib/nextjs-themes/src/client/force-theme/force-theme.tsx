"use client";
import { useEffect } from "react";
import { useTheme } from "../../hooks";

/** Force theme on a page */
export const ForceTheme = (props: { theme: string }) => {
  const { setForcedTheme } = useTheme();
  useEffect(() => {
    setForcedTheme(props.theme);
    return () => {
      setForcedTheme(undefined);
    };
  }, [props.theme]);
  return null;
};
