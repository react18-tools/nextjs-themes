import styles from "./page.module.css";
import { ThemeSelector } from "@repo/shared";

export default function Page() {
  return (
    <div className={styles.container}>
      <h1>Simple Multi Theme</h1>
      <hr />
      <p>
        This example demonstrates how to use <code>nextjs-themes</code> for simple multi-theme
        switching.
      </p>
      <ThemeSelector scope="" />
      <p>
        Ensure you set or force <code>colorSchemePreference</code> to an empty string{" "}
        <code>""</code>. Other values for the color scheme will cause <code>darkTheme</code> and{" "}
        <code>lightTheme</code> to be assigned as <code>resolvedTheme</code>.
      </p>
      <p>
        Another approach is to use <code>theme</code> instead of <code>resolvedTheme</code>. In CSS,
        this means using the <code>data-th</code> attribute instead of <code>data-theme</code>.
      </p>
    </div>
  );
}
