import { act, cleanup, render, renderHook } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { useTheme } from "../../hooks";
import { ForceColorScheme } from "./force-color-scheme";
import { DARK, LIGHT } from "../../constants";

describe.concurrent("force-color-scheme", () => {
  afterEach(cleanup);
  /** Test only the things that this component is responsible for - chanding state*/
  test("Force theme with force color scheme", async ({ expect }) => {
    const { result } = renderHook(() => useTheme());
    act(() => result.current.setForcedColorScheme(LIGHT));
    const { unmount } = await act(() => render(<ForceColorScheme colorScheme={DARK} />));
    expect(result.current.forcedColorScheme).toBe(DARK);
    act(() => unmount());
    expect(result.current.forcedColorScheme).toBe(undefined);
  });
});
