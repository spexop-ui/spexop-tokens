/// <reference path="../vitest.d.ts" />

import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useCopyToClipboard } from "./useCopyToClipboard";

describe("useCopyToClipboard", () => {
  let writeTextMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    writeTextMock = vi.fn().mockResolvedValue(undefined);

    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("Basic Functionality", () => {
    it("should return null initially", () => {
      const { result } = renderHook(() => useCopyToClipboard());

      const [copiedText] = result.current;
      expect(copiedText).toBeNull();
    });

    it("should copy text to clipboard", async () => {
      const { result } = renderHook(() => useCopyToClipboard());

      let success = false;
      await act(async () => {
        const [, copy] = result.current;
        success = await copy("Hello, World!");
      });

      expect(success).toBe(true);
      expect(writeTextMock).toHaveBeenCalledWith("Hello, World!");
    });

    it("should update copiedText state", async () => {
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        const [, copy] = result.current;
        await copy("Copied text");
      });

      const [copiedText] = result.current;
      expect(copiedText).toBe("Copied text");
    });

    it("should handle multiple copies", async () => {
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        const [, copy] = result.current;
        await copy("First");
      });
      expect(result.current[0]).toBe("First");

      await act(async () => {
        const [, copy] = result.current;
        await copy("Second");
      });
      expect(result.current[0]).toBe("Second");
    });
  });

  describe("Error Handling", () => {
    it("should handle clipboard API errors", async () => {
      const consoleWarnSpy = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});
      writeTextMock.mockRejectedValue(new Error("Permission denied"));

      const { result } = renderHook(() => useCopyToClipboard());

      let success = false;
      await act(async () => {
        const [, copy] = result.current;
        success = await copy("test");
      });

      expect(success).toBe(false);
      expect(consoleWarnSpy).toHaveBeenCalled();

      consoleWarnSpy.mockRestore();
    });

    it("should return false when clipboard is unavailable", async () => {
      const originalNavigator = global.navigator;
      // @ts-ignore
      global.navigator = undefined;

      const consoleWarnSpy = vi
        .spyOn(console, "warn")
        .mockImplementation(() => {});

      const { result } = renderHook(() => useCopyToClipboard());

      let success = false;
      await act(async () => {
        const [, copy] = result.current;
        success = await copy("test");
      });

      expect(success).toBe(false);
      expect(consoleWarnSpy).toHaveBeenCalled();

      global.navigator = originalNavigator;
      consoleWarnSpy.mockRestore();
    });
  });

  describe("Use Cases", () => {
    it("should work for share button", async () => {
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        const [, copy] = result.current;
        await copy("https://example.com");
      });

      expect(result.current[0]).toBe("https://example.com");
    });

    it("should work for code snippets", async () => {
      const code = "const x = 42;";
      const { result } = renderHook(() => useCopyToClipboard());

      await act(async () => {
        const [, copy] = result.current;
        await copy(code);
      });

      expect(result.current[0]).toBe(code);
    });
  });
});
