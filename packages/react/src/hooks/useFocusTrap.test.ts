/// <reference path="../vitest.d.ts" />

import { renderHook } from "@testing-library/react";
import type { RefObject } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useFocusTrap } from "./useFocusTrap";

describe("useFocusTrap", () => {
  let container: HTMLDivElement;
  let ref: RefObject<HTMLDivElement>;
  let button1: HTMLButtonElement;
  let button2: HTMLButtonElement;
  let button3: HTMLButtonElement;

  beforeEach(() => {
    container = document.createElement("div");
    button1 = document.createElement("button");
    button2 = document.createElement("button");
    button3 = document.createElement("button");

    button1.textContent = "Button 1";
    button2.textContent = "Button 2";
    button3.textContent = "Button 3";

    container.appendChild(button1);
    container.appendChild(button2);
    container.appendChild(button3);
    document.body.appendChild(container);

    ref = { current: container };

    vi.useFakeTimers();
  });

  afterEach(() => {
    document.body.removeChild(container);
    vi.restoreAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should not trap focus when inactive", () => {
      renderHook(() => useFocusTrap(ref, false));

      button1.focus();
      expect(document.activeElement).toBe(button1);
    });

    it("should auto-focus first element when activated", () => {
      renderHook(() => useFocusTrap(ref, true));

      vi.runAllTimers();

      expect(document.activeElement).toBe(button1);
    });

    it("should trap tab at last element", () => {
      renderHook(() => useFocusTrap(ref, true));

      button3.focus();

      const tabEvent = new KeyboardEvent("keydown", {
        key: "Tab",
        bubbles: true,
        cancelable: true,
      });

      const preventDefaultSpy = vi.spyOn(tabEvent, "preventDefault");
      document.dispatchEvent(tabEvent);

      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it("should wrap to first element from last", () => {
      renderHook(() => useFocusTrap(ref, true));

      button3.focus();

      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Tab", bubbles: true }),
      );

      vi.runAllTimers();
    });
  });

  describe("ARIA Compliance", () => {
    it("should respect aria-hidden elements", () => {
      const hiddenButton = document.createElement("button");
      hiddenButton.setAttribute("aria-hidden", "true");
      container.appendChild(hiddenButton);

      renderHook(() => useFocusTrap(ref, true));

      vi.runAllTimers();

      expect(document.activeElement).toBe(button1);
    });

    it("should respect inert attribute", () => {
      const inertButton = document.createElement("button");
      inertButton.setAttribute("inert", "");
      container.appendChild(inertButton);

      renderHook(() => useFocusTrap(ref, true));

      vi.runAllTimers();
    });
  });

  describe("Cleanup", () => {
    it("should remove event listener on unmount", () => {
      const removeEventListenerSpy = vi.spyOn(document, "removeEventListener");

      const { unmount } = renderHook(() => useFocusTrap(ref, true));
      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith(
        "keydown",
        expect.any(Function),
      );

      removeEventListenerSpy.mockRestore();
    });

    it("should cancel RAF on unmount", () => {
      const cancelAnimationFrameSpy = vi.spyOn(window, "cancelAnimationFrame");

      const { unmount } = renderHook(() => useFocusTrap(ref, true));
      unmount();

      expect(cancelAnimationFrameSpy).toHaveBeenCalled();

      cancelAnimationFrameSpy.mockRestore();
    });
  });
});
