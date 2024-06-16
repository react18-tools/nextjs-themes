import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ThemeSwitcher } from "./theme-switcher";

describe.concurrent("theme-switcher", () => {
  afterEach(cleanup);

  test("Dummy test - test if renders without errors", ({ expect }) => {
    const clx = "my-class";
    render(<ThemeSwitcher />);
    expect(screen.getByTestId("theme-switcher").classList).toContain(clx);
  });
});
