/**
 * Loading State Template
 * Skeleton screen and loading spinner patterns for content loading states
 */

import type { Template } from "../types.js";

export const stateLoading: Template = {
  meta: {
    id: "state-loading",
    name: "Loading State",
    description:
      "Loading state template with skeleton screens and spinner patterns for content loading feedback",
    category: "states",
    tier: "free",
    thumbnail: "/template-thumbnails/state-loading.webp",
    tags: ["states", "loading", "skeleton", "spinner", "accessibility-first"],
    author: "Spexop Team",
    version: "1.0.0",
  },
  structure: {
    type: "Section",
    role: "region",
    ariaLabel: "Loading content",
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
              gap: "xl",
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
                    id: "loading-title",
                    props: {
                      level: 2,
                      align: "center",
                      weight: "bold",
                    },
                    content: "Loading Content",
                  },
                  {
                    type: "Text",
                    id: "loading-description",
                    props: {
                      size: "base",
                      align: "center",
                      weight: "regular",
                    },
                    ariaLive: "polite",
                    content: "Please wait while we load your content...",
                  },
                ],
              },
              {
                type: "Card",
                props: {
                  padding: "lg",
                },
                children: [
                  {
                    type: "Stack",
                    props: {
                      direction: "vertical",
                      gap: "md",
                      align: "center",
                    },
                    children: [
                      {
                        type: "Section",
                        props: {
                          style: {
                            width: "48px",
                            height: "48px",
                            border: "4px solid var(--theme-border)",
                            borderTop: "4px solid var(--theme-primary)",
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                          },
                        },
                        ariaLabel: "Loading spinner",
                      },
                      {
                        type: "Text",
                        props: {
                          size: "sm",
                          weight: "regular",
                        },
                        content: "Loading...",
                      },
                    ],
                  },
                ],
              },
              {
                type: "Stack",
                props: {
                  direction: "vertical",
                  gap: "md",
                },
                children: [
                  {
                    type: "Heading",
                    props: {
                      level: 3,
                      weight: "semibold",
                    },
                    content: "Skeleton Screen Example",
                  },
                  {
                    type: "Grid",
                    props: {
                      columns: "auto-fit",
                      minColumnWidth: "300px",
                      gap: "md",
                    },
                    children: [
                      {
                        type: "Card",
                        props: {
                          padding: "md",
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
                                type: "Section",
                                props: {
                                  style: {
                                    width: "100%",
                                    height: "200px",
                                    background: "var(--theme-border)",
                                    borderRadius: "var(--theme-radius-md)",
                                    animation:
                                      "pulse 1.5s ease-in-out infinite",
                                  },
                                },
                                ariaLabel: "Loading image placeholder",
                              },
                              {
                                type: "Stack",
                                props: {
                                  direction: "vertical",
                                  gap: "xs",
                                },
                                children: [
                                  {
                                    type: "Section",
                                    props: {
                                      style: {
                                        width: "70%",
                                        height: "24px",
                                        background: "var(--theme-border)",
                                        borderRadius: "var(--theme-radius-sm)",
                                        animation:
                                          "pulse 1.5s ease-in-out infinite",
                                      },
                                    },
                                    ariaLabel: "Loading title placeholder",
                                  },
                                  {
                                    type: "Section",
                                    props: {
                                      style: {
                                        width: "100%",
                                        height: "16px",
                                        background: "var(--theme-border)",
                                        borderRadius: "var(--theme-radius-sm)",
                                        animation:
                                          "pulse 1.5s ease-in-out infinite",
                                      },
                                    },
                                    ariaLabel: "Loading text placeholder",
                                  },
                                  {
                                    type: "Section",
                                    props: {
                                      style: {
                                        width: "90%",
                                        height: "16px",
                                        background: "var(--theme-border)",
                                        borderRadius: "var(--theme-radius-sm)",
                                        animation:
                                          "pulse 1.5s ease-in-out infinite",
                                      },
                                    },
                                    ariaLabel: "Loading text placeholder",
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
                                type: "Section",
                                props: {
                                  style: {
                                    width: "100%",
                                    height: "200px",
                                    background: "var(--theme-border)",
                                    borderRadius: "var(--theme-radius-md)",
                                    animation:
                                      "pulse 1.5s ease-in-out infinite",
                                  },
                                },
                                ariaLabel: "Loading image placeholder",
                              },
                              {
                                type: "Stack",
                                props: {
                                  direction: "vertical",
                                  gap: "xs",
                                },
                                children: [
                                  {
                                    type: "Section",
                                    props: {
                                      style: {
                                        width: "60%",
                                        height: "24px",
                                        background: "var(--theme-border)",
                                        borderRadius: "var(--theme-radius-sm)",
                                        animation:
                                          "pulse 1.5s ease-in-out infinite",
                                      },
                                    },
                                    ariaLabel: "Loading title placeholder",
                                  },
                                  {
                                    type: "Section",
                                    props: {
                                      style: {
                                        width: "100%",
                                        height: "16px",
                                        background: "var(--theme-border)",
                                        borderRadius: "var(--theme-radius-sm)",
                                        animation:
                                          "pulse 1.5s ease-in-out infinite",
                                      },
                                    },
                                    ariaLabel: "Loading text placeholder",
                                  },
                                  {
                                    type: "Section",
                                    props: {
                                      style: {
                                        width: "80%",
                                        height: "16px",
                                        background: "var(--theme-border)",
                                        borderRadius: "var(--theme-radius-sm)",
                                        animation:
                                          "pulse 1.5s ease-in-out infinite",
                                      },
                                    },
                                    ariaLabel: "Loading text placeholder",
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
      adjustableProps: ["maxWidth", "padding", "gap"],
      breakpoints: true,
    },
    content: {
      editableText: ["loading-title", "loading-description"],
      editableImages: [],
    },
  },
};
