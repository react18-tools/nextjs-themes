import { act, cleanup, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { ColorSwitch } from "./color-switch";
import { useTheme } from "../../hooks";
import { afterEach, describe, test } from "vitest";
import { DARK, LIGHT, SYSTEM } from "../../constants";

describe("color-switch", () => {
  afterEach(cleanup);

  test("color-scheme-toggle", ({ expect }) => {
    const hook = renderHook(() => useTheme());
    act(() => hook.result.current.setColorSchemePref(""));
    render(<ColorSwitch />);
    const element = screen.getByTestId("color-switch");
    act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePref).toBe(SYSTEM);
    act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePref).toBe(DARK);
    act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePref).toBe(LIGHT);
    act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePref).toBe(SYSTEM);
    act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePref).toBe(DARK);
  });
});
