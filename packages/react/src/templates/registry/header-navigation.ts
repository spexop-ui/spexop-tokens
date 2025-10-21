/**
 * Header Navigation Template
 * Sticky header with logo, main navigation, and CTA button
 */

import type { Template } from "../types.js";

export const headerNavigation: Template = {
  meta: {
    id: "header-navigation",
    name: "Header Navigation",
    description:
      "Sticky header with logo, main navigation links, and call-to-action button",
    category: "navigation",
    tier: "free",
    thumbnail: "/template-thumbnails/header-navigation.webp",
    tags: [
      "navigation",
      "header",
      "sticky",
      "accessibility-first",
      "mobile-optimized",
    ],
    author: "Spexop Team",
    version: "1.0.0",
    accessibility: {
      landmarks: [{ type: "navigation", label: "Main navigation" }],
      skipLinks: [{ target: "main-content", label: "Skip to main content" }],
      focusManagement: {
        initialFocus: undefined,
        returnFocus: false,
      },
    },
  },
  structure: {
    type: "Header",
    role: "banner",
    props: {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "var(--theme-surface)",
        borderBottom: "2px solid var(--theme-border)",
      },
    },
    children: [
      {
        type: "Container",
        props: {
          maxWidth: "2xl",
          padding: "md",
        },
        children: [
          {
            type: "Stack",
            props: {
              direction: "horizontal",
              gap: "lg",
              align: "center",
              justify: "space-between",
            },
            children: [
              {
                type: "Link",
                id: "logo-link",
                props: {
                  href: "/",
                },
                ariaLabel: "Go to homepage",
                children: [
                  {
                    type: "Stack",
                    props: {
                      direction: "horizontal",
                      gap: "xs",
                      align: "center",
                    },
                    children: [
                      {
                        type: "Icon",
                        props: {
                          name: "Box",
                          size: "lg",
                        },
                      },
                      {
                        type: "Heading",
                        id: "logo-text",
                        props: {
                          level: 1,
                          weight: "bold",
                        },
                        content: "Spexop",
                      },
                    ],
                  },
                ],
              },
              {
                type: "Nav",
                role: "navigation",
                ariaLabel: "Main navigation",
                props: {},
                children: [
                  {
                    type: "Stack",
                    props: {
                      direction: "horizontal",
                      gap: "md",
                      align: "center",
                    },
                    children: [
                      {
                        type: "Link",
                        props: {
                          href: "/features",
                          variant: "text",
                        },
                        content: "Features",
                      },
                      {
                        type: "Link",
                        props: {
                          href: "/pricing",
                          variant: "text",
                        },
                        content: "Pricing",
                      },
                      {
                        type: "Link",
                        props: {
                          href: "/docs",
                          variant: "text",
                        },
                        content: "Docs",
                      },
                      {
                        type: "Link",
                        ariaCurrent: "page",
                        props: {
                          href: "/blog",
                          variant: "text",
                        },
                        content: "Blog",
                      },
                    ],
                  },
                ],
              },
              {
                type: "Stack",
                props: {
                  direction: "horizontal",
                  gap: "sm",
                  align: "center",
                },
                children: [
                  {
                    type: "Link",
                    props: {
                      href: "/login",
                      variant: "ghost",
                      size: "md",
                    },
                    content: "Sign In",
                  },
                  {
                    type: "Button",
                    id: "cta-button",
                    props: {
                      variant: "primary",
                      size: "md",
                    },
                    children: [
                      {
                        type: "Stack",
                        props: {
                          direction: "horizontal",
                          gap: "xs",
                          align: "center",
                        },
                        children: [
                          {
                            type: "Text",
                            props: {
                              weight: "semibold",
                            },
                            content: "Get Started",
                          },
                          {
                            type: "Icon",
                            props: {
                              name: "ArrowRight",
                              size: "sm",
                            },
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
      editableText: ["logo-text"],
      editableImages: [],
    },
  },
};
