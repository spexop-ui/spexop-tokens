/**
 * Blog Article Template
 * Article reading layout optimized for readability
 */

import type { Template } from "../types.js";

export const blogArticle: Template = {
  meta: {
    id: "blog-article",
    name: "Blog Article",
    description:
      "Article layout optimized for reading with narrow content column",
    category: "blog",
    tier: "free",
    thumbnail: "/template-thumbnails/blog-article.webp",
    tags: ["blog", "article", "content", "reading"],
    author: "Spexop Team",
    version: "1.0.0",
  },
  structure: {
    type: "Container",
    props: {
      maxWidth: "lg",
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
            type: "Stack",
            props: {
              direction: "vertical",
              gap: 3,
            },
            children: [
              {
                type: "Heading",
                id: "article-title",
                props: {
                  level: 1,
                },
                content: "Getting Started with Design Systems",
              },
              {
                type: "Text",
                id: "article-meta",
                props: {
                  size: "sm",
                  variant: "secondary",
                },
                content: "Published on January 15, 2025 · 5 min read",
              },
            ],
          },
          {
            type: "Stack",
            props: {
              direction: "vertical",
              gap: 4,
            },
            children: [
              {
                type: "Text",
                id: "article-intro",
                props: {
                  size: "lg",
                },
                content:
                  "Design systems are the foundation of consistent, scalable user interfaces. They provide a shared language between designers and developers.",
              },
              {
                type: "Heading",
                props: {
                  level: 2,
                },
                content: "What is a Design System?",
              },
              {
                type: "Text",
                props: {},
                content:
                  "A design system is a collection of reusable components, guided by clear standards, that can be assembled to build applications. It includes UI components, design tokens, patterns, and documentation.",
              },
              {
                type: "Heading",
                props: {
                  level: 2,
                },
                content: "Key Benefits",
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
                    content: "• Consistency across products and platforms",
                  },
                  {
                    type: "Text",
                    props: {},
                    content: "• Faster development with reusable components",
                  },
                  {
                    type: "Text",
                    props: {},
                    content:
                      "• Better collaboration between design and engineering",
                  },
                  {
                    type: "Text",
                    props: {},
                    content: "• Easier maintenance and updates",
                  },
                ],
              },
              {
                type: "Heading",
                props: {
                  level: 2,
                },
                content: "Getting Started",
              },
              {
                type: "Text",
                props: {},
                content:
                  "Start by defining your design tokens: colors, typography, spacing, and other fundamental values. Then build your component library on top of these tokens.",
              },
              {
                type: "Card",
                props: {
                  padding: 6,
                  variant: "subtle",
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
                        content: "Quick Tip",
                      },
                      {
                        type: "Text",
                        props: {},
                        content:
                          "Use design tokens instead of hard-coded values. This makes theming and updates much easier down the line.",
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
      adjustableProps: ["maxWidth", "padding"],
      breakpoints: false,
    },
    content: {
      editableText: ["article-title", "article-meta", "article-intro"],
      editableImages: [],
    },
  },
};
