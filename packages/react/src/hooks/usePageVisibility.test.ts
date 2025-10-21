/// <reference path="../vitest.d.ts" />

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { usePageVisibility } from "./usePageVisibility";

describe("usePageVisibility", () => {
  beforeEach(() => {
    Object.defineProperty(document, "hidden", {
      writable: true,
      configurable: true,
      value: false,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should return true when page is visible", () => {
      Object.defineProperty(document, "hidden", { value: false });
      const { result } = renderHook(() => usePageVisibility());
      expect(result.current).toBe(true);
    });

    it("should return false when page is hidden", () => {
      Object.defineProperty(document, "hidden", { value: true });
      const { result } = renderHook(() => usePageVisibility());
      expect(result.current).toBe(false);
    });

    it("should update when visibility changes", () => {
      Object.defineProperty(document, "hidden", {
        writable: true,
        configurable: true,
        value: false,
      });

      const { result } = renderHook(() => usePageVisibility());
      expect(result.current).toBe(true);

      act(() => {
        Object.defineProperty(document, "hidden", { value: true });
        document.dispatchEvent(new Event("visibilitychange"));
      });

      expect(result.current).toBe(false);
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalDocument = global.document;
      // @ts-ignore
      global.document = undefined;

      expect(() => {
        renderHook(() => usePageVisibility());
      }).not.toThrow();

      global.document = originalDocument;
    });

    it("should return true during SSR", () => {
      const originalDocument = global.document;
      // @ts-ignore
      global.document = undefined;

      const { result } = renderHook(() => usePageVisibility());
      expect(result.current).toBe(true);

      global.document = originalDocument;
    });
  });

  describe("Cleanup", () => {
    it("should remove event listener on unmount", () => {
      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");
      const { unmount } = renderHook(() => usePageVisibility());

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "visibilitychange",
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });
  });
});
