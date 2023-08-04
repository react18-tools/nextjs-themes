import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import TestUtil from "./TestThemeSwitch";
import { ForceColorScheme } from "../src";

describe("Non concurent tests", () => {
  afterEach(cleanup);
  const themes = ["red", "blue", "green"];

  test("Switch theme with hooks", async ({ expect }) => {
    render(<TestUtil themes={themes} />);
    expect(document.documentElement.getAttribute("data-theme")).toBe("");
    for (let th of themes) {
      await fireEvent.click(screen.getByTestId(`th-${th}`));
      expect(document.documentElement.getAttribute("data-theme")).toBe(th);
    }
  });

  test("Switch default theme with hooks", async ({ expect }) => {
    render(<TestUtil themes={themes} />);
    expect(document.documentElement.getAttribute("data-theme")).toBe("");
    for (let th of themes) {
      await fireEvent.click(screen.getByTestId(`default-th-${th}`));
      expect(document.documentElement.getAttribute("data-theme")).toBe(th);
    }
  });

  test("Switch default dark theme with hooks", async ({ expect }) => {
    render(
      <>
        <TestUtil themes={themes} />
        <ForceColorScheme colorScheme="dark" />
      </>,
    );
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    for (let th of themes) {
      await fireEvent.click(screen.getByTestId(`default-dark-th-${th}`));
      expect(document.documentElement.getAttribute("data-theme")).toBe(th);
    }
  });

  test("Switch default light theme with hooks", async ({ expect }) => {
    render(
      <>
        <TestUtil themes={themes} />
        <ForceColorScheme colorScheme="light" />
      </>,
    );
    expect(document.documentElement.getAttribute("data-theme")).toBe("");
    for (let th of themes) {
      await fireEvent.click(screen.getByTestId(`default-light-th-${th}`));
      expect(document.documentElement.getAttribute("data-theme")).toBe(th);
    }
  });
});
