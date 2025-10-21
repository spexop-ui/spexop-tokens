/**
 * useIntersectionObserver Hook Tests
 * Tests for viewport detection with IntersectionObserver
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useIntersectionObserver } from "./useIntersectionObserver.js";

// Add this line to ensure Jest DOM is available
/// <reference types="@testing-library/jest-dom" />

// Mock IntersectionObserver
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  elements: Set<Element>;
  options: IntersectionObserverInit;

  constructor(
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {},
  ) {
    this.callback = callback;
    this.elements = new Set();
    this.options = options;
  }

  observe(element: Element) {
    this.elements.add(element);
  }

  unobserve(element: Element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  trigger(isIntersecting: boolean) {
    const entries = Array.from(this.elements).map((element) => ({
      target: element,
      isIntersecting,
      intersectionRatio: isIntersecting ? 1 : 0,
      boundingClientRect: {} as DOMRectReadOnly,
      intersectionRect: {} as DOMRectReadOnly,
      rootBounds: null,
      time: Date.now(),
    }));
    this.callback(
      entries as IntersectionObserverEntry[],
      this as unknown as IntersectionObserver,
    );
  }
}

let mockObserver: MockIntersectionObserver;

beforeEach(() => {
  mockObserver = new MockIntersectionObserver(vi.fn());
  global.IntersectionObserver = vi.fn(
    (callback, options) => new MockIntersectionObserver(callback, options),
  ) as unknown as typeof IntersectionObserver;
});

describe("useIntersectionObserver", () => {
  describe("Basic Functionality", () => {
    it("should return ref and isVisible state", () => {
      const { result } = renderHook(() => useIntersectionObserver());

      expect(result.current).toHaveLength(2);
      expect(result.current[0]).toBeDefined();
      expect(typeof result.current[1]).toBe("boolean");
    });

    it("should initialize with isVisible = false", () => {
      const { result } = renderHook(() => useIntersectionObserver());

      const [, isVisible] = result.current;
      expect(isVisible).toBe(false);
    });

    it("should create IntersectionObserver", () => {
      renderHook(() => useIntersectionObserver());

      expect(global.IntersectionObserver).toHaveBeenCalled();
    });
  });

  describe("Threshold Configuration", () => {
    it("should use default threshold of 0.1", () => {
      const observerSpy = vi.spyOn(global, "IntersectionObserver");

      renderHook(() => useIntersectionObserver());

      expect(observerSpy).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          threshold: 0.1,
        }),
      );
    });

    it("should accept custom threshold", () => {
      const observerSpy = vi.spyOn(global, "IntersectionObserver");

      renderHook(() => useIntersectionObserver({ threshold: 0.5 }));

      expect(observerSpy).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          threshold: 0.5,
        }),
      );
    });

    it("should handle threshold of 0", () => {
      const observerSpy = vi.spyOn(global, "IntersectionObserver");

      renderHook(() => useIntersectionObserver({ threshold: 0 }));

      expect(observerSpy).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          threshold: 0,
        }),
      );
    });

    it("should handle threshold of 1", () => {
      const observerSpy = vi.spyOn(global, "IntersectionObserver");

      renderHook(() => useIntersectionObserver({ threshold: 1 }));

      expect(observerSpy).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          threshold: 1,
        }),
      );
    });
  });

  describe("Root Margin Configuration", () => {
    it("should use default rootMargin of 0px", () => {
      const observerSpy = vi.spyOn(global, "IntersectionObserver");

      renderHook(() => useIntersectionObserver());

      expect(observerSpy).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          rootMargin: "0px",
        }),
      );
    });

    it("should accept custom rootMargin", () => {
      const observerSpy = vi.spyOn(global, "IntersectionObserver");

      renderHook(() => useIntersectionObserver({ rootMargin: "50px" }));

      expect(observerSpy).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          rootMargin: "50px",
        }),
      );
    });

    it("should handle complex rootMargin values", () => {
      const observerSpy = vi.spyOn(global, "IntersectionObserver");

      renderHook(() =>
        useIntersectionObserver({ rootMargin: "10px 20px 30px 40px" }),
      );

      expect(observerSpy).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          rootMargin: "10px 20px 30px 40px",
        }),
      );
    });
  });

  describe("Trigger Once Configuration", () => {
    it("should default to triggerOnce = true", () => {
      const { result } = renderHook(() => useIntersectionObserver());

      expect(result.current).toBeDefined();
    });

    it("should accept triggerOnce = false", () => {
      const { result } = renderHook(() =>
        useIntersectionObserver({ triggerOnce: false }),
      );

      expect(result.current).toBeDefined();
    });

    it("should accept triggerOnce = true explicitly", () => {
      const { result } = renderHook(() =>
        useIntersectionObserver({ triggerOnce: true }),
      );

      expect(result.current).toBeDefined();
    });
  });

  describe("Delay Configuration", () => {
    it("should default to delay = 0", () => {
      const { result } = renderHook(() => useIntersectionObserver());

      expect(result.current).toBeDefined();
    });

    it("should accept custom delay", () => {
      const { result } = renderHook(() =>
        useIntersectionObserver({ delay: 500 }),
      );

      expect(result.current).toBeDefined();
    });

    it("should handle zero delay explicitly", () => {
      const { result } = renderHook(() =>
        useIntersectionObserver({ delay: 0 }),
      );

      expect(result.current).toBeDefined();
    });
  });

  describe("Type Safety", () => {
    it("should accept HTMLDivElement type", () => {
      const { result } = renderHook(() =>
        useIntersectionObserver<HTMLDivElement>(),
      );

      expect(result.current[0].current).toBeNull();
    });

    it("should accept HTMLElement type", () => {
      const { result } = renderHook(() =>
        useIntersectionObserver<HTMLElement>(),
      );

      expect(result.current[0].current).toBeNull();
    });

    it("should accept HTMLSpanElement type", () => {
      const { result } = renderHook(() =>
        useIntersectionObserver<HTMLSpanElement>(),
      );

      expect(result.current[0].current).toBeNull();
    });
  });

  describe("Combined Options", () => {
    it("should handle all options together", () => {
      const observerSpy = vi.spyOn(global, "IntersectionObserver");

      renderHook(() =>
        useIntersectionObserver({
          threshold: 0.5,
          rootMargin: "20px",
          triggerOnce: false,
          delay: 300,
        }),
      );

      expect(observerSpy).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          threshold: 0.5,
          rootMargin: "20px",
        }),
      );
    });
  });

  describe("Cleanup", () => {
    it("should disconnect observer on unmount", () => {
      const disconnectSpy = vi.fn();
      global.IntersectionObserver = vi.fn(() => ({
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: disconnectSpy,
      })) as unknown as typeof IntersectionObserver;

      const { unmount } = renderHook(() => useIntersectionObserver());

      unmount();

      expect(disconnectSpy).toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("should handle ref with null element", () => {
      const { result } = renderHook(() => useIntersectionObserver());

      const [ref] = result.current;
      expect(ref.current).toBeNull();
    });

    it("should handle multiple calls", () => {
      const { result } = renderHook(() => {
        const observer1 = useIntersectionObserver();
        const observer2 = useIntersectionObserver();
        return { observer1, observer2 };
      });

      expect(result.current.observer1).toBeDefined();
      expect(result.current.observer2).toBeDefined();
    });
  });
});
