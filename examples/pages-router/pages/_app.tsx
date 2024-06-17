import * as React from "react";
import { AppProps } from "next/app";
import { ColorSchemeType, ThemeSwitcher } from "nextjs-themes";
import { Layout } from "@repo/shared/dist/server";

type _AppProps = AppProps & { Component: { theme?: string; colorScheme?: ColorSchemeType } };

export default function App({ Component, pageProps }: _AppProps) {
  const { theme, colorScheme } = Component;
  return (
    <Layout>
      <ThemeSwitcher forcedColorScheme={colorScheme} forcedTheme={theme} />
      <Component {...pageProps} />
    </Layout>
  );
}
