"use client";
import type { ColorSchemeType } from "nextjs-themes";
import { useTheme } from "nextjs-themes/hooks";
import type { ChangeEvent } from "react";
import { Select } from "../select";
import styles from "./theme-controller.module.scss";

const colorSchemes: ColorSchemeType[] = ["", "system", "light", "dark"];

export function ColorSchemePreference() {
  const { colorSchemePref, setColorSchemePref } = useTheme();
  const handleChange: (e: ChangeEvent<HTMLSelectElement>) => void = e =>
    setColorSchemePref(e.target.value as ColorSchemeType);

  return (
    <p>
      ColorScheme Preference{" "}
      <Select
        className={styles.active}
        onChange={handleChange}
        options={colorSchemes}
        value={colorSchemePref}
      />
    </p>
  );
}
