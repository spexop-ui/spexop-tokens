/**
 * Agency Preset Theme
 * Bold, creative theme with vibrant colors
 * Perfect for creative agencies and design studios
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

export const agencyPreset: SpexopThemeConfig = {
  meta: {
    name: "Agency",
    version: "1.0.0",
    description:
      "Bold creative theme with vibrant colors and modern aesthetics",
    author: "Spexop Team",
    tags: ["agency", "creative", "bold", "vibrant"],
  },

  colors: {
    // Primary brand color (electric pink)
    primary: "#ec4899",
    primaryHover: "#db2777",
    primaryActive: "#be185d",

    // Secondary color (vibrant orange)
    secondary: "#f97316",
    secondaryHover: "#ea580c",
    secondaryActive: "#c2410c",

    // Surface colors
    surface: "#ffffff",
    surfaceSecondary: "#fafafa",
    surfaceHover: "#f5f5f5",

    // Text colors
    text: "#0a0a0a",
    textSecondary: "#404040",
    textMuted: "#737373",

    // Border colors
    border: "#e5e5e5",
    borderStrong: "#d4d4d4",
    borderSubtle: "#fafafa",

    // Semantic colors
    success: "#10b981",
    warning: "#fbbf24",
    error: "#ef4444",
    info: "#06b6d4",

    // Accent colors (purple for creative flair)
    accent: "#a855f7",
    accentHover: "#9333ea",
    accentActive: "#7e22ce",

    // Link colors (cyan for high contrast)
    link: "#0891b2",
    linkHover: "#0e7490",
    linkActive: "#155e75",

    // Interactive states
    focus: "#06b6d4",
    hover: "rgba(236, 72, 153, 0.1)",

    // Overlay/backdrop
    overlay: "rgba(0, 0, 0, 0.75)",
    backdrop: "rgba(0, 0, 0, 0.5)",

    // Neutral colors
    neutral: "#737373",
    neutralHover: "#525252",
    neutralActive: "#404040",
  },

  typography: {
    fontFamily: "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyHeading:
      "'Poppins', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyMono: "'JetBrains Mono', 'Courier New', monospace",
    baseSize: 16,
    scale: 1.25,
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
    default: 2,
    thick: 4,
    radiusSubtle: 12,
    radiusRelaxed: 20,
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
      surface: "#0a0a0a",
      surfaceSecondary: "#171717",
      surfaceHover: "#262626",
      text: "#fafafa",
      textSecondary: "#d4d4d4",
      textMuted: "#a3a3a3",
      border: "#262626",
      borderStrong: "#404040",
      borderSubtle: "#171717",
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
