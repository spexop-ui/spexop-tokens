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
    tags: [
      "landing",
      "features",
      "grid",
      "showcase",
      "icon-enhanced",
      "accessibility-first",
    ],
    author: "Spexop Team",
    version: "1.0.0",
  },
  structure: {
    type: "Section",
    role: "region",
    ariaLabel: "Features section",
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
                      weight: "bold",
                    },
                    content: "Powerful Features",
                  },
                  {
                    type: "Text",
                    id: "section-description",
                    props: {
                      size: "lg",
                      align: "center",
                      weight: "regular",
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
                      padding: "md",
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
                            type: "Icon",
                            props: {
                              name: "Layout",
                              size: "lg",
                            },
                          },
                          {
                            type: "Heading",
                            props: {
                              level: 3,
                              weight: "semibold",
                            },
                            content: "Responsive Design",
                          },
                          {
                            type: "Text",
                            props: {
                              weight: "regular",
                            },
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
                      padding: "md",
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
                            type: "Icon",
                            props: {
                              name: "Palette",
                              size: "lg",
                            },
                          },
                          {
                            type: "Heading",
                            props: {
                              level: 3,
                              weight: "semibold",
                            },
                            content: "Theme Customization",
                          },
                          {
                            type: "Text",
                            props: {
                              weight: "regular",
                            },
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
                      padding: "md",
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
                            type: "Icon",
                            props: {
                              name: "Download",
                              size: "lg",
                            },
                          },
                          {
                            type: "Heading",
                            props: {
                              level: 3,
                              weight: "semibold",
                            },
                            content: "Export Anywhere",
                          },
                          {
                            type: "Text",
                            props: {
                              weight: "regular",
                            },
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
