/// <reference path="../vitest.d.ts" />

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useIdle } from "./useIdle";

describe("useIdle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should return false initially", () => {
      const { result } = renderHook(() => useIdle(1000));
      expect(result.current).toBe(false);
    });

    it("should return true after timeout", () => {
      const { result } = renderHook(() => useIdle(1000));

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current).toBe(true);
    });

    it("should reset on user activity", () => {
      const { result } = renderHook(() => useIdle(1000));

      act(() => {
        vi.advanceTimersByTime(500);
      });

      act(() => {
        window.dispatchEvent(new MouseEvent("mousedown"));
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toBe(false);

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(result.current).toBe(true);
    });

    it("should use custom timeout", () => {
      const { result } = renderHook(() => useIdle(5000));

      act(() => {
        vi.advanceTimersByTime(4999);
      });
      expect(result.current).toBe(false);

      act(() => {
        vi.advanceTimersByTime(1);
      });
      expect(result.current).toBe(true);
    });
  });

  describe("Activity Events", () => {
    it("should reset on mousedown", () => {
      const { result } = renderHook(() => useIdle(1000));

      act(() => {
        vi.advanceTimersByTime(500);
        window.dispatchEvent(new MouseEvent("mousedown"));
        vi.advanceTimersByTime(999);
      });

      expect(result.current).toBe(false);
    });

    it("should reset on mousemove", () => {
      const { result } = renderHook(() => useIdle(1000));

      act(() => {
        vi.advanceTimersByTime(500);
        window.dispatchEvent(new MouseEvent("mousemove"));
        vi.advanceTimersByTime(999);
      });

      expect(result.current).toBe(false);
    });

    it("should reset on keydown", () => {
      const { result } = renderHook(() => useIdle(1000));

      act(() => {
        vi.advanceTimersByTime(500);
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
        vi.advanceTimersByTime(999);
      });

      expect(result.current).toBe(false);
    });

    it("should reset on scroll", () => {
      const { result } = renderHook(() => useIdle(1000));

      act(() => {
        vi.advanceTimersByTime(500);
        window.dispatchEvent(new Event("scroll"));
        vi.advanceTimersByTime(999);
      });

      expect(result.current).toBe(false);
    });

    it("should reset on touchstart", () => {
      const { result } = renderHook(() => useIdle(1000));

      act(() => {
        vi.advanceTimersByTime(500);
        window.dispatchEvent(new TouchEvent("touchstart"));
        vi.advanceTimersByTime(999);
      });

      expect(result.current).toBe(false);
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      expect(() => {
        renderHook(() => useIdle(1000));
      }).not.toThrow();

      global.window = originalWindow;
    });
  });

  describe("Cleanup", () => {
    it("should clear timeout on unmount", () => {
      const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

      const { unmount } = renderHook(() => useIdle(1000));
      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();

      clearTimeoutSpy.mockRestore();
    });

    it("should remove event listeners on unmount", () => {
      const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

      const { unmount } = renderHook(() => useIdle(1000));
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledTimes(5); // 5 events

      removeEventListenerSpy.mockRestore();
    });
  });
});
