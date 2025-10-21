/**
 * useSpring Hook Tests
 * Tests for physics-based spring animations
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SPRING_PRESETS, useSpring } from "./useSpring.js";

describe("useSpring", () => {
  describe("Basic Functionality", () => {
    it("should return initial target value", () => {
      const { result } = renderHook(() => useSpring(100));

      expect(result.current).toBe(100);
    });

    it("should handle zero value", () => {
      const { result } = renderHook(() => useSpring(0));

      expect(result.current).toBe(0);
    });

    it("should handle negative values", () => {
      const { result } = renderHook(() => useSpring(-50));

      expect(result.current).toBe(-50);
    });

    it("should handle decimal values", () => {
      const { result } = renderHook(() => useSpring(0.5));

      expect(result.current).toBe(0.5);
    });

    it("should return a number", () => {
      const { result } = renderHook(() => useSpring(42));

      expect(typeof result.current).toBe("number");
    });
  });

  describe("Spring Presets", () => {
    it("should use default preset", () => {
      const { result } = renderHook(() => useSpring(100, "default"));

      expect(result.current).toBe(100);
    });

    it("should accept gentle preset", () => {
      const { result } = renderHook(() => useSpring(100, "gentle"));

      expect(result.current).toBe(100);
    });

    it("should accept wobbly preset", () => {
      const { result } = renderHook(() => useSpring(100, "wobbly"));

      expect(result.current).toBe(100);
    });

    it("should accept stiff preset", () => {
      const { result } = renderHook(() => useSpring(100, "stiff"));

      expect(result.current).toBe(100);
    });

    it("should accept slow preset", () => {
      const { result } = renderHook(() => useSpring(100, "slow"));

      expect(result.current).toBe(100);
    });

    it("should accept molasses preset", () => {
      const { result } = renderHook(() => useSpring(100, "molasses"));

      expect(result.current).toBe(100);
    });
  });

  describe("Custom Spring Configuration", () => {
    it("should accept custom stiffness", () => {
      const { result } = renderHook(() =>
        useSpring(100, { stiffness: 200, damping: 20, mass: 1 }),
      );

      expect(result.current).toBe(100);
    });

    it("should accept custom damping", () => {
      const { result } = renderHook(() =>
        useSpring(100, { stiffness: 170, damping: 30, mass: 1 }),
      );

      expect(result.current).toBe(100);
    });

    it("should accept custom mass", () => {
      const { result } = renderHook(() =>
        useSpring(100, { stiffness: 170, damping: 26, mass: 2 }),
      );

      expect(result.current).toBe(100);
    });

    it("should accept all custom config", () => {
      const { result } = renderHook(() =>
        useSpring(100, {
          stiffness: 250,
          damping: 35,
          mass: 1.5,
          velocity: 10,
        }),
      );

      expect(result.current).toBe(100);
    });

    it("should handle partial config with defaults", () => {
      const { result } = renderHook(() => useSpring(100, { stiffness: 200 }));

      expect(result.current).toBe(100);
    });
  });

  describe("Value Changes", () => {
    it("should update when target changes", () => {
      const { result, rerender } = renderHook(
        ({ target }) => useSpring(target),
        {
          initialProps: { target: 0 },
        },
      );

      expect(result.current).toBe(0);

      rerender({ target: 100 });

      // Value should start moving towards target
      expect(result.current).toBeDefined();
    });

    it("should handle rapid target changes", () => {
      const { result, rerender } = renderHook(
        ({ target }) => useSpring(target),
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
        ({ target }) => useSpring(target),
        {
          initialProps: { target: 100 },
        },
      );

      rerender({ target: -100 });

      expect(result.current).toBeDefined();
    });
  });

  describe("Preset Values", () => {
    it("should have correct default preset values", () => {
      expect(SPRING_PRESETS.default).toEqual({
        stiffness: 170,
        damping: 26,
        mass: 1,
        velocity: 0,
      });
    });

    it("should have correct gentle preset values", () => {
      expect(SPRING_PRESETS.gentle).toEqual({
        stiffness: 120,
        damping: 14,
        mass: 1,
        velocity: 0,
      });
    });

    it("should have correct wobbly preset values", () => {
      expect(SPRING_PRESETS.wobbly).toEqual({
        stiffness: 180,
        damping: 12,
        mass: 1,
        velocity: 0,
      });
    });

    it("should have correct stiff preset values", () => {
      expect(SPRING_PRESETS.stiff).toEqual({
        stiffness: 210,
        damping: 20,
        mass: 1,
        velocity: 0,
      });
    });

    it("should have correct slow preset values", () => {
      expect(SPRING_PRESETS.slow).toEqual({
        stiffness: 280,
        damping: 60,
        mass: 1,
        velocity: 0,
      });
    });

    it("should have correct molasses preset values", () => {
      expect(SPRING_PRESETS.molasses).toEqual({
        stiffness: 280,
        damping: 120,
        mass: 1,
        velocity: 0,
      });
    });
  });

  describe("Edge Cases", () => {
    it("should handle very large values", () => {
      const { result } = renderHook(() => useSpring(1000000));

      expect(result.current).toBe(1000000);
    });

    it("should handle very small values", () => {
      const { result } = renderHook(() => useSpring(0.0001));

      expect(result.current).toBe(0.0001);
    });

    it("should handle same initial and target", () => {
      const { result } = renderHook(() => useSpring(50));

      expect(result.current).toBe(50);
    });

    it("should handle zero stiffness gracefully", () => {
      const { result } = renderHook(() =>
        useSpring(100, { stiffness: 0, damping: 20, mass: 1 }),
      );

      expect(result.current).toBeDefined();
    });

    it("should handle zero damping gracefully", () => {
      const { result } = renderHook(() =>
        useSpring(100, { stiffness: 170, damping: 0, mass: 1 }),
      );

      expect(result.current).toBeDefined();
    });
  });

  describe("Performance", () => {
    it("should not cause infinite loops", () => {
      const { result } = renderHook(() => useSpring(100));

      // Should complete without hanging
      expect(result.current).toBeDefined();
    });

    it("should handle multiple instances", () => {
      const { result } = renderHook(() => {
        const spring1 = useSpring(100);
        const spring2 = useSpring(200);
        const spring3 = useSpring(300);
        return { spring1, spring2, spring3 };
      });

      expect(result.current.spring1).toBe(100);
      expect(result.current.spring2).toBe(200);
      expect(result.current.spring3).toBe(300);
    });
  });

  describe("Type Safety", () => {
    it("should accept number values", () => {
      const { result } = renderHook(() => useSpring(42));

      expect(typeof result.current).toBe("number");
    });

    it("should return number type", () => {
      const { result } = renderHook(() => useSpring(0));

      const value: number = result.current;
      expect(typeof value).toBe("number");
    });
  });
});
