# Contribution Guidelines

## Overview

### Included Utilities

This project is configured with a suite of pre-configured tools to enhance development experience:

- **Monorepo setup with TurboRepo**:
  - TurboRepo provides efficient builds and caching, reducing unnecessary rebuilds.
- [TypeScript](https://www.typescriptlang.org/) for static type checking.
- [ESLint](https://eslint.org/) for code linting.
- [Prettier](https://prettier.io) for code formatting.
- A Plop-based code generator for easy component scaffolding.
- Workflows for testing, documentation, dependency updates, and deployment of docs and packages.
- Build setup for generating both CJS and ESM builds to support React 18 server and client component exports from the same library.
- Native support for SCSS modules in `lib` and `packages/shared`.

### Apps and Packages

This TurboRepo includes the following packages/examples, all in [TypeScript](https://www.typescriptlang.org/):

- **`nextjs-themes`**: The core React component library (published to NPM).
- **`@example/app-router`**: A [Next.js](https://nextjs.org/) example app using the app router/directory.
- **`@example/pages-router`**: A [Next.js](https://nextjs.org/) example app using the pages router.
- **`@example/vite`**: A [Vite.js](https://vitejs.dev) app.
- **`@repo/config-eslint`**: ESLint configurations (includes `eslint-config-next` and `eslint-config-prettier`).
- **`@repo/config-typescript`**: `tsconfig.json` configurations used throughout the monorepo.
- **`@repo/shared`**: An internal library of components used by the examples.

## Automated File Generation

To automatically generate a new component along with a test file and dependency linking, run:

```bash
yarn plop
```

Follow the prompts to ensure adherence to best practices.

### Build

To build all apps and packages, run:

```bash
pnpm build
```

### Development

For developing all apps and packages, use:

```bash
pnpm dev
```

### Running Unit Tests

To run unit tests, execute:

```bash
pnpm test
```

### Linting and Formatting

Before submitting a PR, ensure your code passes linting and is properly formatted by running:

```bash
pnpm lint
```

and

```bash
pnpm format
```

## Useful Resources

Learn more about TurboRepo and Next.js through these links:

- [React and Next.js with TypeScript](https://www.udemy.com/course/react-and-next-js-with-typescript/?referralCode=7202184A1E57C3DCA8B2) - An interactive Next.js course.
- [The Game of Chess with Next.js, React, and TypeScript](https://www.udemy.com/course/game-of-chess-with-nextjs-react-and-typescrypt/?referralCode=851A28F10B254A8523FE)
- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

> **Quick tip**: Remove all stale branches with:
>
> ```bash
> git branch --merged main | grep -v '^[ *]*main$' | xargs git branch -d
> ```

> <img src="https://github.com/react18-tools/turborepo-template/blob/main/popper.png?raw=true" style="height: 20px"/> Consider enrolling in [our courses](https://mayank-chaudhari.vercel.app/courses) or [sponsoring](https://github.com/sponsors/mayank1513) our work.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
