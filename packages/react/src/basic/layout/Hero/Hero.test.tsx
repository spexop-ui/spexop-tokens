/**
 * Hero Component Tests
 *
 * Tests for Hero component covering:
 * - Rendering with required props
 * - Different variants (centered, split, full-bleed)
 * - Content sections (eyebrow, title, subtitle, description)
 * - Actions rendering (primary, secondary)
 * - Stats rendering
 * - Media rendering (image, video)
 * - Animation configuration
 * - Reduced motion support
 * - Background options
 * - Alignment options
 * - Accessibility (ARIA attributes, semantic HTML)
 *
 * @author @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { Hero } from "./Hero.js";
import type { HeroProps } from "./Hero.types.js";

describe("Hero", () => {
  const mockPrimaryAction = {
    label: "Get Started",
    onClick: vi.fn(),
  };

  const mockSecondaryAction = {
    label: "Learn More",
    onClick: vi.fn(),
  };

  describe("Basic Rendering", () => {
    it("should render with required title prop", () => {
      const { getByText } = render(<Hero title="Test Title" />);
      expect(getByText("Test Title")).toBeTruthy();
    });

    it("should render as section element", () => {
      const { container } = render(<Hero title="Test Title" />);
      const section = container.querySelector("section");
      expect(section).toBeTruthy();
    });

    it("should apply default aria-label", () => {
      const { container } = render(<Hero title="Test Title" />);
      const section = container.querySelector("section");
      expect(section?.getAttribute("aria-label")).toBe("Hero section");
    });

    it("should apply custom aria-label", () => {
      const { container } = render(
        <Hero title="Test Title" ariaLabel="Custom hero section" />,
      );
      const section = container.querySelector("section");
      expect(section?.getAttribute("aria-label")).toBe("Custom hero section");
    });

    it("should apply custom className", () => {
      const { container } = render(
        <Hero title="Test Title" className="custom-hero" />,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("custom-hero");
    });

    it("should apply custom style", () => {
      const { container } = render(
        <Hero title="Test Title" style={{ marginTop: "20px" }} />,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.style.marginTop).toBe("20px");
    });
  });

  describe("Variants", () => {
    it("should apply centered variant by default", () => {
      const { container } = render(<Hero title="Test Title" />);
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("hero--centered");
    });

    it("should apply split variant", () => {
      const { container } = render(<Hero variant="split" title="Test Title" />);
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("hero--split");
    });

    it("should apply full-bleed variant", () => {
      const { container } = render(
        <Hero variant="full-bleed" title="Test Title" />,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("hero--full-bleed");
    });
  });

  describe("Content Sections", () => {
    it("should render eyebrow when provided", () => {
      const { getByText } = render(
        <Hero eyebrow="NEW RELEASE" title="Test Title" />,
      );
      expect(getByText("NEW RELEASE")).toBeTruthy();
    });

    it("should render subtitle when provided", () => {
      const { getByText } = render(
        <Hero title="Test Title" subtitle="Test Subtitle" />,
      );
      expect(getByText("Test Subtitle")).toBeTruthy();
    });

    it("should render description when provided", () => {
      const { getByText } = render(
        <Hero title="Test Title" description="Test Description" />,
      );
      expect(getByText("Test Description")).toBeTruthy();
    });

    it("should render all content sections together", () => {
      const { getByText } = render(
        <Hero
          eyebrow="NEW"
          title="Test Title"
          subtitle="Test Subtitle"
          description="Test Description"
        />,
      );
      expect(getByText("NEW")).toBeTruthy();
      expect(getByText("Test Title")).toBeTruthy();
      expect(getByText("Test Subtitle")).toBeTruthy();
      expect(getByText("Test Description")).toBeTruthy();
    });
  });

  describe("Title Level", () => {
    it("should render h1 by default", () => {
      const { container } = render(<Hero title="Test Title" />);
      const h1 = container.querySelector("h1");
      expect(h1).toBeTruthy();
      expect(h1?.textContent).toBe("Test Title");
    });

    it("should render h2 when titleLevel is 2", () => {
      const { container } = render(<Hero title="Test Title" titleLevel={2} />);
      const h2 = container.querySelector("h2");
      expect(h2).toBeTruthy();
      expect(h2?.textContent).toBe("Test Title");
    });
  });

  describe("Actions", () => {
    it("should render primary action button", () => {
      const { getByText } = render(
        <Hero title="Test Title" primaryAction={mockPrimaryAction} />,
      );
      expect(getByText("Get Started")).toBeTruthy();
    });

    it("should render secondary action button", () => {
      const { getByText } = render(
        <Hero title="Test Title" secondaryAction={mockSecondaryAction} />,
      );
      expect(getByText("Learn More")).toBeTruthy();
    });

    it("should render both action buttons", () => {
      const { getByText } = render(
        <Hero
          title="Test Title"
          primaryAction={mockPrimaryAction}
          secondaryAction={mockSecondaryAction}
        />,
      );
      expect(getByText("Get Started")).toBeTruthy();
      expect(getByText("Learn More")).toBeTruthy();
    });

    it("should apply aria-label to primary action", () => {
      const { container } = render(
        <Hero
          title="Test Title"
          primaryAction={{
            ...mockPrimaryAction,
            ariaLabel: "Start using the product",
          }}
        />,
      );
      const button = container.querySelector("button");
      expect(button?.getAttribute("aria-label")).toBe(
        "Start using the product",
      );
    });
  });

  describe("Stats", () => {
    const mockStats = [
      { value: "10K+", label: "Users" },
      { value: "50K+", label: "Downloads" },
      { value: "99.9%", label: "Uptime" },
    ];

    it("should not render stats section when stats not provided", () => {
      const { container } = render(<Hero title="Test Title" />);
      const statsSection = container.querySelector('[class*="heroStats"]');
      expect(statsSection).toBeFalsy();
    });

    it("should render stats when provided", () => {
      const { getByText } = render(
        <Hero title="Test Title" stats={mockStats} />,
      );
      expect(getByText("10K+")).toBeTruthy();
      expect(getByText("Users")).toBeTruthy();
      expect(getByText("50K+")).toBeTruthy();
      expect(getByText("Downloads")).toBeTruthy();
      expect(getByText("99.9%")).toBeTruthy();
      expect(getByText("Uptime")).toBeTruthy();
    });

    it("should render correct number of stat items", () => {
      const { container } = render(
        <Hero title="Test Title" stats={mockStats} />,
      );
      const statItems = container.querySelectorAll('[class*="heroStat"]');
      expect(statItems.length).toBe(3);
    });
  });

  describe("Media", () => {
    it("should not render media section when media not provided", () => {
      const { container } = render(<Hero title="Test Title" />);
      const mediaSection = container.querySelector('[class*="heroMedia"]');
      expect(mediaSection).toBeFalsy();
    });

    it("should render image media", () => {
      const { container } = render(
        <Hero
          title="Test Title"
          media={{
            type: "image",
            src: "/test-image.jpg",
            alt: "Test image",
          }}
        />,
      );
      const img = container.querySelector("img");
      expect(img).toBeTruthy();
      expect(img?.getAttribute("src")).toBe("/test-image.jpg");
      expect(img?.getAttribute("alt")).toBe("Test image");
    });

    it("should render video media", () => {
      const { container } = render(
        <Hero
          title="Test Title"
          media={{
            type: "video",
            src: "/test-video.mp4",
            alt: "Test video",
          }}
        />,
      );
      const video = container.querySelector("video");
      expect(video).toBeTruthy();
      expect(video?.getAttribute("src")).toBe("/test-video.mp4");
      expect(video?.getAttribute("muted")).toBe("");
      expect(video?.getAttribute("loop")).toBe("");
    });

    it("should render video with autoplay", () => {
      const { container } = render(
        <Hero
          title="Test Title"
          media={{
            type: "video",
            src: "/test-video.mp4",
            autoplay: true,
          }}
        />,
      );
      const video = container.querySelector("video");
      expect(video).toBeTruthy();
    });

    it("should render overlay when specified", () => {
      const { container } = render(
        <Hero
          title="Test Title"
          media={{
            type: "image",
            src: "/test-image.jpg",
            alt: "Test image",
            overlay: true,
          }}
        />,
      );
      const overlay = container.querySelector('[class*="heroMediaOverlay"]');
      expect(overlay).toBeTruthy();
    });
  });

  describe("Background Options", () => {
    it("should apply default background", () => {
      const { container } = render(<Hero title="Test Title" />);
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("hero--default");
    });

    it("should apply gradient background", () => {
      const { container } = render(
        <Hero title="Test Title" background="gradient" />,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("hero--gradient");
    });

    it("should apply elevated background", () => {
      const { container } = render(
        <Hero title="Test Title" background="elevated" />,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("hero--elevated");
    });

    it("should apply transparent background", () => {
      const { container } = render(
        <Hero title="Test Title" background="transparent" />,
      );
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("hero--transparent");
    });
  });

  describe("Alignment", () => {
    it("should apply center alignment by default", () => {
      const { container } = render(<Hero title="Test Title" />);
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("hero--align-center");
    });

    it("should apply left alignment", () => {
      const { container } = render(<Hero title="Test Title" align="left" />);
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("hero--align-left");
    });

    it("should apply right alignment", () => {
      const { container } = render(<Hero title="Test Title" align="right" />);
      const section = container.firstChild as HTMLElement;
      expect(section.className).toContain("hero--align-right");
    });
  });

  describe("Background Pattern", () => {
    it("should render background pattern when provided", () => {
      const { container } = render(
        <Hero
          title="Test Title"
          backgroundPattern={{
            variant: "particles",
            intensity: "medium",
          }}
        />,
      );
      // AnimatedBackground should be rendered
      const canvas = container.querySelector("canvas");
      expect(canvas).toBeTruthy();
    });

    it("should render gradient pattern", () => {
      const { container } = render(
        <Hero
          title="Test Title"
          backgroundPattern={{
            variant: "gradient",
            intensity: "low",
          }}
        />,
      );
      const canvas = container.querySelector("canvas");
      expect(canvas).toBeTruthy();
    });

    it("should render mesh pattern", () => {
      const { container } = render(
        <Hero
          title="Test Title"
          backgroundPattern={{
            variant: "mesh",
            intensity: "high",
          }}
        />,
      );
      const canvas = container.querySelector("canvas");
      expect(canvas).toBeTruthy();
    });
  });

  describe("Animation Configuration", () => {
    it("should render with animations enabled by default", () => {
      const { container } = render(<Hero title="Test Title" />);
      // Component should render successfully with default animations
      expect(container.firstChild).toBeTruthy();
    });

    it("should render with disabled animations", () => {
      const { container } = render(
        <Hero
          title="Test Title"
          animation={{
            disabled: true,
          }}
        />,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("should render with custom animation sequence", () => {
      const { container } = render(
        <Hero
          title="Test Title"
          animation={{
            sequence: "sequential",
            staggerDelay: 150,
            entranceDelay: 200,
          }}
        />,
      );
      expect(container.firstChild).toBeTruthy();
    });

    it("should render with simultaneous animation sequence", () => {
      const { container } = render(
        <Hero
          title="Test Title"
          animation={{
            sequence: "simultaneous",
          }}
        />,
      );
      expect(container.firstChild).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("should use semantic section element", () => {
      const { container } = render(<Hero title="Test Title" />);
      const section = container.querySelector("section");
      expect(section).toBeTruthy();
    });

    it("should render proper heading hierarchy", () => {
      const { container } = render(
        <Hero title="Main Title" subtitle="Subtitle" titleLevel={1} />,
      );
      const h1 = container.querySelector("h1");
      expect(h1?.textContent).toBe("Main Title");
    });

    it("should include aria-label for hero section", () => {
      const { container } = render(
        <Hero title="Test Title" ariaLabel="Main hero section" />,
      );
      const section = container.querySelector("section");
      expect(section?.getAttribute("aria-label")).toBe("Main hero section");
    });

    it("should include alt text for images", () => {
      const { container } = render(
        <Hero
          title="Test Title"
          media={{
            type: "image",
            src: "/image.jpg",
            alt: "Product screenshot",
          }}
        />,
      );
      const img = container.querySelector("img");
      expect(img?.getAttribute("alt")).toBe("Product screenshot");
    });

    it("should include aria-label for videos", () => {
      const { container } = render(
        <Hero
          title="Test Title"
          media={{
            type: "video",
            src: "/video.mp4",
            alt: "Product demo",
          }}
        />,
      );
      const video = container.querySelector("video");
      expect(video?.getAttribute("aria-label")).toBe("Product demo");
    });
  });
});
