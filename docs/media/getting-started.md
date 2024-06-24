---
title: Getting Started
---

# Getting Started

## Installation

```bash
$ pnpm add nextjs-themes
```

**_or_**

```bash
$ npm install nextjs-themes
```

**_or_**

```bash
$ yarn add nextjs-themes
```

### Want Lite Version?

[![npm bundle size](https://img.shields.io/bundlephobia/minzip/nextjs-themes-lite)](https://www.npmjs.com/package/nextjs-themes-lite) [![Version](https://img.shields.io/npm/v/nextjs-themes-lite.svg?colorB=green)](https://www.npmjs.com/package/nextjs-themes-lite) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/nextjs-themes-lite.svg)](https://www.npmjs.com/package/nextjs-themes-lite)

```bash
$ pnpm add nextjs-themes-lite
```

**or**

```bash
$ npm install nextjs-themes-lite
```

**or**

```bash
$ yarn add nextjs-themes-lite
```

> Note: `r18gs` is a peer dependency

## Simple Usage

### SPA (e.g., Vite, CRA) and Next.js pages directory (No server components)

To add dark mode support, modify `_app.js` as follows:

```js
import { ThemeSwitcher } from "nextjs-themes";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeSwitcher forcedTheme={Component.theme} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
```

⚡🎉Boom! Dark mode is ready in just a couple of lines!

### With Next.js `app` router (Server Components)

Update `app/layout.jsx` to add `ThemeSwitcher` from `nextjs-themes`:

```tsx
// app/layout.jsx
import { ThemeSwitcher } from "nextjs-themes";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ThemeSwitcher />
        {children}
      </body>
    </html>
  );
}
```

Woohoo! Multiple theme modes with Server Components support!

### HTML & CSS

Next.js app supports dark mode, including System preference with `prefers-color-scheme`. The theme is synced between tabs, modifying the `data-theme` attribute on the `html` element:

```css
:root {
  --background: white;
  --foreground: black;
}

[data-theme="dark"] {
  --background: black;
  --foreground: white;
}
```

## Configuration

Configuring nextjs-themes is super simple. You can use following props to configure the main `ThemeSwitcher` component.

```ts
export interface ThemeSwitcherProps {
  /**
   * Forced theme name for the current page
   * @see [Force per page theme and color-scheme](https://github.com/react18-tools/nextjs-themes?tab=readme-ov-file#force-per-page-theme-and-color-scheme)
   */
  forcedTheme?: string;
  /**
   * Forced color scheme for the current page
   * @see [Force per page theme and color-scheme](https://github.com/react18-tools/nextjs-themes?tab=readme-ov-file#force-per-page-theme-and-color-scheme)
   */
  forcedColorScheme?: ColorSchemeType;
  /**
   * CSS selector for the target element to apply the theme.
   * Use this to specify a different target element than the default (html or documentElement).
   * This is particularly useful for controlling the theme of different parts of the page independently.
   */
  targetSelector?: string;
  /**
   * The transition property to enforce on all elements, preventing unwanted transitions during theme changes.
   * @example 'background .3s'
   * @defaultValue 'none'
   */
  themeTransition?: string;
  /**
   * Provide a styles object imported from CSS/SCSS modules if you are using these modules to define theme and color-scheme classes.
   * All classes applied to the target are modified using the styles object as follows:
   * `if (styles) classes = classes.map(cls => styles[cls] ?? cls);`
   */
  styles?: Record<string, string>;
  /** The nonce value for your Content Security Policy. */
  nonce?: string;
}
```

To augment the functionality, we also provide `ForceTheme` and `ForceColorScheme` components that effectively apply the `forcedTheme` and `forcedColorScheme` props via internal state variable. Please note that the props passed to the `ThemeSwitcher` has the highest priority.

## Handling different scenarios

### Images

Show different images based on the current theme:

```ts
import Image from "next/image";
import { useTheme } from "nextjs-themes/hooks";

function ThemedImage() {
  const { resolvedTheme } = useTheme();
  const src = resolvedTheme === "light" ? "/light.png" : "/dark.png";
  return <Image src={src} width={400} height={400} />;
}

export default ThemedImage;
```

### useTheme

The `useTheme` hook provides theme information and allows changing the theme:

```js
import { useTheme } from "nextjs-themes/hooks";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      The current theme is: {theme}
      <button onClick={() => setTheme("light")}>Light Mode</button>
      <button onClick={() => setTheme("dark")}>Dark Mode</button>
    </div>
  );
};
```

The `useTheme` hook returns the following object:

```tsx
interface UseThemeYield {
  theme: string;
  darkTheme: string;
  lightTheme: string;
  colorSchemePref: ColorSchemeType;
  systemColorScheme: ResolvedColorSchemeType;
  resolvedColorScheme: ResolvedColorSchemeType;
  resolvedTheme: string;
  setTheme: (theme: string) => void;
  setDarkTheme: (darkTheme: string) => void;
  setLightTheme: (lightTheme: string) => void;
  setThemeSet: (themeSet: { darkTheme: string; lightTheme: string }) => void;
  setColorSchemePref: (colorSchemePref: ColorSchemeType) => void;
  toggleColorScheme: (skipSystem?: boolean) => void;
  setForcedTheme: (forcedTheme: string) => void;
  setForcedColorScheme: (forcedColorScheme: ColorSchemeType) => void;
}
```

<details>
<summary><h2 style="display:inline">Force per page theme and color-scheme</h2></summary>

### Next.js App Router

```tsx
import { ForceTheme } from "nextjs-themes/force-theme";

function MyPage() {
  return (
    <>
      <ForceTheme theme="my-theme" />
      ...
    </>
  );
}

export default MyPage;
```

> If you are using TypeScript and have not set nodeResolution to `Bundler` or `Node16` or `NodeNext`, you need to import from `nextjs-themes/client/force-theme`

### Next.js Pages Router

For the pages router, you have two options. The first option is the same as the app router, and the second option, which is compatible with `next-themes`, involves adding the `theme` property to your page component like this:

```javascript
function MyPage() {
  return <>...</>;
}

MyPage.theme = "my-theme";

export default MyPage;
```

Similarly, you can force a color scheme. This will apply your `defaultDark` or `defaultLight` theme, which can be configured via hooks.

</details>

### With Styled Components and any CSS-in-JS

Next Themes works with any library. For Styled Components, `createGlobalStyle` in your custom App:

```js
// pages/_app.js
import { createGlobalStyle } from "styled-components";
import { ThemeSwitcher } from "nextjs-themes";

const GlobalStyle = createGlobalStyle`
  :root {
    --fg: #000;
    --bg: #fff;
  }

  [data-theme="dark"] {
    --fg: #fff;
    --bg: #000;
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeSwitcher forcedTheme={Component.theme} />
      <Component {...pageProps} />
    </>
  );
}
```

### With Tailwind

In `tailwind.config.js`, set the dark mode property to class:

```js
// tailwind.config.js
module.exports = {
  darkMode: "class",
};
```

⚡🎉Ready to use dark mode in Tailwind!

> Caution: Your class must be `"dark"`, which is the default value used in this library. Tailwind requires the class name `"dark"` for dark-theme.

Use dark-mode specific classes:

```tsx
<h1 className="text-black dark:text-white">
```

> <img src="https://github.com/react18-tools/turborepo-template/blob/main/popper.png?raw=true" style="height: 20px"/> Please consider enrolling in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsoring](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
