import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ForceColorScheme, ForceTheme, ThemeSwitcher } from "../src";

describe.concurrent("", () => {
  afterEach(cleanup);

  test("Force theme simple", ({ expect }) => {
    render(
      <>
        <ThemeSwitcher />
        <ForceTheme theme="red" />
      </>,
    );
    expect(document.documentElement.getAttribute("data-theme")).toBe("red");
  });

  test("Force theme with force color scheme - theme should prevail", ({ expect }) => {
    render(
      <>
        <ThemeSwitcher />
        <ForceTheme theme="red" />
        <ForceColorScheme colorScheme="dark" />
      </>,
    );
    expect(document.documentElement.getAttribute("data-theme")).toBe("red");
  });

  test("Force color scheme to dark", ({ expect }) => {
    render(
      <>
        <ThemeSwitcher />
        <ForceColorScheme colorScheme="dark" />
      </>,
    );
    /** defaultDark theme is dark */
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });

  test("Force color scheme to light", ({ expect }) => {
    render(
      <>
        <ThemeSwitcher />
        <ForceColorScheme colorScheme="light" />
      </>,
    );
    /** default light theme is "" */
    expect(document.documentElement.getAttribute("data-theme")).toBe("");
  });

  test("Force color scheme to system", ({ expect }) => {
    render(
      <>
        <ThemeSwitcher />
        <ForceColorScheme colorScheme="system" />
      </>,
    );
    /** matchMedia is light and default light theme is "" */
    expect(document.documentElement.getAttribute("data-theme")).toBe("");
  });
});
