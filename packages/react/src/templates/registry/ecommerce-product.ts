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
    tags: ["ecommerce", "product", "shop", "store"],
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
        type: "Grid",
        props: {
          columns: "auto-fit",
          minColumnWidth: "350px",
          gap: 8,
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
                  gap: 4,
                },
                children: [
                  {
                    type: "Card",
                    id: "product-image",
                    props: {
                      padding: 8,
                      variant: "subtle",
                    },
                    children: [
                      {
                        type: "Text",
                        props: {
                          align: "center",
                          size: "lg",
                        },
                        content: "Product Image",
                      },
                    ],
                  },
                  {
                    type: "Grid",
                    props: {
                      columns: 4,
                      gap: 3,
                    },
                    children: [
                      {
                        type: "Card",
                        props: {
                          padding: 4,
                          variant: "subtle",
                        },
                      },
                      {
                        type: "Card",
                        props: {
                          padding: 4,
                          variant: "subtle",
                        },
                      },
                      {
                        type: "Card",
                        props: {
                          padding: 4,
                          variant: "subtle",
                        },
                      },
                      {
                        type: "Card",
                        props: {
                          padding: 4,
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
                  gap: 6,
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
                        id: "product-name",
                        props: {
                          level: 1,
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
                      gap: 3,
                    },
                    children: [
                      {
                        type: "Heading",
                        props: {
                          level: 3,
                        },
                        content: "Features",
                      },
                      {
                        type: "Stack",
                        props: {
                          direction: "vertical",
                          gap: 2,
                        },
                        children: [
                          {
                            type: "Text",
                            props: {},
                            content: "✓ Premium quality materials",
                          },
                          {
                            type: "Text",
                            props: {},
                            content: "✓ Sustainable and eco-friendly",
                          },
                          {
                            type: "Text",
                            props: {},
                            content: "✓ 2-year warranty included",
                          },
                          {
                            type: "Text",
                            props: {},
                            content: "✓ Free shipping worldwide",
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: "Stack",
                    props: {
                      direction: "vertical",
                      gap: 3,
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
