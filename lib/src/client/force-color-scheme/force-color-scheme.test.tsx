import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, test } from "vitest";
import { ForceColorScheme } from "./force-color-scheme";
import { DARK, DEFAULT_ID } from "../../constants";
import { ThemeSwitcher } from "../theme-switcher";
import { noFOUCScript } from "../theme-switcher/no-fouc";
import { initialState } from "../../store";

const key = `#${DEFAULT_ID}`;
describe.concurrent("force-color-scheme", () => {
  afterEach(cleanup);
  /** Test only the things that this component is responsible for - chanding state*/
  test("Force theme with force color scheme", async ({ expect }) => {
    noFOUCScript(key, initialState);
    await render(<ThemeSwitcher />);
    await render(<ForceColorScheme colorScheme={DARK} />);
    expect(document.documentElement.classList).toContain(DARK);
  });
});
