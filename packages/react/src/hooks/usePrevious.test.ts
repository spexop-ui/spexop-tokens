/// <reference path="../vitest.d.ts" />

import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { usePrevious } from "./usePrevious";

describe("usePrevious", () => {
  describe("Basic Functionality", () => {
    it("should return undefined on first render", () => {
      const { result } = renderHook(() => usePrevious(0));

      expect(result.current).toBeUndefined();
    });

    it("should return previous value on second render", () => {
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        {
          initialProps: { value: 0 },
        },
      );

      expect(result.current).toBeUndefined();

      rerender({ value: 1 });

      expect(result.current).toBe(0);
    });

    it("should track multiple value changes", () => {
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        {
          initialProps: { value: 0 },
        },
      );

      expect(result.current).toBeUndefined();

      rerender({ value: 1 });
      expect(result.current).toBe(0);

      rerender({ value: 2 });
      expect(result.current).toBe(1);

      rerender({ value: 3 });
      expect(result.current).toBe(2);
    });
  });

  describe("Type Support", () => {
    it("should work with strings", () => {
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        {
          initialProps: { value: "initial" },
        },
      );

      rerender({ value: "updated" });

      expect(result.current).toBe("initial");
    });

    it("should work with numbers", () => {
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        {
          initialProps: { value: 42 },
        },
      );

      rerender({ value: 100 });

      expect(result.current).toBe(42);
    });

    it("should work with booleans", () => {
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        {
          initialProps: { value: false },
        },
      );

      rerender({ value: true });

      expect(result.current).toBe(false);
    });

    it("should work with objects", () => {
      const obj1 = { id: 1, name: "Alice" };
      const obj2 = { id: 2, name: "Bob" };

      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        {
          initialProps: { value: obj1 },
        },
      );

      rerender({ value: obj2 });

      expect(result.current).toBe(obj1);
      expect(result.current?.id).toBe(1);
    });

    it("should work with arrays", () => {
      const arr1 = [1, 2, 3];
      const arr2 = [4, 5, 6];

      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        {
          initialProps: { value: arr1 },
        },
      );

      rerender({ value: arr2 });

      expect(result.current).toBe(arr1);
      expect(result.current).toEqual([1, 2, 3]);
    });

    it("should work with null", () => {
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        {
          initialProps: { value: null as string | null },
        },
      );

      rerender({ value: "value" });

      expect(result.current).toBeNull();
    });

    it("should work with undefined", () => {
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        {
          initialProps: { value: undefined as string | undefined },
        },
      );

      rerender({ value: "value" });

      expect(result.current).toBeUndefined();
    });
  });

  describe("Use Cases", () => {
    it("should help compare current vs previous values", () => {
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        {
          initialProps: { value: 10 },
        },
      );

      rerender({ value: 15 });

      const current = 15;
      const previous = result.current ?? 0;
      const isIncreasing = current > previous;

      expect(isIncreasing).toBe(true);
    });

    it("should help detect changes", () => {
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        {
          initialProps: { value: { id: 1 } },
        },
      );

      rerender({ value: { id: 1 } });

      const hasIdChanged = result.current?.id !== 1;
      expect(hasIdChanged).toBe(false);

      rerender({ value: { id: 2 } });

      const hasIdChangedNow = result.current?.id !== 2;
      expect(hasIdChangedNow).toBe(true);
    });

    it("should work for animation direction tracking", () => {
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        {
          initialProps: { value: 50 },
        },
      );

      rerender({ value: 75 });
      const direction1 = 75 > (result.current ?? 0) ? "up" : "down";
      expect(direction1).toBe("up");

      rerender({ value: 25 });
      const direction2 = 25 > (result.current ?? 0) ? "up" : "down";
      expect(direction2).toBe("down");
    });

    it("should work for prop change detection", () => {
      const { result, rerender } = renderHook(
        ({ userId }) => usePrevious(userId),
        {
          initialProps: { userId: "user-1" },
        },
      );

      rerender({ userId: "user-2" });
      expect(result.current).toBe("user-1");

      rerender({ userId: "user-2" });
      expect(result.current).toBe("user-2");
    });
  });

  describe("Edge Cases", () => {
    it("should handle same value updates", () => {
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        {
          initialProps: { value: 5 },
        },
      );

      rerender({ value: 5 });

      expect(result.current).toBe(5);
    });

    it("should handle rapid changes", () => {
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        {
          initialProps: { value: 0 },
        },
      );

      for (let i = 1; i <= 10; i++) {
        rerender({ value: i });
        expect(result.current).toBe(i - 1);
      }
    });

    it("should handle object reference changes", () => {
      const obj = { value: 1 };
      const { result, rerender } = renderHook(
        ({ value }) => usePrevious(value),
        {
          initialProps: { value: obj },
        },
      );

      const sameObj = obj;
      rerender({ value: sameObj });

      expect(result.current).toBe(obj);
    });
  });

  describe("Performance", () => {
    it("should not cause unnecessary re-renders", () => {
      let renderCount = 0;
      const { rerender } = renderHook(
        ({ value }) => {
          renderCount++;
          return usePrevious(value);
        },
        {
          initialProps: { value: 0 },
        },
      );

      expect(renderCount).toBe(1);

      rerender({ value: 1 });
      expect(renderCount).toBe(2);

      rerender({ value: 2 });
      expect(renderCount).toBe(3);
    });
  });
});
