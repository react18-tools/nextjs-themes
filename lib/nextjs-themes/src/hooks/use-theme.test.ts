import { act, renderHook } from "@testing-library/react";
import { describe, test } from "vitest";
import { useTheme } from "./use-theme";

describe("use-theme", () => {
  test("setThemeSet", ({ expect }) => {
    const hook = renderHook(() => useTheme());
    act(() => hook.result.current.setThemeSet({ darkTheme: "dark-1", lightTheme: "light-1" }));
    expect(hook.result.current.darkTheme).toBe("dark-1");
  });
});
