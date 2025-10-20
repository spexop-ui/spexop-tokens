/**
 * Vibrant Preset Theme
 * High-energy theme with saturated colors
 * Perfect for creative apps, gaming, and entertainment
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

export const vibrantPreset: SpexopThemeConfig = {
  meta: {
    name: "Vibrant",
    version: "1.0.0",
    description: "High-energy theme with saturated vibrant colors",
    author: "Spexop Team",
    tags: ["vibrant", "energetic", "colorful", "bold"],
  },

  colors: {
    // Primary brand color (electric purple)
    primary: "#a855f7",
    primaryHover: "#9333ea",
    primaryActive: "#7e22ce",

    // Secondary color (hot pink)
    secondary: "#ec4899",
    secondaryHover: "#db2777",
    secondaryActive: "#be185d",

    // Surface colors
    surface: "#ffffff",
    surfaceSecondary: "#fdf4ff",
    surfaceHover: "#f5e5ff",

    // Text colors
    text: "#581c87",
    textSecondary: "#6b21a8",
    textMuted: "#7e22ce",

    // Border colors
    border: "#e9d5ff",
    borderStrong: "#d8b4fe",
    borderSubtle: "#fdf4ff",

    // Semantic colors
    success: "#10b981",
    warning: "#fbbf24",
    error: "#f43f5e",
    info: "#06b6d4",

    // Accent colors (electric lime)
    accent: "#84cc16",
    accentHover: "#65a30d",
    accentActive: "#4d7c0f",

    // Link colors (electric purple)
    link: "#a855f7",
    linkHover: "#9333ea",
    linkActive: "#7e22ce",

    // Interactive states
    focus: "#84cc16",
    hover: "rgba(168, 85, 247, 0.15)",

    // Overlay/backdrop
    overlay: "rgba(88, 28, 135, 0.85)",
    backdrop: "rgba(88, 28, 135, 0.65)",

    // Neutral colors (vivid purples)
    neutral: "#7e22ce",
    neutralHover: "#6b21a8",
    neutralActive: "#581c87",
  },

  typography: {
    fontFamily:
      "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyHeading:
      "'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyMono: "'Fira Code', 'Courier New', monospace",
    baseSize: 16,
    scale: 1.3,
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
    thin: 2,
    default: 3,
    thick: 4,
    radiusSubtle: 16,
    radiusRelaxed: 24,
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
      surface: "#581c87",
      surfaceSecondary: "#6b21a8",
      surfaceHover: "#7e22ce",
      text: "#fdf4ff",
      textSecondary: "#f3e8ff",
      textMuted: "#e9d5ff",
      border: "#7e22ce",
      borderStrong: "#9333ea",
      borderSubtle: "#6b21a8",
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
