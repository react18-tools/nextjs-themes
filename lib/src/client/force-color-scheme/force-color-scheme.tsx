"use client";
import { useEffect } from "react";
import { useForcedStore } from "../../store";
import { ColorSchemeType } from "../../types";

/** Force color scheme on a page */
export const ForceColorScheme = (props: { colorScheme: ColorSchemeType }) => {
  const [_, setState] = useForcedStore();
  useEffect(() => {
    setState(state => ({ ...state, fc: props.colorScheme }));
    return () => {
      setState(state => ({ ...state, fc: undefined }));
    };
  }, [props.colorScheme]);
  return null;
};
