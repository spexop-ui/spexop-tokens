/// <reference path="../vitest.d.ts" />

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should return initial value immediately", () => {
      const { result } = renderHook(() => useDebounce("initial", 500));

      expect(result.current).toBe("initial");
    });

    it("should debounce value updates", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 500),
        {
          initialProps: { value: "initial" },
        },
      );

      expect(result.current).toBe("initial");

      // Update value
      rerender({ value: "updated" });

      // Value should still be initial (not debounced yet)
      expect(result.current).toBe("initial");

      // Advance timers
      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Now value should be updated
      expect(result.current).toBe("updated");
    });

    it("should use custom delay", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 1000),
        {
          initialProps: { value: "initial" },
        },
      );

      rerender({ value: "updated" });

      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toBe("initial");

      act(() => {
        vi.advanceTimersByTime(500);
      });
      expect(result.current).toBe("updated");
    });

    it("should handle default delay", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value),
        {
          initialProps: { value: "initial" },
        },
      );

      rerender({ value: "updated" });

      // Default is 500ms
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toBe("updated");
    });
  });

  describe("Rapid Updates", () => {
    it("should cancel previous timeout on rapid updates", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 500),
        {
          initialProps: { value: "value1" },
        },
      );

      // Rapid updates
      rerender({ value: "value2" });
      act(() => {
        vi.advanceTimersByTime(200);
      });

      rerender({ value: "value3" });
      act(() => {
        vi.advanceTimersByTime(200);
      });

      rerender({ value: "value4" });
      act(() => {
        vi.advanceTimersByTime(200);
      });

      // Still showing initial value
      expect(result.current).toBe("value1");

      // Complete the delay from last update
      act(() => {
        vi.advanceTimersByTime(300);
      });

      // Should show last value
      expect(result.current).toBe("value4");
    });

    it("should only update once after rapid changes", () => {
      let updateCount = 0;
      const { rerender } = renderHook(
        ({ value }) => {
          const debounced = useDebounce(value, 500);
          if (debounced !== "initial") updateCount++;
          return debounced;
        },
        {
          initialProps: { value: "initial" },
        },
      );

      // Multiple rapid updates
      for (let i = 0; i < 10; i++) {
        rerender({ value: `value${i}` });
        act(() => {
          vi.advanceTimersByTime(100);
        });
      }

      // Complete the debounce
      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Should have updated only once
      expect(updateCount).toBe(1);
    });
  });

  describe("Type Safety", () => {
    it("should work with strings", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 500),
        {
          initialProps: { value: "test" },
        },
      );

      rerender({ value: "updated" });
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toBe("updated");
    });

    it("should work with numbers", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 500),
        {
          initialProps: { value: 0 },
        },
      );

      rerender({ value: 42 });
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toBe(42);
    });

    it("should work with objects", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 500),
        {
          initialProps: { value: { count: 0 } },
        },
      );

      rerender({ value: { count: 1 } });
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toEqual({ count: 1 });
    });

    it("should work with arrays", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 500),
        {
          initialProps: { value: [1, 2, 3] },
        },
      );

      rerender({ value: [4, 5, 6] });
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toEqual([4, 5, 6]);
    });
  });

  describe("Cleanup", () => {
    it("should cleanup timeout on unmount", () => {
      const { rerender, unmount } = renderHook(
        ({ value }) => useDebounce(value, 500),
        {
          initialProps: { value: "initial" },
        },
      );

      rerender({ value: "updated" });
      unmount();

      // Advance time after unmount
      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Should not throw or cause issues
    });

    it("should cleanup on value change", () => {
      const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

      const { rerender } = renderHook(({ value }) => useDebounce(value, 500), {
        initialProps: { value: "initial" },
      });

      rerender({ value: "updated1" });
      rerender({ value: "updated2" });

      // Should have cleared timeout on second update
      expect(clearTimeoutSpy).toHaveBeenCalled();

      clearTimeoutSpy.mockRestore();
    });
  });

  describe("Use Cases", () => {
    it("should work for search input", () => {
      const { result, rerender } = renderHook(
        ({ searchTerm }) => useDebounce(searchTerm, 300),
        {
          initialProps: { searchTerm: "" },
        },
      );

      // User typing "hello"
      rerender({ searchTerm: "h" });
      rerender({ searchTerm: "he" });
      rerender({ searchTerm: "hel" });
      rerender({ searchTerm: "hell" });
      rerender({ searchTerm: "hello" });

      // Value should still be empty (not debounced yet)
      expect(result.current).toBe("");

      // Complete debounce
      act(() => {
        vi.advanceTimersByTime(300);
      });

      // Now it should show "hello"
      expect(result.current).toBe("hello");
    });

    it("should work for API calls optimization", () => {
      let apiCallCount = 0;
      const { rerender } = renderHook(
        ({ query }) => {
          const debouncedQuery = useDebounce(query, 500);
          // Simulate API call on debounced query change
          if (debouncedQuery) apiCallCount++;
          return debouncedQuery;
        },
        {
          initialProps: { query: "" },
        },
      );

      // Rapid query changes
      rerender({ query: "a" });
      rerender({ query: "ab" });
      rerender({ query: "abc" });
      rerender({ query: "abcd" });

      // No API calls yet
      expect(apiCallCount).toBe(0);

      // Complete debounce
      act(() => {
        vi.advanceTimersByTime(500);
      });

      // Only one API call
      expect(apiCallCount).toBe(1);
    });
  });

  describe("Edge Cases", () => {
    it("should handle zero delay", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 0),
        {
          initialProps: { value: "initial" },
        },
      );

      rerender({ value: "updated" });

      act(() => {
        vi.advanceTimersByTime(0);
      });

      expect(result.current).toBe("updated");
    });

    it("should handle null and undefined", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 500),
        {
          initialProps: { value: null as string | null },
        },
      );

      expect(result.current).toBeNull();

      rerender({ value: "updated" });
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toBe("updated");
    });

    it("should handle boolean values", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useDebounce(value, 500),
        {
          initialProps: { value: false },
        },
      );

      rerender({ value: true });
      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(result.current).toBe(true);
    });
  });
});
