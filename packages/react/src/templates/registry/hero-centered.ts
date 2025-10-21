/**
 * Hero Centered Template
 * A centered hero section with title, description, and CTA buttons
 */

import type { Template } from "../types.js";

export const heroCentered: Template = {
  meta: {
    id: "hero-centered",
    name: "Centered Hero",
    description:
      "A centered hero section with title, description, and call-to-action buttons",
    category: "hero",
    tier: "free",
    thumbnail: "/template-thumbnails/hero-centered.webp",
    tags: ["hero", "landing", "cta", "centered", "accessibility-first"],
    author: "Spexop Team",
    version: "1.0.0",
  },
  structure: {
    type: "Main",
    role: "main",
    ariaLabel: "Hero section",
    props: {},
    children: [
      {
        type: "Container",
        props: {
          maxWidth: "2xl",
          padding: "lg",
        },
        children: [
          {
            type: "Stack",
            props: {
              direction: "vertical",
              gap: 6,
              align: "center",
            },
            children: [
              {
                type: "Heading",
                id: "hero-title",
                props: {
                  level: 1,
                  align: "center",
                  weight: "bold",
                },
                content: "Build Beautiful Interfaces",
              },
              {
                type: "Text",
                id: "hero-description",
                props: {
                  size: "lg",
                  align: "center",
                  weight: "regular",
                },
                content:
                  "Create stunning, responsive layouts with our powerful design system. Configure your brand, export to any platform.",
              },
              {
                type: "Stack",
                props: {
                  direction: "horizontal",
                  gap: 3,
                  align: "center",
                },
                children: [
                  {
                    type: "Button",
                    id: "hero-cta-primary",
                    props: {
                      variant: "primary",
                      size: "lg",
                    },
                    content: "Get Started",
                  },
                  {
                    type: "Button",
                    id: "hero-cta-secondary",
                    props: {
                      variant: "secondary",
                      size: "lg",
                    },
                    content: "Learn More",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  customization: {
    layout: {
      adjustableProps: ["maxWidth", "padding"],
      breakpoints: true,
    },
    content: {
      editableText: [
        "hero-title",
        "hero-description",
        "hero-cta-primary",
        "hero-cta-secondary",
      ],
      editableImages: [],
    },
  },
};
