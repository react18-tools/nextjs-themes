import "@repo/shared/dist/index.css";
import "@repo/shared/dist/global.css";
import { ThemeSwitcher } from "nextjs-themes";

/** Layout colorScheme is forced to '' to ensure theme is resolved and not darkTheme and lightTheme.*/
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeSwitcher forcedColorScheme="" />
        <main>{children}</main>
      </body>
    </html>
  );
}
