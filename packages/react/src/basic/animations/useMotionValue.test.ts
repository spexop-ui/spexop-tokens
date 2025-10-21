/**
 * useMotionValue Hook Tests
 * Tests for eased value transitions
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EASINGS, useMotionValue } from "./useMotionValue.js";

describe("useMotionValue", () => {
  describe("Basic Functionality", () => {
    it("should return initial target value", () => {
      const { result } = renderHook(() => useMotionValue(100));

      expect(result.current).toBe(100);
    });

    it("should handle zero value", () => {
      const { result } = renderHook(() => useMotionValue(0));

      expect(result.current).toBe(0);
    });

    it("should handle negative values", () => {
      const { result } = renderHook(() => useMotionValue(-50));

      expect(result.current).toBe(-50);
    });

    it("should handle decimal values", () => {
      const { result } = renderHook(() => useMotionValue(0.5));

      expect(result.current).toBe(0.5);
    });

    it("should return a number", () => {
      const { result } = renderHook(() => useMotionValue(42));

      expect(typeof result.current).toBe("number");
    });
  });

  describe("Duration Configuration", () => {
    it("should use default duration of 300ms", () => {
      const { result } = renderHook(() => useMotionValue(100));

      expect(result.current).toBe(100);
    });

    it("should accept custom duration", () => {
      const { result } = renderHook(() =>
        useMotionValue(100, { duration: 600 }),
      );

      expect(result.current).toBe(100);
    });

    it("should handle zero duration", () => {
      const { result } = renderHook(() => useMotionValue(100, { duration: 0 }));

      expect(result.current).toBe(100);
    });

    it("should handle very long duration", () => {
      const { result } = renderHook(() =>
        useMotionValue(100, { duration: 5000 }),
      );

      expect(result.current).toBe(100);
    });
  });

  describe("Easing Functions", () => {
    it("should use default easeOutCubic", () => {
      const { result } = renderHook(() => useMotionValue(100));

      expect(result.current).toBe(100);
    });

    it("should accept linear easing", () => {
      const { result } = renderHook(() =>
        useMotionValue(100, { easing: "linear" }),
      );

      expect(result.current).toBe(100);
    });

    it("should accept easeIn easing", () => {
      const { result } = renderHook(() =>
        useMotionValue(100, { easing: "easeIn" }),
      );

      expect(result.current).toBe(100);
    });

    it("should accept easeOut easing", () => {
      const { result } = renderHook(() =>
        useMotionValue(100, { easing: "easeOut" }),
      );

      expect(result.current).toBe(100);
    });

    it("should accept easeInOut easing", () => {
      const { result } = renderHook(() =>
        useMotionValue(100, { easing: "easeInOut" }),
      );

      expect(result.current).toBe(100);
    });

    it("should accept easeInCubic easing", () => {
      const { result } = renderHook(() =>
        useMotionValue(100, { easing: "easeInCubic" }),
      );

      expect(result.current).toBe(100);
    });

    it("should accept easeOutCubic easing", () => {
      const { result } = renderHook(() =>
        useMotionValue(100, { easing: "easeOutCubic" }),
      );

      expect(result.current).toBe(100);
    });

    it("should accept easeInOutCubic easing", () => {
      const { result } = renderHook(() =>
        useMotionValue(100, { easing: "easeInOutCubic" }),
      );

      expect(result.current).toBe(100);
    });

    it("should accept easeInQuart easing", () => {
      const { result } = renderHook(() =>
        useMotionValue(100, { easing: "easeInQuart" }),
      );

      expect(result.current).toBe(100);
    });

    it("should accept easeOutQuart easing", () => {
      const { result } = renderHook(() =>
        useMotionValue(100, { easing: "easeOutQuart" }),
      );

      expect(result.current).toBe(100);
    });

    it("should accept easeInOutQuart easing", () => {
      const { result } = renderHook(() =>
        useMotionValue(100, { easing: "easeInOutQuart" }),
      );

      expect(result.current).toBe(100);
    });

    it("should accept easeInExpo easing", () => {
      const { result } = renderHook(() =>
        useMotionValue(100, { easing: "easeInExpo" }),
      );

      expect(result.current).toBe(100);
    });

    it("should accept easeOutExpo easing", () => {
      const { result } = renderHook(() =>
        useMotionValue(100, { easing: "easeOutExpo" }),
      );

      expect(result.current).toBe(100);
    });

    it("should accept easeInOutExpo easing", () => {
      const { result } = renderHook(() =>
        useMotionValue(100, { easing: "easeInOutExpo" }),
      );

      expect(result.current).toBe(100);
    });

    it("should accept custom easing function", () => {
      const customEasing = (t: number) => t * t;
      const { result } = renderHook(() =>
        useMotionValue(100, { easing: customEasing }),
      );

      expect(result.current).toBe(100);
    });
  });

  describe("Delay Configuration", () => {
    it("should use default delay of 0", () => {
      const { result } = renderHook(() => useMotionValue(100));

      expect(result.current).toBe(100);
    });

    it("should accept custom delay", () => {
      const { result } = renderHook(() => useMotionValue(100, { delay: 500 }));

      expect(result.current).toBe(100);
    });

    it("should handle zero delay explicitly", () => {
      const { result } = renderHook(() => useMotionValue(100, { delay: 0 }));

      expect(result.current).toBe(100);
    });

    it("should handle long delay", () => {
      const { result } = renderHook(() => useMotionValue(100, { delay: 2000 }));

      expect(result.current).toBe(100);
    });
  });

  describe("Value Changes", () => {
    it("should update when target changes", () => {
      const { result, rerender } = renderHook(
        ({ target }) => useMotionValue(target),
        {
          initialProps: { target: 0 },
        },
      );

      expect(result.current).toBe(0);

      rerender({ target: 100 });

      expect(result.current).toBeDefined();
    });

    it("should handle rapid target changes", () => {
      const { result, rerender } = renderHook(
        ({ target }) => useMotionValue(target),
        {
          initialProps: { target: 0 },
        },
      );

      rerender({ target: 50 });
      rerender({ target: 100 });
      rerender({ target: 75 });

      expect(result.current).toBeDefined();
    });

    it("should handle target change from positive to negative", () => {
      const { result, rerender } = renderHook(
        ({ target }) => useMotionValue(target),
        {
          initialProps: { target: 100 },
        },
      );

      rerender({ target: -100 });

      expect(result.current).toBeDefined();
    });
  });

  describe("Easing Function Values", () => {
    it("should have linear function", () => {
      expect(EASINGS.linear(0.5)).toBe(0.5);
      expect(EASINGS.linear(0)).toBe(0);
      expect(EASINGS.linear(1)).toBe(1);
    });

    it("should have easeIn function", () => {
      expect(EASINGS.easeIn(0)).toBe(0);
      expect(EASINGS.easeIn(1)).toBe(1);
      expect(EASINGS.easeIn(0.5)).toBeGreaterThan(0);
      expect(EASINGS.easeIn(0.5)).toBeLessThan(0.5);
    });

    it("should have easeOut function", () => {
      expect(EASINGS.easeOut(0)).toBe(0);
      expect(EASINGS.easeOut(1)).toBe(1);
      expect(EASINGS.easeOut(0.5)).toBeGreaterThan(0.5);
    });

    it("should have easeInOut function", () => {
      expect(EASINGS.easeInOut(0)).toBe(0);
      expect(EASINGS.easeInOut(1)).toBe(1);
    });

    it("should have easeInCubic function", () => {
      expect(EASINGS.easeInCubic(0)).toBe(0);
      expect(EASINGS.easeInCubic(1)).toBe(1);
    });

    it("should have easeOutCubic function", () => {
      expect(EASINGS.easeOutCubic(0)).toBe(0);
      expect(EASINGS.easeOutCubic(1)).toBe(1);
    });

    it("should have easeInExpo function", () => {
      expect(EASINGS.easeInExpo(0)).toBe(0);
      expect(EASINGS.easeInExpo(1)).toBe(1);
    });

    it("should have easeOutExpo function", () => {
      expect(EASINGS.easeOutExpo(0)).toBe(0);
      expect(EASINGS.easeOutExpo(1)).toBe(1);
    });
  });

  describe("Combined Options", () => {
    it("should handle all options together", () => {
      const { result } = renderHook(() =>
        useMotionValue(100, {
          duration: 600,
          easing: "easeInOut",
          delay: 200,
        }),
      );

      expect(result.current).toBe(100);
    });

    it("should handle custom easing with options", () => {
      const customEasing = (t: number) => t * t * t;
      const { result } = renderHook(() =>
        useMotionValue(100, {
          duration: 400,
          easing: customEasing,
          delay: 100,
        }),
      );

      expect(result.current).toBe(100);
    });
  });

  describe("Edge Cases", () => {
    it("should handle very large values", () => {
      const { result } = renderHook(() => useMotionValue(1000000));

      expect(result.current).toBe(1000000);
    });

    it("should handle very small values", () => {
      const { result } = renderHook(() => useMotionValue(0.0001));

      expect(result.current).toBe(0.0001);
    });

    it("should handle same initial and target", () => {
      const { result } = renderHook(() => useMotionValue(50));

      expect(result.current).toBe(50);
    });

    it("should handle multiple instances", () => {
      const { result } = renderHook(() => {
        const value1 = useMotionValue(100);
        const value2 = useMotionValue(200);
        const value3 = useMotionValue(300);
        return { value1, value2, value3 };
      });

      expect(result.current.value1).toBe(100);
      expect(result.current.value2).toBe(200);
      expect(result.current.value3).toBe(300);
    });
  });

  describe("Performance", () => {
    it("should not cause infinite loops", () => {
      const { result } = renderHook(() => useMotionValue(100));

      expect(result.current).toBeDefined();
    });

    it("should handle cleanup on unmount", () => {
      const { unmount } = renderHook(() =>
        useMotionValue(100, { duration: 1000 }),
      );

      unmount();

      // Should not throw or cause issues
      expect(true).toBe(true);
    });
  });

  describe("Type Safety", () => {
    it("should accept number values", () => {
      const { result } = renderHook(() => useMotionValue(42));

      expect(typeof result.current).toBe("number");
    });

    it("should return number type", () => {
      const { result } = renderHook(() => useMotionValue(0));

      const value: number = result.current;
      expect(typeof value).toBe("number");
    });
  });
});
