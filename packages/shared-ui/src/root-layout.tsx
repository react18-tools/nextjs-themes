import "./globals.css";
import "nextjs-themes/src/styles.css";
import { ColorSwitch, ThemeSwitcher, ThemeSwitcherProps } from "nextjs-themes";
import { ForkMe } from "@mayank1513/fork-me/server/index.js"; // import directory not supported in remix
import type { HTMLProps } from "react";
import type { PageNavigatorCardProps } from "./cards/page-navigator-card";
import styles from "./root-layout.module.css";
import { ThemeController } from "./theme-controller/theme-controller";
import { Cards } from "./cards";
import { Description } from "./root/description";
import { Hero } from "./root/hero";
import { Footer } from "./root/footer";

export type SharedRootLayoutProps = HTMLProps<HTMLElement> & PageNavigatorCardProps & ThemeSwitcherProps;

export function SharedRootLayout({
  children,
  className = "",
  LinkElement,
  forcedColorScheme,
  forcedTheme,
  targetSelector,
  ...props
}: SharedRootLayoutProps) {
  return (
    <>
      <ThemeSwitcher
        {...{ forcedColorScheme, forcedTheme, targetSelector }}
        themeTransition="all 0.3s ease-in-out 0s"
      />
      <main className={`${styles.main} ${className}`} {...props}>
        <Description />
        {children}
        <Hero />
        <ColorSwitch />
        <ThemeController />
        <Cards LinkElement={LinkElement} />
      </main>
      <Footer />
      <ForkMe
        bgColor="var(--text-color)"
        gitHubUrl="https://github.com/react18-tools/nextjs-themes"
        textColor="var(--bg-color)"
      />
    </>
  );
}
