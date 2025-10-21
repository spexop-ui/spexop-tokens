/// <reference path="../vitest.d.ts" />

import { renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useLongPress } from "./useLongPress";

describe("useLongPress", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should return event handler props", () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useLongPress(callback));

      expect(result.current).toHaveProperty("onMouseDown");
      expect(result.current).toHaveProperty("onMouseUp");
      expect(result.current).toHaveProperty("onMouseLeave");
      expect(result.current).toHaveProperty("onTouchStart");
      expect(result.current).toHaveProperty("onTouchEnd");
    });

    it("should call callback after delay (mouse)", () => {
      const callback = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(callback, { delay: 500 }),
      );

      result.current.onMouseDown();

      vi.advanceTimersByTime(499);
      expect(callback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should call callback after delay (touch)", () => {
      const callback = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(callback, { delay: 500 }),
      );

      result.current.onTouchStart();

      vi.advanceTimersByTime(500);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should cancel on mouse up", () => {
      const callback = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(callback, { delay: 500 }),
      );

      result.current.onMouseDown();
      vi.advanceTimersByTime(200);
      result.current.onMouseUp();
      vi.advanceTimersByTime(300);

      expect(callback).not.toHaveBeenCalled();
    });

    it("should cancel on mouse leave", () => {
      const callback = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(callback, { delay: 500 }),
      );

      result.current.onMouseDown();
      vi.advanceTimersByTime(200);
      result.current.onMouseLeave();
      vi.advanceTimersByTime(300);

      expect(callback).not.toHaveBeenCalled();
    });

    it("should cancel on touch end", () => {
      const callback = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(callback, { delay: 500 }),
      );

      result.current.onTouchStart();
      vi.advanceTimersByTime(200);
      result.current.onTouchEnd();
      vi.advanceTimersByTime(300);

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe("Custom Options", () => {
    it("should use custom delay", () => {
      const callback = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(callback, { delay: 1000 }),
      );

      result.current.onMouseDown();

      vi.advanceTimersByTime(999);
      expect(callback).not.toHaveBeenCalled();

      vi.advanceTimersByTime(1);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should use default delay of 500ms", () => {
      const callback = vi.fn();
      const { result } = renderHook(() => useLongPress(callback));

      result.current.onMouseDown();

      vi.advanceTimersByTime(500);
      expect(callback).toHaveBeenCalledTimes(1);
    });

    it("should call onCancel when cancelled", () => {
      const callback = vi.fn();
      const onCancel = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(callback, { delay: 500, onCancel }),
      );

      result.current.onMouseDown();
      vi.advanceTimersByTime(200);
      result.current.onMouseUp();

      expect(callback).not.toHaveBeenCalled();
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    it("should not call onCancel if long press succeeded", () => {
      const callback = vi.fn();
      const onCancel = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(callback, { delay: 500, onCancel }),
      );

      result.current.onMouseDown();
      vi.advanceTimersByTime(500);
      result.current.onMouseUp();

      expect(callback).toHaveBeenCalledTimes(1);
      expect(onCancel).not.toHaveBeenCalled();
    });
  });

  describe("Use Cases", () => {
    it("should work for context menu", () => {
      const showMenu = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(showMenu, { delay: 500 }),
      );

      result.current.onMouseDown();
      vi.advanceTimersByTime(500);

      expect(showMenu).toHaveBeenCalledTimes(1);
    });

    it("should work for mobile long press", () => {
      const showOptions = vi.fn();
      const { result } = renderHook(() =>
        useLongPress(showOptions, { delay: 800 }),
      );

      result.current.onTouchStart();
      vi.advanceTimersByTime(800);

      expect(showOptions).toHaveBeenCalledTimes(1);
    });
  });
});
