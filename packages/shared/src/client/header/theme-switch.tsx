"use client";

import { useTheme } from "nextjs-themes/hooks";
import { ColorSwitch } from "nextjs-themes/color-switch";
import styles from "./header.module.scss";

/** This is a wrapper around `nextjs-themes's ColorSwitch component to improve mobile view. */
export default function ThemeSwitch(): JSX.Element {
  const { colorSchemePref } = useTheme();
  return (
    <div className={styles.themeswitch}>
      <span className="mb" suppressHydrationWarning>
        {colorSchemePref}
      </span>
      <ColorSwitch />
    </div>
  );
}
