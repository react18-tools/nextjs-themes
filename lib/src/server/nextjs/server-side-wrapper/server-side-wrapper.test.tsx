import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ServerSideWrapper } from "./server-side-wrapper";

describe.concurrent("server-side-wrapper", () => {
	afterEach(cleanup);

	test("Dummy test - test if renders without errors", ({ expect }) => {
		const clx = "my-class";
		render(<ServerSideWrapper className={clx} />);
		expect(screen.getByTestId("server-side-wrapper").classList).toContain(clx);
	});
});
