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
    tags: ["portfolio", "gallery", "grid", "images"],
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
                id: "gallery-title",
                props: {
                  level: 1,
                  align: "center",
                },
                content: "My Portfolio",
              },
              {
                type: "Text",
                id: "gallery-description",
                props: {
                  size: "lg",
                  align: "center",
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
              gap: 6,
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
  customization: {
    layout: {
      adjustableProps: ["maxWidth", "padding", "gap", "minColumnWidth"],
      breakpoints: false,
    },
    content: {
      editableText: ["gallery-title", "gallery-description"],
      editableImages: [],
    },
  },
};
