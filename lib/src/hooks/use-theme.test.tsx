import { cleanup, renderHook, act, render } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { useTheme } from "./use-theme";
import { DARK, DEFAULT_ID } from "../constants";
import { noFOUCScript } from "../client/theme-switcher/no-fouc";
import { initialState } from "../store";
import { ThemeSwitcher } from "../client/theme-switcher";

const storageKey = `#${DEFAULT_ID}`;

describe.concurrent("useTheme", () => {
  afterEach(cleanup);

  test("test if renders without errors", ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setColorSchemePref(DARK));
    expect(result.current.colorSchemePref).toBe(DARK);
  });

  test("test setting forcedColorScheme", ({ expect }) => {
    noFOUCScript(storageKey, initialState);
    render(<ThemeSwitcher />);
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setForcedColorScheme(DARK));
    expect(document.documentElement.classList).toContain(DARK);
  });
});
