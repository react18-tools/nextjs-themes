import { act, cleanup, render, renderHook } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { useTheme } from "../../hooks";
import { ForceColorScheme } from "./force-color-scheme";

describe.concurrent("force-color-scheme", () => {
  afterEach(cleanup);
  /** Test only the things that this component is responsible for - chanding state*/
  test("Force theme with force color scheme", async ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setForcedColorScheme("light"));
    const { unmount } = await act(() => render(<ForceColorScheme colorScheme="dark" />));
    expect(result.current.forcedColorScheme).toBe("dark");
    act(() => unmount());
    expect(result.current.forcedColorScheme).toBe(undefined);
  });
});
