/**
 * Comprehensive Footer Template
 * Multi-column footer with links, social media, and newsletter signup
 */

import type { Template } from "../types.js";

export const footerComprehensive: Template = {
  meta: {
    id: "footer-comprehensive",
    name: "Comprehensive Footer",
    description:
      "Multi-column footer with organized links, social media icons, newsletter signup, and legal information",
    category: "navigation",
    tier: "free",
    thumbnail: "/template-thumbnails/footer-comprehensive.webp",
    tags: [
      "navigation",
      "footer",
      "links",
      "newsletter",
      "accessibility-first",
      "icon-enhanced",
    ],
    author: "Spexop Team",
    version: "1.0.0",
    accessibility: {
      landmarks: [{ type: "contentinfo", label: "Footer" }],
      skipLinks: [],
      focusManagement: {
        initialFocus: undefined,
        returnFocus: false,
      },
    },
  },
  structure: {
    type: "Footer",
    role: "contentinfo",
    props: {
      style: {
        background: "var(--theme-surface-secondary)",
        borderTop: "2px solid var(--theme-border)",
      },
    },
    children: [
      {
        type: "Container",
        props: {
          maxWidth: "2xl",
          padding: "xl",
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
                type: "Grid",
                props: {
                  columns: "auto-fit",
                  minColumnWidth: "200px",
                  gap: "lg",
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
                          direction: "horizontal",
                          gap: "xs",
                          align: "center",
                        },
                        children: [
                          {
                            type: "Icon",
                            props: {
                              name: "Box",
                              size: "lg",
                            },
                          },
                          {
                            type: "Heading",
                            id: "footer-brand",
                            props: {
                              level: 3,
                              weight: "bold",
                            },
                            content: "Spexop",
                          },
                        ],
                      },
                      {
                        type: "Text",
                        id: "footer-tagline",
                        props: {
                          size: "sm",
                          weight: "regular",
                        },
                        content:
                          "Build beautiful interfaces with modern design principles.",
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
                            type: "Link",
                            props: {
                              href: "https://twitter.com/spexop",
                              variant: "ghost",
                              size: "sm",
                            },
                            ariaLabel: "Follow us on Twitter",
                            children: [
                              {
                                type: "Icon",
                                props: {
                                  name: "Twitter",
                                  size: "md",
                                },
                              },
                            ],
                          },
                          {
                            type: "Link",
                            props: {
                              href: "https://github.com/spexop",
                              variant: "ghost",
                              size: "sm",
                            },
                            ariaLabel: "View our GitHub repository",
                            children: [
                              {
                                type: "Icon",
                                props: {
                                  name: "Github",
                                  size: "md",
                                },
                              },
                            ],
                          },
                          {
                            type: "Link",
                            props: {
                              href: "https://linkedin.com/company/spexop",
                              variant: "ghost",
                              size: "sm",
                            },
                            ariaLabel: "Connect with us on LinkedIn",
                            children: [
                              {
                                type: "Icon",
                                props: {
                                  name: "Linkedin",
                                  size: "md",
                                },
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
                        content: "Product",
                      },
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: "xs",
                        },
                        children: [
                          {
                            type: "Link",
                            props: {
                              href: "/features",
                              variant: "text",
                              size: "sm",
                            },
                            content: "Features",
                          },
                          {
                            type: "Link",
                            props: {
                              href: "/pricing",
                              variant: "text",
                              size: "sm",
                            },
                            content: "Pricing",
                          },
                          {
                            type: "Link",
                            props: {
                              href: "/changelog",
                              variant: "text",
                              size: "sm",
                            },
                            content: "Changelog",
                          },
                          {
                            type: "Link",
                            props: {
                              href: "/roadmap",
                              variant: "text",
                              size: "sm",
                            },
                            content: "Roadmap",
                          },
                        ],
                      },
                    ],
                  },
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
                        content: "Resources",
                      },
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: "xs",
                        },
                        children: [
                          {
                            type: "Link",
                            props: {
                              href: "/docs",
                              variant: "text",
                              size: "sm",
                            },
                            content: "Documentation",
                          },
                          {
                            type: "Link",
                            props: {
                              href: "/examples",
                              variant: "text",
                              size: "sm",
                            },
                            content: "Examples",
                          },
                          {
                            type: "Link",
                            props: {
                              href: "/blog",
                              variant: "text",
                              size: "sm",
                            },
                            content: "Blog",
                          },
                          {
                            type: "Link",
                            props: {
                              href: "/community",
                              variant: "text",
                              size: "sm",
                            },
                            content: "Community",
                          },
                        ],
                      },
                    ],
                  },
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
                        content: "Company",
                      },
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: "xs",
                        },
                        children: [
                          {
                            type: "Link",
                            props: {
                              href: "/about",
                              variant: "text",
                              size: "sm",
                            },
                            content: "About",
                          },
                          {
                            type: "Link",
                            props: {
                              href: "/careers",
                              variant: "text",
                              size: "sm",
                            },
                            content: "Careers",
                          },
                          {
                            type: "Link",
                            props: {
                              href: "/contact",
                              variant: "text",
                              size: "sm",
                            },
                            content: "Contact",
                          },
                          {
                            type: "Link",
                            props: {
                              href: "/support",
                              variant: "text",
                              size: "sm",
                            },
                            content: "Support",
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "Section",
                props: {
                  style: {
                    borderTop: "1px solid var(--theme-border)",
                    paddingTop: "var(--theme-spacing-md)",
                  },
                },
                children: [
                  {
                    type: "Stack",
                    props: {
                      direction: "horizontal",
                      gap: "md",
                      align: "center",
                      justify: "space-between",
                    },
                    children: [
                      {
                        type: "Text",
                        id: "copyright",
                        props: {
                          size: "sm",
                          weight: "regular",
                        },
                        content: "© 2025 Spexop. All rights reserved.",
                      },
                      {
                        type: "Stack",
                        props: {
                          direction: "horizontal",
                          gap: "md",
                          align: "center",
                        },
                        children: [
                          {
                            type: "Link",
                            props: {
                              href: "/privacy",
                              variant: "text",
                              size: "sm",
                            },
                            content: "Privacy",
                          },
                          {
                            type: "Link",
                            props: {
                              href: "/terms",
                              variant: "text",
                              size: "sm",
                            },
                            content: "Terms",
                          },
                          {
                            type: "Link",
                            props: {
                              href: "/cookies",
                              variant: "text",
                              size: "sm",
                            },
                            content: "Cookies",
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
      editableText: ["footer-brand", "footer-tagline", "copyright"],
      editableImages: [],
    },
  },
};
