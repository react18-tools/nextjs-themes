import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ForceColorScheme } from "./force-color-scheme";

describe.concurrent("force-color-scheme", () => {
	afterEach(cleanup);

	test("Dummy test - test if renders without errors", ({ expect }) => {
		const clx = "my-class";
		render(<ForceColorScheme className={clx} />);
		expect(screen.getByTestId("force-color-scheme").classList).toContain(clx);
	});
});
