/// <reference path="../vitest.d.ts" />

import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ResponsiveValue } from "./useResponsiveValue";
import { useResponsiveValue } from "./useResponsiveValue";

describe("useResponsiveValue", () => {
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
    it("should return static value", () => {
      const { result } = renderHook(() => useResponsiveValue("static"));

      expect(result.current).toBe("static");
    });

    it("should return mobile value by default", () => {
      matchMediaMock.matches = false;
      const responsive: ResponsiveValue<string> = {
        xs: "mobile",
        md: "desktop",
      };

      const { result } = renderHook(() => useResponsiveValue(responsive));

      expect(result.current).toBe("mobile");
    });

    it("should return appropriate value for breakpoint", () => {
      const responsive: ResponsiveValue<number> = {
        xs: 16,
        sm: 18,
        md: 20,
        lg: 24,
      };

      const { result } = renderHook(() => useResponsiveValue(responsive));

      // Result depends on current breakpoint
      expect(typeof result.current).toBe("number");
      expect(result.current).toBeGreaterThanOrEqual(16);
    });
  });

  describe("Type Support", () => {
    it("should work with strings", () => {
      const { result } = renderHook(() =>
        useResponsiveValue({
          xs: "small",
          md: "large",
        }),
      );

      expect(typeof result.current).toBe("string");
    });

    it("should work with numbers", () => {
      const { result } = renderHook(() =>
        useResponsiveValue({
          xs: 16,
          md: 24,
        }),
      );

      expect(typeof result.current).toBe("number");
    });

    it("should work with objects", () => {
      const { result } = renderHook(() =>
        useResponsiveValue({
          xs: { padding: 4 },
          md: { padding: 8 },
        }),
      );

      expect(typeof result.current).toBe("object");
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      expect(() => {
        renderHook(() =>
          useResponsiveValue({
            xs: "mobile",
            md: "desktop",
          }),
        );
      }).not.toThrow();

      global.window = originalWindow;
    });

    it("should return xs value during SSR", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      const { result } = renderHook(() =>
        useResponsiveValue({
          xs: "mobile",
          md: "desktop",
        }),
      );

      expect(result.current).toBe("mobile");

      global.window = originalWindow;
    });
  });

  describe("Use Cases", () => {
    it("should work for responsive spacing", () => {
      const { result } = renderHook(() =>
        useResponsiveValue({
          xs: "16px",
          md: "24px",
          lg: "32px",
        }),
      );

      expect(typeof result.current).toBe("string");
      expect(result.current.endsWith("px")).toBe(true);
    });

    it("should work for responsive font sizes", () => {
      const { result } = renderHook(() =>
        useResponsiveValue({
          xs: 14,
          sm: 16,
          md: 18,
          lg: 20,
        }),
      );

      expect(typeof result.current).toBe("number");
    });

    it("should work for responsive layouts", () => {
      const { result } = renderHook(() =>
        useResponsiveValue({
          xs: "vertical",
          lg: "horizontal",
        }),
      );

      expect(["vertical", "horizontal"]).toContain(result.current);
    });
  });
});
