/**
 * Portfolio Gallery Template
 * Auto-fit card grid for portfolios and galleries
 */

import type { Template } from "../types.js";

export const portfolioGallery: Template = {
  meta: {
    id: "portfolio-gallery",
    name: "Portfolio Gallery",
    description:
      "Responsive auto-fit grid perfect for portfolios and image galleries",
    category: "portfolio",
    tier: "free",
    thumbnail: "/template-thumbnails/portfolio-gallery.webp",
    tags: [
      "portfolio",
      "gallery",
      "grid",
      "images",
      "accessibility-first",
      "mobile-optimized",
    ],
    author: "Spexop Team",
    version: "1.0.0",
  },
  structure: {
    type: "Main",
    role: "main",
    ariaLabel: "Portfolio gallery",
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
              gap: "lg",
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
                    id: "gallery-title",
                    props: {
                      level: 1,
                      align: "center",
                      weight: "bold",
                    },
                    content: "My Portfolio",
                  },
                  {
                    type: "Text",
                    id: "gallery-description",
                    props: {
                      size: "lg",
                      align: "center",
                      weight: "regular",
                    },
                    content: "A collection of my recent work and projects",
                  },
                ],
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
                    id: "project-1",
                    props: {
                      padding: 0,
                    },
                    children: [
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: 0,
                        },
                        children: [
                          {
                            type: "Card",
                            props: {
                              padding: 8,
                              variant: "subtle",
                            },
                            children: [
                              {
                                type: "Text",
                                props: {
                                  align: "center",
                                  size: "base",
                                },
                                content: "Project Image",
                              },
                            ],
                          },
                          {
                            type: "Container",
                            props: {
                              padding: 5,
                            },
                            children: [
                              {
                                type: "Stack",
                                props: {
                                  direction: "vertical",
                                  gap: 2,
                                },
                                children: [
                                  {
                                    type: "Heading",
                                    props: {
                                      level: 3,
                                    },
                                    content: "Project Alpha",
                                  },
                                  {
                                    type: "Text",
                                    props: {
                                      size: "sm",
                                      variant: "secondary",
                                    },
                                    content: "Web Design • 2025",
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
                    id: "project-2",
                    props: {
                      padding: 0,
                    },
                    children: [
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: 0,
                        },
                        children: [
                          {
                            type: "Card",
                            props: {
                              padding: 8,
                              variant: "subtle",
                            },
                            children: [
                              {
                                type: "Text",
                                props: {
                                  align: "center",
                                  size: "base",
                                },
                                content: "Project Image",
                              },
                            ],
                          },
                          {
                            type: "Container",
                            props: {
                              padding: 5,
                            },
                            children: [
                              {
                                type: "Stack",
                                props: {
                                  direction: "vertical",
                                  gap: 2,
                                },
                                children: [
                                  {
                                    type: "Heading",
                                    props: {
                                      level: 3,
                                    },
                                    content: "Project Beta",
                                  },
                                  {
                                    type: "Text",
                                    props: {
                                      size: "sm",
                                      variant: "secondary",
                                    },
                                    content: "Brand Identity • 2025",
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
                    id: "project-3",
                    props: {
                      padding: 0,
                    },
                    children: [
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: 0,
                        },
                        children: [
                          {
                            type: "Card",
                            props: {
                              padding: 8,
                              variant: "subtle",
                            },
                            children: [
                              {
                                type: "Text",
                                props: {
                                  align: "center",
                                  size: "base",
                                },
                                content: "Project Image",
                              },
                            ],
                          },
                          {
                            type: "Container",
                            props: {
                              padding: 5,
                            },
                            children: [
                              {
                                type: "Stack",
                                props: {
                                  direction: "vertical",
                                  gap: 2,
                                },
                                children: [
                                  {
                                    type: "Heading",
                                    props: {
                                      level: 3,
                                    },
                                    content: "Project Gamma",
                                  },
                                  {
                                    type: "Text",
                                    props: {
                                      size: "sm",
                                      variant: "secondary",
                                    },
                                    content: "UI/UX Design • 2024",
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
                    id: "project-4",
                    props: {
                      padding: 0,
                    },
                    children: [
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: 0,
                        },
                        children: [
                          {
                            type: "Card",
                            props: {
                              padding: 8,
                              variant: "subtle",
                            },
                            children: [
                              {
                                type: "Text",
                                props: {
                                  align: "center",
                                  size: "base",
                                },
                                content: "Project Image",
                              },
                            ],
                          },
                          {
                            type: "Container",
                            props: {
                              padding: 5,
                            },
                            children: [
                              {
                                type: "Stack",
                                props: {
                                  direction: "vertical",
                                  gap: 2,
                                },
                                children: [
                                  {
                                    type: "Heading",
                                    props: {
                                      level: 3,
                                    },
                                    content: "Project Delta",
                                  },
                                  {
                                    type: "Text",
                                    props: {
                                      size: "sm",
                                      variant: "secondary",
                                    },
                                    content: "Mobile App • 2024",
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
      adjustableProps: ["maxWidth", "padding", "gap", "minColumnWidth"],
      breakpoints: true,
    },
    content: {
      editableText: ["gallery-title", "gallery-description"],
      editableImages: [],
    },
  },
};
