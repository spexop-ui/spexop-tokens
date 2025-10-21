/// <reference path="../vitest.d.ts" />

import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useEscapeKey } from "./useEscapeKey";

describe("useEscapeKey", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should call callback when Escape key is pressed", () => {
      const callback = vi.fn();
      renderHook(() => useEscapeKey(callback));

      const event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should not call callback for other keys", () => {
      const callback = vi.fn();
      renderHook(() => useEscapeKey(callback));

      const events = [
        new KeyboardEvent("keydown", { key: "Enter" }),
        new KeyboardEvent("keydown", { key: "Space" }),
        new KeyboardEvent("keydown", { key: "Tab" }),
        new KeyboardEvent("keydown", { key: "a" }),
      ];

      for (const event of events) {
        document.dispatchEvent(event);
      }

      expect(callback).not.toHaveBeenCalled();
    });

    it("should call callback multiple times", () => {
      const callback = vi.fn();
      renderHook(() => useEscapeKey(callback));

      for (let i = 0; i < 5; i++) {
        const event = new KeyboardEvent("keydown", { key: "Escape" });
        document.dispatchEvent(event);
      }

      expect(callback).toHaveBeenCalledTimes(5);
    });
  });

  describe("Active State", () => {
    it("should be active by default", () => {
      const callback = vi.fn();
      renderHook(() => useEscapeKey(callback));

      const event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should not call callback when inactive", () => {
      const callback = vi.fn();
      renderHook(() => useEscapeKey(callback, false));

      const event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);

      expect(callback).not.toHaveBeenCalled();
    });

    it("should respect active state changes", () => {
      const callback = vi.fn();
      const { rerender } = renderHook(
        ({ active }) => useEscapeKey(callback, active),
        {
          initialProps: { active: true },
        },
      );

      // Active - should call callback
      let event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);
      expect(callback).toHaveBeenCalledTimes(1);

      // Deactivate
      rerender({ active: false });

      // Inactive - should not call callback
      event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);
      expect(callback).toHaveBeenCalledTimes(1);

      // Reactivate
      rerender({ active: true });

      // Active again - should call callback
      event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);
      expect(callback).toHaveBeenCalledTimes(2);
    });
  });

  describe("Callback Stability", () => {
    it("should not re-register listeners when callback changes", () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      const addEventListenerSpy = vi.spyOn(document, "addEventListener");

      const { rerender } = renderHook(({ cb }) => useEscapeKey(cb), {
        initialProps: { cb: callback1 },
      });

      const initialCallCount = addEventListenerSpy.mock.calls.length;

      // Change callback
      rerender({ cb: callback2 });

      // Should not add more listeners (uses ref pattern)
      expect(addEventListenerSpy.mock.calls.length).toBe(initialCallCount);

      // Should use new callback
      const event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalledTimes(1);

      addEventListenerSpy.mockRestore();
    });

    it("should use latest callback without re-mounting", () => {
      const callbacks = [vi.fn(), vi.fn(), vi.fn()];
      const { rerender } = renderHook(({ cb }) => useEscapeKey(cb), {
        initialProps: { cb: callbacks[0] },
      });

      for (let i = 1; i < callbacks.length; i++) {
        rerender({ cb: callbacks[i] });
        const event = new KeyboardEvent("keydown", { key: "Escape" });
        document.dispatchEvent(event);

        // Only current callback should be called
        expect(callbacks[i]).toHaveBeenCalledTimes(1);
        for (let j = 0; j < i; j++) {
          expect(callbacks[j]).not.toHaveBeenCalled();
        }

        callbacks[i].mockClear();
      }
    });
  });

  describe("Cleanup", () => {
    it("should remove event listener on unmount", () => {
      const callback = vi.fn();
      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

      const { unmount } = renderHook(() => useEscapeKey(callback));

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });

    it("should not call callback after unmount", () => {
      const callback = vi.fn();
      const { unmount } = renderHook(() => useEscapeKey(callback));

      unmount();

      const event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);

      expect(callback).not.toHaveBeenCalled();
    });

    it("should cleanup on active state toggle", () => {
      const callback = vi.fn();
      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

      const { rerender } = renderHook(
        ({ active }) => useEscapeKey(callback, active),
        {
          initialProps: { active: true },
        },
      );

      // Toggle to inactive
      rerender({ active: false });

      expect(removeEventListenerSpy).toHaveBeenCalled();

      removeEventListenerSpy.mockRestore();
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      const callback = vi.fn();

      expect(() => {
        renderHook(() => useEscapeKey(callback));
      }).not.toThrow();

      global.window = originalWindow;
    });
  });

  describe("Use Cases", () => {
    it("should work for modal close", () => {
      const onClose = vi.fn();
      renderHook(() => useEscapeKey(onClose));

      const event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should work for conditional activation (drawer)", () => {
      const onClose = vi.fn();
      const { rerender } = renderHook(
        ({ isOpen }) => useEscapeKey(onClose, isOpen),
        {
          initialProps: { isOpen: false },
        },
      );

      // Try closing when drawer is closed
      let event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);
      expect(onClose).not.toHaveBeenCalled();

      // Open drawer
      rerender({ isOpen: true });

      // Now escape should work
      event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should work for search modal", () => {
      const onClose = vi.fn();
      renderHook(() => useEscapeKey(onClose, true));

      const event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe("Edge Cases", () => {
    it("should handle multiple instances", () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();

      renderHook(() => useEscapeKey(callback1));
      renderHook(() => useEscapeKey(callback2));

      const event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);

      // Both callbacks should be called
      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
    });

    it("should handle escape with modifiers", () => {
      const callback = vi.fn();
      renderHook(() => useEscapeKey(callback));

      // Escape with Shift
      let event = new KeyboardEvent("keydown", {
        key: "Escape",
        shiftKey: true,
      });
      document.dispatchEvent(event);
      expect(callback).toHaveBeenCalledTimes(1);

      // Escape with Ctrl
      event = new KeyboardEvent("keydown", { key: "Escape", ctrlKey: true });
      document.dispatchEvent(event);
      expect(callback).toHaveBeenCalledTimes(2);

      // Escape with Alt
      event = new KeyboardEvent("keydown", { key: "Escape", altKey: true });
      document.dispatchEvent(event);
      expect(callback).toHaveBeenCalledTimes(3);
    });

    it("should handle rapid escape presses", () => {
      const callback = vi.fn();
      renderHook(() => useEscapeKey(callback));

      for (let i = 0; i < 100; i++) {
        const event = new KeyboardEvent("keydown", { key: "Escape" });
        document.dispatchEvent(event);
      }

      expect(callback).toHaveBeenCalledTimes(100);
    });
  });

  describe("Performance", () => {
    it("should not cause unnecessary re-renders", () => {
      let renderCount = 0;
      const callback = vi.fn();

      renderHook(() => {
        renderCount++;
        useEscapeKey(callback);
      });

      const initialRenderCount = renderCount;

      const event = new KeyboardEvent("keydown", { key: "Escape" });
      document.dispatchEvent(event);

      // Should not cause re-render
      expect(renderCount).toBe(initialRenderCount);
    });
  });
});
