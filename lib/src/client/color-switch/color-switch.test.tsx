import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ColorSwitch } from "./color-switch";

describe.concurrent("color-switch", () => {
	afterEach(cleanup);

	test("Dummy test - test if renders without errors", ({ expect }) => {
		const clx = "my-class";
		render(<ColorSwitch className={clx} />);
		expect(screen.getByTestId("color-switch").classList).toContain(clx);
	});
});
