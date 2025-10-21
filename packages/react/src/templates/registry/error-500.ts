/**
 * 500 Error Page Template
 * Server error page with support contact and status information
 */

import type { Template } from "../types.js";

export const error500: Template = {
  meta: {
    id: "error-500",
    name: "500 Server Error Page",
    description:
      "Server error page with support contact information and helpful resources",
    category: "error",
    tier: "free",
    thumbnail: "/template-thumbnails/error-500.webp",
    tags: ["error", "500", "server-error", "accessibility-first"],
    author: "Spexop Team",
    version: "1.0.0",
    accessibility: {
      landmarks: [{ type: "main", label: "Error page content" }],
      skipLinks: [],
      focusManagement: {
        initialFocus: "home-button",
        returnFocus: false,
      },
    },
  },
  structure: {
    type: "Main",
    role: "main",
    ariaLabel: "500 server error page",
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
                type: "Stack",
                props: {
                  direction: "vertical",
                  gap: "md",
                  align: "center",
                },
                children: [
                  {
                    type: "Text",
                    id: "error-code",
                    props: {
                      size: "4xl",
                      weight: "bold",
                      align: "center",
                    },
                    ariaLabel: "Error code 500",
                    content: "500",
                  },
                  {
                    type: "Heading",
                    id: "error-title",
                    props: {
                      level: 1,
                      align: "center",
                      weight: "bold",
                    },
                    content: "Internal Server Error",
                  },
                  {
                    type: "Text",
                    id: "error-description",
                    props: {
                      size: "lg",
                      align: "center",
                      weight: "regular",
                    },
                    content:
                      "Something went wrong on our end. We're working on fixing the issue. Please try again in a few moments.",
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
                    id: "home-button",
                    props: {
                      variant: "primary",
                      size: "lg",
                    },
                    ariaLabel: "Go back to homepage",
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
                              name: "Home",
                              size: "md",
                            },
                          },
                          {
                            type: "Text",
                            props: {
                              weight: "semibold",
                            },
                            content: "Go Home",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "Button",
                    props: {
                      variant: "outline",
                      size: "lg",
                    },
                    ariaLabel: "Reload page",
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
                              name: "RefreshCw",
                              size: "md",
                            },
                          },
                          {
                            type: "Text",
                            props: {
                              weight: "semibold",
                            },
                            content: "Try Again",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "Grid",
                props: {
                  columns: "auto-fit",
                  minColumnWidth: "250px",
                  gap: "md",
                },
                children: [
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
                          align: "center",
                        },
                        children: [
                          {
                            type: "Icon",
                            props: {
                              name: "HelpCircle",
                              size: "lg",
                            },
                          },
                          {
                            type: "Heading",
                            props: {
                              level: 3,
                              weight: "semibold",
                              align: "center",
                            },
                            content: "Need Help?",
                          },
                          {
                            type: "Text",
                            props: {
                              size: "sm",
                              align: "center",
                              weight: "regular",
                            },
                            content: "Contact our support team for assistance",
                          },
                          {
                            type: "Link",
                            props: {
                              href: "/support",
                              variant: "primary",
                              size: "sm",
                            },
                            content: "Contact Support",
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
                          align: "center",
                        },
                        children: [
                          {
                            type: "Icon",
                            props: {
                              name: "Activity",
                              size: "lg",
                            },
                          },
                          {
                            type: "Heading",
                            props: {
                              level: 3,
                              weight: "semibold",
                              align: "center",
                            },
                            content: "System Status",
                          },
                          {
                            type: "Text",
                            props: {
                              size: "sm",
                              align: "center",
                              weight: "regular",
                            },
                            content: "Check our status page for updates",
                          },
                          {
                            type: "Link",
                            props: {
                              href: "/status",
                              variant: "primary",
                              size: "sm",
                            },
                            content: "View Status",
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
                      gap: "xs",
                    },
                    children: [
                      {
                        type: "Heading",
                        props: {
                          level: 4,
                          weight: "semibold",
                        },
                        content: "Error Information",
                      },
                      {
                        type: "Text",
                        props: {
                          size: "sm",
                          weight: "regular",
                        },
                        content:
                          "If you continue to experience issues, please provide this information to our support team:",
                      },
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: "xs",
                        },
                        children: [
                          {
                            type: "Text",
                            props: {
                              size: "sm",
                              weight: "regular",
                            },
                            content: "Error Code: 500",
                          },
                          {
                            type: "Text",
                            props: {
                              size: "sm",
                              weight: "regular",
                            },
                            content: "Timestamp: [Auto-generated]",
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
      editableText: ["error-code", "error-title", "error-description"],
      editableImages: [],
    },
  },
};
