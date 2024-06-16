import type { ColorSchemeType, ResolvedColorSchemeType } from "./types";

/** shared constants -- keep in separate files for better tree-shaking and dependency injection */
export const DEFAULT_ID: string = "nth-1";
export const LIGHT: ResolvedColorSchemeType = "light";
export const DARK: ResolvedColorSchemeType = "dark";
export const SYSTEM: ColorSchemeType = "system";
