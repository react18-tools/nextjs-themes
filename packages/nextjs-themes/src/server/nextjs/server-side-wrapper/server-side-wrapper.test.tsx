import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ServerSideWrapper } from "./server-side-wrapper";

describe("server-side-wrapper", () => {
	afterEach(cleanup);

	test.concurrent("test tag", ({ expect }) => {
		render(
			<ServerSideWrapper>
				<body>ServerSideWrapper</body>
			</ServerSideWrapper>,
		);
		expect(screen.getByTestId("server-side-wrapper").tagName).toBe("HTML");
	});
	test.concurrent("test custom tag", ({ expect }) => {
		render(<ServerSideWrapper tag="div">ServerSideWrapper</ServerSideWrapper>);
		expect(screen.getByTestId("server-side-wrapper").tagName).toBe("DIV");
	});
	test.concurrent("forced theme", ({ expect }) => {
		globalThis.path = "/themed-page/dark1";
		render(
			<ServerSideWrapper tag="div" forcedPages={[[/themed-page\/dark1/, { theme: "dark1" }]]}>
				ServerSideWrapper
			</ServerSideWrapper>,
		);
		expect(screen.getByTestId("server-side-wrapper").getAttribute("data-theme")).toBe("dark1");
	});

	/** test cookies and forced pages */
	globalThis.cookies = {
		"data-theme-dark": { value: "dark-blue" },
		"data-theme-light": { value: "light-yellow" },
		"data-theme": { value: "yellow" },
		"data-color-scheme": { value: "dark" },
	};
	test("forced color scheme dark", ({ expect }) => {
		globalThis.path = "/forced-color-scheme/dark";
		render(
			<ServerSideWrapper
				tag="div"
				forcedPages={[[/forced-color-scheme\/dark/, { colorScheme: "dark" }]]}>
				ServerSideWrapper
			</ServerSideWrapper>,
		);
		expect(screen.getByTestId("server-side-wrapper").getAttribute("data-theme")).toBe("dark-blue");
	});
	test("forced color scheme light", ({ expect }) => {
		globalThis.path = "/forced-color-scheme/light";
		render(
			<ServerSideWrapper
				tag="div"
				forcedPages={[[/forced-color-scheme\/light/, { colorScheme: "light" }]]}>
				ServerSideWrapper
			</ServerSideWrapper>,
		);
		expect(screen.getByTestId("server-side-wrapper").getAttribute("data-theme")).toBe(
			"light-yellow",
		);
	});
	test("forced color scheme system", ({ expect }) => {
		globalThis.path = "/forced-color-scheme/system";
		render(
			<ServerSideWrapper
				tag="div"
				forcedPages={[[/forced-color-scheme\/system/, { colorScheme: "system" }]]}>
				ServerSideWrapper
			</ServerSideWrapper>,
		);
		expect(screen.getByTestId("server-side-wrapper").getAttribute("data-theme")).toBe("dark-blue");
	});
	test("force disable color scheme", ({ expect }) => {
		globalThis.path = "/forced-color-scheme";
		render(
			<ServerSideWrapper tag="div" forcedPages={[[/forced-color-scheme$/, { colorScheme: "" }]]}>
				ServerSideWrapper
			</ServerSideWrapper>,
		);
		expect(screen.getByTestId("server-side-wrapper").getAttribute("data-theme")).toBe("yellow");
	});
	/** forced page but no cookies */
	test("force disable color scheme", ({ expect }) => {
		globalThis.cookies = {};
		globalThis.path = "/forced-color-scheme";
		render(
			<ServerSideWrapper tag="div" forcedPages={[[/forced-color-scheme$/, { colorScheme: "" }]]}>
				ServerSideWrapper
			</ServerSideWrapper>,
		);
		expect(screen.getByTestId("server-side-wrapper").getAttribute("data-theme")).toBe("");
	});
});
