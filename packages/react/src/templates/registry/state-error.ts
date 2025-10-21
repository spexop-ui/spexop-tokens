/**
 * Error State Template
 * Error state pattern for validation errors, network errors, and error feedback
 */

import type { Template } from "../types.js";

export const stateError: Template = {
  meta: {
    id: "state-error",
    name: "Error State",
    description:
      "Error state template for validation errors, network errors, and error feedback with recovery actions",
    category: "states",
    tier: "free",
    thumbnail: "/template-thumbnails/state-error.webp",
    tags: ["states", "error", "validation", "feedback", "accessibility-first"],
    author: "Spexop Team",
    version: "1.0.0",
  },
  structure: {
    type: "Section",
    role: "region",
    ariaLabel: "Error state",
    props: {},
    children: [
      {
        type: "Container",
        props: {
          maxWidth: "lg",
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
                },
                children: [
                  {
                    type: "Heading",
                    props: {
                      level: 2,
                      weight: "bold",
                    },
                    content: "Error State Examples",
                  },
                  {
                    type: "Text",
                    props: {
                      weight: "regular",
                    },
                    content:
                      "Different error state patterns for various scenarios.",
                  },
                ],
              },
              {
                type: "Card",
                props: {
                  padding: "md",
                  variant: "error",
                },
                ariaLive: "assertive",
                children: [
                  {
                    type: "Stack",
                    props: {
                      direction: "horizontal",
                      gap: "sm",
                      align: "start",
                    },
                    children: [
                      {
                        type: "Icon",
                        props: {
                          name: "AlertCircle",
                          size: "md",
                        },
                        ariaHidden: true,
                      },
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: "xs",
                        },
                        children: [
                          {
                            type: "Heading",
                            id: "error-title",
                            props: {
                              level: 3,
                              weight: "semibold",
                            },
                            content: "Network Error",
                          },
                          {
                            type: "Text",
                            id: "error-description",
                            props: {
                              size: "sm",
                              weight: "regular",
                            },
                            content:
                              "Unable to connect to the server. Please check your internet connection and try again.",
                          },
                          {
                            type: "Stack",
                            props: {
                              direction: "horizontal",
                              gap: "xs",
                            },
                            children: [
                              {
                                type: "Button",
                                id: "retry-button",
                                props: {
                                  variant: "primary",
                                  size: "sm",
                                },
                                ariaLabel: "Retry connection",
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
                                          size: "sm",
                                        },
                                      },
                                      {
                                        type: "Text",
                                        props: {
                                          weight: "semibold",
                                        },
                                        content: "Retry",
                                      },
                                    ],
                                  },
                                ],
                              },
                              {
                                type: "Button",
                                props: {
                                  variant: "ghost",
                                  size: "sm",
                                },
                                content: "Dismiss",
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
                        content: "Form Validation Errors",
                      },
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: "sm",
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
                                type: "Label",
                                props: {
                                  htmlFor: "email-input",
                                  weight: "semibold",
                                },
                                content: "Email Address",
                              },
                              {
                                type: "Input",
                                id: "email-input",
                                props: {
                                  type: "email",
                                  name: "email",
                                  placeholder: "you@example.com",
                                  required: true,
                                  style: {
                                    borderColor: "var(--theme-error)",
                                  },
                                },
                                ariaLabel: "Email address",
                                ariaDescribedBy: "email-error",
                                ariaInvalid: "true",
                              },
                              {
                                type: "Stack",
                                id: "email-error",
                                props: {
                                  direction: "horizontal",
                                  gap: "xs",
                                  align: "center",
                                },
                                ariaLive: "polite",
                                children: [
                                  {
                                    type: "Icon",
                                    props: {
                                      name: "AlertCircle",
                                      size: "sm",
                                    },
                                    ariaHidden: true,
                                  },
                                  {
                                    type: "Text",
                                    props: {
                                      size: "sm",
                                      weight: "regular",
                                    },
                                    content:
                                      "Please enter a valid email address",
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            type: "Stack",
                            props: {
                              direction: "vertical",
                              gap: "xs",
                            },
                            children: [
                              {
                                type: "Label",
                                props: {
                                  htmlFor: "password-input",
                                  weight: "semibold",
                                },
                                content: "Password",
                              },
                              {
                                type: "Input",
                                id: "password-input",
                                props: {
                                  type: "password",
                                  name: "password",
                                  placeholder: "••••••••",
                                  required: true,
                                  style: {
                                    borderColor: "var(--theme-error)",
                                  },
                                },
                                ariaLabel: "Password",
                                ariaDescribedBy: "password-error",
                                ariaInvalid: "true",
                              },
                              {
                                type: "Stack",
                                id: "password-error",
                                props: {
                                  direction: "horizontal",
                                  gap: "xs",
                                  align: "center",
                                },
                                ariaLive: "polite",
                                children: [
                                  {
                                    type: "Icon",
                                    props: {
                                      name: "AlertCircle",
                                      size: "sm",
                                    },
                                    ariaHidden: true,
                                  },
                                  {
                                    type: "Text",
                                    props: {
                                      size: "sm",
                                      weight: "regular",
                                    },
                                    content:
                                      "Password must be at least 8 characters",
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
                      direction: "horizontal",
                      gap: "sm",
                      align: "start",
                    },
                    children: [
                      {
                        type: "Icon",
                        props: {
                          name: "Info",
                          size: "md",
                        },
                        ariaHidden: true,
                      },
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
                            content: "Error Handling Best Practices",
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
                                      "Use clear, actionable error messages",
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
                                      "Provide recovery actions when possible",
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
                                      "Use ARIA live regions for screen readers",
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
      editableText: ["error-title", "error-description"],
      editableImages: [],
    },
  },
};
