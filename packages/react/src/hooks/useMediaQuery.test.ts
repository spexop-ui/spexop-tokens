/// <reference path="../vitest.d.ts" />

import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
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
    it("should return false when media query does not match", () => {
      matchMediaMock.matches = false;
      const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

      expect(result.current).toBe(false);
    });

    it("should return true when media query matches", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

      expect(result.current).toBe(true);
    });

    it("should call window.matchMedia with correct query", () => {
      renderHook(() => useMediaQuery("(min-width: 1024px)"));

      expect(window.matchMedia).toHaveBeenCalledWith("(min-width: 1024px)");
    });
  });

  describe("Dynamic Updates", () => {
    it("should update when media query changes", () => {
      matchMediaMock.matches = false;
      const { result, rerender } = renderHook(() =>
        useMediaQuery("(min-width: 768px)"),
      );

      expect(result.current).toBe(false);

      // Simulate media query change
      matchMediaMock.matches = true;
      const changeHandler = matchMediaMock.addEventListener.mock.calls[0][1];
      changeHandler({ matches: true } as MediaQueryListEvent);

      rerender();

      expect(result.current).toBe(true);
    });

    it("should update from true to false", () => {
      matchMediaMock.matches = true;
      const { result, rerender } = renderHook(() =>
        useMediaQuery("(min-width: 768px)"),
      );

      expect(result.current).toBe(true);

      // Simulate media query change
      matchMediaMock.matches = false;
      const changeHandler = matchMediaMock.addEventListener.mock.calls[0][1];
      changeHandler({ matches: false } as MediaQueryListEvent);

      rerender();

      expect(result.current).toBe(false);
    });

    it("should handle multiple toggles", () => {
      matchMediaMock.matches = false;
      const { result, rerender } = renderHook(() =>
        useMediaQuery("(min-width: 768px)"),
      );

      const changeHandler = matchMediaMock.addEventListener.mock.calls[0][1];

      for (let i = 0; i < 5; i++) {
        matchMediaMock.matches = !matchMediaMock.matches;
        changeHandler({
          matches: matchMediaMock.matches,
        } as MediaQueryListEvent);
        rerender();

        expect(result.current).toBe(matchMediaMock.matches);
      }
    });
  });

  describe("SSR Compatibility", () => {
    it("should handle server-side rendering", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      expect(() => {
        renderHook(() => useMediaQuery("(min-width: 768px)"));
      }).not.toThrow();

      global.window = originalWindow;
    });

    it("should return false during SSR", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

      expect(result.current).toBe(false);

      global.window = originalWindow;
    });

    it("should not cause hydration mismatch", () => {
      // SSR-safe initial value prevents hydration mismatch
      matchMediaMock.matches = true;
      const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

      // Initial render should match actual query result
      expect(result.current).toBe(true);
    });
  });

  describe("Event Listeners", () => {
    it("should add event listener on mount", () => {
      renderHook(() => useMediaQuery("(min-width: 768px)"));

      expect(matchMediaMock.addEventListener).toHaveBeenCalledWith(
        "change",
        expect.any(Function),
      );
    });

    it("should remove event listener on unmount", () => {
      const { unmount } = renderHook(() => useMediaQuery("(min-width: 768px)"));

      unmount();

      expect(matchMediaMock.removeEventListener).toHaveBeenCalledWith(
        "change",
        expect.any(Function),
      );
    });

    it("should update listener when query changes", () => {
      const { rerender } = renderHook(({ query }) => useMediaQuery(query), {
        initialProps: { query: "(min-width: 768px)" },
      });

      const initialAddCalls = matchMediaMock.addEventListener.mock.calls.length;

      rerender({ query: "(min-width: 1024px)" });

      // Should remove old listener and add new one
      expect(matchMediaMock.removeEventListener).toHaveBeenCalled();
      expect(matchMediaMock.addEventListener.mock.calls.length).toBeGreaterThan(
        initialAddCalls,
      );
    });
  });

  describe("Common Media Queries", () => {
    it("should work with min-width queries", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() => useMediaQuery("(min-width: 768px)"));

      expect(result.current).toBe(true);
    });

    it("should work with max-width queries", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() => useMediaQuery("(max-width: 767px)"));

      expect(result.current).toBe(true);
    });

    it("should work with orientation queries", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() =>
        useMediaQuery("(orientation: landscape)"),
      );

      expect(result.current).toBe(true);
    });

    it("should work with prefers-color-scheme", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() =>
        useMediaQuery("(prefers-color-scheme: dark)"),
      );

      expect(result.current).toBe(true);
    });

    it("should work with prefers-reduced-motion", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() =>
        useMediaQuery("(prefers-reduced-motion: reduce)"),
      );

      expect(result.current).toBe(true);
    });

    it("should work with complex queries", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() =>
        useMediaQuery("(min-width: 768px) and (max-width: 1024px)"),
      );

      expect(result.current).toBe(true);
    });
  });

  describe("Use Cases", () => {
    it("should work for responsive layout", () => {
      matchMediaMock.matches = false;
      const { result, rerender } = renderHook(() =>
        useMediaQuery("(min-width: 768px)"),
      );

      // Mobile
      expect(result.current).toBe(false);

      // Switch to desktop
      matchMediaMock.matches = true;
      const changeHandler = matchMediaMock.addEventListener.mock.calls[0][1];
      changeHandler({ matches: true } as MediaQueryListEvent);
      rerender();

      expect(result.current).toBe(true);
    });

    it("should work for dark mode detection", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() =>
        useMediaQuery("(prefers-color-scheme: dark)"),
      );

      expect(result.current).toBe(true);
    });

    it("should work for print styles", () => {
      matchMediaMock.matches = false;
      const { result } = renderHook(() => useMediaQuery("print"));

      expect(result.current).toBe(false);
    });

    it("should work for retina displays", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() =>
        useMediaQuery("(-webkit-min-device-pixel-ratio: 2)"),
      );

      expect(result.current).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty query string", () => {
      const { result } = renderHook(() => useMediaQuery(""));

      expect(result.current).toBe(false);
    });

    it("should handle invalid query", () => {
      const { result } = renderHook(() => useMediaQuery("invalid query"));

      // matchMedia should handle invalid queries gracefully
      expect(typeof result.current).toBe("boolean");
    });

    it("should handle query with extra whitespace", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() =>
        useMediaQuery("  (min-width: 768px)  "),
      );

      expect(result.current).toBe(true);
    });

    it("should handle multiple instances with same query", () => {
      matchMediaMock.matches = true;

      const { result: result1 } = renderHook(() =>
        useMediaQuery("(min-width: 768px)"),
      );
      const { result: result2 } = renderHook(() =>
        useMediaQuery("(min-width: 768px)"),
      );

      expect(result1.current).toBe(true);
      expect(result2.current).toBe(true);
    });
  });

  describe("Performance", () => {
    it("should not cause unnecessary re-renders", () => {
      let renderCount = 0;
      matchMediaMock.matches = false;

      const { rerender } = renderHook(() => {
        renderCount++;
        return useMediaQuery("(min-width: 768px)");
      });

      expect(renderCount).toBe(1);

      // Rerender without media query change
      rerender();
      expect(renderCount).toBe(2);

      // Media query change should cause re-render
      matchMediaMock.matches = true;
      const changeHandler = matchMediaMock.addEventListener.mock.calls[0][1];
      changeHandler({ matches: true } as MediaQueryListEvent);
      rerender();

      expect(renderCount).toBe(3);
    });

    it("should cleanup properly to prevent memory leaks", () => {
      const instances: ReturnType<typeof renderHook<boolean, unknown>>[] = [];

      for (let i = 0; i < 10; i++) {
        instances.push(renderHook(() => useMediaQuery("(min-width: 768px)")));
      }

      const addListenerCalls =
        matchMediaMock.addEventListener.mock.calls.length;

      // Unmount all
      for (const instance of instances) {
        instance.unmount();
      }

      // Should have cleaned up all listeners
      expect(matchMediaMock.removeEventListener.mock.calls.length).toBe(
        addListenerCalls,
      );
    });
  });
});
