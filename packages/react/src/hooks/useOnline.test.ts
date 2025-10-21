/// <reference path="../vitest.d.ts" />

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useOnline } from "./useOnline";

describe("useOnline", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should return true when online", () => {
      Object.defineProperty(navigator, "onLine", {
        writable: true,
        configurable: true,
        value: true,
      });

      const { result } = renderHook(() => useOnline());

      expect(result.current).toBe(true);
    });

    it("should return false when offline", () => {
      Object.defineProperty(navigator, "onLine", {
        writable: true,
        configurable: true,
        value: false,
      });

      const { result } = renderHook(() => useOnline());

      expect(result.current).toBe(false);
    });

    it("should update when going offline", () => {
      Object.defineProperty(navigator, "onLine", { value: true });

      const { result } = renderHook(() => useOnline());

      expect(result.current).toBe(true);

      act(() => {
        window.dispatchEvent(new Event("offline"));
      });

      expect(result.current).toBe(false);
    });

    it("should update when going online", () => {
      Object.defineProperty(navigator, "onLine", { value: false });

      const { result } = renderHook(() => useOnline());

      expect(result.current).toBe(false);

      act(() => {
        window.dispatchEvent(new Event("online"));
      });

      expect(result.current).toBe(true);
    });
  });

  describe("Event Listeners", () => {
    it("should add event listeners on mount", () => {
      const addEventListenerSpy = vi.spyOn(window, "addEventListener");

      renderHook(() => useOnline());

      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "online",
        expect.any(Function),
      );
      expect(addEventListenerSpy).toHaveBeenCalledWith(
        "offline",
        expect.any(Function),
      );

      addEventListenerSpy.mockRestore();
    });

    it("should remove event listeners on unmount", () => {
      const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

      const { unmount } = renderHook(() => useOnline());

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "online",
        expect.any(Function),
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "offline",
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalNavigator = global.navigator;
      // @ts-ignore
      global.navigator = undefined;

      expect(() => {
        renderHook(() => useOnline());
      }).not.toThrow();

      // @ts-ignore
      global.navigator = originalNavigator;
    });

    it("should return true during SSR", () => {
      const originalNavigator = global.navigator;
      // @ts-ignore
      global.navigator = undefined;

      const { result } = renderHook(() => useOnline());

      expect(result.current).toBe(true);

      // @ts-ignore
      global.navigator = originalNavigator;
    });
  });

  describe("Use Cases", () => {
    it("should work for offline banner", () => {
      Object.defineProperty(navigator, "onLine", { value: true });

      const { result } = renderHook(() => useOnline());

      const showBanner = !result.current;
      expect(showBanner).toBe(false);

      act(() => {
        window.dispatchEvent(new Event("offline"));
      });

      const showBannerNow = !result.current;
      expect(showBannerNow).toBe(true);
    });

    it("should work for conditional API calls", () => {
      Object.defineProperty(navigator, "onLine", { value: true });

      const { result } = renderHook(() => useOnline());

      const shouldFetch = result.current;
      expect(shouldFetch).toBe(true);

      act(() => {
        window.dispatchEvent(new Event("offline"));
      });

      const shouldQueue = !result.current;
      expect(shouldQueue).toBe(true);
    });
  });

  describe("Edge Cases", () => {
    it("should handle rapid toggling", () => {
      Object.defineProperty(navigator, "onLine", { value: true });

      const { result } = renderHook(() => useOnline());

      for (let i = 0; i < 10; i++) {
        act(() => {
          window.dispatchEvent(new Event("offline"));
        });
        expect(result.current).toBe(false);

        act(() => {
          window.dispatchEvent(new Event("online"));
        });
        expect(result.current).toBe(true);
      }
    });

    it("should handle multiple instances", () => {
      const { result: result1 } = renderHook(() => useOnline());
      const { result: result2 } = renderHook(() => useOnline());

      expect(result1.current).toBe(result2.current);

      act(() => {
        window.dispatchEvent(new Event("offline"));
      });

      expect(result1.current).toBe(false);
      expect(result2.current).toBe(false);
    });
  });
});
