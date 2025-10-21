/// <reference path="../vitest.d.ts" />

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("Basic Functionality", () => {
    it("should use initial value when key does not exist", () => {
      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial"),
      );

      const [value] = result.current;
      expect(value).toBe("initial");
    });

    it("should read existing value from localStorage", () => {
      localStorage.setItem("test-key", JSON.stringify("existing"));

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial"),
      );

      const [value] = result.current;
      expect(value).toBe("existing");
    });

    it("should update value in localStorage", () => {
      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial"),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue("updated");
      });

      const [value] = result.current;
      expect(value).toBe("updated");
      expect(localStorage.getItem("test-key")).toBe(JSON.stringify("updated"));
    });

    it("should remove value from localStorage", () => {
      localStorage.setItem("test-key", JSON.stringify("value"));

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial"),
      );

      act(() => {
        const [, , removeValue] = result.current;
        removeValue();
      });

      const [value] = result.current;
      expect(value).toBe("initial");
      expect(localStorage.getItem("test-key")).toBeNull();
    });
  });

  describe("Type Support", () => {
    it("should work with strings", () => {
      const { result } = renderHook(() =>
        useLocalStorage("string-key", "test"),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue("updated");
      });

      expect(result.current[0]).toBe("updated");
    });

    it("should work with numbers", () => {
      const { result } = renderHook(() => useLocalStorage("number-key", 42));

      act(() => {
        const [, setValue] = result.current;
        setValue(100);
      });

      expect(result.current[0]).toBe(100);
    });

    it("should work with booleans", () => {
      const { result } = renderHook(() =>
        useLocalStorage("boolean-key", false),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue(true);
      });

      expect(result.current[0]).toBe(true);
    });

    it("should work with objects", () => {
      const { result } = renderHook(() =>
        useLocalStorage("object-key", { name: "Alice", age: 30 }),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue({ name: "Bob", age: 25 });
      });

      expect(result.current[0]).toEqual({ name: "Bob", age: 25 });
    });

    it("should work with arrays", () => {
      const { result } = renderHook(() =>
        useLocalStorage("array-key", [1, 2, 3]),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue([4, 5, 6]);
      });

      expect(result.current[0]).toEqual([4, 5, 6]);
    });

    it("should work with null", () => {
      const { result } = renderHook(() =>
        useLocalStorage<string | null>("null-key", null),
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
      const { result } = renderHook(() => useLocalStorage("counter", 0));

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
        useLocalStorage("user", { name: "Alice", count: 0 }),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue((prev) => ({ ...prev, count: prev.count + 1 }));
      });

      expect(result.current[0]).toEqual({ name: "Alice", count: 1 });
    });
  });

  describe("Cross-Tab Synchronization", () => {
    it("should sync when storage changes in another tab", () => {
      const { result } = renderHook(() =>
        useLocalStorage("sync-key", "initial"),
      );

      expect(result.current[0]).toBe("initial");

      // Simulate storage event from another tab
      act(() => {
        const storageEvent = new StorageEvent("storage", {
          key: "sync-key",
          newValue: JSON.stringify("from-another-tab"),
          storageArea: localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      expect(result.current[0]).toBe("from-another-tab");
    });

    it("should sync removal across tabs", () => {
      const { result } = renderHook(() =>
        useLocalStorage("sync-key", "initial"),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue("value");
      });

      expect(result.current[0]).toBe("value");

      // Simulate removal from another tab
      act(() => {
        const storageEvent = new StorageEvent("storage", {
          key: "sync-key",
          newValue: null,
          storageArea: localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      expect(result.current[0]).toBe("initial");
    });

    it("should ignore storage events for different keys", () => {
      const { result } = renderHook(() => useLocalStorage("my-key", "initial"));

      act(() => {
        const [, setValue] = result.current;
        setValue("my-value");
      });

      // Event for different key
      act(() => {
        const storageEvent = new StorageEvent("storage", {
          key: "other-key",
          newValue: JSON.stringify("other-value"),
          storageArea: localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      // Should not change
      expect(result.current[0]).toBe("my-value");
    });
  });

  describe("Error Handling", () => {
    it("should handle JSON parse errors", () => {
      const consoleWarnSpy = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      localStorage.setItem("invalid-key", "invalid-json{");

      const { result } = renderHook(() =>
        useLocalStorage("invalid-key", "fallback"),
      );

      expect(result.current[0]).toBe("fallback");
      expect(consoleWarnSpy).toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    it("should handle localStorage quota exceeded", () => {
      const consoleWarnSpy = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});
      const setItemSpy = vi
        .spyOn(Storage.prototype, "setItem")
        .mockImplementation(() => {
          throw new Error("QuotaExceededError");
        });

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial"),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue("large-value");
      });

      expect(consoleWarnSpy).toHaveBeenCalled();

      setItemSpy.mockRestore();
      consoleWarnSpy.mockRestore();
    });

    it("should handle corrupted storage events", () => {
      const consoleWarnSpy = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial"),
      );

      act(() => {
        const storageEvent = new StorageEvent("storage", {
          key: "test-key",
          newValue: "invalid-json{",
          storageArea: localStorage,
        });
        window.dispatchEvent(storageEvent);
      });

      expect(consoleWarnSpy).toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      expect(() => {
        renderHook(() => useLocalStorage("test-key", "initial"));
      }).not.toThrow();

      global.window = originalWindow;
    });

    it("should return initial value during SSR", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      const { result } = renderHook(() =>
        useLocalStorage("test-key", "initial"),
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
        useLocalStorage("test-key", "initial"),
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

  describe("Cleanup", () => {
    it("should remove event listener on unmount", () => {
      const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

      const { unmount } = renderHook(() =>
        useLocalStorage("test-key", "initial"),
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "storage",
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });
  });

  describe("Use Cases", () => {
    it("should work for theme persistence", () => {
      const { result } = renderHook(() =>
        useLocalStorage("theme", "light" as "light" | "dark"),
      );

      expect(result.current[0]).toBe("light");

      act(() => {
        const [, setTheme] = result.current;
        setTheme("dark");
      });

      expect(result.current[0]).toBe("dark");
      expect(localStorage.getItem("theme")).toBe(JSON.stringify("dark"));
    });

    it("should work for user preferences", () => {
      const { result } = renderHook(() =>
        useLocalStorage("user-prefs", {
          notifications: true,
          language: "en",
        }),
      );

      act(() => {
        const [prefs, setPrefs] = result.current;
        setPrefs({ ...prefs, notifications: false });
      });

      expect(result.current[0]).toEqual({
        notifications: false,
        language: "en",
      });
    });

    it("should work for recent items list", () => {
      const { result } = renderHook(() =>
        useLocalStorage<string[]>("recent-items", []),
      );

      act(() => {
        const [, setItems] = result.current;
        setItems(["item1"]);
      });

      expect(result.current[0]).toEqual(["item1"]);

      act(() => {
        const [items, setItems] = result.current;
        setItems([...items, "item2"]);
      });

      expect(result.current[0]).toEqual(["item1", "item2"]);
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty string key", () => {
      const { result } = renderHook(() => useLocalStorage("", "value"));

      expect(result.current[0]).toBe("value");
    });

    it("should handle special characters in key", () => {
      const { result } = renderHook(() =>
        useLocalStorage("key-with-special!@#$%", "value"),
      );

      act(() => {
        const [, setValue] = result.current;
        setValue("updated");
      });

      expect(result.current[0]).toBe("updated");
    });

    it("should handle multiple instances with same key", () => {
      const { result: result1 } = renderHook(() =>
        useLocalStorage("shared-key", "initial"),
      );
      const { result: result2 } = renderHook(() =>
        useLocalStorage("shared-key", "initial"),
      );

      act(() => {
        const [, setValue] = result1.current;
        setValue("updated");
      });

      // Both should eventually sync
      expect(result1.current[0]).toBe("updated");
    });
  });
});
