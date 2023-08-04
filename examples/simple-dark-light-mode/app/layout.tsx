import "./global.css";
import { ThemeSwitcher } from "nextjs-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeSwitcher />
        {children}
      </body>
    </html>
  );
}
