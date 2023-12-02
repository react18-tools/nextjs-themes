import "shared-ui/src/globals.css";
import { ThemeSwitcher } from "nextjs-themes";

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
