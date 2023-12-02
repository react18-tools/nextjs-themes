import { AppProps } from "next/app";
import Link from "next/link";
import { ColorSchemeType } from "nextjs-themes";
import { SharedRootLayout } from "shared-ui";

type _AppProps = AppProps & { Component: { theme?: string; colorScheme?: ColorSchemeType } };

export default function App({ Component, pageProps }: _AppProps) {
  const { theme, colorScheme } = Component;
  return (
    <SharedRootLayout LinkElement={Link} forcedColorScheme={colorScheme} forcedTheme={theme}>
      <Component {...pageProps} />
    </SharedRootLayout>
  );
}
