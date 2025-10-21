/**
 * 404 Error Page Template
 * Friendly 404 error page with navigation and helpful links
 */

import type { Template } from "../types.js";

export const error404: Template = {
  meta: {
    id: "error-404",
    name: "404 Error Page",
    description:
      "Friendly 404 error page with helpful navigation and search functionality",
    category: "error",
    tier: "free",
    thumbnail: "/template-thumbnails/error-404.webp",
    tags: ["error", "404", "not-found", "accessibility-first"],
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
    ariaLabel: "404 error page",
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
                    ariaLabel: "Error code 404",
                    content: "404",
                  },
                  {
                    type: "Heading",
                    id: "error-title",
                    props: {
                      level: 1,
                      align: "center",
                      weight: "bold",
                    },
                    content: "Page Not Found",
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
                      "Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.",
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
                    ariaLabel: "Go back to previous page",
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
                              name: "ArrowLeft",
                              size: "md",
                            },
                          },
                          {
                            type: "Text",
                            props: {
                              weight: "semibold",
                            },
                            content: "Go Back",
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
                  padding: "lg",
                  variant: "subtle",
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
                        props: {
                          level: 3,
                          weight: "semibold",
                        },
                        content: "Popular Pages",
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
                            props: {
                              href: "/docs",
                              variant: "text",
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
                                      name: "FileText",
                                      size: "sm",
                                    },
                                  },
                                  {
                                    type: "Text",
                                    props: {
                                      weight: "regular",
                                    },
                                    content: "Documentation",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            type: "Link",
                            props: {
                              href: "/examples",
                              variant: "text",
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
                                      name: "Code",
                                      size: "sm",
                                    },
                                  },
                                  {
                                    type: "Text",
                                    props: {
                                      weight: "regular",
                                    },
                                    content: "Examples",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            type: "Link",
                            props: {
                              href: "/blog",
                              variant: "text",
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
                                      weight: "regular",
                                    },
                                    content: "Blog",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            type: "Link",
                            props: {
                              href: "/support",
                              variant: "text",
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
                                      name: "HelpCircle",
                                      size: "sm",
                                    },
                                  },
                                  {
                                    type: "Text",
                                    props: {
                                      weight: "regular",
                                    },
                                    content: "Support",
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
      editableText: ["error-code", "error-title", "error-description"],
      editableImages: [],
    },
  },
};
