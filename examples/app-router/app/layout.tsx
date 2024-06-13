import type { ForcedPage } from "nextjs-themes/server";
import { NextJsSSGThemeSwitcher } from "nextjs-themes/server";
import { Inter } from "next/font/google";
import { SharedRootLayout, darkThemes, lightThemes } from "shared-ui";
import Link from "next/link";
import "nextjs-themes/src/styles.css";

const inter = Inter({ subsets: ["latin"] });
const forcedPages: ForcedPage[] = [
  { pathMatcher: /forced-color-scheme\/dark/, props: { forcedColorScheme: "dark" } },
  { pathMatcher: /forced-color-scheme\/light/, props: { forcedColorScheme: "light" } },
  ...[...darkThemes, ...lightThemes].map(
    theme => ({ pathMatcher: new RegExp(`themed-page/${theme}`), props: { forcedTheme: theme } }) as ForcedPage,
  ),
];

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body>
        <NextJsSSGThemeSwitcher forcedPages={forcedPages} />
        <SharedRootLayout LinkElement={Link} className={inter.className}>
          {children}
        </SharedRootLayout>
      </body>
    </html>
  );
}
