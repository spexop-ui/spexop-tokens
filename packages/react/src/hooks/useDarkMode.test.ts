/// <reference path="../vitest.d.ts" />

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDarkMode } from "./useDarkMode";

describe("useDarkMode", () => {
  let matchMediaMock: {
    matches: boolean;
    addEventListener: ReturnType<typeof vi.fn>;
    removeEventListener: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    localStorage.clear();

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
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should use system preference by default", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() => useDarkMode());

      const [isDark] = result.current;
      expect(isDark).toBe(true);
    });

    it("should toggle dark mode", () => {
      matchMediaMock.matches = false;
      const { result } = renderHook(() => useDarkMode());

      expect(result.current[0]).toBe(false);

      act(() => {
        const [, toggle] = result.current;
        toggle();
      });

      expect(result.current[0]).toBe(true);
    });

    it("should set dark mode explicitly", () => {
      const { result } = renderHook(() => useDarkMode());

      act(() => {
        const [, , setDark] = result.current;
        setDark(true);
      });

      expect(result.current[0]).toBe(true);
    });

    it("should apply dark class to document", () => {
      const { result } = renderHook(() => useDarkMode());

      act(() => {
        const [, , setDark] = result.current;
        setDark(true);
      });

      expect(document.documentElement.classList.contains("dark")).toBe(true);
    });

    it("should remove dark class when light", () => {
      document.documentElement.classList.add("dark");

      const { result } = renderHook(() => useDarkMode());

      act(() => {
        const [, , setDark] = result.current;
        setDark(false);
      });

      expect(document.documentElement.classList.contains("dark")).toBe(false);
    });
  });

  describe("Persistence", () => {
    it("should persist manual override to localStorage", () => {
      const { result } = renderHook(() => useDarkMode());

      act(() => {
        const [, , setDark] = result.current;
        setDark(true);
      });

      expect(localStorage.getItem("dark-mode")).toBe("true");
    });

    it("should use custom storage key", () => {
      const { result } = renderHook(() => useDarkMode("custom-theme-key"));

      act(() => {
        const [, , setDark] = result.current;
        setDark(true);
      });

      expect(localStorage.getItem("custom-theme-key")).toBe("true");
    });
  });

  describe("System Preference", () => {
    it("should follow system preference when no manual override", () => {
      matchMediaMock.matches = true;
      const { result } = renderHook(() => useDarkMode());

      expect(result.current[0]).toBe(true);

      matchMediaMock.matches = false;
      const changeHandler = matchMediaMock.addEventListener.mock.calls[0]?.[1];
      if (changeHandler) {
        act(() => {
          changeHandler({ matches: false } as MediaQueryListEvent);
        });
      }
    });

    it("should override system preference when manually set", () => {
      matchMediaMock.matches = false;
      const { result } = renderHook(() => useDarkMode());

      expect(result.current[0]).toBe(false);

      act(() => {
        const [, , setDark] = result.current;
        setDark(true);
      });

      expect(result.current[0]).toBe(true);
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalDocument = global.document;
      // @ts-ignore
      global.document = undefined;

      expect(() => {
        renderHook(() => useDarkMode());
      }).not.toThrow();

      global.document = originalDocument;
    });
  });
});
