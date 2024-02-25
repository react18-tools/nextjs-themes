import useRGS from "r18gs";
import { vi, beforeEach } from "vitest";
import { DEFAULT_ID, initialState } from "./src/constants";
import { act, renderHook } from "@testing-library/react";

// mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: query.includes(window.media),
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

declare global {
  interface Window {
    media: "dark" | "light";
  }
  var cookies: Record<string, { value: string }>; // eslint-disable-line no-var -- let is not supported in defining global due to block scope
  var path: string; // eslint-disable-line no-var -- let is not supported in defining global due to block scope
}
Object.defineProperty(window, "media", {
  writable: true,
  value: "dark",
});

globalThis.cookies = {};
globalThis.path = "";

vi.mock("next/headers", () => ({
  cookies: () => ({ get: (cookieName: string) => globalThis.cookies[cookieName] }),
  headers: () => ({ get: (h: string) => globalThis.path }),
}));

/** reset global state */
beforeEach(() => {
  const { result } = renderHook(() => useRGS(DEFAULT_ID));
  act(() => result.current[1](initialState));
});
