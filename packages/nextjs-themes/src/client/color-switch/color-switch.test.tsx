import { act, cleanup, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { ColorSwitch } from "./color-switch";
import { useTheme } from "../../store";

describe("color-switch", () => {
  afterEach(cleanup);

  test("color-scheme-toggle", ({ expect }) => {
    const hook = renderHook(() => useTheme());
    render(<ColorSwitch />);
    const element = screen.getByTestId("color-switch");
    act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePref).toBe("dark");
    act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePref).toBe("light");
    act(() => fireEvent.click(element));
    expect(hook.result.current.colorSchemePref).toBe("system");
  });
});
