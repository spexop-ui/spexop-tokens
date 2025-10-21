/// <reference path="../vitest.d.ts" />

import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useHover } from "./useHover";

describe("useHover", () => {
  let element: HTMLDivElement;

  beforeEach(() => {
    element = document.createElement("div");
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
  });

  describe("Basic Functionality", () => {
    it("should return ref and false initially", () => {
      const { result } = renderHook(() => useHover());
      const [ref, isHovered] = result.current;

      expect(ref.current).toBeNull();
      expect(isHovered).toBe(false);
    });

    it("should set isHovered to true on mouseenter", () => {
      const { result } = renderHook(() => useHover());
      const [ref] = result.current;

      // Manually set ref
      ref.current = element;

      const mouseEnterEvent = new MouseEvent("mouseenter");
      element.dispatchEvent(mouseEnterEvent);

      const [, isHovered] = result.current;
      expect(isHovered).toBe(true);
    });

    it("should set isHovered to false on mouseleave", () => {
      const { result } = renderHook(() => useHover());
      const [ref] = result.current;

      ref.current = element;

      element.dispatchEvent(new MouseEvent("mouseenter"));
      element.dispatchEvent(new MouseEvent("mouseleave"));

      const [, isHovered] = result.current;
      expect(isHovered).toBe(false);
    });
  });

  describe("Multiple Hovers", () => {
    it("should handle multiple hover/unhover cycles", () => {
      const { result } = renderHook(() => useHover());
      const [ref] = result.current;

      ref.current = element;

      for (let i = 0; i < 5; i++) {
        element.dispatchEvent(new MouseEvent("mouseenter"));
        expect(result.current[1]).toBe(true);

        element.dispatchEvent(new MouseEvent("mouseleave"));
        expect(result.current[1]).toBe(false);
      }
    });
  });

  describe("Cleanup", () => {
    it("should remove event listeners on unmount", () => {
      const { result, unmount } = renderHook(() => useHover());
      const [ref] = result.current;

      ref.current = element;
      unmount();

      element.dispatchEvent(new MouseEvent("mouseenter"));
      expect(result.current[1]).toBe(false);
    });
  });
});
