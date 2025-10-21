/// <reference path="../vitest.d.ts" />

import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useToggle } from "./useToggle";

describe("useToggle", () => {
  describe("Initial State", () => {
    it("should initialize with false by default", () => {
      const { result } = renderHook(() => useToggle());

      const [value] = result.current;
      expect(value).toBe(false);
    });

    it("should initialize with provided value", () => {
      const { result } = renderHook(() => useToggle(true));

      const [value] = result.current;
      expect(value).toBe(true);
    });
  });

  describe("Toggle Function", () => {
    it("should toggle from false to true", () => {
      const { result } = renderHook(() => useToggle(false));

      act(() => {
        const [, toggle] = result.current;
        toggle();
      });

      const [value] = result.current;
      expect(value).toBe(true);
    });

    it("should toggle from true to false", () => {
      const { result } = renderHook(() => useToggle(true));

      act(() => {
        const [, toggle] = result.current;
        toggle();
      });

      const [value] = result.current;
      expect(value).toBe(false);
    });

    it("should toggle multiple times", () => {
      const { result } = renderHook(() => useToggle(false));

      act(() => {
        const [, toggle] = result.current;
        toggle();
      });
      expect(result.current[0]).toBe(true);

      act(() => {
        const [, toggle] = result.current;
        toggle();
      });
      expect(result.current[0]).toBe(false);

      act(() => {
        const [, toggle] = result.current;
        toggle();
      });
      expect(result.current[0]).toBe(true);
    });

    it("should maintain stable reference", () => {
      const { result, rerender } = renderHook(() => useToggle());

      const [, initialToggle] = result.current;

      rerender();

      const [, newToggle] = result.current;

      expect(initialToggle).toBe(newToggle);
    });
  });

  describe("SetValue Function", () => {
    it("should set value to true", () => {
      const { result } = renderHook(() => useToggle(false));

      act(() => {
        const [, , setValue] = result.current;
        setValue(true);
      });

      const [value] = result.current;
      expect(value).toBe(true);
    });

    it("should set value to false", () => {
      const { result } = renderHook(() => useToggle(true));

      act(() => {
        const [, , setValue] = result.current;
        setValue(false);
      });

      const [value] = result.current;
      expect(value).toBe(false);
    });

    it("should override toggle state", () => {
      const { result } = renderHook(() => useToggle(false));

      act(() => {
        const [, toggle] = result.current;
        toggle();
      });
      expect(result.current[0]).toBe(true);

      act(() => {
        const [, , setValue] = result.current;
        setValue(false);
      });
      expect(result.current[0]).toBe(false);
    });
  });

  describe("Return Value Structure", () => {
    it("should return array with three elements", () => {
      const { result } = renderHook(() => useToggle());

      expect(Array.isArray(result.current)).toBe(true);
      expect(result.current).toHaveLength(3);
    });

    it("should return correct types", () => {
      const { result } = renderHook(() => useToggle());

      const [value, toggle, setValue] = result.current;

      expect(typeof value).toBe("boolean");
      expect(typeof toggle).toBe("function");
      expect(typeof setValue).toBe("function");
    });
  });

  describe("Use Cases", () => {
    it("should work as modal state", () => {
      const { result } = renderHook(() => useToggle(false));

      // Open modal
      act(() => {
        const [, , setIsOpen] = result.current;
        setIsOpen(true);
      });
      expect(result.current[0]).toBe(true);

      // Close modal
      act(() => {
        const [, , setIsOpen] = result.current;
        setIsOpen(false);
      });
      expect(result.current[0]).toBe(false);

      // Toggle modal
      act(() => {
        const [, toggle] = result.current;
        toggle();
      });
      expect(result.current[0]).toBe(true);
    });

    it("should work as visibility toggle", () => {
      const { result } = renderHook(() => useToggle(true));

      // Toggle visibility
      act(() => {
        const [, toggle] = result.current;
        toggle();
      });
      expect(result.current[0]).toBe(false);

      act(() => {
        const [, toggle] = result.current;
        toggle();
      });
      expect(result.current[0]).toBe(true);
    });
  });

  describe("Performance", () => {
    it("should not cause unnecessary re-renders", () => {
      let renderCount = 0;
      const { result, rerender } = renderHook(() => {
        renderCount++;
        return useToggle();
      });

      expect(renderCount).toBe(1);

      rerender();
      expect(renderCount).toBe(2);

      // Getting the toggle function should not cause re-render
      const [, toggle] = result.current;
      expect(renderCount).toBe(2);

      // Calling toggle should cause one re-render
      act(() => {
        toggle();
      });
      expect(renderCount).toBe(3);
    });
  });
});
