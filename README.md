# Nextjs Themes <img src="https://github.com/react18-tools/turborepo-template/blob/main/popper.png?raw=true" style="height: 40px"/>

[![test](https://github.com/react18-tools/nextjs-themes/actions/workflows/test.yml/badge.svg)](https://github.com/react18-tools/nextjs-themes/actions/workflows/test.yml) [![Maintainability](https://api.codeclimate.com/v1/badges/149263e95a1388369bb9/maintainability)](https://codeclimate.com/github/react18-tools/nextjs-themes/maintainability) [![codecov](https://codecov.io/gh/react18-tools/nextjs-themes/branch/main/graph/badge.svg?token=SUTY0GHPHV)](https://codecov.io/gh/react18-tools/nextjs-themes) [![Version](https://img.shields.io/npm/v/nextjs-themes.svg?colorB=green)](https://www.npmjs.com/package/nextjs-themes) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/nextjs-themes.svg)](https://www.npmjs.com/package/nextjs-themes) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/nextjs-themes) [![Contact me on Codementor](https://www.codementor.io/m-badges/mayank1513/get-help.svg)](https://www.codementor.io/@mayank1513?refer=badge)

<details>
<summary>Version 4 Short Notes:</summary>
> We are launching version 4.0 with minor API changes and major performance improvement and fixes.
> We have tried our best to ensure minimum changes to existing APIs.

> [react18-themes](https://github.com/react18-tools/react18-themes/) is no longer maintained separately. We will continue maintaining `react18-themes` as a canonical as we no longer need server specific APIs.

</details>

🤟 👉 [Unleash the Power of React Server Components](https://medium.com/javascript-in-plain-english/unleash-the-power-of-react-server-components-eb3fe7201231)

<details>

<summary>
  
  <h2 style="display:inline">Motivation and Key Features:</h2>

- ✅ Perfect dark mode in 2 lines of code
- ✅ Fully Treeshakable (`import from nextjs-themes/client/component`)
- ✅ Full TypeScript Support
- ✅ Unleash the full power of React18 Server components
</summary>

This project was originally inspired by next-themes. Next-themes is an awesome package, however, it requires wrapping everything in a provider. The provider has to be a client component as it uses hooks. And thus, it takes away all the benefits of Server Components.

`nextjs-themes` removes this limitation and enables you to unleash the full power of React 18 Server Components. In addition, it adds more features and control over how you theme your app. Stay tuned!

- ✅ Perfect dark mode in 2 lines of code
- ✅ Fully Treeshakable (`import from nextjs-themes/client/component`)
- ✅ Designed for excellence
- ✅ Full TypeScript Support
- ✅ Unleash the full power of React18 Server components
- ✅ System setting with prefers-color-scheme
- ✅ Themed browser UI with color-scheme
- ✅ Support for Next.js 13 & Next.js 14 `appDir`
- ✅ No flash on load (for all - SSG, SSR, ISG, Server Components)
- ✅ Sync theme across tabs and windows
- ✅ Disable flashing when changing themes
- ✅ Force pages to specific themes
- ✅ Class and data attribute selector
- ✅ Manipulate theme via `useTheme` hook
- ✅ Documented with [Typedoc](https://react18-tools.github.io/nextjs-themes) ([Docs](https://react18-tools.github.io/nextjs-themes))
- ✅ Use combinations of [data-th=""] and [data-color-scheme=""] for dark/light varients of themes
- ✅ Use [data-csp=""] to style based on colorSchemePreference.

</details>

> Check out the [live example](https://nextjs-themes.vercel.app/).

<details>
<summary>
<h2 style="display:inline">Installation</h2>
</summary>

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

</details>

<details>
<summary>

<h2 style="display:inline">Want Lite Version?</h2>

[![npm bundle size](https://img.shields.io/bundlephobia/minzip/nextjs-themes-lite)](https://www.npmjs.com/package/nextjs-themes-lite) [![Version](https://img.shields.io/npm/v/nextjs-themes-lite.svg?colorB=green)](https://www.npmjs.com/package/nextjs-themes-lite) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/d18m/nextjs-themes-lite.svg)](https://www.npmjs.com/package/nextjs-themes-lite)

</summary>

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

> You need `r18gs` as a peer-dependency

</details>

## Usage

### SPA (e.g., Vite, CRA) and Next.js pages directory (No server components)

The best way is to add a [Custom `App`](https://nextjs.org/docs/advanced-features/custom-app) to use by modifying `_app` as follows:

Adding dark mode support takes 2 lines of code:

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

⚡🎉Boom! Just a couple of lines and your dark mode is ready!

Check out examples for advanced usage.

### With Next.js `app` router (Server Components)

Update your `app/layout.jsx` and add `ThemeSwitcher` from `nextjs-themes`.

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

Woohoo! You just added multiple theme modes and you can also use Server Component! Isn't that awesome!

### HTML & CSS

That's it, your Next.js app fully supports dark mode, including System preference with `prefers-color-scheme`. The theme is also immediately synced between tabs. By default, nextjs-themes modifies the `data-theme` attribute on the `html` element, which you can easily use to style your app:

```css
:root {
  /* Your default theme */
  --background: white;
  --foreground: black;
}

[data-theme="dark"] {
  --background: black;
  --foreground: white;
}
```

## Images

You can also show different images based on the current theme.

```jsx
import Image from "next/image";
import { useTheme } from "nextjs-themes";

function ThemedImage() {
  const { resolvedTheme } = useTheme();
  let src;

  switch (resolvedTheme) {
    case "light":
      src = "/light.png";
      break;
    case "dark":
      src = "/dark.png";
      break;
    default:
      src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      break;
  }

  return <Image src={src} width={400} height={400} />;
}

export default ThemedImage;
```

### useTheme

In case your components need to know the current theme and be able to change it. The `useTheme` hook provides theme information:

```js
import { useTheme } from "nextjs-themes";

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

`useTheme` hook returns following object.

```tsx
interface UseThemeYield {
  theme: string;
  darkTheme: string;
  lightTheme: string;
  colorSchemePref: ColorSchemeType;
  systemColorScheme: ResolvedColorSchemeType;
  resolvedColorScheme: ResolvedColorSchemeType;
  resolvedTheme: string;
  // actions
  setTheme: (theme: string) => void;
  setDarkTheme: (darkTheme: string) => void;
  setLightTheme: (lightTheme: string) => void;
  setThemeSet: (themeSet: { darkTheme: string; lightTheme: string }) => void;
  setColorSchemePref: (colorSchemePref: ColorSchemeType) => void;
  toggleColorScheme: (skipSystem?: boolean) => void;
}
```

## Force per page theme and color-scheme

### Next.js pages router

For pages router, add `theme` to your page component as follows. This is compatible with `next-themes`.

First modify your `_app.tsx` file as follows:

```tsx
import * as React from "react";
import { AppProps } from "next/app";
import { ColorSchemeType, ThemeSwitcher } from "nextjs-themes";
import { Layout } from "@repo/shared/dist/server";
import "../styles/global.css";

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
```

Now, you can attach `theme` and `colorScheme` to your Page components.

```tsx
function MyPage() {
  return <>...</>;
}

MyPage.theme = "my-theme";

export default MyPage;
```

In a similar way, you can also force color scheme by setting `colorScheme`.

> `forcedTheme` and `forcedColorScheme` is no longer supported for the next.js app directory/router. However, you can still force a theme or colorScheme by using appropreate data attributes and classes on a wrapper and using appropreate CSS Selectors.

### With Styled Components and any CSS-in-JS

Next Themes is completely CSS independent, it will work with any library. For example, with Styled Components you just need to `createGlobalStyle` in your custom App:

```js
// pages/_app.js
import { createGlobalStyle } from "styled-components";
import { ThemeSwitcher } from "nextjs-themes";

// Your themeing variables
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

In your `tailwind.config.js`, set the dark mode property to class:

```js
// tailwind.config.js
module.exports = {
  darkMode: "class",
};
```

⚡🎉Boom! You are ready to use darkTheme in tailwind.

> Caution! Your class must be set to `"dark"`, which is the default value we have used for this library. Tailwind, as of now, requires that class name must be `"dark"` for dark-theme.

That's it! Now you can use dark-mode specific classes:

```tsx
<h1 className="text-black dark:text-white">
```

## Migration

> Please refer to [migration guide](./guides/migration.md)

## Docs

[Typedoc](https://react18-tools.github.io/nextjs-themes)

### 🤩 Don't forger to start this repo!

Want handson course for getting started with Turborepo? Check out [React and Next.js with TypeScript](https://www.udemy.com/course/react-and-next-js-with-typescript/?referralCode=7202184A1E57C3DCA8B2)

## FAQ

**Do I need to use CSS variables with this library?**

Nope. It's just a convenient way. You can hard code values for every class as follows.

```css
.my-class {
  color: #555;
}

[data-theme="dark"] .my-class {
  color: white;
}
```

**Why is `resolvedTheme` and `resolvedColorScheme` necessary?**

When supporting the System theme preference, and forced theme/colorScheme pages, you want to make sure that's reflected in your UI. This means your buttons, selects, dropdowns, or whatever you use to indicate the current colorScheme should say "system" when the System colorScheme preference is active. And also the appropreate theme is available in resolvedTheme.

`resolvedTheme` is then useful for modifying behavior or styles at runtime:

```js
const { resolvedTheme, resolvedColorScheme } = useTheme();

const background = getBackground(resolvedTheme);

<div style={{ color: resolvedColorScheme === 'dark' ? white : black, background }}>
```

If we didn't have `resolvedTheme` and only used `theme`, you'd lose information about the state of your UI (you would only know the theme is "system", and not what it resolved to).

## License

This library is licensed under the MPL-2.0 open-source license.

> <img src="https://github.com/react18-tools/turborepo-template/blob/main/popper.png?raw=true" style="height: 20px"/> Please consider enrolling in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsoring](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
