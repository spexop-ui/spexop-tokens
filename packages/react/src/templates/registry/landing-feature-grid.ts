/**
 * Landing Feature Grid Template
 * A 3-column feature showcase grid for landing pages
 */

import type { Template } from "../types.js";

export const landingFeatureGrid: Template = {
  meta: {
    id: "landing-feature-grid",
    name: "Feature Grid",
    description: "A responsive 3-column grid showcasing features or services",
    category: "landing",
    tier: "free",
    thumbnail: "/template-thumbnails/landing-feature-grid.webp",
    tags: ["landing", "features", "grid", "showcase"],
    author: "Spexop Team",
    version: "1.0.0",
  },
  structure: {
    type: "Container",
    props: {
      maxWidth: "2xl",
      padding: 8,
    },
    children: [
      {
        type: "Stack",
        props: {
          direction: "vertical",
          gap: 8,
        },
        children: [
          {
            type: "Stack",
            props: {
              direction: "vertical",
              gap: 3,
              align: "center",
            },
            children: [
              {
                type: "Heading",
                id: "section-title",
                props: {
                  level: 2,
                  align: "center",
                },
                content: "Powerful Features",
              },
              {
                type: "Text",
                id: "section-description",
                props: {
                  size: "lg",
                  align: "center",
                },
                content:
                  "Everything you need to build modern, responsive interfaces",
              },
            ],
          },
          {
            type: "Grid",
            props: {
              columns: "auto-fit",
              minColumnWidth: "280px",
              gap: 6,
            },
            children: [
              {
                type: "Card",
                id: "feature-1",
                props: {
                  padding: 6,
                },
                children: [
                  {
                    type: "Stack",
                    props: {
                      direction: "vertical",
                      gap: 3,
                    },
                    children: [
                      {
                        type: "Heading",
                        props: {
                          level: 3,
                        },
                        content: "Responsive Design",
                      },
                      {
                        type: "Text",
                        props: {},
                        content:
                          "Built-in responsive breakpoints that adapt to any screen size",
                      },
                    ],
                  },
                ],
              },
              {
                type: "Card",
                id: "feature-2",
                props: {
                  padding: 6,
                },
                children: [
                  {
                    type: "Stack",
                    props: {
                      direction: "vertical",
                      gap: 3,
                    },
                    children: [
                      {
                        type: "Heading",
                        props: {
                          level: 3,
                        },
                        content: "Theme Customization",
                      },
                      {
                        type: "Text",
                        props: {},
                        content:
                          "Fully customizable themes with your brand colors and typography",
                      },
                    ],
                  },
                ],
              },
              {
                type: "Card",
                id: "feature-3",
                props: {
                  padding: 6,
                },
                children: [
                  {
                    type: "Stack",
                    props: {
                      direction: "vertical",
                      gap: 3,
                    },
                    children: [
                      {
                        type: "Heading",
                        props: {
                          level: 3,
                        },
                        content: "Export Anywhere",
                      },
                      {
                        type: "Text",
                        props: {},
                        content:
                          "Export to React, Vue, Svelte, HTML, Tailwind, and more",
                      },
                    ],
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
      adjustableProps: ["maxWidth", "padding", "gap"],
      breakpoints: true,
    },
    content: {
      editableText: ["section-title", "section-description"],
      editableImages: [],
    },
  },
};
