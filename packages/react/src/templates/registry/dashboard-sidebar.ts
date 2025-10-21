/**
 * Dashboard Sidebar Template
 * Classic sidebar + main content layout for dashboards
 */

import type { Template } from "../types.js";

export const dashboardSidebar: Template = {
  meta: {
    id: "dashboard-sidebar",
    name: "Dashboard with Sidebar",
    description: "Classic sidebar navigation with main content area",
    category: "dashboard",
    tier: "free",
    thumbnail: "/template-thumbnails/dashboard-sidebar.webp",
    tags: ["dashboard", "sidebar", "navigation", "app", "accessibility-first"],
    author: "Spexop Team",
    version: "1.0.0",
    accessibility: {
      landmarks: [
        { type: "navigation", label: "Dashboard navigation" },
        { type: "main", label: "Dashboard content" },
      ],
      skipLinks: [{ target: "main-content", label: "Skip to main content" }],
      focusManagement: {
        initialFocus: "main-content",
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
                ariaLabel: "Dashboard navigation",
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
                        id: "sidebar-title",
                        props: {
                          level: 3,
                          weight: "bold",
                        },
                        content: "Dashboard",
                      },
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: "sm",
                        },
                        children: [
                          {
                            type: "Link",
                            ariaCurrent: "page",
                            props: {
                              href: "#overview",
                              variant: "ghost",
                              fullWidth: true,
                            },
                            content: "Overview",
                          },
                          {
                            type: "Link",
                            props: {
                              href: "#analytics",
                              variant: "ghost",
                              fullWidth: true,
                            },
                            content: "Analytics",
                          },
                          {
                            type: "Link",
                            props: {
                              href: "#settings",
                              variant: "ghost",
                              fullWidth: true,
                            },
                            content: "Settings",
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
                id: "main-content",
                role: "main",
                ariaLabel: "Dashboard content",
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
                          gap: "md",
                        },
                        children: [
                          {
                            type: "Heading",
                            id: "content-title",
                            props: {
                              level: 2,
                              weight: "bold",
                            },
                            content: "Welcome Back",
                          },
                          {
                            type: "Grid",
                            props: {
                              columns: "auto-fit",
                              minColumnWidth: "250px",
                              gap: 6,
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
                                      gap: 3,
                                    },
                                    children: [
                                      {
                                        type: "Heading",
                                        props: {
                                          level: 3,
                                          weight: "semibold",
                                        },
                                        content: "Total Users",
                                      },
                                      {
                                        type: "Text",
                                        props: {
                                          size: "2xl",
                                          weight: "bold",
                                        },
                                        content: "12,345",
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
                                      gap: 3,
                                    },
                                    children: [
                                      {
                                        type: "Heading",
                                        props: {
                                          level: 3,
                                          weight: "semibold",
                                        },
                                        content: "Revenue",
                                      },
                                      {
                                        type: "Text",
                                        props: {
                                          size: "2xl",
                                          weight: "bold",
                                        },
                                        content: "$45,678",
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
      editableText: ["sidebar-title", "content-title"],
      editableImages: [],
    },
  },
};
