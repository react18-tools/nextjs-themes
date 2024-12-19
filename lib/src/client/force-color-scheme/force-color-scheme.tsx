"use client";
import { useEffect } from "react";
import { useThemeStore } from "../../store";
import { ColorSchemeType } from "../../types";

/** Force color scheme on a page */
export const ForceColorScheme = (props: {
  colorScheme: ColorSchemeType;
  targetSelector?: string;
}) => {
  const [_, setState] = useThemeStore(props.targetSelector);
  useEffect(() => {
    setState(state => ({ ...state, fc: props.colorScheme }));
    return () => {
      setState(state => ({ ...state, fc: undefined }));
    };
  }, [props.colorScheme]);
  return null;
};
