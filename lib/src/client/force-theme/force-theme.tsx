"use client";
import { useEffect } from "react";
import { useThemeStore } from "../../store";

/** Force theme on a page */
export const ForceTheme = (props: { theme: string; targetSelector?: string }) => {
  const [_, setState] = useThemeStore(props.targetSelector);
  useEffect(() => {
    setState(state => ({ ...state, f: props.theme }));
    return () => {
      setState(state => ({ ...state, f: undefined }));
    };
  }, [props.theme]);
  return null;
};
