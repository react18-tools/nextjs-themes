import { vi } from "vitest";

declare global {
  interface Window {
    media: "dark" | "light";
    matchMedia: (query: string) => MediaQueryList;
  }
  var cookies: Record<string, { value: string }>; // eslint-disable-line no-var -- let is not supported in defining global due to block scope
  var path: string; // eslint-disable-line no-var -- let is not supported in defining global due to block scope
}

const mediaListeners: (() => void)[] = [];
// mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query.includes(window.media),
    media: query,
    onchange() {
      this.matches = query.includes(window.media);
      mediaListeners.forEach(listener => listener());
    },
    addEventListener: (_: string, listener: () => void) => mediaListeners.push(listener),
    removeEventListener: (_: string, listener: () => void) =>
      mediaListeners.splice(mediaListeners.indexOf(listener), 1),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(window, "media", {
  writable: true,
  value: "dark",
});

vi.mock("next/headers", () => ({
  cookies: () => ({ get: (cookieName: string) => globalThis.cookies[cookieName] }),
  headers: () => ({ get: (h: string) => globalThis.path }),
}));
