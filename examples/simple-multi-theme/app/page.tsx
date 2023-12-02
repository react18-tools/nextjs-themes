import ThemeSelector from "./ThemeSelector";
import styles from "./page.module.css";

export default function Page() {
  return (
    <div className={styles.container}>
      <h1>Simple Multi Theme</h1>
      <hr />
      <p>
        Example showing how to use <code>nextjs-themes</code> to implement simple multi theme switching
      </p>
      <ThemeSelector />
    </div>
  );
}
