/// <reference path="../vitest.d.ts" />

import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useIntersectionObserver } from "./useIntersectionObserver";

describe("useIntersectionObserver", () => {
  let element: HTMLDivElement;
  let mockObserver: {
    observe: ReturnType<typeof vi.fn>;
    unobserve: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    element = document.createElement("div");
    document.body.appendChild(element);

    mockObserver = {
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
    };

    global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      mockObserver.observe.mockImplementation(() => {
        callback([
          {
            isIntersecting: true,
            target: element,
          },
        ]);
      });
      return mockObserver;
    }) as unknown as typeof IntersectionObserver;
  });

  afterEach(() => {
    document.body.removeChild(element);
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should return ref, isIntersecting, and entry", () => {
      const { result } = renderHook(() => useIntersectionObserver());

      const [ref, isIntersecting, entry] = result.current;

      expect(ref.current).toBeNull();
      expect(isIntersecting).toBe(false);
      expect(entry).toBeNull();
    });

    it("should observe element when ref is set", async () => {
      const { result } = renderHook(() => useIntersectionObserver());

      const [ref] = result.current;
      ref.current = element;

      await waitFor(() => {
        expect(mockObserver.observe).toHaveBeenCalled();
      });
    });

    it("should update isIntersecting when visible", async () => {
      const { result, rerender } = renderHook(() => useIntersectionObserver());

      const [ref] = result.current;
      ref.current = element;

      rerender();

      await waitFor(() => {
        expect(result.current[1]).toBe(true);
      });
    });
  });

  describe("Trigger Once", () => {
    it("should unobserve after first intersection", async () => {
      const { result, rerender } = renderHook(() =>
        useIntersectionObserver({ triggerOnce: true }),
      );

      const [ref] = result.current;
      ref.current = element;

      rerender();

      await waitFor(() => {
        expect(mockObserver.unobserve).toHaveBeenCalledWith(element);
      });
    });
  });

  describe("Cleanup", () => {
    it("should disconnect observer on unmount", async () => {
      const { result, unmount } = renderHook(() => useIntersectionObserver());

      const [ref] = result.current;
      ref.current = element;

      await waitFor(() => {
        expect(mockObserver.observe).toHaveBeenCalled();
      });

      unmount();

      expect(mockObserver.disconnect).toHaveBeenCalled();
    });
  });

  describe("Fallback", () => {
    it("should fallback when IntersectionObserver unavailable", () => {
      const originalIO = global.IntersectionObserver;
      // @ts-ignore
      global.IntersectionObserver = undefined;

      const { result } = renderHook(() => useIntersectionObserver());
      const [ref] = result.current;
      ref.current = element;

      global.IntersectionObserver = originalIO;
    });
  });
});
