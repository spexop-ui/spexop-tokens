/// <reference path="../vitest.d.ts" />

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useScroll } from "./useScroll";

describe("useScroll", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    Object.defineProperty(window, "scrollX", {
      writable: true,
      configurable: true,
      value: 0,
    });
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should return initial scroll position", () => {
      const { result } = renderHook(() => useScroll());

      expect(result.current.x).toBe(0);
      expect(result.current.y).toBe(0);
      expect(result.current.direction).toBeNull();
    });

    it("should update scroll position", () => {
      const { result } = renderHook(() => useScroll());

      act(() => {
        Object.defineProperty(window, "scrollY", { value: 100 });
        window.dispatchEvent(new Event("scroll"));
        vi.advanceTimersByTime(100);
      });

      expect(result.current.y).toBe(100);
    });

    it("should detect scroll direction down", () => {
      const { result } = renderHook(() => useScroll());

      act(() => {
        Object.defineProperty(window, "scrollY", { value: 100 });
        window.dispatchEvent(new Event("scroll"));
        vi.advanceTimersByTime(100);
      });

      expect(result.current.direction).toBe("down");
    });

    it("should detect scroll direction up", () => {
      Object.defineProperty(window, "scrollY", { value: 100 });

      const { result } = renderHook(() => useScroll());

      act(() => {
        Object.defineProperty(window, "scrollY", { value: 50 });
        window.dispatchEvent(new Event("scroll"));
        vi.advanceTimersByTime(100);
      });

      expect(result.current.direction).toBe("up");
    });

    it("should detect horizontal scroll", () => {
      const { result } = renderHook(() => useScroll());

      act(() => {
        Object.defineProperty(window, "scrollX", { value: 100 });
        window.dispatchEvent(new Event("scroll"));
        vi.advanceTimersByTime(100);
      });

      expect(result.current.x).toBe(100);
      expect(result.current.direction).toBe("right");
    });
  });

  describe("Throttling", () => {
    it("should throttle scroll updates", () => {
      const { result } = renderHook(() => useScroll(200));

      act(() => {
        Object.defineProperty(window, "scrollY", { value: 50 });
        window.dispatchEvent(new Event("scroll"));
        vi.advanceTimersByTime(100);
      });

      expect(result.current.y).toBe(0);

      act(() => {
        vi.advanceTimersByTime(100);
      });

      expect(result.current.y).toBe(50);
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      expect(() => {
        renderHook(() => useScroll());
      }).not.toThrow();

      global.window = originalWindow;
    });
  });
});
