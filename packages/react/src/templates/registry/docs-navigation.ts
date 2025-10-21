/**
 * Docs Navigation Template
 * Documentation layout with side navigation
 */

import type { Template } from "../types.js";

export const docsNavigation: Template = {
  meta: {
    id: "docs-navigation",
    name: "Documentation with Navigation",
    description: "Documentation layout with persistent side navigation",
    category: "docs",
    tier: "free",
    thumbnail: "/template-thumbnails/docs-navigation.webp",
    tags: [
      "docs",
      "documentation",
      "navigation",
      "sidebar",
      "accessibility-first",
    ],
    author: "Spexop Team",
    version: "1.0.0",
    accessibility: {
      landmarks: [
        { type: "navigation", label: "Documentation navigation" },
        { type: "main", label: "Documentation content" },
      ],
      skipLinks: [{ target: "doc-content", label: "Skip to documentation" }],
      focusManagement: {
        initialFocus: "doc-content",
        returnFocus: false,
      },
    },
  },
  structure: {
    type: "Container",
    props: {
      maxWidth: "full",
      padding: 0,
    },
    children: [
      {
        type: "Grid",
        props: {
          columns: 12,
          gap: 0,
        },
        children: [
          {
            type: "GridItem",
            props: {
              span: { xs: 12, md: 4, lg: 3 },
            },
            children: [
              {
                type: "Nav",
                role: "navigation",
                ariaLabel: "Documentation navigation",
                props: {},
                children: [
                  {
                    type: "Stack",
                    props: {
                      direction: "vertical",
                      gap: "md",
                    },
                    children: [
                      {
                        type: "Heading",
                        id: "docs-title",
                        props: {
                          level: 3,
                          weight: "bold",
                        },
                        content: "Documentation",
                      },
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: "sm",
                        },
                        children: [
                          {
                            type: "Heading",
                            props: {
                              level: 4,
                              size: "sm",
                              weight: "semibold",
                            },
                            content: "Getting Started",
                          },
                          {
                            type: "Stack",
                            props: {
                              direction: "vertical",
                              gap: "xs",
                            },
                            children: [
                              {
                                type: "Link",
                                ariaCurrent: "page",
                                props: {
                                  href: "#introduction",
                                  variant: "ghost",
                                  size: "sm",
                                  fullWidth: true,
                                },
                                content: "Introduction",
                              },
                              {
                                type: "Link",
                                props: {
                                  href: "#installation",
                                  variant: "ghost",
                                  size: "sm",
                                  fullWidth: true,
                                },
                                content: "Installation",
                              },
                              {
                                type: "Link",
                                props: {
                                  href: "#quick-start",
                                  variant: "ghost",
                                  size: "sm",
                                  fullWidth: true,
                                },
                                content: "Quick Start",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: "sm",
                        },
                        children: [
                          {
                            type: "Heading",
                            props: {
                              level: 4,
                              size: "sm",
                              weight: "semibold",
                            },
                            content: "Components",
                          },
                          {
                            type: "Stack",
                            props: {
                              direction: "vertical",
                              gap: "xs",
                            },
                            children: [
                              {
                                type: "Link",
                                props: {
                                  href: "#button",
                                  variant: "ghost",
                                  size: "sm",
                                  fullWidth: true,
                                },
                                content: "Button",
                              },
                              {
                                type: "Link",
                                props: {
                                  href: "#card",
                                  variant: "ghost",
                                  size: "sm",
                                  fullWidth: true,
                                },
                                content: "Card",
                              },
                              {
                                type: "Link",
                                props: {
                                  href: "#grid",
                                  variant: "ghost",
                                  size: "sm",
                                  fullWidth: true,
                                },
                                content: "Grid",
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
          {
            type: "GridItem",
            props: {
              span: { xs: 12, md: 8, lg: 9 },
            },
            children: [
              {
                type: "Main",
                id: "doc-content",
                role: "main",
                ariaLabel: "Documentation content",
                props: {},
                children: [
                  {
                    type: "Container",
                    props: {
                      maxWidth: "lg",
                      padding: "lg",
                    },
                    children: [
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: "md",
                        },
                        children: [
                          {
                            type: "Heading",
                            id: "page-title",
                            props: {
                              level: 1,
                              weight: "bold",
                            },
                            content: "Introduction",
                          },
                          {
                            type: "Text",
                            id: "page-intro",
                            props: {
                              size: "lg",
                              weight: "regular",
                            },
                            content:
                              "Welcome to the documentation. Learn how to build beautiful interfaces with our design system.",
                          },
                          {
                            type: "Stack",
                            props: {
                              direction: "vertical",
                              gap: "sm",
                            },
                            children: [
                              {
                                type: "Heading",
                                props: {
                                  level: 2,
                                  weight: "bold",
                                },
                                content: "Overview",
                              },
                              {
                                type: "Text",
                                props: {
                                  weight: "regular",
                                },
                                content:
                                  "This design system provides a comprehensive set of components, patterns, and guidelines for building modern user interfaces.",
                              },
                              {
                                type: "Card",
                                props: {
                                  padding: "md",
                                  variant: "subtle",
                                },
                                children: [
                                  {
                                    type: "Stack",
                                    props: {
                                      direction: "vertical",
                                      gap: "sm",
                                    },
                                    children: [
                                      {
                                        type: "Heading",
                                        props: {
                                          level: 3,
                                          weight: "semibold",
                                        },
                                        content: "Quick Links",
                                      },
                                      {
                                        type: "Stack",
                                        props: {
                                          direction: "horizontal",
                                          gap: "xs",
                                          wrap: true,
                                        },
                                        children: [
                                          {
                                            type: "Link",
                                            props: {
                                              href: "#installation",
                                              variant: "secondary",
                                              size: "sm",
                                            },
                                            content: "Installation",
                                          },
                                          {
                                            type: "Link",
                                            props: {
                                              href: "#components",
                                              variant: "secondary",
                                              size: "sm",
                                            },
                                            content: "Components",
                                          },
                                          {
                                            type: "Link",
                                            props: {
                                              href: "#examples",
                                              variant: "secondary",
                                              size: "sm",
                                            },
                                            content: "Examples",
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
      adjustableProps: ["padding", "gap"],
      breakpoints: true,
    },
    content: {
      editableText: ["docs-title", "page-title", "page-intro"],
      editableImages: [],
    },
  },
};
