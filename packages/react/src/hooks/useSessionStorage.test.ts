/// <reference path="../vitest.d.ts" />

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useSessionStorage } from "./useSessionStorage";

describe("useSessionStorage", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  describe("Basic Functionality", () => {
    it("should use initial value when key does not exist", () => {
      const { result } = renderHook(() =>
        useSessionStorage("test-key", "initial"),
      );

      const [value] = result.current;
      expect(value).toBe("initial");
    });

    it("should read existing value from sessionStorage", () => {
      sessionStorage.setItem("test-key", JSON.stringify("existing"));

      const { result } = renderHook(() =>
        useSessionStorage("test-key", "initial"),
      );

      const [value] = result.current;
      expect(value).toBe("existing");
    });

    it("should update value in sessionStorage", () => {
      const { result } = renderHook(() =>
        useSessionStorage("test-key", "initial"),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue("updated");
      });

      const [value] = result.current;
      expect(value).toBe("updated");
      expect(sessionStorage.getItem("test-key")).toBe(
        JSON.stringify("updated"),
      );
    });

    it("should remove value from sessionStorage", () => {
      sessionStorage.setItem("test-key", JSON.stringify("value"));

      const { result } = renderHook(() =>
        useSessionStorage("test-key", "initial"),
      );

      act(() => {
        const [, , removeValue] = result.current;
        removeValue();
      });

      const [value] = result.current;
      expect(value).toBe("initial");
      expect(sessionStorage.getItem("test-key")).toBeNull();
    });
  });

  describe("Type Support", () => {
    it("should work with strings", () => {
      const { result } = renderHook(() =>
        useSessionStorage("string-key", "test"),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue("updated");
      });

      expect(result.current[0]).toBe("updated");
    });

    it("should work with numbers", () => {
      const { result } = renderHook(() => useSessionStorage("number-key", 42));

      act(() => {
        const [, setValue] = result.current;
        setValue(100);
      });

      expect(result.current[0]).toBe(100);
    });

    it("should work with booleans", () => {
      const { result } = renderHook(() =>
        useSessionStorage("boolean-key", false),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue(true);
      });

      expect(result.current[0]).toBe(true);
    });

    it("should work with objects", () => {
      const { result } = renderHook(() =>
        useSessionStorage("object-key", { name: "Alice", age: 30 }),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue({ name: "Bob", age: 25 });
      });

      expect(result.current[0]).toEqual({ name: "Bob", age: 25 });
    });

    it("should work with arrays", () => {
      const { result } = renderHook(() =>
        useSessionStorage("array-key", [1, 2, 3]),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue([4, 5, 6]);
      });

      expect(result.current[0]).toEqual([4, 5, 6]);
    });

    it("should work with null", () => {
      const { result } = renderHook(() =>
        useSessionStorage<string | null>("null-key", null),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue("value");
      });

      expect(result.current[0]).toBe("value");

      act(() => {
        const [, setValue] = result.current;
        setValue(null);
      });

      expect(result.current[0]).toBeNull();
    });
  });

  describe("Function Updater", () => {
    it("should support function updater like useState", () => {
      const { result } = renderHook(() => useSessionStorage("counter", 0));

      act(() => {
        const [, setValue] = result.current;
        setValue((prev) => prev + 1);
      });

      expect(result.current[0]).toBe(1);

      act(() => {
        const [, setValue] = result.current;
        setValue((prev) => prev + 1);
      });

      expect(result.current[0]).toBe(2);
    });

    it("should work with complex objects", () => {
      const { result } = renderHook(() =>
        useSessionStorage("user", { name: "Alice", count: 0 }),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue((prev) => ({ ...prev, count: prev.count + 1 }));
      });

      expect(result.current[0]).toEqual({ name: "Alice", count: 1 });
    });
  });

  describe("Error Handling", () => {
    it("should handle JSON parse errors", () => {
      const consoleWarnSpy = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      sessionStorage.setItem("invalid-key", "invalid-json{");

      const { result } = renderHook(() =>
        useSessionStorage("invalid-key", "fallback"),
      );

      expect(result.current[0]).toBe("fallback");
      expect(consoleWarnSpy).toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    it("should handle sessionStorage quota exceeded", () => {
      const consoleWarnSpy = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});
      const setItemSpy = vi
        .spyOn(Storage.prototype, "setItem")
        .mockImplementation(() => {
          throw new Error("QuotaExceededError");
        });

      const { result } = renderHook(() =>
        useSessionStorage("test-key", "initial"),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue("large-value");
      });

      expect(consoleWarnSpy).toHaveBeenCalled();

      setItemSpy.mockRestore();
      consoleWarnSpy.mockRestore();
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      expect(() => {
        renderHook(() => useSessionStorage("test-key", "initial"));
      }).not.toThrow();

      global.window = originalWindow;
    });

    it("should return initial value during SSR", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      const { result } = renderHook(() =>
        useSessionStorage("test-key", "initial"),
      );

      expect(result.current[0]).toBe("initial");

      global.window = originalWindow;
    });

    it("should warn when trying to set value during SSR", () => {
      const originalWindow = global.window;
      const consoleWarnSpy = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      // @ts-ignore
      global.window = undefined;

      const { result } = renderHook(() =>
        useSessionStorage("test-key", "initial"),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue("updated");
      });

      expect(consoleWarnSpy).toHaveBeenCalled();

      global.window = originalWindow;
      consoleWarnSpy.mockRestore();
    });
  });

  describe("Use Cases", () => {
    it("should work for multi-step form data", () => {
      const { result } = renderHook(() =>
        useSessionStorage("wizard-form", {
          step: 1,
          data: {},
        }),
      );

      act(() => {
        const [formData, setFormData] = result.current;
        setFormData({ ...formData, step: 2 });
      });

      expect(result.current[0]).toEqual({
        step: 2,
        data: {},
      });
    });

    it("should work for temporary filters", () => {
      const { result } = renderHook(() =>
        useSessionStorage("filters", {
          category: "all",
          priceRange: [0, 1000] as [number, number],
        }),
      );

      act(() => {
        const [filters, setFilters] = result.current;
        setFilters({ ...filters, category: "electronics" });
      });

      expect(result.current[0].category).toBe("electronics");
    });

    it("should work for shopping cart", () => {
      const { result } = renderHook(() =>
        useSessionStorage<Array<{ id: string; qty: number }>>("cart", []),
      );

      act(() => {
        const [, setCart] = result.current;
        setCart([{ id: "item1", qty: 2 }]);
      });

      expect(result.current[0]).toEqual([{ id: "item1", qty: 2 }]);

      act(() => {
        const [cart, setCart] = result.current;
        setCart([...cart, { id: "item2", qty: 1 }]);
      });

      expect(result.current[0]).toHaveLength(2);
    });

    it("should work for tab-specific state", () => {
      const { result } = renderHook(() =>
        useSessionStorage("tab-id", crypto.randomUUID()),
      );

      const tabId = result.current[0];
      expect(typeof tabId).toBe("string");
      expect(tabId.length).toBeGreaterThan(0);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty string key", () => {
      const { result } = renderHook(() => useSessionStorage("", "value"));

      expect(result.current[0]).toBe("value");
    });

    it("should handle special characters in key", () => {
      const { result } = renderHook(() =>
        useSessionStorage("key-with-special!@#$%", "value"),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue("updated");
      });

      expect(result.current[0]).toBe("updated");
    });

    it("should handle multiple instances with same key", () => {
      const { result: result1 } = renderHook(() =>
        useSessionStorage("shared-key", "initial"),
      );
      const { result: result2 } = renderHook(() =>
        useSessionStorage("shared-key", "initial"),
      );

      act(() => {
        const [, setValue] = result1.current;
        setValue("updated");
      });

      // result1 should be updated
      expect(result1.current[0]).toBe("updated");

      // result2 should still have old value (no cross-tab sync in sessionStorage)
      expect(result2.current[0]).toBe("initial");
    });
  });

  describe("Differences from localStorage", () => {
    it("should be isolated per tab (no cross-tab sync)", () => {
      const { result } = renderHook(() =>
        useSessionStorage("test-key", "initial"),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue("updated");
      });

      // Simulate storage event (like from another tab)
      // sessionStorage does NOT sync across tabs
      act(() => {
        const storageEvent = new StorageEvent("storage", {
          key: "test-key",
          newValue: JSON.stringify("from-another-tab"),
          storageArea: sessionStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      // Value should NOT change (no cross-tab sync)
      expect(result.current[0]).toBe("updated");
    });

    it("should clear on tab close (simulated)", () => {
      const { result } = renderHook(() =>
        useSessionStorage("test-key", "initial"),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue("session-data");
      });

      expect(sessionStorage.getItem("test-key")).toBe(
        JSON.stringify("session-data"),
      );

      // Simulate tab close by clearing sessionStorage
      sessionStorage.clear();

      // Re-mount the hook (simulate new tab/session)
      const { result: newResult } = renderHook(() =>
        useSessionStorage("test-key", "initial"),
      );

      // Should use initial value (sessionStorage was cleared)
      expect(newResult.current[0]).toBe("initial");
    });
  });

  describe("Performance", () => {
    it("should not cause unnecessary re-renders", () => {
      let renderCount = 0;
      const { result, rerender } = renderHook(() => {
        renderCount++;
        return useSessionStorage("test-key", "initial");
      });

      expect(renderCount).toBe(1);

      rerender();
      expect(renderCount).toBe(2);

      // Calling setValue should cause one re-render
      act(() => {
        const [, setValue] = result.current;
        setValue("updated");
      });

      expect(renderCount).toBe(3);
    });
  });
});
