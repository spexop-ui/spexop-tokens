/// <reference path="../vitest.d.ts" />

import { renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useGeolocation } from "./useGeolocation";

describe("useGeolocation", () => {
  let mockGeolocation: {
    getCurrentPosition: ReturnType<typeof vi.fn>;
    watchPosition: ReturnType<typeof vi.fn>;
    clearWatch: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockGeolocation = {
      getCurrentPosition: vi.fn(),
      watchPosition: vi.fn(),
      clearWatch: vi.fn(),
    };

    Object.defineProperty(global.navigator, "geolocation", {
      writable: true,
      configurable: true,
      value: mockGeolocation,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should start in loading state", () => {
      const { result } = renderHook(() => useGeolocation());

      expect(result.current.loading).toBe(true);
      expect(result.current.coords).toBeNull();
      expect(result.current.error).toBeNull();
    });

    it("should get current position", async () => {
      const mockPosition: GeolocationPosition = {
        coords: {
          latitude: 40.7128,
          longitude: -74.006,
          accuracy: 100,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: Date.now(),
      };

      mockGeolocation.getCurrentPosition.mockImplementation((success) => {
        success(mockPosition);
      });

      const { result } = renderHook(() => useGeolocation());

      await waitFor(() => {
        expect(result.current.coords).not.toBeNull();
      });

      expect(result.current.coords?.latitude).toBe(40.7128);
      expect(result.current.coords?.longitude).toBe(-74.006);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it("should handle errors", async () => {
      const mockError: GeolocationPositionError = {
        code: 1,
        message: "User denied geolocation",
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      };

      mockGeolocation.getCurrentPosition.mockImplementation((_, error) => {
        error(mockError);
      });

      const { result } = renderHook(() => useGeolocation());

      await waitFor(() => {
        expect(result.current.error).not.toBeNull();
      });

      expect(result.current.error?.message).toBe("User denied geolocation");
      expect(result.current.coords).toBeNull();
      expect(result.current.loading).toBe(false);
    });
  });

  describe("Watch Mode", () => {
    it("should use watchPosition when watch is true", () => {
      mockGeolocation.watchPosition.mockReturnValue(1);

      renderHook(() => useGeolocation({ watch: true }));

      expect(mockGeolocation.watchPosition).toHaveBeenCalled();
      expect(mockGeolocation.getCurrentPosition).not.toHaveBeenCalled();
    });

    it("should clear watch on unmount", () => {
      mockGeolocation.watchPosition.mockReturnValue(123);

      const { unmount } = renderHook(() => useGeolocation({ watch: true }));

      unmount();

      expect(mockGeolocation.clearWatch).toHaveBeenCalledWith(123);
    });
  });

  describe("SSR Safety", () => {
    it("should handle missing geolocation API", () => {
      const originalGeolocation = global.navigator.geolocation;
      Object.defineProperty(global.navigator, "geolocation", {
        value: undefined,
        writable: true,
        configurable: true,
      });

      const { result } = renderHook(() => useGeolocation());

      expect(result.current.error?.message).toBe(
        "Geolocation is not supported",
      );
      expect(result.current.loading).toBe(false);

      Object.defineProperty(global.navigator, "geolocation", {
        value: originalGeolocation,
        writable: true,
        configurable: true,
      });
    });
  });
});
