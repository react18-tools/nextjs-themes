import Link from "next/link";
import "./global.css";
import { ThemeSwitcher } from "nextjs-themes";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeSwitcher />

        <div className="container">
          <header>
            <Link href="/">
              <h1>🏡</h1>
            </Link>{" "}
            <h1>Advanced Multi Theme</h1>
          </header>
          <p>
            <Link href="/dark">Dark Page</Link>
          </p>
          <hr />
          {children}
        </div>
      </body>
    </html>
  );
}
