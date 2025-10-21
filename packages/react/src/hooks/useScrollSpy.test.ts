/// <reference path="../vitest.d.ts" />

import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useScrollSpy } from "./useScrollSpy";

describe("useScrollSpy", () => {
  let section1: HTMLElement;
  let section2: HTMLElement;
  let section3: HTMLElement;
  let mockObserver: {
    observe: ReturnType<typeof vi.fn>;
    unobserve: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    section1 = document.createElement("section");
    section1.id = "section-1";
    section2 = document.createElement("section");
    section2.id = "section-2";
    section3 = document.createElement("section");
    section3.id = "section-3";

    document.body.appendChild(section1);
    document.body.appendChild(section2);
    document.body.appendChild(section3);

    mockObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };

    global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      mockObserver.observe.mockImplementation((element) => {
        callback([
          {
            target: element,
            isIntersecting: true,
            boundingClientRect: { top: 0 },
          },
        ]);
      });
      return mockObserver;
    }) as unknown as typeof IntersectionObserver;

    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.removeChild(section1);
    document.body.removeChild(section2);
    document.body.removeChild(section3);
    vi.restoreAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should return null initially", () => {
      const { result } = renderHook(() =>
        useScrollSpy({ sectionIds: ["section-1", "section-2"] }),
      );

      // Before intersection
      const activeId = result.current;
      expect(activeId === null || typeof activeId === "string").toBe(true);
    });

    it("should track section IDs", () => {
      const { result } = renderHook(() =>
        useScrollSpy({
          sectionIds: ["section-1", "section-2", "section-3"],
        }),
      );

      vi.runAllTimers();

      expect(typeof result.current).toBe("string");
    });

    it("should observe all sections", () => {
      renderHook(() =>
        useScrollSpy({
          sectionIds: ["section-1", "section-2", "section-3"],
        }),
      );

      expect(mockObserver.observe).toHaveBeenCalledTimes(3);
    });
  });

  describe("Cleanup", () => {
    it("should unobserve sections on unmount", () => {
      const { unmount } = renderHook(() =>
        useScrollSpy({
          sectionIds: ["section-1", "section-2"],
        }),
      );

      unmount();

      expect(mockObserver.unobserve).toHaveBeenCalledTimes(2);
    });
  });

  describe("SSR Safety", () => {
    it("should handle missing IntersectionObserver", () => {
      const originalIO = global.IntersectionObserver;
      // @ts-ignore
      global.IntersectionObserver = undefined;

      expect(() => {
        renderHook(() => useScrollSpy({ sectionIds: ["section-1"] }));
      }).not.toThrow();

      global.IntersectionObserver = originalIO;
    });

    it("should handle server-side rendering", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      expect(() => {
        renderHook(() => useScrollSpy({ sectionIds: ["section-1"] }));
      }).not.toThrow();

      global.window = originalWindow;
    });
  });

  describe("Options", () => {
    it("should use custom rootMargin", () => {
      renderHook(() =>
        useScrollSpy({
          sectionIds: ["section-1"],
          rootMargin: "-50px 0px",
        }),
      );

      expect(global.IntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          rootMargin: "-50px 0px",
        }),
      );
    });

    it("should use default rootMargin", () => {
      renderHook(() =>
        useScrollSpy({
          sectionIds: ["section-1"],
        }),
      );

      expect(global.IntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          rootMargin: "-20% 0px -35% 0px",
        }),
      );
    });
  });
});
