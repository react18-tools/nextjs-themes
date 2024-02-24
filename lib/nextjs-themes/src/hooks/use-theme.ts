import useRGS from "r18gs";
import { DEFAULT_ID, ThemeStoreType, initialState } from "../constants";

export function useTheme(targetId?: string) {
  const [themeState, setThemeState] = useRGS<ThemeStoreType>(targetId ?? DEFAULT_ID, initialState);
}