# PersistAndSync Zustand Store [![Version](https://img.shields.io/npm/v/persistnsync.svg?colorB=green)](https://www.npmjs.com/package/persistnsync) [![Downloads](https://img.jsdelivr.com/img.shields.io/npm/dt/persistnsync.svg)](https://www.npmjs.com/package/persistnsync) [![Unit Tests](https://github.com/mayank1513/nextjs-themes/actions/workflows/test.yml/badge.svg)](https://github.com/mayank1513/nextjs-themes/actions/workflows/test.yml)

> Zustand middleware to easily persist and sync Zustand state between tabs / windows / iframes (SameOrigin)

> Motivation: Recently I got cought up in several issues working with persist miggleware and syncing tabs with zustand. This is a simple light weight middleware to persist and instantly share state between tabs or windows

- ✅ 🐙 (574 Bytes gZiped) ~ 0.5 kB size cross-tab state sharing + persistance for zustand
- ✅ Full TypeScript Support
- ✅ solid reliability in 1 writing and n reading tab-scenarios (with changing writing tab)
- ✅ Fire and forget approach of always using the latest state. Perfect for single user systems
- ✅ Share state between multiple browsing contexts

## Install

```bash
$ pnpm add persistnsync
# or
$ npm install persistnsync
# or
$ yarn add persistnsync
```

## Usage

Simply add the middleware while creating the store and the rest will be taken care.

```ts
import { create } from "zustand";
import { persistNSync } from "persistnsync";

type MyStore = {
  count: number;
  set: (n: number) => void;
};

const useStore = create<MyStore>(
  persistNSync(
    set => ({
      count: 0,
      set: n => set({ count: n }),
    }),
    { name: "my-channel" },
  ),
);
```

⚡🎉Boom! Just a couple of lines and your state perfectly syncs between tabs/windows and it is also persisted using `localStorage`!

## License

Licensed as MIT open source.

<hr />

<p align="center" style="text-align:center">with 💖 by <a href="https://mayank-chaudhari.vercel.app" target="_blank">Mayank Kumar Chaudhari</a></p>
