import * as React from "react";
import { AppProps } from "next/app";
import { ColorSchemeType, ThemeSwitcher } from "nextjs-themes";
import { CardProps, Layout } from "@repo/shared/dist/server";
import "../styles/global.css";
import { Inter } from "next/font/google";
import { Header } from "@repo/shared";
import Link from "next/link";
import { Card, Cards, LandingPage } from "@repo/shared/dist/server";
import { ThemeController, PageNavigatorCard } from "@repo/shared";
import { ColorSwitch } from "nextjs-themes/color-switch";
import ScopedThemes from "@repo/shared/dist/client/scoped-theme/scoped-theme";

const inter = Inter({ subsets: ["latin"] });

type _AppProps = AppProps & { Component: { theme?: string; colorScheme?: ColorSchemeType } };

const staticCards: CardProps[] = [
  {
    title: "Static Themed Page",
    href: "static-black-theme",
    description: "Example for non dynamic page with forced theme. Uses Component.theme",
  },
  {
    title: "Static Forced Color Scheme",
    href: "static-dark-color-scheme",
    description: "Example for non dynamic page with forced color scheme - Component.colorScheme",
  },
];

export default function App({ Component, pageProps }: _AppProps) {
  const { theme, colorScheme } = Component;
  return (
    <div className={inter.className}>
      <ThemeSwitcher forcedColorScheme={colorScheme} forcedTheme={theme} />
      <Layout>
        <Header linkComponent={Link} />
        <Component {...pageProps} />
        <LandingPage title="Next.js Example">
          <ColorSwitch className="center" />
          <ThemeController />
          <ScopedThemes />
          <Cards>
            <PageNavigatorCard LinkElement={Link} />
            {staticCards.map(card => (
              <Card {...card} key={card.href} linkComponent={Link} />
            ))}
          </Cards>
        </LandingPage>
      </Layout>
    </div>
  );
}
