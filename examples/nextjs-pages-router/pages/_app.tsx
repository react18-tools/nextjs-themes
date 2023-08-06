import { AppProps } from "next/app";
import Link from "next/link";
import { ThemeSwitcher, ColorSchemeType } from "nextjs-themes";
import PageNavigator from "../components/pageNavigator";
import "../global.css";

type _AppProps = AppProps & { Component: { theme?: string; colorScheme?: ColorSchemeType } };

export default function App({ Component, pageProps }: _AppProps) {
  return (
    <>
      <ThemeSwitcher forcedTheme={Component.theme} forcedColorScheme={Component.colorScheme} />
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
