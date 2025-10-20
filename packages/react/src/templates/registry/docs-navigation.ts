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
    tags: ["docs", "documentation", "navigation", "sidebar"],
    author: "Spexop Team",
    version: "1.0.0",
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
              span: { xs: 12, lg: 3 },
            },
            children: [
              {
                type: "Stack",
                props: {
                  direction: "vertical",
                  gap: 6,
                },
                children: [
                  {
                    type: "Heading",
                    id: "docs-title",
                    props: {
                      level: 3,
                    },
                    content: "Documentation",
                  },
                  {
                    type: "Stack",
                    props: {
                      direction: "vertical",
                      gap: 1,
                    },
                    children: [
                      {
                        type: "Heading",
                        props: {
                          level: 4,
                          size: "sm",
                        },
                        content: "Getting Started",
                      },
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: 1,
                        },
                        children: [
                          {
                            type: "Button",
                            props: {
                              variant: "ghost",
                              size: "sm",
                              fullWidth: true,
                            },
                            content: "Introduction",
                          },
                          {
                            type: "Button",
                            props: {
                              variant: "ghost",
                              size: "sm",
                              fullWidth: true,
                            },
                            content: "Installation",
                          },
                          {
                            type: "Button",
                            props: {
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
                      gap: 1,
                    },
                    children: [
                      {
                        type: "Heading",
                        props: {
                          level: 4,
                          size: "sm",
                        },
                        content: "Components",
                      },
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: 1,
                        },
                        children: [
                          {
                            type: "Button",
                            props: {
                              variant: "ghost",
                              size: "sm",
                              fullWidth: true,
                            },
                            content: "Button",
                          },
                          {
                            type: "Button",
                            props: {
                              variant: "ghost",
                              size: "sm",
                              fullWidth: true,
                            },
                            content: "Card",
                          },
                          {
                            type: "Button",
                            props: {
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
          {
            type: "GridItem",
            props: {
              span: { xs: 12, lg: 9 },
            },
            children: [
              {
                type: "Container",
                props: {
                  maxWidth: "lg",
                  padding: 8,
                },
                children: [
                  {
                    type: "Stack",
                    props: {
                      direction: "vertical",
                      gap: 6,
                    },
                    children: [
                      {
                        type: "Heading",
                        id: "page-title",
                        props: {
                          level: 1,
                        },
                        content: "Introduction",
                      },
                      {
                        type: "Text",
                        id: "page-intro",
                        props: {
                          size: "lg",
                        },
                        content:
                          "Welcome to the documentation. Learn how to build beautiful interfaces with our design system.",
                      },
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: 4,
                        },
                        children: [
                          {
                            type: "Heading",
                            props: {
                              level: 2,
                            },
                            content: "Overview",
                          },
                          {
                            type: "Text",
                            props: {},
                            content:
                              "This design system provides a comprehensive set of components, patterns, and guidelines for building modern user interfaces.",
                          },
                          {
                            type: "Card",
                            props: {
                              padding: 6,
                              variant: "subtle",
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
                                    content: "Quick Links",
                                  },
                                  {
                                    type: "Stack",
                                    props: {
                                      direction: "horizontal",
                                      gap: 2,
                                      wrap: true,
                                    },
                                    children: [
                                      {
                                        type: "Button",
                                        props: {
                                          variant: "secondary",
                                          size: "sm",
                                        },
                                        content: "Installation",
                                      },
                                      {
                                        type: "Button",
                                        props: {
                                          variant: "secondary",
                                          size: "sm",
                                        },
                                        content: "Components",
                                      },
                                      {
                                        type: "Button",
                                        props: {
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
