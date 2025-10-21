/// <reference path="../vitest.d.ts" />

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useThrottle } from "./useThrottle";

describe("useThrottle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should execute callback immediately on first call", () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useThrottle(callback, 1000));

      act(() => {
        result.current();
      });

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should throttle subsequent calls", () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useThrottle(callback, 1000));

      // First call - executes immediately
      act(() => {
        result.current();
      });
      expect(callback).toHaveBeenCalledTimes(1);

      // Second call - should be throttled
      act(() => {
        result.current();
      });
      expect(callback).toHaveBeenCalledTimes(1);

      // Advance time
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Third call - should execute
      act(() => {
        result.current();
      });
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it("should use custom delay", () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useThrottle(callback, 500));

      act(() => {
        result.current();
      });
      expect(callback).toHaveBeenCalledTimes(1);

      act(() => {
        result.current();
      });
      expect(callback).toHaveBeenCalledTimes(1);

      act(() => {
        vi.advanceTimersByTime(500);
      });

      act(() => {
        result.current();
      });
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it("should use default delay", () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useThrottle(callback));

      act(() => {
        result.current();
      });

      act(() => {
        result.current();
      });

      // Default is 300ms
      act(() => {
        vi.advanceTimersByTime(300);
      });

      act(() => {
        result.current();
      });

      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  describe("Trailing Execution", () => {
    it("should execute trailing call after delay", () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useThrottle(callback, 1000));

      // First call
      act(() => {
        result.current();
      });
      expect(callback).toHaveBeenCalledTimes(1);

      // Multiple calls during throttle period
      act(() => {
        result.current();
        vi.advanceTimersByTime(200);
        result.current();
        vi.advanceTimersByTime(200);
        result.current();
      });

      // Still only one execution
      expect(callback).toHaveBeenCalledTimes(1);

      // Advance to trailing execution
      act(() => {
        vi.advanceTimersByTime(600);
      });

      // Trailing execution should have happened
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it("should update trailing call with latest invocation", () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useThrottle(callback, 1000));

      act(() => {
        result.current("arg1");
      });
      expect(callback).toHaveBeenCalledWith("arg1");

      // Multiple throttled calls with different args
      act(() => {
        result.current("arg2");
        result.current("arg3");
        result.current("arg4");
      });

      // Advance to trailing execution
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Should use last arguments
      expect(callback).toHaveBeenCalledWith("arg4");
    });
  });

  describe("Callback Arguments", () => {
    it("should pass arguments to callback", () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useThrottle(callback, 1000));

      act(() => {
        result.current("arg1", "arg2", 123);
      });

      expect(callback).toHaveBeenCalledWith("arg1", "arg2", 123);
    });

    it("should handle different argument types", () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useThrottle(callback, 1000));

      act(() => {
        result.current({ key: "value" }, [1, 2, 3], true, null);
      });

      expect(callback).toHaveBeenCalledWith(
        { key: "value" },
        [1, 2, 3],
        true,
        null,
      );
    });
  });

  describe("Callback Updates", () => {
    it("should use latest callback reference", () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      const { result, rerender } = renderHook(
        ({ cb }) => useThrottle(cb, 1000),
        {
          initialProps: { cb: callback1 },
        },
      );

      act(() => {
        result.current();
      });
      expect(callback1).toHaveBeenCalledTimes(1);

      // Update callback
      rerender({ cb: callback2 });

      act(() => {
        vi.advanceTimersByTime(1000);
      });

      act(() => {
        result.current();
      });

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
    });
  });

  describe("Return Value Stability", () => {
    it("should maintain stable reference", () => {
      const callback = vi.fn();
      const { result, rerender } = renderHook(() =>
        useThrottle(callback, 1000),
      );

      const initialThrottled = result.current;

      rerender();

      expect(result.current).toBe(initialThrottled);
    });

    it("should create new throttled function when delay changes", () => {
      const callback = vi.fn();
      const { result, rerender } = renderHook(
        ({ delay }) => useThrottle(callback, delay),
        {
          initialProps: { delay: 1000 },
        },
      );

      const initialThrottled = result.current;

      rerender({ delay: 500 });

      expect(result.current).not.toBe(initialThrottled);
    });
  });

  describe("Use Cases", () => {
    it("should work for scroll event throttling", () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useThrottle(callback, 100));

      // Simulate rapid scroll events
      for (let i = 0; i < 100; i++) {
        act(() => {
          result.current();
          vi.advanceTimersByTime(10);
        });
      }

      // Should have executed multiple times but not 100 times
      expect(callback.mock.calls.length).toBeLessThan(20);
      expect(callback.mock.calls.length).toBeGreaterThan(5);
    });

    it("should work for resize event throttling", () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useThrottle(callback, 200));

      // First resize - immediate
      act(() => {
        result.current();
      });
      expect(callback).toHaveBeenCalledTimes(1);

      // Rapid resizes
      for (let i = 0; i < 10; i++) {
        act(() => {
          result.current();
          vi.advanceTimersByTime(50);
        });
      }

      // Should throttle most calls
      expect(callback.mock.calls.length).toBeLessThan(5);
    });

    it("should work for API call rate limiting", () => {
      let apiCallCount = 0;
      const makeApiCall = () => {
        apiCallCount++;
      };

      const { result } = renderHook(() => useThrottle(makeApiCall, 1000));

      // Rapid button clicks
      for (let i = 0; i < 10; i++) {
        act(() => {
          result.current();
        });
      }

      // Only first call executed immediately
      expect(apiCallCount).toBe(1);

      // Advance time for trailing call
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      // Trailing call executed
      expect(apiCallCount).toBe(2);
    });
  });

  describe("Performance", () => {
    it("should prevent excessive function calls", () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useThrottle(callback, 1000));

      // Make 1000 calls rapidly
      for (let i = 0; i < 1000; i++) {
        act(() => {
          result.current();
        });
      }

      // Should only call once (immediate) plus trailing
      act(() => {
        vi.advanceTimersByTime(1000);
      });

      expect(callback.mock.calls.length).toBeLessThanOrEqual(2);
    });
  });

  describe("Edge Cases", () => {
    it("should handle zero delay", () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useThrottle(callback, 0));

      act(() => {
        result.current();
        result.current();
        result.current();
      });

      act(() => {
        vi.advanceTimersByTime(0);
      });

      // With 0 delay, should execute immediately
      expect(callback.mock.calls.length).toBeGreaterThan(0);
    });

    it("should handle very long delays", () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useThrottle(callback, 10000));

      act(() => {
        result.current();
      });
      expect(callback).toHaveBeenCalledTimes(1);

      act(() => {
        result.current();
      });

      act(() => {
        vi.advanceTimersByTime(9999);
      });

      // Still throttled
      expect(callback).toHaveBeenCalledTimes(1);

      act(() => {
        vi.advanceTimersByTime(1);
      });

      // Trailing call
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it("should handle unmount during throttle period", () => {
      const callback = vi.fn();
      const { result, unmount } = renderHook(() => useThrottle(callback, 1000));

      act(() => {
        result.current();
        result.current();
      });

      unmount();

      // Should not throw
      expect(() => {
        act(() => {
          vi.advanceTimersByTime(1000);
        });
      }).not.toThrow();
    });
  });

  describe("Type Safety", () => {
    it("should preserve callback types", () => {
      const callback = vi.fn((a: string, b: number) => {
        return a.length + b;
      });

      const { result } = renderHook(() => useThrottle(callback, 1000));

      act(() => {
        result.current("test", 42);
      });

      expect(callback).toHaveBeenCalledWith("test", 42);
    });
  });
});
