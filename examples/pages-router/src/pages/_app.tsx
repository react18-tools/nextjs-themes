import * as React from "react";
import { AppProps } from "next/app";
import { ColorSchemeType, ThemeSwitcher } from "nextjs-themes";
import { Layout } from "@repo/shared/dist/server";
import "../styles/global.css";
import { Inter } from "next/font/google";
import { Header } from "@repo/shared";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

type _AppProps = AppProps & { Component: { theme?: string; colorScheme?: ColorSchemeType } };

export default function App({ Component, pageProps }: _AppProps) {
  const { theme, colorScheme } = Component;
  return (
    <div className={inter.className}>
      <ThemeSwitcher forcedColorScheme={colorScheme} forcedTheme={theme} />
      <Layout>
        <Header linkComponent={Link} />
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
