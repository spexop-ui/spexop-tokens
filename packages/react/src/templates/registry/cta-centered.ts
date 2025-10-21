/**
 * Centered CTA Template
 * Call-to-action section with headline, subtext, and action buttons
 */

import type { Template } from "../types.js";

export const ctaCentered: Template = {
  meta: {
    id: "cta-centered",
    name: "Centered Call-to-Action",
    description:
      "Centered CTA section with strong headline, compelling copy, and action buttons",
    category: "content",
    tier: "free",
    thumbnail: "/template-thumbnails/cta-centered.webp",
    tags: ["cta", "call-to-action", "conversion", "accessibility-first"],
    author: "Spexop Team",
    version: "1.0.0",
  },
  structure: {
    type: "Section",
    role: "region",
    ariaLabel: "Call to action",
    props: {
      style: {
        background: "var(--theme-surface-secondary)",
        borderTop: "2px solid var(--theme-border)",
        borderBottom: "2px solid var(--theme-border)",
      },
    },
    children: [
      {
        type: "Container",
        props: {
          maxWidth: "lg",
          padding: "xl",
        },
        children: [
          {
            type: "Stack",
            props: {
              direction: "vertical",
              gap: "lg",
              align: "center",
            },
            children: [
              {
                type: "Stack",
                props: {
                  direction: "vertical",
                  gap: "sm",
                  align: "center",
                },
                children: [
                  {
                    type: "Heading",
                    id: "cta-headline",
                    props: {
                      level: 2,
                      align: "center",
                      weight: "bold",
                    },
                    content: "Ready to Get Started?",
                  },
                  {
                    type: "Text",
                    id: "cta-subtext",
                    props: {
                      size: "lg",
                      align: "center",
                      weight: "regular",
                    },
                    content:
                      "Join thousands of developers building beautiful interfaces with Spexop. Start your free trial today, no credit card required.",
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
                    type: "Button",
                    id: "cta-primary",
                    props: {
                      variant: "primary",
                      size: "lg",
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
                            content: "Start Free Trial",
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
                  {
                    type: "Button",
                    id: "cta-secondary",
                    props: {
                      variant: "outline",
                      size: "lg",
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
                            type: "Icon",
                            props: {
                              name: "PlayCircle",
                              size: "sm",
                            },
                          },
                          {
                            type: "Text",
                            props: {
                              weight: "semibold",
                            },
                            content: "Watch Demo",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "Stack",
                props: {
                  direction: "horizontal",
                  gap: "md",
                  align: "center",
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
                        type: "Icon",
                        props: {
                          name: "Check",
                          size: "sm",
                        },
                      },
                      {
                        type: "Text",
                        props: {
                          size: "sm",
                          weight: "regular",
                        },
                        content: "No credit card required",
                      },
                    ],
                  },
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
                          name: "Check",
                          size: "sm",
                        },
                      },
                      {
                        type: "Text",
                        props: {
                          size: "sm",
                          weight: "regular",
                        },
                        content: "14-day free trial",
                      },
                    ],
                  },
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
                          name: "Check",
                          size: "sm",
                        },
                      },
                      {
                        type: "Text",
                        props: {
                          size: "sm",
                          weight: "regular",
                        },
                        content: "Cancel anytime",
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
      editableText: ["cta-headline", "cta-subtext"],
      editableImages: [],
    },
  },
};
