/**
 * Pricing Tiers Template
 * 3-tier pricing cards with feature comparison and clear CTAs
 */

import type { Template } from "../types.js";

export const pricingTiers: Template = {
  meta: {
    id: "pricing-tiers",
    name: "Pricing Tiers",
    description:
      "3-tier pricing cards with feature comparison, popular badges, and clear CTAs",
    category: "pricing",
    tier: "free",
    thumbnail: "/template-thumbnails/pricing-tiers.webp",
    tags: [
      "pricing",
      "subscription",
      "comparison",
      "accessibility-first",
      "mobile-optimized",
    ],
    author: "Spexop Team",
    version: "1.0.0",
  },
  structure: {
    type: "Section",
    role: "region",
    ariaLabel: "Pricing plans",
    props: {},
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
                type: "Stack",
                props: {
                  direction: "vertical",
                  gap: "sm",
                  align: "center",
                },
                children: [
                  {
                    type: "Heading",
                    id: "pricing-title",
                    props: {
                      level: 2,
                      align: "center",
                      weight: "bold",
                    },
                    content: "Simple, Transparent Pricing",
                  },
                  {
                    type: "Text",
                    id: "pricing-description",
                    props: {
                      size: "lg",
                      align: "center",
                      weight: "regular",
                    },
                    content:
                      "Choose the perfect plan for your needs. All plans include 14-day free trial.",
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
                    id: "tier-starter",
                    props: {
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
                            type: "Stack",
                            props: {
                              direction: "vertical",
                              gap: "xs",
                            },
                            children: [
                              {
                                type: "Heading",
                                props: {
                                  level: 3,
                                  weight: "semibold",
                                },
                                content: "Starter",
                              },
                              {
                                type: "Text",
                                props: {
                                  size: "sm",
                                  weight: "regular",
                                },
                                content: "Perfect for small projects",
                              },
                            ],
                          },
                          {
                            type: "Stack",
                            props: {
                              direction: "horizontal",
                              gap: "xs",
                              align: "baseline",
                            },
                            children: [
                              {
                                type: "Text",
                                props: {
                                  size: "3xl",
                                  weight: "bold",
                                },
                                content: "$9",
                              },
                              {
                                type: "Text",
                                props: {
                                  size: "base",
                                  weight: "regular",
                                },
                                content: "/month",
                              },
                            ],
                          },
                          {
                            type: "Button",
                            props: {
                              variant: "outline",
                              size: "lg",
                              fullWidth: true,
                            },
                            content: "Get Started",
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
                                  direction: "vertical",
                                  gap: "sm",
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
                                          weight: "regular",
                                        },
                                        content: "5 projects",
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
                                          weight: "regular",
                                        },
                                        content: "Basic support",
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
                                          weight: "regular",
                                        },
                                        content: "Community access",
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
                    id: "tier-pro",
                    props: {
                      padding: "lg",
                      variant: "elevated",
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
                            type: "Badge",
                            props: {
                              variant: "primary",
                            },
                            content: "Most Popular",
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
                                  level: 3,
                                  weight: "semibold",
                                },
                                content: "Pro",
                              },
                              {
                                type: "Text",
                                props: {
                                  size: "sm",
                                  weight: "regular",
                                },
                                content: "For growing teams",
                              },
                            ],
                          },
                          {
                            type: "Stack",
                            props: {
                              direction: "horizontal",
                              gap: "xs",
                              align: "baseline",
                            },
                            children: [
                              {
                                type: "Text",
                                props: {
                                  size: "3xl",
                                  weight: "bold",
                                },
                                content: "$29",
                              },
                              {
                                type: "Text",
                                props: {
                                  size: "base",
                                  weight: "regular",
                                },
                                content: "/month",
                              },
                            ],
                          },
                          {
                            type: "Button",
                            props: {
                              variant: "primary",
                              size: "lg",
                              fullWidth: true,
                            },
                            content: "Get Started",
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
                                  direction: "vertical",
                                  gap: "sm",
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
                                          weight: "regular",
                                        },
                                        content: "Unlimited projects",
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
                                          weight: "regular",
                                        },
                                        content: "Priority support",
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
                                          weight: "regular",
                                        },
                                        content: "Advanced analytics",
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
                                          weight: "regular",
                                        },
                                        content: "Custom domains",
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
                    id: "tier-enterprise",
                    props: {
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
                            type: "Stack",
                            props: {
                              direction: "vertical",
                              gap: "xs",
                            },
                            children: [
                              {
                                type: "Heading",
                                props: {
                                  level: 3,
                                  weight: "semibold",
                                },
                                content: "Enterprise",
                              },
                              {
                                type: "Text",
                                props: {
                                  size: "sm",
                                  weight: "regular",
                                },
                                content: "For large organizations",
                              },
                            ],
                          },
                          {
                            type: "Stack",
                            props: {
                              direction: "horizontal",
                              gap: "xs",
                              align: "baseline",
                            },
                            children: [
                              {
                                type: "Text",
                                props: {
                                  size: "3xl",
                                  weight: "bold",
                                },
                                content: "Custom",
                              },
                            ],
                          },
                          {
                            type: "Button",
                            props: {
                              variant: "outline",
                              size: "lg",
                              fullWidth: true,
                            },
                            content: "Contact Sales",
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
                                  direction: "vertical",
                                  gap: "sm",
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
                                          weight: "regular",
                                        },
                                        content: "Everything in Pro",
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
                                          weight: "regular",
                                        },
                                        content: "Dedicated support",
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
                                          weight: "regular",
                                        },
                                        content: "SLA guarantee",
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
                                          weight: "regular",
                                        },
                                        content: "Custom integrations",
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
      adjustableProps: ["maxWidth", "padding", "gap", "minColumnWidth"],
      breakpoints: true,
    },
    content: {
      editableText: ["pricing-title", "pricing-description"],
      editableImages: [],
    },
  },
};
