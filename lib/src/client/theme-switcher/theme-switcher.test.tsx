import {
  RenderHookResult,
  act,
  cleanup,
  fireEvent,
  render,
  renderHook,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, test } from "vitest";
import { useTheme } from "../../hooks";
import { ThemeSwitcher } from "./theme-switcher";
import { useRGS, SetterArgType } from "r18gs";
import { DARK, DEFAULT_ID, LIGHT } from "../../constants";
import { noFOUCScript } from "./no-fouc";
import { initialState, ThemeStoreType, useThemeStore } from "../../store";

const MEDIA = "(prefers-color-scheme: dark)";
const storageKey = `#${DEFAULT_ID}`;

/** get dom attribute */
const getResolvedTheme = () => {
  const theme = document.documentElement.getAttribute("data-theme");
  return theme;
};

/**
 * -> concurrency is not feasible because of global store conflicts
 */
describe("theme-switcher", () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    noFOUCScript(storageKey, initialState);
    render(<ThemeSwitcher />);
  });

  test("Test defaultLight theme", async ({ expect }) => {
    const lightTheme = "light1";
    /** simulate changing lightTheme by another component in useEffect */
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setLightTheme(lightTheme));
    /** await for the first time delay for setting state */
    expect(getResolvedTheme()).toBe(lightTheme);
  });

  test.only("Test defaultDark theme", async ({ expect }) => {
    const darkTheme = "dark1";
    /** simulate changing darkTheme by another component by user */
    const { result } = renderHook(() => useTheme());
    /** simulate system dark mode */
    act(() => result.current.setTheme(DARK));
    act(() => result.current.setDarkTheme(darkTheme));
    /** await for the first time delay for setting state */
    expect(getResolvedTheme()).toBe(darkTheme);
  });

  // colorScheme has higher preference
  test("test themes with colorScheme=''", async ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setColorSchemePref(""));
    act(() => result.current.setTheme("blue"));
    expect(getResolvedTheme()).toBe("blue");
  });

  test("test color scheme preference", async ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setColorSchemePref(LIGHT));
    act(() => result.current.setLightTheme("yellow"));
    act(() => result.current.setDarkTheme("dark-blue"));
    act(() => result.current.setTheme("blue"));
    expect(getResolvedTheme()).toBe("yellow");
    act(() => result.current.setColorSchemePref(DARK));
    expect(getResolvedTheme()).toBe("dark-blue");
  });

  test("Storage event", async ({ expect }) => {
    const MY_THEME = "my-theme-update";
    const hook = renderHook(() => useTheme());
    await act(() =>
      fireEvent(
        window,
        new StorageEvent("storage", {
          key: DEFAULT_ID,
          newValue: JSON.stringify({ ...initialState, t: MY_THEME }),
        }),
      ),
    );
    console.log("--->", hook.result.current);
    expect(hook.result.current.theme).toBe(MY_THEME);
  });
});

describe("theme-switcher with props", () => {
  afterEach(() => {
    cleanup();
  });

  let rgsHook: RenderHookResult<
    [ThemeStoreType, (val: SetterArgType<ThemeStoreType>) => void],
    unknown
  >;

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
    expect(getResolvedTheme()).toBe("");
  });

  // test("media change event", async ({ expect }) => {
  //   await act(() => render(<ThemeSwitcher />));
  //   await act(() => {
  //     // globalThis.window.media = LIGHT as ResolvedScheme;
  //     matchMedia(MEDIA).onchange?.();
  //   });
  //   expect(getResolvedTheme()).toBe(DARK);
  // });
});
