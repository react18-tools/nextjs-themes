"use client";
import { ColorSwitch } from "nextjs-themes";
import { Switcher } from "nextjs-themes/switcher";
import { ThemeController } from "../theme-controller";

export function ScopedThemes() {
  const id = "scoped-themes";
  const targetSelector = `#${id}`;
  return (
    <div
      id={id}
      style={{ background: "var(--bg-color)", color: "var(--text-color)", textAlign: "center" }}>
      <h1>
        Apply themes locally using <code>targetSelector</code>
      </h1>
      <ColorSwitch targetSelector={targetSelector} />
      <Switcher targetSelector={targetSelector} themeTransition="all .5s" />
      <ThemeController targetSelector={targetSelector} />
    </div>
  );
}
