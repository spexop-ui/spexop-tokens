/// <reference path="../vitest.d.ts" />

import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { usePermission } from "./usePermission";

describe("usePermission", () => {
  let mockPermissions: {
    query: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockPermissions = {
      query: vi.fn(),
    };

    Object.defineProperty(global.navigator, "permissions", {
      writable: true,
      configurable: true,
      value: mockPermissions,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should check permission state", async () => {
      mockPermissions.query.mockResolvedValue({ state: "granted" });

      const { result } = renderHook(() => usePermission("geolocation"));

      await waitFor(() => {
        expect(result.current.state).toBe("granted");
      });
    });

    it("should return unsupported when permissions API unavailable", async () => {
      const originalPermissions = global.navigator.permissions;
      Object.defineProperty(global.navigator, "permissions", {
        value: undefined,
        writable: true,
        configurable: true,
      });

      const { result } = renderHook(() => usePermission("geolocation"));

      await waitFor(() => {
        expect(result.current.state).toBe("unsupported");
      });

      Object.defineProperty(global.navigator, "permissions", {
        value: originalPermissions,
        writable: true,
        configurable: true,
      });
    });

    it("should provide request function", () => {
      const { result } = renderHook(() => usePermission("geolocation"));

      expect(result.current.request).toBeDefined();
      expect(typeof result.current.request).toBe("function");
    });
  });

  describe("Permission States", () => {
    it("should handle granted state", async () => {
      mockPermissions.query.mockResolvedValue({ state: "granted" });

      const { result } = renderHook(() => usePermission("geolocation"));

      await waitFor(() => {
        expect(result.current.state).toBe("granted");
      });
    });

    it("should handle denied state", async () => {
      mockPermissions.query.mockResolvedValue({ state: "denied" });

      const { result } = renderHook(() => usePermission("camera"));

      await waitFor(() => {
        expect(result.current.state).toBe("denied");
      });
    });

    it("should handle prompt state", async () => {
      mockPermissions.query.mockResolvedValue({ state: "prompt" });

      const { result } = renderHook(() => usePermission("notifications"));

      await waitFor(() => {
        expect(result.current.state).toBe("prompt");
      });
    });
  });

  describe("Request Permission", () => {
    it("should request notification permission", async () => {
      const requestPermissionMock = vi.fn().mockResolvedValue("granted");

      Object.defineProperty(window, "Notification", {
        writable: true,
        configurable: true,
        value: {
          requestPermission: requestPermissionMock,
        },
      });

      const { result } = renderHook(() => usePermission("notifications"));

      let state: string | undefined;
      await act(async () => {
        state = await result.current.request();
      });

      expect(requestPermissionMock).toHaveBeenCalled();
      expect(state).toBe("granted");
    });

    it("should request geolocation permission", async () => {
      const getCurrentPositionMock = vi.fn((success) => {
        success({});
      });

      Object.defineProperty(global.navigator, "geolocation", {
        writable: true,
        configurable: true,
        value: {
          getCurrentPosition: getCurrentPositionMock,
        },
      });

      const { result } = renderHook(() => usePermission("geolocation"));

      let state: string | undefined;
      await act(async () => {
        state = await result.current.request();
      });

      expect(state).toBe("granted");
    });
  });

  describe("SSR Safety", () => {
    it("should handle server-side rendering", () => {
      const originalNavigator = global.navigator;
      // @ts-ignore
      global.navigator = undefined;

      expect(() => {
        renderHook(() => usePermission("geolocation"));
      }).not.toThrow();

      global.navigator = originalNavigator;
    });
  });
});
