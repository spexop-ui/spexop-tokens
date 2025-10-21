/**
 * Empty State Template
 * Empty state pattern for no data, no results, or empty collections
 */

import type { Template } from "../types.js";

export const stateEmpty: Template = {
  meta: {
    id: "state-empty",
    name: "Empty State",
    description:
      "Empty state template for no data, no results, or empty collections with helpful messaging and actions",
    category: "states",
    tier: "free",
    thumbnail: "/template-thumbnails/state-empty.webp",
    tags: ["states", "empty", "no-data", "no-results", "accessibility-first"],
    author: "Spexop Team",
    version: "1.0.0",
  },
  structure: {
    type: "Section",
    role: "region",
    ariaLabel: "Empty state",
    props: {},
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
              gap: "xl",
              align: "center",
            },
            children: [
              {
                type: "Card",
                props: {
                  padding: "xl",
                  variant: "subtle",
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
                        type: "Section",
                        props: {
                          style: {
                            width: "120px",
                            height: "120px",
                            borderRadius: "50%",
                            border: "3px solid var(--theme-border)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          },
                        },
                        children: [
                          {
                            type: "Icon",
                            props: {
                              name: "Inbox",
                              size: "xl",
                            },
                            ariaHidden: true,
                          },
                        ],
                      },
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
                            id: "empty-title",
                            props: {
                              level: 2,
                              align: "center",
                              weight: "bold",
                            },
                            content: "No Items Yet",
                          },
                          {
                            type: "Text",
                            id: "empty-description",
                            props: {
                              size: "lg",
                              align: "center",
                              weight: "regular",
                            },
                            content:
                              "Get started by creating your first item. It only takes a few seconds!",
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
                            id: "empty-cta-primary",
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
                                    type: "Icon",
                                    props: {
                                      name: "Plus",
                                      size: "sm",
                                    },
                                  },
                                  {
                                    type: "Text",
                                    props: {
                                      weight: "semibold",
                                    },
                                    content: "Create Item",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            type: "Button",
                            id: "empty-cta-secondary",
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
                                      name: "BookOpen",
                                      size: "sm",
                                    },
                                  },
                                  {
                                    type: "Text",
                                    props: {
                                      weight: "semibold",
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
                ],
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
                          level: 4,
                          weight: "semibold",
                        },
                        content: "Quick Tips",
                      },
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: "xs",
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
                                content:
                                  "Start with the basics and add more later",
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
                                content:
                                  "You can always edit or delete items later",
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
                                content:
                                  "Check out our guide for best practices",
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
      adjustableProps: ["maxWidth", "padding", "gap"],
      breakpoints: true,
    },
    content: {
      editableText: ["empty-title", "empty-description"],
      editableImages: [],
    },
  },
};
