import { act, cleanup, render, renderHook } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { useTheme } from "../../store";
import { ThemeSwitcher } from "./theme-switcher";

/** Test if proper data-theme is added to documentElement
 * concurrency is not feasible because of global store conflicts
 */
describe("theme-switcher", () => {
  afterEach(cleanup);

  test("Test first time load based on media query", async ({ expect }) => {
    window.media = "dark";
    await act(() => render(<ThemeSwitcher />));
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    window.media = "light";
    await act(() => render(<ThemeSwitcher />));
    expect(document.documentElement.getAttribute("data-theme")).toBe("");
  });

  test("Test defaultDark and defaultLight themes", async ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setDarkTheme("dark1"));
    act(() => result.current.setLightTheme("light1"));
    window.media = "dark";
    await act(() => render(<ThemeSwitcher />));
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark1");
    window.media = "light";
    await act(() => render(<ThemeSwitcher />));
    expect(document.documentElement.getAttribute("data-theme")).toBe("light1");
  });

  // colorScheme has higher preference
  test("test themes with colorScheme=''", async ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setColorSchemePref(""));
    act(() => result.current.setTheme("blue"));
    await act(() => render(<ThemeSwitcher />));
    expect(document.documentElement.getAttribute("data-theme")).toBe("blue");
  });

  test("test color scheme preference", async ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setColorSchemePref("light"));
    act(() => result.current.setLightTheme("yellow"));
    act(() => result.current.setTheme("blue"));
    await act(() => render(<ThemeSwitcher />));
    expect(document.documentElement.getAttribute("data-theme")).toBe("yellow");
    act(() => result.current.setDarkTheme("dark-blue"));
    act(() => result.current.setColorSchemePref("dark"));
    await act(() => render(<ThemeSwitcher />));
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark-blue");
  });

  test("test forcedTheme", async ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setForcedTheme("forced1"));
    act(() => result.current.setForcedColorScheme("dark"));
    act(() => result.current.setColorSchemePref("light"));
    act(() => result.current.setTheme("f1"));
    await act(() => render(<ThemeSwitcher />));
    expect(document.documentElement.getAttribute("data-theme")).toBe("forced1");
  });

  test("forced colorScheme only", async ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setForcedTheme(""));
    act(() => result.current.setForcedColorScheme("dark"));
    act(() => result.current.setColorSchemePref("light"));
    act(() => result.current.setTheme("f1"));
    act(() => result.current.setLightTheme("yellow"));
    act(() => result.current.setDarkTheme("black"));
    await act(() => render(<ThemeSwitcher />));
    expect(document.documentElement.getAttribute("data-theme")).toBe("");
    act(() => result.current.setForcedTheme(undefined));
    expect(document.documentElement.getAttribute("data-theme")).toBe("black");
  });

  test("forced theme prop", async ({ expect }) => {
    await act(() => render(<ThemeSwitcher forcedTheme="theme1" />));
    expect(document.documentElement.getAttribute("data-theme")).toBe("theme1");
  });

  test("forced colorScheme prop", async ({ expect }) => {
    // global state is continuing from previous testss
    await act(() => render(<ThemeSwitcher forcedColorScheme="light" />));
    expect(document.documentElement.getAttribute("data-theme")).toBe("");
  });
});
