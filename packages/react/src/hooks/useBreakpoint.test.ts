/// <reference path="../vitest.d.ts" />

import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useBreakpoint } from "./useBreakpoint";

describe("useBreakpoint", () => {
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

  describe("Object Return (no arguments)", () => {
    it("should return breakpoint object", () => {
      const { result } = renderHook(() => useBreakpoint());

      expect(result.current).toHaveProperty("current");
      expect(result.current).toHaveProperty("isXs");
      expect(result.current).toHaveProperty("isSm");
      expect(result.current).toHaveProperty("isMd");
      expect(result.current).toHaveProperty("isLg");
      expect(result.current).toHaveProperty("isXl");
      expect(result.current).toHaveProperty("is2xl");
      expect(result.current).toHaveProperty("isMobile");
      expect(result.current).toHaveProperty("isTablet");
      expect(result.current).toHaveProperty("isDesktop");
    });

    it("should detect current breakpoint", () => {
      const { result } = renderHook(() => useBreakpoint());

      expect(result.current.current).toBeDefined();
      expect(typeof result.current.current).toBe("string");
    });

    it("should provide boolean flags", () => {
      const { result } = renderHook(() => useBreakpoint());

      expect(typeof result.current.isMobile).toBe("boolean");
      expect(typeof result.current.isTablet).toBe("boolean");
      expect(typeof result.current.isDesktop).toBe("boolean");
    });
  });

  describe("Specific Breakpoint Matching (with arguments)", () => {
    it("should match min breakpoint", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() => useBreakpoint("min", "md"));

      expect(result.current).toBe(true);
    });

    it("should match max breakpoint", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() => useBreakpoint("max", "lg"));

      expect(result.current).toBe(true);
    });

    it("should match only breakpoint", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() => useBreakpoint("only", "md"));

      expect(result.current).toBe(true);
    });
  });

  describe("Breakpoint Values", () => {
    it("should use correct breakpoint values from theme", () => {
      renderHook(() => useBreakpoint("min", "md"));

      expect(window.matchMedia).toHaveBeenCalledWith("(min-width: 768px)");
    });

    it("should use correct breakpoint for lg", () => {
      renderHook(() => useBreakpoint("min", "lg"));

      expect(window.matchMedia).toHaveBeenCalledWith("(min-width: 1024px)");
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      expect(() => {
        renderHook(() => useBreakpoint());
      }).not.toThrow();

      global.window = originalWindow;
    });
  });

  describe("Use Cases", () => {
    it("should work for mobile detection", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() => useBreakpoint());

      const isMobile = result.current.isMobile;
      expect(typeof isMobile).toBe("boolean");
    });

    it("should work for responsive layouts", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() => useBreakpoint("min", "lg"));

      const showDesktopLayout = result.current;
      expect(typeof showDesktopLayout).toBe("boolean");
    });
  });
});
