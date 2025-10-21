/// <reference path="../vitest.d.ts" />

import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useKeyPress } from "./useKeyPress";

describe("useKeyPress", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Single Key", () => {
    it("should return false initially", () => {
      const { result } = renderHook(() => useKeyPress("a"));
      expect(result.current).toBe(false);
    });

    it("should return true when key is pressed", () => {
      const { result } = renderHook(() => useKeyPress("a"));

      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
      });

      expect(result.current).toBe(true);
    });

    it("should return false when key is released", () => {
      const { result } = renderHook(() => useKeyPress("a"));

      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
      });
      expect(result.current).toBe(true);

      act(() => {
        window.dispatchEvent(new KeyboardEvent("keyup", { key: "a" }));
      });
      expect(result.current).toBe(false);
    });

    it("should handle Escape key", () => {
      const { result } = renderHook(() => useKeyPress("Escape"));

      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
      });

      expect(result.current).toBe(true);
    });
  });

  describe("Key Combinations", () => {
    it("should detect Ctrl+S", () => {
      const { result } = renderHook(() => useKeyPress(["Control", "s"]));

      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));
      });
      expect(result.current).toBe(false);

      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "s" }));
      });
      expect(result.current).toBe(true);
    });

    it("should require all keys to be pressed", () => {
      const { result } = renderHook(() =>
        useKeyPress(["Control", "Shift", "z"]),
      );

      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Shift" }));
      });
      expect(result.current).toBe(false);

      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "z" }));
      });
      expect(result.current).toBe(true);
    });

    it("should return false when one key is released", () => {
      const { result } = renderHook(() => useKeyPress(["Control", "s"]));

      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "s" }));
      });
      expect(result.current).toBe(true);

      act(() => {
        window.dispatchEvent(new KeyboardEvent("keyup", { key: "Control" }));
      });
      expect(result.current).toBe(false);
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      expect(() => {
        renderHook(() => useKeyPress("a"));
      }).not.toThrow();

      global.window = originalWindow;
    });
  });

  describe("Cleanup", () => {
    it("should remove event listeners on unmount", () => {
      const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

      const { unmount } = renderHook(() => useKeyPress("a"));
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function),
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keyup",
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });
  });

  describe("Use Cases", () => {
    it("should work for save shortcut", () => {
      const { result } = renderHook(() => useKeyPress(["Control", "s"]));

      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "s" }));
      });

      expect(result.current).toBe(true);
    });

    it("should work for command palette", () => {
      const { result } = renderHook(() => useKeyPress(["Control", "k"]));

      act(() => {
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "Control" }));
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "k" }));
      });

      expect(result.current).toBe(true);
    });
  });
});
