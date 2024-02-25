"use client";
import type { ColorSchemeType } from "nextjs-themes";
import { useTheme } from "nextjs-themes";
import type { ChangeEvent } from "react";
import { Select } from "../common/select";
import styles from "../root-layout.module.css";

const colorSchemes: ColorSchemeType[] = ["", "system", "light", "dark"];

export function ColorSchemePreference() {
  const { colorSchemePref, setColorSchemePref } = useTheme();
  const handleChange: (e: ChangeEvent<HTMLSelectElement>) => void = e =>
    setColorSchemePref(e.target.value as ColorSchemeType);

  return (
    <p>
      ColorScheme Preference{" "}
      <Select className={styles.active} onChange={handleChange} options={colorSchemes} value={colorSchemePref} />
    </p>
  );
}
