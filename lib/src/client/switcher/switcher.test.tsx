import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { Switcher } from "./switcher";

describe.concurrent("switcher", () => {
	afterEach(cleanup);

	test("Dummy test - test if renders without errors", ({ expect }) => {
		const clx = "my-class";
		render(<Switcher className={clx} />);
		expect(screen.getByTestId("switcher").classList).toContain(clx);
	});
});
