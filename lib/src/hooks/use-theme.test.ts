import { cleanup, renderHook, act } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { useTheme } from "./use-theme";

describe.concurrent("useTheme", () => {
	afterEach(cleanup);

	test("Dummy test - test if renders without errors", ({ expect }) => {
		const { result } = renderHook(() => useTheme());
    act(() => result.current.setValue(10));
    expect(result.current.value).toBe(10);
	});
});

