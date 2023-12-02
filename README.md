# Nextjs-Themes [![Version](https://img.shields.io/npm/v/nextjs-themes.svg?colorB=green)](https://www.npmjs.com/package/nextjs-themes) [![codecov](https://codecov.io/gh/mayank1513/nextjs-themes/branch/main/graph/badge.svg?token=SUTY0GHPHV)](https://codecov.io/gh/mayank1513/nextjs-themes) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/dt/nextjs-themes.svg)](https://www.npmjs.com/package/nextjs-themes) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/nextjs-themes)](https://www.npmjs.com/package/nextjs-themes) [![Publish to npm and GitHub](https://github.com/mayank1513/nextjs-themes/actions/workflows/test.yml/badge.svg)](https://github.com/mayank1513/nextjs-themes/actions/workflows/publish-to-npm-on-new-release.yml) [![Contact me on Codementor](https://www.codementor.io/m-badges/mayank1513/get-help.svg)](https://www.codementor.io/@mayank1513?refer=badge)

> This is a sister package of [react18-themes](https://github.com/react18-tools/react18-themes/). Initially we targeted only Next.js and thus this package was named `nextjs-themes`. However, we have expanded support for `Vite` and `Remix` as well. And thus published a package with more generic name, `react18-themes`.

> We recommend using [react18-themes](https://github.com/react18-tools/react18-themes/) for latest updates. Though this package is also maintained with specific focus on Next.js, all the functionality of this package along with extended support for other build tools is available in [react18-themes](https://github.com/react18-tools/react18-themes/)

🤟 👉 [Unleash the Power of React Server Components](https://medium.com/javascript-in-plain-english/unleash-the-power-of-react-server-components-eb3fe7201231)

This project is inspired by next-themes. Next-themes is an awesome package, however, it requires wrapping everything in a provider. The provider has to be a client component as it uses hooks. And thus, it takes away all the benefits of Server Components.

`nextjs-themes` removes this limitation and enables you to unleash the full power of React 18 Server Components. In addition, more features are coming up soon... Stay tuned!

- ✅ Fully Treeshakable (`import from nextjs-themes/client/component`)
- ✅ Designed for excellence
- ✅ Full TypeScript Support
- ✅ Unleash the full power of React18 Server components
- ✅ Works with all build systems/tools/frameworks for React18
- ✅ Perfect dark mode in 2 lines of code
- ✅ System setting with prefers-color-scheme
- ✅ Themed browser UI with color-scheme
- ✅ Support for Next.js 13 & Next.js 14 `appDir`
- ✅ Sync theme across tabs and windows
- ✅ Disable flashing when changing themes
- ✅ Force pages to specific themes
- ✅ Class or data attribute selector
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

## Want Lite Version? [![npm bundle size](https://img.shields.io/bundlephobia/minzip/nextjs-themes-lite)](https://www.npmjs.com/package/nextjs-themes-lite)

```bash
$ pnpm add nextjs-themes-lite
# or
$ npm install nextjs-themes-lite
# or
$ yarn add nextjs-themes-lite
```

> You need Zustand as a peer-dependency

## Use

### With pages/

The best way is to add a [Custom `App`](https://nextjs.org/docs/advanced-features/custom-app) to use by modifying `_app` as follows:

Adding dark mode support takes 2 lines of code:

```js
import { ThemeSwitcher } from "next-themes";

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

### With app/

Update your `app/layout.jsx` to add `ThemeSwitcher` and `SSCWrapper` from `nextjs-themes`. `SSCWrapper` is required to avoid flash of un-themed content on reload.

```js
// app/layout.jsx
import { ThemeSwitcher } from "next-themes";
import { SSCWrapper } from "next-themes/server/nextjs";

export default function Layout({ children }) {
  return (
    <SSCWrapper tag="html" lang="en">
      <head />
      <body>
        <ThemeSwitcher />
        {children}
      </body>
    </SSCWrapper>
  );
}
```

Woohoo! You just added dark mode and you can also use Server Component! Isn't that awesome!

### HTML & CSS

That's it, your Next.js app fully supports dark mode, including System preference with `prefers-color-scheme`. The theme is also immediately synced between tabs. By default, next-themes modifies the `data-theme` attribute on the `html` element, which you can easily use to style your app:

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

## Migrating from v0 to v1

- `defaultDarkTheme` is renamed to `darkTheme`
- `setDefaultDarkTheme` is renamed to `setDarkTheme`
- `defaultLightTheme` is renamed to `lightTheme`
- `setDefaultLightTheme` is renamed to `setLightTheme`

> Full docs coming soon!

## License

Licensed as MIT open source.

> Note: This package uses cookies to sync theme with server components

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
