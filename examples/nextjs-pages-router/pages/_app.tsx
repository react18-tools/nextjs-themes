import { AppProps } from "next/app";
import Link from "next/link";
import { ThemeSwitcher } from "nextjs-themes";
import PageNavigator from "../components/pageNavigator";
import "../global.css";

export default function App({ Component, pageProps }: AppProps & { Component: { theme?: string } }) {
  return (
    <>
      <ThemeSwitcher forcedTheme={Component.theme} />
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
        <Component {...pageProps} />
      </div>
    </>
  );
}
