import { vi } from "vitest";

declare global {
  interface Window {
    media: "dark" | "light";
    matchMedia: (query: string) => MediaQueryList;
  }
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
