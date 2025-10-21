/// <reference path="../vitest.d.ts" />

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useWindowSize } from "./useWindowSize";

describe("useWindowSize", () => {
  let originalInnerWidth: number;
  let originalInnerHeight: number;

  beforeEach(() => {
    vi.useFakeTimers();
    originalInnerWidth = window.innerWidth;
    originalInnerHeight = window.innerHeight;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    // Restore original dimensions
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: originalInnerWidth,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: originalInnerHeight,
    });
  });

  describe("Basic Functionality", () => {
    it("should return current window dimensions", () => {
      Object.defineProperty(window, "innerWidth", { value: 1024 });
      Object.defineProperty(window, "innerHeight", { value: 768 });

      const { result } = renderHook(() => useWindowSize());

      expect(result.current.width).toBe(1024);
      expect(result.current.height).toBe(768);
    });

    it("should update on window resize", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });
      Object.defineProperty(window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 768,
      });

      const { result } = renderHook(() => useWindowSize());

      expect(result.current.width).toBe(1024);
      expect(result.current.height).toBe(768);

      // Simulate resize
      act(() => {
        Object.defineProperty(window, "innerWidth", { value: 1920 });
        Object.defineProperty(window, "innerHeight", { value: 1080 });
        window.dispatchEvent(new Event("resize"));
        vi.advanceTimersByTime(150);
      });

      expect(result.current.width).toBe(1920);
      expect(result.current.height).toBe(1080);
    });

    it("should return object with width and height", () => {
      const { result } = renderHook(() => useWindowSize());

      expect(result.current).toHaveProperty("width");
      expect(result.current).toHaveProperty("height");
      expect(typeof result.current.width).toBe("number");
      expect(typeof result.current.height).toBe("number");
    });
  });

  describe("Debouncing", () => {
    it("should debounce resize events with default delay", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { result } = renderHook(() => useWindowSize());

      // Multiple rapid resizes
      act(() => {
        Object.defineProperty(window, "innerWidth", { value: 1100 });
        window.dispatchEvent(new Event("resize"));
        vi.advanceTimersByTime(50);

        Object.defineProperty(window, "innerWidth", { value: 1200 });
        window.dispatchEvent(new Event("resize"));
        vi.advanceTimersByTime(50);

        Object.defineProperty(window, "innerWidth", { value: 1300 });
        window.dispatchEvent(new Event("resize"));
        vi.advanceTimersByTime(50);
      });

      // Should still have old value (not debounced yet)
      expect(result.current.width).toBe(1024);

      // Complete debounce
      act(() => {
        vi.advanceTimersByTime(150);
      });

      // Now should have latest value
      expect(result.current.width).toBe(1300);
    });

    it("should use custom debounce delay", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { result } = renderHook(() => useWindowSize(300));

      act(() => {
        Object.defineProperty(window, "innerWidth", { value: 1920 });
        window.dispatchEvent(new Event("resize"));
        vi.advanceTimersByTime(150);
      });

      // Should not update yet (custom delay is 300ms)
      expect(result.current.width).toBe(1024);

      act(() => {
        vi.advanceTimersByTime(150);
      });

      // Now should update
      expect(result.current.width).toBe(1920);
    });

    it("should cancel previous debounce on rapid resizes", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { result } = renderHook(() => useWindowSize(200));

      // Rapid resizes
      act(() => {
        Object.defineProperty(window, "innerWidth", { value: 1100 });
        window.dispatchEvent(new Event("resize"));
        vi.advanceTimersByTime(100);

        Object.defineProperty(window, "innerWidth", { value: 1200 });
        window.dispatchEvent(new Event("resize"));
        vi.advanceTimersByTime(100);

        Object.defineProperty(window, "innerWidth", { value: 1300 });
        window.dispatchEvent(new Event("resize"));
      });

      // Still old value
      expect(result.current.width).toBe(1024);

      // Complete final debounce
      act(() => {
        vi.advanceTimersByTime(200);
      });

      // Should have last value only
      expect(result.current.width).toBe(1300);
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      expect(() => {
        renderHook(() => useWindowSize());
      }).not.toThrow();

      global.window = originalWindow;
    });

    it("should return 0x0 during SSR", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      const { result } = renderHook(() => useWindowSize());

      expect(result.current.width).toBe(0);
      expect(result.current.height).toBe(0);

      global.window = originalWindow;
    });
  });

  describe("Cleanup", () => {
    it("should remove event listener on unmount", () => {
      const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

      const { unmount } = renderHook(() => useWindowSize());

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "resize",
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });

    it("should clear timeout on unmount", () => {
      const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { unmount } = renderHook(() => useWindowSize());

      act(() => {
        Object.defineProperty(window, "innerWidth", { value: 1920 });
        window.dispatchEvent(new Event("resize"));
      });

      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();

      clearTimeoutSpy.mockRestore();
    });
  });

  describe("Use Cases", () => {
    it("should help with responsive layouts", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1024,
      });

      const { result } = renderHook(() => useWindowSize());

      const isMobile = result.current.width < 768;
      const isTablet =
        result.current.width >= 768 && result.current.width < 1024;
      const isDesktop = result.current.width >= 1024;

      expect(isMobile).toBe(false);
      expect(isTablet).toBe(false);
      expect(isDesktop).toBe(true);
    });

    it("should track aspect ratio", () => {
      Object.defineProperty(window, "innerWidth", { value: 1920 });
      Object.defineProperty(window, "innerHeight", { value: 1080 });

      const { result } = renderHook(() => useWindowSize());

      const aspectRatio = result.current.width / result.current.height;

      expect(aspectRatio).toBeCloseTo(16 / 9, 1);
    });

    it("should detect orientation changes", () => {
      Object.defineProperty(window, "innerWidth", {
        writable: true,
        configurable: true,
        value: 1920,
      });
      Object.defineProperty(window, "innerHeight", {
        writable: true,
        configurable: true,
        value: 1080,
      });

      const { result } = renderHook(() => useWindowSize());

      const isLandscape = result.current.width > result.current.height;
      expect(isLandscape).toBe(true);

      // Rotate to portrait
      act(() => {
        Object.defineProperty(window, "innerWidth", { value: 1080 });
        Object.defineProperty(window, "innerHeight", { value: 1920 });
        window.dispatchEvent(new Event("resize"));
        vi.advanceTimersByTime(150);
      });

      const isPortrait = result.current.width < result.current.height;
      expect(isPortrait).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("should handle zero dimensions", () => {
      Object.defineProperty(window, "innerWidth", { value: 0 });
      Object.defineProperty(window, "innerHeight", { value: 0 });

      const { result } = renderHook(() => useWindowSize());

      expect(result.current.width).toBe(0);
      expect(result.current.height).toBe(0);
    });

    it("should handle very large dimensions", () => {
      Object.defineProperty(window, "innerWidth", { value: 10000 });
      Object.defineProperty(window, "innerHeight", { value: 10000 });

      const { result } = renderHook(() => useWindowSize());

      expect(result.current.width).toBe(10000);
      expect(result.current.height).toBe(10000);
    });

    it("should handle delay change", () => {
      const { rerender } = renderHook(({ delay }) => useWindowSize(delay), {
        initialProps: { delay: 150 },
      });

      rerender({ delay: 300 });

      // Should not throw
    });
  });

  describe("Performance", () => {
    it("should not update unnecessarily", () => {
      let renderCount = 0;
      const { result } = renderHook(() => {
        renderCount++;
        return useWindowSize();
      });

      const initialRenderCount = renderCount;

      // Trigger resize but don't complete debounce
      act(() => {
        window.dispatchEvent(new Event("resize"));
        vi.advanceTimersByTime(50);
      });

      // Should not have re-rendered yet
      expect(renderCount).toBe(initialRenderCount);

      // Complete debounce
      act(() => {
        vi.advanceTimersByTime(100);
      });

      // Should re-render once
      expect(renderCount).toBe(initialRenderCount + 1);
    });
  });
});
