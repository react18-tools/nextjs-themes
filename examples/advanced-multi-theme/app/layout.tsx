import { ForkMe } from "@mayank1513/fork-me/server";
import "./globals.css";
import { ThemeSwitcher } from "nextjs-themes";
import type { ForcedPage } from "nextjs-themes/server";
import { ServerSideWrapper } from "nextjs-themes/server";
import { darkThemes, lightThemes } from "./themes";
import { Inter } from "next/font/google";
import styles from "./page.module.css";
import { StarMe } from "@mayank1513/fork-me";
import ColorSchemePreference from "./color-scheme-preference";
import ThemeSelector from "./theme-selector";
import DarkThemeSelector from "./dark-theme-selector";
import LightThemeSelector from "./light-theme-selector";
import PageNavigator from "./page-navigator";

const inter = Inter({ subsets: ["latin"] });
const forcedPages: ForcedPage[] = [
  [/forced-color-scheme\/dark/, { colorScheme: "dark" }],
  [/forced-color-scheme\/light/, { colorScheme: "light" }],
  ...[...darkThemes, ...lightThemes].map(th => [new RegExp(`themed-page/${th}`), { theme: "light" }] as ForcedPage),
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ServerSideWrapper forcedPages={forcedPages} lang="en">
      <body>
        <ThemeSwitcher />
        <div className="container">
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
              {children}
              <div>
                <a href="https://mayank-chaudhari.vercel.app" target="_blank" rel="noopener noreferrer">
                  By Mayank
                </a>
              </div>
            </div>

            <div className={styles.center}>
              <div>
                <h1>
                  Build with <code>nextjs-themes</code>
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
              <StarMe gitHubUrl="https://github.com/mayank1513/nextjs-themes" className={styles.card}>
                <h2>
                  Star this repo <span>-&gt;</span>
                </h2>
                <p>Star this repo for your new library!</p>
              </StarMe>
            </div>
          </main>
        </div>
        <footer>
          with 💖 by{" "}
          <a href="https://mayank-chaudhari.vercel.app" target="_blank" rel="noopener noreferrer">
            Mayank Chaudhari
          </a>
        </footer>
        <ForkMe
          gitHubUrl="https://github.com/mayank1513/nextjs-themes"
          bgColor="var(--text-color)"
          textColor="var(--bg-color)"
        />
      </body>
    </ServerSideWrapper>
  );
}
