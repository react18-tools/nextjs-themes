import "@repo/shared/dist/index.css";
import { ThemeSwitcher } from "nextjs-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeSwitcher />
        <main>{children}</main>
      </body>
    </html>
  );
}
