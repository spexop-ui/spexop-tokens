/**
 * Healthcare Preset Theme
 * Calming, accessible theme with blue and teal accents
 * Perfect for healthcare, medical, and wellness applications
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

export const healthcarePreset: SpexopThemeConfig = {
  meta: {
    name: "Healthcare",
    version: "1.0.0",
    description: "Calming healthcare theme with blue and teal for trust",
    author: "Spexop Team",
    tags: ["healthcare", "medical", "wellness", "accessible"],
  },

  colors: {
    // Primary brand color (medical blue)
    primary: "#0284c7",
    primaryHover: "#0369a1",
    primaryActive: "#075985",

    // Secondary color (calming teal)
    secondary: "#14b8a6",
    secondaryHover: "#0d9488",
    secondaryActive: "#0f766e",

    // Surface colors (clean white)
    surface: "#ffffff",
    surfaceSecondary: "#f0fdfa",
    surfaceHover: "#ccfbf1",

    // Text colors
    text: "#134e4a",
    textSecondary: "#0f766e",
    textMuted: "#5eead4",

    // Border colors
    border: "#99f6e4",
    borderStrong: "#5eead4",
    borderSubtle: "#f0fdfa",

    // Semantic colors
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#0284c7",

    // Accent colors (soothing teal)
    accent: "#14b8a6",
    accentHover: "#0d9488",
    accentActive: "#0f766e",

    // Link colors (calm blue)
    link: "#0284c7",
    linkHover: "#0369a1",
    linkActive: "#075985",

    // Interactive states
    focus: "#14b8a6",
    hover: "rgba(20, 184, 166, 0.1)",

    // Overlay/backdrop
    overlay: "rgba(19, 78, 74, 0.8)",
    backdrop: "rgba(19, 78, 74, 0.6)",

    // Neutral colors (teal grays)
    neutral: "#5eead4",
    neutralHover: "#0f766e",
    neutralActive: "#134e4a",
  },

  typography: {
    fontFamily: "'Nunito Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyHeading:
      "'Nunito Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyMono: "'Source Code Pro', 'Courier New', monospace",
    baseSize: 16,
    scale: 1.2,
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.3,
      snug: 1.375,
      normal: 1.6,
      relaxed: 1.8,
    },
  },

  spacing: {
    baseUnit: 4,
    scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
  },

  borders: {
    thin: 1,
    default: 1,
    thick: 2,
    radiusSubtle: 8,
    radiusRelaxed: 12,
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
      surface: "#164e63",
      surfaceSecondary: "#155e75",
      surfaceHover: "#0e7490",
      text: "#ecfeff",
      textSecondary: "#cffafe",
      textMuted: "#a5f3fc",
      border: "#0e7490",
      borderStrong: "#06b6d4",
      borderSubtle: "#155e75",
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
