/**
 * Corporate Preset Theme
 * Conservative, professional theme with navy and gray
 * Perfect for enterprise, B2B, and corporate applications
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

export const corporatePreset: SpexopThemeConfig = {
  meta: {
    name: "Corporate",
    version: "1.0.0",
    description:
      "Conservative corporate theme with navy and gray for professionalism",
    author: "Spexop Team",
    tags: ["corporate", "enterprise", "professional", "conservative"],
  },

  colors: {
    // Primary brand color (corporate navy)
    primary: "#1e40af",
    primaryHover: "#1e3a8a",
    primaryActive: "#1e3a8a",

    // Secondary color (slate gray)
    secondary: "#64748b",
    secondaryHover: "#475569",
    secondaryActive: "#334155",

    // Surface colors
    surface: "#ffffff",
    surfaceSecondary: "#f8fafc",
    surfaceHover: "#f1f5f9",

    // Text colors
    text: "#0f172a",
    textSecondary: "#475569",
    textMuted: "#64748b",

    // Border colors
    border: "#e2e8f0",
    borderStrong: "#cbd5e1",
    borderSubtle: "#f1f5f9",

    // Semantic colors
    success: "#059669",
    warning: "#d97706",
    error: "#dc2626",
    info: "#0284c7",

    // Accent colors (royal blue accent)
    accent: "#3b82f6",
    accentHover: "#2563eb",
    accentActive: "#1d4ed8",

    // Link colors (navy matching primary)
    link: "#1e40af",
    linkHover: "#1e3a8a",
    linkActive: "#1e3a8a",

    // Interactive states
    focus: "#3b82f6",
    hover: "rgba(30, 64, 175, 0.05)",

    // Overlay/backdrop
    overlay: "rgba(15, 23, 42, 0.8)",
    backdrop: "rgba(15, 23, 42, 0.6)",

    // Neutral colors (slate grays)
    neutral: "#64748b",
    neutralHover: "#475569",
    neutralActive: "#334155",
  },

  typography: {
    fontFamily: "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyHeading:
      "'Roboto', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyMono: "'Roboto Mono', 'Courier New', monospace",
    baseSize: 16,
    scale: 1.15,
    weights: {
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
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
    default: 1,
    thick: 2,
    radiusSubtle: 4,
    radiusRelaxed: 6,
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
