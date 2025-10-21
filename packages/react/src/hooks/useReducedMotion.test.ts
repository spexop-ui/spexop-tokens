/// <reference path="../vitest.d.ts" />

import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useReducedMotion } from "./useReducedMotion";

describe("useReducedMotion", () => {
  let matchMediaMock: {
    matches: boolean;
    addEventListener: ReturnType<typeof vi.fn>;
    removeEventListener: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    matchMediaMock = {
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };

    window.matchMedia = vi
      .fn()
      .mockImplementation(
        () => matchMediaMock,
      ) as unknown as typeof window.matchMedia;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should return false when reduced motion is not preferred", () => {
      matchMediaMock.matches = false;
      const { result } = renderHook(() => useReducedMotion());

      expect(result.current).toBe(false);
    });

    it("should return true when reduced motion is preferred", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() => useReducedMotion());

      expect(result.current).toBe(true);
    });

    it("should query the correct media query", () => {
      renderHook(() => useReducedMotion());

      expect(window.matchMedia).toHaveBeenCalledWith(
        "(prefers-reduced-motion: reduce)",
      );
    });
  });

  describe("Dynamic Updates", () => {
    it("should update when system preference changes", () => {
      matchMediaMock.matches = false;
      const { result, rerender } = renderHook(() => useReducedMotion());

      expect(result.current).toBe(false);

      // Simulate system preference change
      matchMediaMock.matches = true;
      const changeHandler = matchMediaMock.addEventListener.mock.calls[0][1];
      changeHandler({ matches: true } as MediaQueryListEvent);

      rerender();

      expect(result.current).toBe(true);
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      expect(() => {
        renderHook(() => useReducedMotion());
      }).not.toThrow();

      global.window = originalWindow;
    });

    it("should return false during SSR", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      const { result } = renderHook(() => useReducedMotion());

      expect(result.current).toBe(false);

      global.window = originalWindow;
    });
  });

  describe("Cleanup", () => {
    it("should remove event listeners on unmount", () => {
      const { unmount } = renderHook(() => useReducedMotion());

      unmount();

      expect(matchMediaMock.removeEventListener).toHaveBeenCalledWith(
        "change",
        expect.any(Function),
      );
    });
  });

  describe("Integration", () => {
    it("should work with animation logic", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() => useReducedMotion());

      const animationDuration = result.current ? 0 : 300;
      expect(animationDuration).toBe(0);
    });

    it("should allow animations when preference is off", () => {
      matchMediaMock.matches = false;
      const { result } = renderHook(() => useReducedMotion());

      const animationDuration = result.current ? 0 : 300;
      expect(animationDuration).toBe(300);
    });
  });
});
