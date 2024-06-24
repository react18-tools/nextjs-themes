"use client";
import { ThemeController } from "@repo/shared";
import { ThemeSwitcher } from "nextjs-themes";
import styles from "./scoped-themes.module.scss";

export default function ScopedThemes() {
  const id = "scoped-themes";
  const targetSelector = `#${id}`;
  return (
    <div id={id} style={{ background: `var(--bg-color)`, color: `var(--text-color)` }}>
      <ThemeSwitcher targetSelector={targetSelector} themeTransition="all .5s" />
      <ThemeController targetSelector={targetSelector} />
    </div>
  );
}
