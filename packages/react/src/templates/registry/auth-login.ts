/**
 * Authentication Login Template
 * Modern centered login form with accessibility and validation patterns
 */

import type { Template } from "../types.js";

export const authLogin: Template = {
  meta: {
    id: "auth-login",
    name: "Login Form",
    description:
      "Modern centered login form with email/password fields, social login options, and proper accessibility",
    category: "auth",
    tier: "free",
    thumbnail: "/template-thumbnails/auth-login.webp",
    tags: ["auth", "login", "form", "accessibility-first", "mobile-optimized"],
    author: "Spexop Team",
    version: "1.0.0",
    accessibility: {
      landmarks: [{ type: "main", label: "Login form" }],
      skipLinks: [],
      focusManagement: {
        initialFocus: "email-input",
        returnFocus: false,
      },
    },
  },
  structure: {
    type: "Main",
    role: "main",
    ariaLabel: "Login form",
    props: {},
    children: [
      {
        type: "Container",
        props: {
          maxWidth: "sm",
          padding: "lg",
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
                    id: "login-title",
                    props: {
                      level: 1,
                      align: "center",
                      weight: "bold",
                    },
                    content: "Welcome Back",
                  },
                  {
                    type: "Text",
                    id: "login-subtitle",
                    props: {
                      size: "base",
                      align: "center",
                      weight: "regular",
                    },
                    content: "Sign in to your account to continue",
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
                    type: "Form",
                    props: {
                      action: "/login",
                      method: "post",
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
                                  autoComplete: "email",
                                },
                                ariaLabel: "Email address",
                                ariaDescribedBy: "email-error",
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
                                  autoComplete: "current-password",
                                },
                                ariaLabel: "Password",
                                ariaDescribedBy: "password-error",
                              },
                            ],
                          },
                          {
                            type: "Stack",
                            props: {
                              direction: "horizontal",
                              gap: "sm",
                              align: "center",
                              justify: "space-between",
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
                                    type: "Checkbox",
                                    id: "remember-me",
                                    props: {
                                      name: "remember",
                                    },
                                    ariaLabel: "Remember me",
                                  },
                                  {
                                    type: "Label",
                                    props: {
                                      htmlFor: "remember-me",
                                      weight: "regular",
                                    },
                                    content: "Remember me",
                                  },
                                ],
                              },
                              {
                                type: "Link",
                                props: {
                                  href: "/forgot-password",
                                  variant: "text",
                                  size: "sm",
                                },
                                content: "Forgot password?",
                              },
                            ],
                          },
                          {
                            type: "Button",
                            id: "login-button",
                            props: {
                              type: "submit",
                              variant: "primary",
                              size: "lg",
                              fullWidth: true,
                            },
                            content: "Sign In",
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
                  gap: "xs",
                  align: "center",
                },
                children: [
                  {
                    type: "Text",
                    props: {
                      size: "sm",
                      weight: "regular",
                    },
                    content: "Don't have an account?",
                  },
                  {
                    type: "Link",
                    props: {
                      href: "/signup",
                      variant: "text",
                      size: "sm",
                    },
                    content: "Sign up",
                  },
                ],
              },
              {
                type: "Stack",
                props: {
                  direction: "vertical",
                  gap: "md",
                  fullWidth: true,
                },
                children: [
                  {
                    type: "Stack",
                    props: {
                      direction: "horizontal",
                      gap: "sm",
                      align: "center",
                    },
                    children: [
                      {
                        type: "Section",
                        props: {
                          style: {
                            flex: 1,
                            height: "1px",
                            borderTop: "1px solid var(--theme-border)",
                          },
                        },
                      },
                      {
                        type: "Text",
                        props: {
                          size: "sm",
                          weight: "regular",
                        },
                        content: "Or continue with",
                      },
                      {
                        type: "Section",
                        props: {
                          style: {
                            flex: 1,
                            height: "1px",
                            borderTop: "1px solid var(--theme-border)",
                          },
                        },
                      },
                    ],
                  },
                  {
                    type: "Grid",
                    props: {
                      columns: 2,
                      gap: "sm",
                    },
                    children: [
                      {
                        type: "Button",
                        props: {
                          variant: "outline",
                          size: "md",
                          fullWidth: true,
                        },
                        ariaLabel: "Sign in with GitHub",
                        children: [
                          {
                            type: "Stack",
                            props: {
                              direction: "horizontal",
                              gap: "xs",
                              align: "center",
                              justify: "center",
                            },
                            children: [
                              {
                                type: "Icon",
                                props: {
                                  name: "Github",
                                  size: "md",
                                },
                              },
                              {
                                type: "Text",
                                props: {
                                  weight: "semibold",
                                },
                                content: "GitHub",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: "Button",
                        props: {
                          variant: "outline",
                          size: "md",
                          fullWidth: true,
                        },
                        ariaLabel: "Sign in with Google",
                        children: [
                          {
                            type: "Stack",
                            props: {
                              direction: "horizontal",
                              gap: "xs",
                              align: "center",
                              justify: "center",
                            },
                            children: [
                              {
                                type: "Icon",
                                props: {
                                  name: "Mail",
                                  size: "md",
                                },
                              },
                              {
                                type: "Text",
                                props: {
                                  weight: "semibold",
                                },
                                content: "Google",
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
      editableText: ["login-title", "login-subtitle"],
      editableImages: [],
    },
  },
};
