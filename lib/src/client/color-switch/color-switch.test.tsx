import { act, cleanup, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { ColorSwitch } from "./color-switch";
import { useTheme } from "../../hooks";
import { afterEach, describe, test } from "vitest";
import { DARK, DEFAULT_ID, LIGHT, SYSTEM } from "../../constants";
import { noFOUCScript } from "../theme-switcher/no-fouc";
import { initialState } from "../../store";

describe("color-switch", () => {
  afterEach(cleanup);

  test("color-scheme-toggle", ({ expect }) => {
    noFOUCScript(`#${DEFAULT_ID}`, initialState);
    const hook = renderHook(() => useTheme());
    act(() => hook.result.current.setColorSchemePref(""));

    render(<ColorSwitch />);
    const element = screen.getByTestId("color-switch");
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
