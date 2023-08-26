import { Inter } from "next/font/google";
import styles from "./page.module.css";
import ColorSchemePreference from "./ColorSchemePreference";
import DarkThemeSelector from "./DarkThemeSelector";
import ThemeSelector from "./ThemeSelector";
import LightThemeSelector from "./LightThemeSelector";
import PageNavigator from "./pageNavigator";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`${styles.main} ${inter.className}`}>
      <div className={styles.description}>
        <a
          href="https://github.com/mayank1513/nextjs-themes"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.logo}>
          <p>
            <code className={styles.code}>nextjs-themes</code>
          </p>
        </a>
        <div>
          <a href="https://mayank-chaudhari.vercel.app" target="_blank" rel="noopener noreferrer">
            By Mayank
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <div>
          <h1>
            Theme with <code>nextjs-themes</code>
          </h1>
          <p>Unleash the power of React Server Components!</p>
        </div>
      </div>

      <div className={[styles.center, styles.prefs].join(" ")}>
        <div>
          <ColorSchemePreference />
          <ThemeSelector />
        </div>
        <div>
          <DarkThemeSelector />
          <LightThemeSelector />
        </div>
      </div>

      <div className={styles.cards}>
        <PageNavigator />

        <a
          href="https://github.com/mayank1513/nextjs-themes"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer">
          <h2>
            More Examples <span>-&gt;</span>
          </h2>
          <p>Explore more examples on official GitHub Repo.</p>
        </a>
      </div>
    </main>
  );
}
