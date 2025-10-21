/// <reference path="../vitest.d.ts" />

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useQueryParams } from "./useQueryParams";

describe("useQueryParams", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  afterEach(() => {
    window.history.pushState({}, "", "/");
  });

  describe("Basic Functionality", () => {
    it("should return empty URLSearchParams initially", () => {
      const { result } = renderHook(() => useQueryParams());

      const [params] = result.current;
      expect(params.toString()).toBe("");
    });

    it("should read existing query params", () => {
      window.history.pushState({}, "", "/?category=electronics&sort=price");

      const { result } = renderHook(() => useQueryParams());

      const [params] = result.current;
      expect(params.get("category")).toBe("electronics");
      expect(params.get("sort")).toBe("price");
    });

    it("should update query params", () => {
      const { result } = renderHook(() => useQueryParams());

      act(() => {
        const [, setParams] = result.current;
        setParams({ category: "books" });
      });

      expect(window.location.search).toBe("?category=books");
    });

    it("should update multiple params", () => {
      const { result } = renderHook(() => useQueryParams());

      act(() => {
        const [, setParams] = result.current;
        setParams({ category: "electronics", sort: "price" });
      });

      const [params] = result.current;
      expect(params.get("category")).toBe("electronics");
      expect(params.get("sort")).toBe("price");
    });

    it("should preserve existing params when updating", () => {
      window.history.pushState({}, "", "/?existing=value");

      const { result } = renderHook(() => useQueryParams());

      act(() => {
        const [, setParams] = result.current;
        setParams({ new: "param" });
      });

      const [params] = result.current;
      expect(params.get("existing")).toBe("value");
      expect(params.get("new")).toBe("param");
    });

    it("should remove param when set to null", () => {
      window.history.pushState({}, "", "/?category=books&sort=price");

      const { result } = renderHook(() => useQueryParams());

      act(() => {
        const [, setParams] = result.current;
        setParams({ category: null });
      });

      const [params] = result.current;
      expect(params.get("category")).toBeNull();
      expect(params.get("sort")).toBe("price");
    });

    it("should remove param when set to empty string", () => {
      window.history.pushState({}, "", "/?category=books");

      const { result } = renderHook(() => useQueryParams());

      act(() => {
        const [, setParams] = result.current;
        setParams({ category: "" });
      });

      const [params] = result.current;
      expect(params.get("category")).toBeNull();
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalWindow = global.window;
      // @ts-ignore
      global.window = undefined;

      expect(() => {
        renderHook(() => useQueryParams());
      }).not.toThrow();

      global.window = originalWindow;
    });
  });

  describe("Use Cases", () => {
    it("should work for filters", () => {
      const { result } = renderHook(() => useQueryParams());

      act(() => {
        const [, setParams] = result.current;
        setParams({
          category: "electronics",
          brand: "apple",
          minPrice: "100",
        });
      });

      const [params] = result.current;
      expect(params.get("category")).toBe("electronics");
      expect(params.get("brand")).toBe("apple");
      expect(params.get("minPrice")).toBe("100");
    });

    it("should work for search", () => {
      const { result } = renderHook(() => useQueryParams());

      act(() => {
        const [, setParams] = result.current;
        setParams({ q: "react hooks" });
      });

      expect(window.location.search).toBe("?q=react+hooks");
    });
  });
});
