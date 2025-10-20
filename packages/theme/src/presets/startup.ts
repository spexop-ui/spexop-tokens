/**
 * Startup Preset Theme
 * Modern, innovative theme with gradient-ready colors
 * Perfect for startups, innovation labs, and modern products
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

export const startupPreset: SpexopThemeConfig = {
  meta: {
    name: "Startup",
    version: "1.0.0",
    description:
      "Modern innovative theme for startups with gradient-ready colors",
    author: "Spexop Team",
    tags: ["startup", "modern", "innovative", "gradient"],
  },

  colors: {
    // Primary brand color (indigo)
    primary: "#6366f1",
    primaryHover: "#4f46e5",
    primaryActive: "#4338ca",

    // Secondary color (rose)
    secondary: "#fb7185",
    secondaryHover: "#f43f5e",
    secondaryActive: "#e11d48",

    // Surface colors
    surface: "#ffffff",
    surfaceSecondary: "#f8fafc",
    surfaceHover: "#f1f5f9",

    // Text colors
    text: "#0f172a",
    textSecondary: "#334155",
    textMuted: "#64748b",

    // Border colors
    border: "#e2e8f0",
    borderStrong: "#cbd5e1",
    borderSubtle: "#f8fafc",

    // Semantic colors
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#06b6d4",

    // Accent colors (vibrant cyan)
    accent: "#06b6d4",
    accentHover: "#0891b2",
    accentActive: "#0e7490",

    // Link colors (indigo)
    link: "#6366f1",
    linkHover: "#4f46e5",
    linkActive: "#4338ca",

    // Interactive states
    focus: "#06b6d4",
    hover: "rgba(99, 102, 241, 0.1)",

    // Overlay/backdrop
    overlay: "rgba(15, 23, 42, 0.8)",
    backdrop: "rgba(15, 23, 42, 0.6)",

    // Neutral colors (slate)
    neutral: "#64748b",
    neutralHover: "#334155",
    neutralActive: "#0f172a",
  },

  typography: {
    fontFamily:
      "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyHeading:
      "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyMono: "'JetBrains Mono', 'Courier New', monospace",
    baseSize: 16,
    scale: 1.25,
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 800,
    },
    lineHeights: {
      tight: 1.2,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  spacing: {
    baseUnit: 4,
    scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
  },

  borders: {
    thin: 1,
    default: 2,
    thick: 3,
    radiusSubtle: 10,
    radiusRelaxed: 16,
    radiusPill: 9999,
    defaultStyle: "solid",
  },

  cards: {
    basic: {
      background: "colors.surface",
      border: "colors.border",
      backgroundHover: "colors.surface",
      borderHover: "colors.borderStrong",
    },
    highlighted: {
      background: "colors.surface",
      border: "colors.primary",
      backgroundHover: "colors.surface",
      borderHover: "colors.primaryActive",
    },
    outlined: {
      background: "colors.surface",
      border: "colors.text",
      borderWidth: "borders.thick",
      backgroundHover: "colors.surface",
      borderHover: "colors.text",
    },
    interactive: {
      background: "colors.surface",
      border: "colors.border",
      backgroundHover: "colors.surface",
      borderHover: "colors.primary",
    },
    ghost: {
      background: "transparent",
      border: "colors.border",
      borderStyle: "dashed",
      backgroundHover: "transparent",
      borderHover: "colors.text",
    },
    elevated: {
      background: "colors.surfaceHover",
      border: "colors.primary",
      backgroundHover: "colors.surfaceHover",
      borderHover: "colors.primary",
    },
  },

  breakpoints: {
    xs: 320,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
  },

  darkMode: {
    enabled: true,
    colors: {
      surface: "#0f172a",
      surfaceSecondary: "#1e293b",
      surfaceHover: "#334155",
      text: "#f8fafc",
      textSecondary: "#cbd5e1",
      textMuted: "#94a3b8",
      border: "#334155",
      borderStrong: "#475569",
      borderSubtle: "#1e293b",
    },
    cards: {
      basic: {
        background: "colors.surfaceSecondary",
        border: "colors.borderStrong",
        backgroundHover: "colors.surfaceSecondary",
        borderHover: "colors.border",
      },
      highlighted: {
        background: "colors.surfaceSecondary",
        border: "colors.primary",
        backgroundHover: "colors.surfaceSecondary",
        borderHover: "colors.primaryHover",
      },
      outlined: {
        background: "colors.surfaceSecondary",
        border: "colors.border",
        backgroundHover: "colors.surfaceSecondary",
        borderHover: "colors.border",
      },
      interactive: {
        background: "colors.surfaceSecondary",
        border: "colors.borderStrong",
        backgroundHover: "colors.surfaceSecondary",
        borderHover: "colors.primary",
      },
      ghost: {
        background: "transparent",
        border: "colors.borderStrong",
        backgroundHover: "transparent",
        borderHover: "colors.border",
      },
      elevated: {
        background: "colors.surfaceSecondary",
        border: "colors.primary",
        backgroundHover: "colors.surfaceSecondary",
        borderHover: "colors.primary",
      },
    },
  },
};
