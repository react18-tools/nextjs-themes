import { RenderHookResult, act, cleanup, fireEvent, render, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, test } from "vitest";
import { useTheme } from "../../hooks";
import { ThemeSwitcher } from "./theme-switcher";
import { encodeState, getResolvedColorScheme, getResolvedTheme } from "../../utils";
import useRGS, { SetterArgType } from "r18gs";
import { DARK, DEFAULT_ID, LIGHT, ThemeStoreType, initialState } from "../../constants";

/**
 * -> concurrency is not feasible because of global store conflicts
 */
describe("theme-switcher", () => {
  afterEach(() => {
    cleanup();
  });

  let rgsHook: RenderHookResult<[ThemeStoreType, (val: SetterArgType<ThemeStoreType>) => void], unknown>;

  beforeEach(() => {
    render(<ThemeSwitcher />);
    rgsHook = renderHook(() => useRGS<ThemeStoreType>(DEFAULT_ID));
    act(() => rgsHook.result.current[1](initialState));
  });

  test("Test defaultLight theme", async ({ expect }) => {
    const lightTheme = "light1";
    /** simulate changing lightTheme by another component in useEffect */
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setLightTheme(lightTheme));
    /** await for the first time delay for setting state */
    await new Promise(res => setTimeout(res, 350));
    expect(getResolvedTheme()).toBe(lightTheme);
  });

  test("Test defaultDark theme", async ({ expect }) => {
    const darkTheme = "dark1";
    /** simulate system dark mode */
    act(() => rgsHook.result.current[1](state => ({ ...state, systemColorScheme: DARK })));
    /** simulate changing darkTheme by another component by user */
    await new Promise(res => setTimeout(res, 350));
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setDarkTheme(darkTheme));
    /** await for the first time delay for setting state */
    await new Promise(res => setTimeout(res, 250));
    expect(getResolvedTheme()).toBe(darkTheme);
  });

  // colorScheme has higher preference
  test("test themes with colorScheme=''", async ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setColorSchemePref(""));
    act(() => result.current.setTheme("blue"));
    await new Promise(res => setTimeout(res, 250));
    expect(getResolvedTheme()).toBe("blue");
  });

  test("test color scheme preference", async ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setColorSchemePref(LIGHT));
    act(() => result.current.setLightTheme("yellow"));
    act(() => result.current.setDarkTheme("dark-blue"));
    act(() => result.current.setTheme("blue"));
    await new Promise(res => setTimeout(res, 250));
    expect(getResolvedTheme()).toBe("yellow");
    act(() => result.current.setColorSchemePref(DARK));
    /** note we do not require to await second time -- ?? what is user is setting theme from multuple useEffects? */
    expect(getResolvedTheme()).toBe("dark-blue");
  });

  test("test forcedTheme", async ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setForcedTheme("forced1"));
    act(() => result.current.setForcedColorScheme("dark"));
    act(() => result.current.setColorSchemePref("light"));
    act(() => result.current.setTheme("f1"));
    await new Promise(res => setTimeout(res, 250));
    expect(getResolvedTheme()).toBe("forced1");
  });

  test("forced colorScheme only", async ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setForcedTheme(""));
    act(() => result.current.setForcedColorScheme("dark"));
    act(() => result.current.setColorSchemePref("light"));
    act(() => result.current.setTheme("f1"));
    act(() => result.current.setLightTheme("yellow"));
    act(() => result.current.setDarkTheme("black"));
    await new Promise(res => setTimeout(res, 250));
    expect(getResolvedTheme()).toBe("");
    act(() => result.current.setForcedTheme(undefined));
    expect(getResolvedTheme()).toBe("black");
    expect(getResolvedColorScheme()).toBe("dark");
  });

  test("Storage event", async ({ expect }) => {
    const hook = renderHook(() => useTheme());
    const MY_THEME = "my-theme-update";
    await act(() =>
      fireEvent(
        window,
        new StorageEvent("storage", { key: DEFAULT_ID, newValue: encodeState({ ...initialState, theme: MY_THEME }) }),
      ),
    );
    expect(hook.result.current.theme).toBe(MY_THEME);
  });
});

describe("theme-switcher with props", () => {
  afterEach(() => {
    cleanup();
  });

  let rgsHook: RenderHookResult<[ThemeStoreType, (val: SetterArgType<ThemeStoreType>) => void], unknown>;

  beforeEach(() => {
    rgsHook = renderHook(() => useRGS<ThemeStoreType>(DEFAULT_ID));
    act(() => rgsHook.result.current[1](initialState));
  });

  test("forced theme prop", async ({ expect }) => {
    await act(() => render(<ThemeSwitcher forcedTheme="theme1" />));
    expect(getResolvedTheme()).toBe("theme1");
  });

  test("forced colorScheme prop", async ({ expect }) => {
    // global state is continuing from previous testss
    await act(() => render(<ThemeSwitcher forcedColorScheme="light" />));
    expect(getResolvedColorScheme()).toBe("light");
  });
});
