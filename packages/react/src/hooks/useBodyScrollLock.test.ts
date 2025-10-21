/// <reference path="../vitest.d.ts" />

import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useBodyScrollLock } from "./useBodyScrollLock";

describe("useBodyScrollLock", () => {
  beforeEach(() => {
    // Reset body styles
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";

    // Mock window dimensions
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
    Object.defineProperty(document.documentElement, "clientWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  afterEach(() => {
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should not lock scroll when isLocked is false", () => {
      renderHook(() => useBodyScrollLock(false));

      expect(document.body.style.overflow).toBe("");
      expect(document.body.style.paddingRight).toBe("");
    });

    it("should lock scroll when isLocked is true", () => {
      renderHook(() => useBodyScrollLock(true));

      expect(document.body.style.overflow).toBe("hidden");
    });

    it("should unlock scroll when changed from true to false", () => {
      const { rerender } = renderHook(
        ({ locked }) => useBodyScrollLock(locked),
        {
          initialProps: { locked: true },
        },
      );

      expect(document.body.style.overflow).toBe("hidden");

      rerender({ locked: false });

      expect(document.body.style.overflow).toBe("");
      expect(document.body.style.paddingRight).toBe("");
    });
  });

  describe("Scrollbar Compensation", () => {
    it("should compensate for scrollbar width", () => {
      // Simulate scrollbar present (inner width > client width)
      Object.defineProperty(window, "innerWidth", { value: 1024 });
      Object.defineProperty(document.documentElement, "clientWidth", {
        value: 1007,
      });

      renderHook(() => useBodyScrollLock(true));

      expect(document.body.style.paddingRight).toBe("17px");
    });

    it("should not add padding when no scrollbar", () => {
      // No scrollbar (equal widths)
      Object.defineProperty(window, "innerWidth", { value: 1024 });
      Object.defineProperty(document.documentElement, "clientWidth", {
        value: 1024,
      });

      renderHook(() => useBodyScrollLock(true));

      expect(document.body.style.paddingRight).toBe("");
    });
  });

  describe("Lock Stacking", () => {
    it("should support nested locks", () => {
      const { unmount: unmount1 } = renderHook(() => useBodyScrollLock(true));
      const { unmount: unmount2 } = renderHook(() => useBodyScrollLock(true));

      expect(document.body.style.overflow).toBe("hidden");

      // Unmount first lock - should still be locked
      unmount1();
      expect(document.body.style.overflow).toBe("hidden");

      // Unmount second lock - now should unlock
      unmount2();
      expect(document.body.style.overflow).toBe("");
    });

    it("should handle three nested locks", () => {
      const lock1 = renderHook(() => useBodyScrollLock(true));
      const lock2 = renderHook(() => useBodyScrollLock(true));
      const lock3 = renderHook(() => useBodyScrollLock(true));

      expect(document.body.style.overflow).toBe("hidden");

      lock1.unmount();
      expect(document.body.style.overflow).toBe("hidden");

      lock2.unmount();
      expect(document.body.style.overflow).toBe("hidden");

      lock3.unmount();
      expect(document.body.style.overflow).toBe("");
    });

    it("should handle locks toggling on and off", () => {
      const { rerender: rerender1 } = renderHook(
        ({ locked }) => useBodyScrollLock(locked),
        {
          initialProps: { locked: true },
        },
      );
      const { rerender: rerender2 } = renderHook(
        ({ locked }) => useBodyScrollLock(locked),
        {
          initialProps: { locked: true },
        },
      );

      expect(document.body.style.overflow).toBe("hidden");

      // Toggle first lock off
      rerender1({ locked: false });
      expect(document.body.style.overflow).toBe("hidden");

      // Toggle second lock off
      rerender2({ locked: false });
      expect(document.body.style.overflow).toBe("");

      // Toggle both back on
      rerender1({ locked: true });
      rerender2({ locked: true });
      expect(document.body.style.overflow).toBe("hidden");
    });
  });

  describe("Cleanup", () => {
    it("should cleanup on unmount", () => {
      const { unmount } = renderHook(() => useBodyScrollLock(true));

      expect(document.body.style.overflow).toBe("hidden");

      unmount();

      expect(document.body.style.overflow).toBe("");
      expect(document.body.style.paddingRight).toBe("");
    });

    it("should not affect body when unmounting inactive lock", () => {
      const { unmount } = renderHook(() => useBodyScrollLock(false));

      unmount();

      expect(document.body.style.overflow).toBe("");
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      expect(() => {
        renderHook(() => useBodyScrollLock(true));
      }).not.toThrow();

      global.window = originalWindow;
    });
  });

  describe("Use Cases", () => {
    it("should work for modal overlay", () => {
      const { rerender } = renderHook(
        ({ isOpen }) => useBodyScrollLock(isOpen),
        {
          initialProps: { isOpen: false },
        },
      );

      // Modal closed
      expect(document.body.style.overflow).toBe("");

      // Open modal
      rerender({ isOpen: true });
      expect(document.body.style.overflow).toBe("hidden");

      // Close modal
      rerender({ isOpen: false });
      expect(document.body.style.overflow).toBe("");
    });

    it("should work for drawer", () => {
      const { rerender } = renderHook(
        ({ isOpen }) => useBodyScrollLock(isOpen),
        {
          initialProps: { isOpen: false },
        },
      );

      rerender({ isOpen: true });
      expect(document.body.style.overflow).toBe("hidden");

      rerender({ isOpen: false });
      expect(document.body.style.overflow).toBe("");
    });

    it("should work for nested overlays (modal + drawer)", () => {
      const modal = renderHook(({ isOpen }) => useBodyScrollLock(isOpen), {
        initialProps: { isOpen: false },
      });
      const drawer = renderHook(({ isOpen }) => useBodyScrollLock(isOpen), {
        initialProps: { isOpen: false },
      });

      // Open modal
      modal.rerender({ isOpen: true });
      expect(document.body.style.overflow).toBe("hidden");

      // Open drawer on top of modal
      drawer.rerender({ isOpen: true });
      expect(document.body.style.overflow).toBe("hidden");

      // Close drawer - modal still open
      drawer.rerender({ isOpen: false });
      expect(document.body.style.overflow).toBe("hidden");

      // Close modal
      modal.rerender({ isOpen: false });
      expect(document.body.style.overflow).toBe("");
    });
  });

  describe("Edge Cases", () => {
    it("should handle rapid toggles", () => {
      const { rerender } = renderHook(
        ({ locked }) => useBodyScrollLock(locked),
        {
          initialProps: { locked: false },
        },
      );

      for (let i = 0; i < 10; i++) {
        rerender({ locked: true });
        rerender({ locked: false });
      }

      expect(document.body.style.overflow).toBe("");
    });

    it("should handle multiple instances with same state", () => {
      renderHook(() => useBodyScrollLock(true));
      renderHook(() => useBodyScrollLock(true));
      renderHook(() => useBodyScrollLock(true));

      expect(document.body.style.overflow).toBe("hidden");
    });

    it("should handle zero scrollbar width", () => {
      Object.defineProperty(window, "innerWidth", { value: 1024 });
      Object.defineProperty(document.documentElement, "clientWidth", {
        value: 1024,
      });

      renderHook(() => useBodyScrollLock(true));

      expect(document.body.style.paddingRight).toBe("");
    });
  });

  describe("Performance", () => {
    it("should not cause unnecessary style recalculations", () => {
      const { rerender } = renderHook(
        ({ locked }) => useBodyScrollLock(locked),
        {
          initialProps: { locked: true },
        },
      );

      const initialOverflow = document.body.style.overflow;

      // Rerender with same state
      rerender({ locked: true });

      expect(document.body.style.overflow).toBe(initialOverflow);
    });
  });
});
