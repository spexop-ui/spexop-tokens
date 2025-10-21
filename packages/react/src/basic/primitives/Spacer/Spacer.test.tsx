/**
 * Spacer Component Tests
 * Tests for spacing utility with vertical and horizontal directions
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 */

import { render } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";
import { Spacer } from "./Spacer.js";
import type { SpacingScale } from "./Spacer.types.js";

describe("Spacer", () => {
  describe("Token Integration - Spacing Scale", () => {
    it("should apply vertical spacing scale 0-10 correctly", () => {
      const { container } = render(<Spacer size={4} direction="vertical" />);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("vertical4");
    });

    it("should handle size=0", () => {
      const { container } = render(<Spacer size={0} />);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("vertical0");
    });

    it("should handle size=10", () => {
      const { container } = render(<Spacer size={10} />);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("vertical10");
    });

    it("should apply horizontal spacing", () => {
      const { container } = render(<Spacer size={4} direction="horizontal" />);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("horizontal4");
    });
  });

  describe("Direction", () => {
    it("should default to vertical", () => {
      const { container } = render(<Spacer size={4} />);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("vertical");
    });

    it("should apply horizontal direction", () => {
      const { container } = render(<Spacer size={4} direction="horizontal" />);
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("horizontal");
    });
  });

  describe("Responsive Props", () => {
    it("should accept responsive size object", () => {
      const { container } = render(
        <Spacer size={{ xs: 2, md: 4, lg: 6 }} direction="vertical" />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("should be aria-hidden by default", () => {
      const { container } = render(<Spacer size={4} />);
      const element = container.firstChild as HTMLElement;
      expect(element.getAttribute("aria-hidden")).toBe("true");
    });

    it("should allow disabling aria-hidden", () => {
      const { container } = render(<Spacer size={4} ariaHidden={false} />);
      const element = container.firstChild as HTMLElement;
      expect(element.getAttribute("aria-hidden")).toBe("false");
    });
  });

  describe("Custom Props", () => {
    it("should apply custom className", () => {
      const { container } = render(
        <Spacer size={4} className="custom-class" />,
      );
      const element = container.firstChild as HTMLElement;
      expect(element.className).toContain("custom-class");
    });

    it("should render as div element", () => {
      const { container } = render(<Spacer size={4} />);
      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe("DIV");
    });
  });

  describe("All Spacing Values", () => {
    it("should handle all vertical spacing values 0-10", () => {
      for (let i = 0; i <= 10; i++) {
        const { container } = render(<Spacer size={i as SpacingScale} />);
        const element = container.firstChild as HTMLElement;
        expect(element.className).toContain(`vertical${i}`);
      }
    });

    it("should handle all horizontal spacing values 0-10", () => {
      for (let i = 0; i <= 10; i++) {
        const { container } = render(
          <Spacer size={i as SpacingScale} direction="horizontal" />,
        );
        const element = container.firstChild as HTMLElement;
        expect(element.className).toContain(`horizontal${i}`);
      }
    });
  });
});
