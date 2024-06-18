"use client";
import { useEffect } from "react";
import { useForcedStore } from "../../store";

/** Force theme on a page */
export const ForceTheme = (props: { theme: string }) => {
  const [_, setState] = useForcedStore();
  useEffect(() => {
    setState(state => ({ ...state, f: props.theme }));
    return () => {
      setState(state => ({ ...state, f: undefined }));
    };
  }, [props.theme]);
  return null;
};
