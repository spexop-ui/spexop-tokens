/**
 * E-commerce Product Template
 * Product page layout with image and details
 */

import type { Template } from "../types.js";

export const ecommerceProduct: Template = {
  meta: {
    id: "ecommerce-product",
    name: "E-commerce Product",
    description: "Product page layout with image gallery and purchase details",
    category: "ecommerce",
    tier: "free",
    thumbnail: "/template-thumbnails/ecommerce-product.webp",
    tags: [
      "ecommerce",
      "product",
      "shop",
      "store",
      "accessibility-first",
      "icon-enhanced",
    ],
    author: "Spexop Team",
    version: "1.0.0",
  },
  structure: {
    type: "Main",
    role: "main",
    ariaLabel: "Product details",
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
            type: "Grid",
            props: {
              columns: "auto-fit",
              minColumnWidth: "350px",
              gap: "lg",
            },
            children: [
              {
                type: "GridItem",
                props: {},
                children: [
                  {
                    type: "Stack",
                    props: {
                      direction: "vertical",
                      gap: "sm",
                    },
                    children: [
                      {
                        type: "Card",
                        id: "product-image",
                        props: {
                          padding: "lg",
                          variant: "subtle",
                        },
                        children: [
                          {
                            type: "Text",
                            props: {
                              align: "center",
                              size: "lg",
                              weight: "regular",
                            },
                            content: "Product Image",
                          },
                        ],
                      },
                      {
                        type: "Grid",
                        props: {
                          columns: 4,
                          gap: "xs",
                        },
                        children: [
                          {
                            type: "Card",
                            props: {
                              padding: "sm",
                              variant: "subtle",
                            },
                          },
                          {
                            type: "Card",
                            props: {
                              padding: "sm",
                              variant: "subtle",
                            },
                          },
                          {
                            type: "Card",
                            props: {
                              padding: "sm",
                              variant: "subtle",
                            },
                          },
                          {
                            type: "Card",
                            props: {
                              padding: "sm",
                              variant: "subtle",
                            },
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                type: "GridItem",
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
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: "sm",
                        },
                        children: [
                          {
                            type: "Heading",
                            id: "product-name",
                            props: {
                              level: 1,
                              weight: "bold",
                            },
                            content: "Premium Product Name",
                          },
                          {
                            type: "Text",
                            id: "product-price",
                            props: {
                              size: "2xl",
                              weight: "bold",
                            },
                            content: "$99.99",
                          },
                          {
                            type: "Text",
                            id: "product-description",
                            props: {
                              size: "base",
                              weight: "regular",
                            },
                            content:
                              "High-quality product with exceptional features. Perfect for your needs with premium materials and craftsmanship.",
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
                              level: 3,
                              weight: "semibold",
                            },
                            content: "Features",
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
                                      weight: "regular",
                                    },
                                    content: "Premium quality materials",
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
                                    content: "Sustainable and eco-friendly",
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
                                    content: "2-year warranty included",
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
                                    content: "Free shipping worldwide",
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
                            type: "Button",
                            id: "add-to-cart",
                            props: {
                              variant: "primary",
                              size: "lg",
                              fullWidth: true,
                            },
                            ariaLabel: "Add product to shopping cart",
                            content: "Add to Cart",
                          },
                          {
                            type: "Button",
                            id: "buy-now",
                            props: {
                              variant: "secondary",
                              size: "lg",
                              fullWidth: true,
                            },
                            ariaLabel: "Buy product now",
                            content: "Buy Now",
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
      editableText: [
        "product-name",
        "product-price",
        "product-description",
        "add-to-cart",
        "buy-now",
      ],
      editableImages: ["product-image"],
    },
  },
};
