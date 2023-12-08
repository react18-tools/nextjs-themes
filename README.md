# Nextjs-Themes

[![Version](https://img.shields.io/npm/v/nextjs-themes.svg?colorB=green)](https://www.npmjs.com/package/nextjs-themes) [![codecov](https://codecov.io/gh/mayank1513/nextjs-themes/branch/main/graph/badge.svg?token=SUTY0GHPHV)](https://codecov.io/gh/mayank1513/nextjs-themes) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/dt/nextjs-themes.svg)](https://www.npmjs.com/package/nextjs-themes) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/nextjs-themes)](https://www.npmjs.com/package/nextjs-themes) [![Publish to npm and GitHub](https://github.com/mayank1513/nextjs-themes/actions/workflows/test.yml/badge.svg)](https://github.com/mayank1513/nextjs-themes/actions/workflows/publish-to-npm-on-new-release.yml) [![Contact me on Codementor](https://www.codementor.io/m-badges/mayank1513/get-help.svg)](https://www.codementor.io/@mayank1513?refer=badge)

> This is a sister package of [react18-themes](https://github.com/react18-tools/react18-themes/). Initially we targeted only Next.js and thus this package was named `nextjs-themes`. However, we have expanded support for `Vite` and `Remix` as well. And thus published a package with more generic name, `react18-themes`.

> We recommend using [react18-themes](https://github.com/react18-tools/react18-themes/) for latest updates. Though this package is also maintained with specific focus on Next.js, all the functionality of this package along with extended support for other build tools is available in [react18-themes](https://github.com/react18-tools/react18-themes/)

🤟 👉 [Unleash the Power of React Server Components](https://medium.com/javascript-in-plain-english/unleash-the-power-of-react-server-components-eb3fe7201231)

This project was originally inspired by next-themes. Next-themes is an awesome package, however, it requires wrapping everything in a provider. The provider has to be a client component as it uses hooks. And thus, it takes away all the benefits of Server Components.

`nextjs-themes` removes this limitation and enables you to unleash the full power of React 18 Server Components. In addition, it adds more features and control over how you theme your app. Stay tuned!

- ✅ Perfect dark mode in 2 lines of code
- ✅ Fully Treeshakable (`import from nextjs-themes/client/component`)
- ✅ Designed for excellence
- ✅ Full TypeScript Support
- ✅ Unleash the full power of React18 Server components
- ✅ Perfect dark mode in 2 lines of code
- ✅ System setting with prefers-color-scheme
- ✅ Themed browser UI with color-scheme
- ✅ Support for Next.js 13 & Next.js 14 `appDir`
- ✅ No flash on load (for all - SSG, SSR, ISG, Server Components)
- ✅ Sync theme across tabs and windows
- ✅ Disable flashing when changing themes
- ✅ Force pages to specific themes
- ✅ Class and data attribute selector
- ✅ Manipulate theme via `useTheme` hook
- ✅ Doccumented with [Typedoc](https://react18-tools.github.io/nextjs-themes) ([Docs](https://react18-tools.github.io/nextjs-themes))

Check out the [live example](https://nextjs-themes.vercel.app/).

## Install

```bash
$ pnpm add nextjs-themes
# or
$ npm install nextjs-themes
# or
$ yarn add nextjs-themes
```

## Want Lite Version? [![npm bundle size](https://img.shields.io/bundlephobia/minzip/nextjs-themes-lite)](https://www.npmjs.com/package/nextjs-themes-lite) [![Version](https://img.shields.io/npm/v/nextjs-themes-lite.svg?colorB=green)](https://www.npmjs.com/package/nextjs-themes-lite) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/dt/nextjs-themes-lite.svg)](https://www.npmjs.com/package/nextjs-themes-lite)

```bash
$ pnpm add nextjs-themes-lite
# or
$ npm install nextjs-themes-lite
# or
$ yarn add nextjs-themes-lite
```

> You need Zustand as a peer-dependency

## To do

- [ ] Update examples

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

#### Prefer static generation over SSR - No wrapper component

> If your app is mostly serving static content, you do not want the overhead of SSR. Use `NextJsSSGThemeSwitcher` in this case.
> When using this approach, you need to use CSS general sibling Combinator (~) to make sure your themed CSS is properly applied. See (HTML & CSS)[#html--css].

Update your `app/layout.jsx` to add `ThemeSwitcher` from `nextjs-themes`, and `NextJsSSGThemeSwitcher` from `nextjs-themes/server`. `NextJsSSGThemeSwitcher` is required to avoid flash of un-themed content on reload.

```tsx
// app/layout.jsx
import { ThemeSwitcher } from "nextjs-themes";
import { NextJsSSGThemeSwitcher } from "nextjs-themes/server/nextjs";

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        /** use NextJsSSGThemeSwitcher as first element inside body */
        <NextJsSSGThemeSwitcher />
        <ThemeSwitcher />
        {children}
      </body>
    </html>
  );
}
```

Woohoo! You just added multiple theme modes and you can also use Server Component! Isn't that awesome!

#### Prefer SSR over SSG - Use wrapper component

> If your app is serving dynamic content and you want to utilize SSR, continue using `ServerSideWrapper` component to replace `html` tag in `layout.tsx` file.

Update your `app/layout.jsx` to add `ThemeSwitcher` and `ServerSideWrapper` from `nextjs-themes`. `ServerSideWrapper` is required to avoid flash of un-themed content on reload.

```tsx
// app/layout.jsx
import { ThemeSwitcher } from "nextjs-themes";
import { ServerSideWrapper } from "nextjs-themes/server/nextjs";

export default function Layout({ children }) {
  return (
    <ServerSideWrapper tag="html" lang="en">
      <head />
      <body>
        <ThemeSwitcher />
        {children}
      </body>
    </ServerSideWrapper>
  );
}
```

Woohoo! You just added dark mode and you can also use Server Component! Isn't that awesome!

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

// v2 onwards when using NextJsSSGThemeSwitcher, we need to use CSS Combinators
[data-theme="dark"] ~ * {
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
  /* you can also improve performance by using selectors
   * const [theme, setTheme] = useTheme(state => [state.theme, state.setTheme]);
   */
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

## Force per page theme and color-scheme

### Next.js app router

```javascript
import { ForceTheme } from "nextjs-themes";

function MyPage() {
  return (
    <>
      <ForceTheme theme={"my-theme"} />
      ...
    </>
  );
}

export default MyPage;
```

### Next.js pages router

For pages router, you have 2 options. One is the same as the app router and the other option which is compatible with `next-themes` is to add `theme` to your page component as follows.

```javascript
function MyPage() {
  return <>...</>;
}

MyPage.theme = "my-theme";

export default MyPage;
```

In a similar way, you can also force color scheme.

Forcing color scheme will apply your defaultDark or defaultLight theme, configurable via hooks.

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

## Migrating from v1 to v2

#### Motivation:

For server side syncing, we need to use cookies and headers. This means that this component and its children can not be static. They will be rendered server side for each request. Thus, we are avoiding the wrapper. Now, only the `NextJsSSGThemeSwitcher` will be rendered server side for each request and rest of your app can be server statically.

Take care of the following while migrating to `v2`.

- No changes required for projects not using `Next.js` app router or server components other than updating cookies policy if needed.
- The persistent storage is realized with `cookies` in place of `localStorage`. (You might want to update cookies policy accordingly.)
- We have provided `NextJsSSGThemeSwitcher` in addition to `ServerSideWrapper` for `Next.js`. You no longer need to use a wrapper component which broke static generation and forced SSR.
- Visit [With Next.js `app` router (Server Components)](#with-nextjs-app-router-server-components)

## Migrating from v0 to v1

- `defaultDarkTheme` is renamed to `darkTheme`
- `setDefaultDarkTheme` is renamed to `setDarkTheme`
- `defaultLightTheme` is renamed to `lightTheme`
- `setDefaultLightTheme` is renamed to `setLightTheme`

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

## License

Licensed as MIT open source.

> Note: This package uses cookies to sync theme with server components

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
