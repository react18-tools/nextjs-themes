import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test, beforeEach } from "vitest";
import { NextJsSSGThemeSwitcher, ServerSideWrapper } from ".";

describe("server-side-target", () => {
  afterEach(cleanup);

  test("test default tag", ({ expect }) => {
    globalThis.cookies = {};
    render(<NextJsSSGThemeSwitcher />);
    expect(screen.getByTestId("server-side-target").tagName).toBe("DIV");
  });
  test("test default tag for ServerSideWrapper", ({ expect }) => {
    render(<ServerSideWrapper />);
    expect(screen.getByTestId("server-side-target").tagName).toBe("HTML");
  });
  test("test custom tag", ({ expect }) => {
    render(<NextJsSSGThemeSwitcher tag="main" />);
    expect(screen.getByTestId("server-side-target").tagName).toBe("MAIN");
  });
});
