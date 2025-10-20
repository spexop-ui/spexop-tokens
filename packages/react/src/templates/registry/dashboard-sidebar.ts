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
    tags: ["dashboard", "sidebar", "navigation", "app"],
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
                    id: "sidebar-title",
                    props: {
                      level: 3,
                    },
                    content: "Dashboard",
                  },
                  {
                    type: "Stack",
                    props: {
                      direction: "vertical",
                      gap: 2,
                    },
                    children: [
                      {
                        type: "Button",
                        props: {
                          variant: "ghost",
                          fullWidth: true,
                        },
                        content: "Overview",
                      },
                      {
                        type: "Button",
                        props: {
                          variant: "ghost",
                          fullWidth: true,
                        },
                        content: "Analytics",
                      },
                      {
                        type: "Button",
                        props: {
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
          {
            type: "GridItem",
            props: {
              span: { xs: 12, lg: 9 },
            },
            children: [
              {
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
                      gap: 6,
                    },
                    children: [
                      {
                        type: "Heading",
                        id: "content-title",
                        props: {
                          level: 2,
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
                              padding: 6,
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
                              padding: 6,
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
