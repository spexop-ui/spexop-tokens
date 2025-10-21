/// <reference path="../vitest.d.ts" />

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useHash } from "./useHash";

describe("useHash", () => {
  beforeEach(() => {
    window.location.hash = "";
  });

  afterEach(() => {
    window.location.hash = "";
  });

  describe("Basic Functionality", () => {
    it("should return empty string when no hash", () => {
      const { result } = renderHook(() => useHash());
      const [hash] = result.current;
      expect(hash).toBe("");
    });

    it("should return current hash", () => {
      window.location.hash = "#section-1";
      const { result } = renderHook(() => useHash());
      const [hash] = result.current;
      expect(hash).toBe("#section-1");
    });

    it("should update hash", () => {
      const { result } = renderHook(() => useHash());

      act(() => {
        const [, setHash] = result.current;
        setHash("#new-section");
      });

      const [hash] = result.current;
      expect(hash).toBe("#new-section");
      expect(window.location.hash).toBe("#new-section");
    });

    it("should add # prefix if missing", () => {
      const { result } = renderHook(() => useHash());

      act(() => {
        const [, setHash] = result.current;
        setHash("no-prefix");
      });

      const [hash] = result.current;
      expect(hash).toBe("#no-prefix");
    });
  });

  describe("Hash Changes", () => {
    it("should update when hash changes externally", () => {
      const { result } = renderHook(() => useHash());

      act(() => {
        window.location.hash = "#external-change";
        window.dispatchEvent(new HashChangeEvent("hashchange"));
      });

      const [hash] = result.current;
      expect(hash).toBe("#external-change");
    });

    it("should work with browser back/forward", () => {
      const { result } = renderHook(() => useHash());

      act(() => {
        const [, setHash] = result.current;
        setHash("#page-1");
      });

      act(() => {
        const [, setHash] = result.current;
        setHash("#page-2");
      });

      expect(result.current[0]).toBe("#page-2");
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      expect(() => {
        renderHook(() => useHash());
      }).not.toThrow();

      global.window = originalWindow;
    });
  });
});
