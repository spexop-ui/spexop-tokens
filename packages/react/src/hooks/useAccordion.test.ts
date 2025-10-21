/// <reference path="../vitest.d.ts" />

import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useAccordion } from "./useAccordion";

describe("useAccordion", () => {
  describe("Single Mode - Basic Functionality", () => {
    it("should initialize with no section open", () => {
      const { result } = renderHook(() => useAccordion());

      expect(result.current.openSections).toBeNull();
      expect(result.current.isOpen("section-1")).toBe(false);
    });

    it("should initialize with default open section (string)", () => {
      const { result } = renderHook(() => useAccordion("section-1"));

      expect(result.current.openSections).toBe("section-1");
      expect(result.current.isOpen("section-1")).toBe(true);
    });

    it("should initialize with default open section (options)", () => {
      const { result } = renderHook(() =>
        useAccordion({ defaultOpen: "section-1" }),
      );

      expect(result.current.openSections).toBe("section-1");
      expect(result.current.isOpen("section-1")).toBe(true);
    });

    it("should toggle section open", () => {
      const { result } = renderHook(() => useAccordion());

      act(() => {
        result.current.toggle("section-1");
      });

      expect(result.current.isOpen("section-1")).toBe(true);
    });

    it("should toggle section closed", () => {
      const { result } = renderHook(() => useAccordion("section-1"));

      act(() => {
        result.current.toggle("section-1");
      });

      expect(result.current.isOpen("section-1")).toBe(false);
    });

    it("should close other sections when opening new one", () => {
      const { result } = renderHook(() => useAccordion("section-1"));

      act(() => {
        result.current.toggle("section-2");
      });

      expect(result.current.isOpen("section-1")).toBe(false);
      expect(result.current.isOpen("section-2")).toBe(true);
    });
  });

  describe("Single Mode - Open/Close Functions", () => {
    it("should open a section", () => {
      const { result } = renderHook(() => useAccordion());

      act(() => {
        result.current.open("section-1");
      });

      expect(result.current.isOpen("section-1")).toBe(true);
    });

    it("should close specific section", () => {
      const { result } = renderHook(() => useAccordion("section-1"));

      act(() => {
        result.current.close("section-1");
      });

      expect(result.current.isOpen("section-1")).toBe(false);
    });

    it("should close all sections", () => {
      const { result } = renderHook(() => useAccordion("section-1"));

      act(() => {
        result.current.closeAll();
      });

      expect(result.current.openSections).toBeNull();
    });
  });

  describe("Multiple Mode - Basic Functionality", () => {
    it("should initialize with no sections open", () => {
      const { result } = renderHook(() => useAccordion({ mode: "multiple" }));

      expect(result.current.openSections).toEqual([]);
      expect(result.current.isOpen("section-1")).toBe(false);
    });

    it("should initialize with multiple sections open", () => {
      const { result } = renderHook(() =>
        useAccordion({
          mode: "multiple",
          defaultOpen: ["section-1", "section-2"],
        }),
      );

      expect(result.current.openSections).toEqual(["section-1", "section-2"]);
      expect(result.current.isOpen("section-1")).toBe(true);
      expect(result.current.isOpen("section-2")).toBe(true);
    });

    it("should allow multiple sections open simultaneously", () => {
      const { result } = renderHook(() => useAccordion({ mode: "multiple" }));

      act(() => {
        result.current.toggle("section-1");
      });

      act(() => {
        result.current.toggle("section-2");
      });

      expect(result.current.isOpen("section-1")).toBe(true);
      expect(result.current.isOpen("section-2")).toBe(true);
    });

    it("should toggle individual sections in multiple mode", () => {
      const { result } = renderHook(() =>
        useAccordion({
          mode: "multiple",
          defaultOpen: ["section-1", "section-2"],
        }),
      );

      act(() => {
        result.current.toggle("section-1");
      });

      expect(result.current.isOpen("section-1")).toBe(false);
      expect(result.current.isOpen("section-2")).toBe(true);
    });

    it("should have openAll function in multiple mode", () => {
      const { result } = renderHook(() => useAccordion({ mode: "multiple" }));

      expect(result.current.openAll).toBeDefined();
      expect(typeof result.current.openAll).toBe("function");
    });

    it("should open all specified sections", () => {
      const { result } = renderHook(() => useAccordion({ mode: "multiple" }));

      act(() => {
        if (result.current.openAll) {
          result.current.openAll(["section-1", "section-2", "section-3"]);
        }
      });

      expect(result.current.isOpen("section-1")).toBe(true);
      expect(result.current.isOpen("section-2")).toBe(true);
      expect(result.current.isOpen("section-3")).toBe(true);
    });

    it("should close all sections in multiple mode", () => {
      const { result } = renderHook(() =>
        useAccordion({
          mode: "multiple",
          defaultOpen: ["section-1", "section-2"],
        }),
      );

      act(() => {
        result.current.closeAll();
      });

      expect(result.current.openSections).toEqual([]);
    });
  });

  describe("Controlled Mode", () => {
    it("should use controlled value (single)", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useAccordion({ value }),
        {
          initialProps: { value: "section-1" as string | undefined },
        },
      );

      expect(result.current.openSections).toBe("section-1");

      rerender({ value: "section-2" });

      expect(result.current.openSections).toBe("section-2");
    });

    it("should use controlled value (multiple)", () => {
      const { result, rerender } = renderHook(
        ({ value }) => useAccordion({ mode: "multiple", value }),
        {
          initialProps: { value: ["section-1"] as string[] },
        },
      );

      expect(result.current.openSections).toEqual(["section-1"]);

      rerender({ value: ["section-1", "section-2"] });

      expect(result.current.openSections).toEqual(["section-1", "section-2"]);
    });

    it("should call onValueChange when toggling (single)", () => {
      const onValueChange = vi.fn();
      const { result } = renderHook(() =>
        useAccordion({
          value: undefined,
          onValueChange,
        }),
      );

      act(() => {
        result.current.toggle("section-1");
      });

      expect(onValueChange).toHaveBeenCalledWith("section-1");
    });

    it("should call onValueChange when toggling (multiple)", () => {
      const onValueChange = vi.fn();
      const { result } = renderHook(() =>
        useAccordion({
          mode: "multiple",
          value: [],
          onValueChange,
        }),
      );

      act(() => {
        result.current.toggle("section-1");
      });

      expect(onValueChange).toHaveBeenCalledWith(["section-1"]);
    });
  });

  describe("ARIA Helpers", () => {
    it("should provide getButtonProps", () => {
      const { result } = renderHook(() => useAccordion("section-1"));

      const props = result.current.getButtonProps("section-1");

      expect(props).toEqual({
        "aria-expanded": true,
        "aria-controls": "accordion-panel-section-1",
        id: "accordion-button-section-1",
      });
    });

    it("should update aria-expanded based on state", () => {
      const { result } = renderHook(() => useAccordion());

      let props = result.current.getButtonProps("section-1");
      expect(props["aria-expanded"]).toBe(false);

      act(() => {
        result.current.toggle("section-1");
      });

      props = result.current.getButtonProps("section-1");
      expect(props["aria-expanded"]).toBe(true);
    });

    it("should provide getPanelProps", () => {
      const { result } = renderHook(() => useAccordion("section-1"));

      const props = result.current.getPanelProps("section-1");

      expect(props).toEqual({
        "aria-labelledby": "accordion-button-section-1",
        id: "accordion-panel-section-1",
        hidden: false,
      });
    });

    it("should update hidden based on state", () => {
      const { result } = renderHook(() => useAccordion());

      let props = result.current.getPanelProps("section-1");
      expect(props.hidden).toBe(true);

      act(() => {
        result.current.toggle("section-1");
      });

      props = result.current.getPanelProps("section-1");
      expect(props.hidden).toBe(false);
    });
  });

  describe("Backward Compatibility", () => {
    it("should support old API with string defaultOpen", () => {
      const { result } = renderHook(() => useAccordion("section-1"));

      expect(result.current.isOpen("section-1")).toBe(true);
    });

    it("should maintain openSection property for backward compatibility", () => {
      const { result } = renderHook(() => useAccordion("section-1"));

      // Old API used openSection (singular)
      // New API uses openSections (plural) but should work the same for single mode
      expect(result.current.openSections).toBe("section-1");
    });
  });

  describe("Edge Cases", () => {
    it("should handle toggling non-existent section", () => {
      const { result } = renderHook(() => useAccordion());

      act(() => {
        result.current.toggle("non-existent");
      });

      expect(result.current.isOpen("non-existent")).toBe(true);
    });

    it("should handle empty string section id", () => {
      const { result } = renderHook(() => useAccordion());

      act(() => {
        result.current.toggle("");
      });

      expect(result.current.isOpen("")).toBe(true);
    });

    it("should handle array default in single mode", () => {
      const { result } = renderHook(() =>
        useAccordion({
          mode: "single",
          defaultOpen: ["section-1", "section-2"],
        }),
      );

      // Should only open first section in array
      expect(result.current.openSections).toBe("section-1");
    });

    it("should handle string default in multiple mode", () => {
      const { result } = renderHook(() =>
        useAccordion({
          mode: "multiple",
          defaultOpen: "section-1",
        }),
      );

      // Should convert to array
      expect(result.current.openSections).toEqual(["section-1"]);
    });
  });

  describe("Performance", () => {
    it("should memoize callback functions", () => {
      const { result, rerender } = renderHook(() => useAccordion());

      const initialToggle = result.current.toggle;
      const initialOpen = result.current.open;
      const initialClose = result.current.close;

      rerender();

      expect(result.current.toggle).toBe(initialToggle);
      expect(result.current.open).toBe(initialOpen);
      expect(result.current.close).toBe(initialClose);
    });

    it("should not recreate ARIA helpers unnecessarily", () => {
      const { result, rerender } = renderHook(() => useAccordion("section-1"));

      const initialGetButtonProps = result.current.getButtonProps;
      const initialGetPanelProps = result.current.getPanelProps;

      rerender();

      expect(result.current.getButtonProps).toBe(initialGetButtonProps);
      expect(result.current.getPanelProps).toBe(initialGetPanelProps);
    });
  });
});
