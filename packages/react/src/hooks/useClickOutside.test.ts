/// <reference path="../vitest.d.ts" />

import { renderHook } from "@testing-library/react";
import type { RefObject } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useClickOutside } from "./useClickOutside";

describe("useClickOutside", () => {
  let container: HTMLDivElement;
  let ref: RefObject<HTMLDivElement>;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ref = { current: container };
  });

  afterEach(() => {
    document.body.removeChild(container);
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should call callback when clicking outside", () => {
      const callback = vi.fn();
      renderHook(() => useClickOutside(ref, callback));

      // Click outside
      document.body.click();

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should not call callback when clicking inside", () => {
      const callback = vi.fn();
      renderHook(() => useClickOutside(ref, callback));

      // Click inside
      container.click();

      expect(callback).not.toHaveBeenCalled();
    });

    it("should pass the event to the callback", () => {
      const callback = vi.fn();
      renderHook(() => useClickOutside(ref, callback));

      const event = new MouseEvent("mousedown", { bubbles: true });
      document.body.dispatchEvent(event);

      expect(callback).toHaveBeenCalledWith(event);
    });
  });

  describe("Touch Events", () => {
    it("should handle touch events", () => {
      const callback = vi.fn();
      renderHook(() => useClickOutside(ref, callback));

      const event = new TouchEvent("touchstart", { bubbles: true });
      document.body.dispatchEvent(event);

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should not trigger on touch inside", () => {
      const callback = vi.fn();
      renderHook(() => useClickOutside(ref, callback));

      const event = new TouchEvent("touchstart", { bubbles: true });
      container.dispatchEvent(event);

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe("Active State", () => {
    it("should not call callback when inactive", () => {
      const callback = vi.fn();
      renderHook(() => useClickOutside(ref, callback, false));

      document.body.click();

      expect(callback).not.toHaveBeenCalled();
    });

    it("should call callback when active", () => {
      const callback = vi.fn();
      renderHook(() => useClickOutside(ref, callback, true));

      document.body.click();

      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should respect changes to active state", () => {
      const callback = vi.fn();
      const { rerender } = renderHook(
        ({ active }) => useClickOutside(ref, callback, active),
        {
          initialProps: { active: false },
        },
      );

      document.body.click();
      expect(callback).not.toHaveBeenCalled();

      rerender({ active: true });
      document.body.click();
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe("Callback Stability", () => {
    it("should not re-register listeners when callback changes", () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      const addEventListenerSpy = vi.spyOn(document, "addEventListener");

      const { rerender } = renderHook(({ cb }) => useClickOutside(ref, cb), {
        initialProps: { cb: callback1 },
      });

      const initialCallCount = addEventListenerSpy.mock.calls.length;

      rerender({ cb: callback2 });

      // Should not add more listeners
      expect(addEventListenerSpy.mock.calls.length).toBe(initialCallCount);

      // Should use new callback
      document.body.click();
      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalledTimes(1);

      addEventListenerSpy.mockRestore();
    });
  });

  describe("Cleanup", () => {
    it("should remove event listeners on unmount", () => {
      const callback = vi.fn();
      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

      const { unmount } = renderHook(() => useClickOutside(ref, callback));

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "mousedown",
        expect.any(Function),
      );
      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "touchstart",
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });

    it("should not call callback after unmount", () => {
      const callback = vi.fn();
      const { unmount } = renderHook(() => useClickOutside(ref, callback));

      unmount();

      document.body.click();

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("should handle null ref", () => {
      const callback = vi.fn();
      const nullRef = { current: null } as unknown as RefObject<HTMLDivElement>;

      renderHook(() => useClickOutside(nullRef, callback));

      document.body.click();

      // Should call callback since there's no element to check
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should handle nested elements", () => {
      const callback = vi.fn();
      const child = document.createElement("div");
      container.appendChild(child);

      renderHook(() => useClickOutside(ref, callback));

      // Click on child (inside container)
      child.click();

      expect(callback).not.toHaveBeenCalled();
    });

    it("should handle multiple instances", () => {
      const callback1 = vi.fn();
      const callback2 = vi.fn();
      const ref1: RefObject<HTMLDivElement> = { current: container };
      const ref2: RefObject<HTMLDivElement> = {
        current: document.createElement("div"),
      };

      document.body.appendChild(ref2.current as HTMLElement);

      renderHook(() => useClickOutside(ref1, callback1));
      renderHook(() => useClickOutside(ref2, callback2));

      document.body.click();

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);

      document.body.removeChild(ref2.current as HTMLElement);
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      const callback = vi.fn();

      expect(() => {
        renderHook(() => useClickOutside(ref, callback));
      }).not.toThrow();

      global.window = originalWindow;
    });
  });
});
