import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ForceTheme } from "./force-theme";

describe.concurrent("force-theme", () => {
	afterEach(cleanup);

	test("Dummy test - test if renders without errors", ({ expect }) => {
		const clx = "my-class";
		render(<ForceTheme className={clx} />);
		expect(screen.getByTestId("force-theme").classList).toContain(clx);
	});
});
