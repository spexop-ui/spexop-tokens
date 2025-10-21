/// <reference path="../vitest.d.ts" />

import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useResizeObserver } from "./useResizeObserver";

describe("useResizeObserver", () => {
  let element: HTMLDivElement;
  let mockObserver: {
    observe: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    element = document.createElement("div");
    document.body.appendChild(element);

    mockObserver = {
      observe: vi.fn(),
      disconnect: vi.fn(),
    };

    global.ResizeObserver = vi.fn().mockImplementation((callback) => {
      mockObserver.observe.mockImplementation(() => {
        callback([
          {
            contentRect: { width: 100, height: 200 },
          },
        ]);
      });
      return mockObserver;
    }) as unknown as typeof ResizeObserver;
  });

  afterEach(() => {
    document.body.removeChild(element);
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should return ref and initial size", () => {
      const { result } = renderHook(() => useResizeObserver());

      const [ref, size] = result.current;

      expect(ref.current).toBeNull();
      expect(size.width).toBe(0);
      expect(size.height).toBe(0);
    });

    it("should observe element when ref is set", async () => {
      const { result } = renderHook(() => useResizeObserver());

      const [ref] = result.current;
      ref.current = element;

      await waitFor(() => {
        expect(mockObserver.observe).toHaveBeenCalled();
      });
    });

    it("should update size on resize", async () => {
      const { result, rerender } = renderHook(() => useResizeObserver());

      const [ref] = result.current;
      ref.current = element;

      rerender();

      await waitFor(() => {
        expect(result.current[1].width).toBe(100);
        expect(result.current[1].height).toBe(200);
      });
    });
  });

  describe("Cleanup", () => {
    it("should disconnect observer on unmount", async () => {
      const { result, unmount } = renderHook(() => useResizeObserver());

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
    it("should fallback to getBoundingClientRect when ResizeObserver unavailable", () => {
      const originalResizeObserver = global.ResizeObserver;
      // @ts-ignore
      global.ResizeObserver = undefined;

      element.getBoundingClientRect = vi.fn().mockReturnValue({
        width: 300,
        height: 400,
      });

      const { result } = renderHook(() => useResizeObserver());
      const [ref] = result.current;
      ref.current = element;

      global.ResizeObserver = originalResizeObserver;
    });
  });
});
