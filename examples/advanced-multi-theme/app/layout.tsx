import Link from "next/link";
import "./global.css";
import { ThemeSwitcher } from "nextjs-themes";
import { SSCWrapper } from "nextjs-themes/dist/server/nextjs";
import PageNavigator from "./pageNavigator";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SSCWrapper tag="html" lang="en">
      <body>
        <ThemeSwitcher />
        <div className="container">
          <header>
            <Link href="/">
              <h1>🏡</h1>
            </Link>{" "}
            <h1>Advanced Multi Theme Example</h1>
          </header>
          <p>
            Example showing how to use <code>nextjs-themes</code> to implement multi theme switching
          </p>
          <PageNavigator />
          <hr />
          {children}
        </div>
      </body>
    </SSCWrapper>
  );
}
