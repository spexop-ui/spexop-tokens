/**
 * Minimal Preset Theme
 * Clean, monochrome theme with subtle grays
 * Perfect for minimalist designs and content-focused apps
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

export const minimalPreset: SpexopThemeConfig = {
  meta: {
    name: "Minimal",
    version: "1.0.0",
    description: "Clean minimalist theme with monochrome palette",
    author: "Spexop Team",
    tags: ["minimal", "clean", "monochrome", "simple"],
  },

  colors: {
    // Primary brand color (neutral black)
    primary: "#000000",
    primaryHover: "#171717",
    primaryActive: "#262626",

    // Secondary color (dark gray)
    secondary: "#404040",
    secondaryHover: "#525252",
    secondaryActive: "#737373",

    // Surface colors
    surface: "#ffffff",
    surfaceSecondary: "#fafafa",
    surfaceHover: "#f5f5f5",

    // Text colors
    text: "#0a0a0a",
    textSecondary: "#525252",
    textMuted: "#737373",

    // Border colors
    border: "#e5e5e5",
    borderStrong: "#d4d4d4",
    borderSubtle: "#fafafa",

    // Semantic colors (muted)
    success: "#404040",
    warning: "#525252",
    error: "#171717",
    info: "#737373",

    // Accent colors (subtle gray accent)
    accent: "#262626",
    accentHover: "#404040",
    accentActive: "#525252",

    // Link colors (darker gray for links)
    link: "#171717",
    linkHover: "#262626",
    linkActive: "#404040",

    // Interactive states
    focus: "#000000",
    hover: "rgba(0, 0, 0, 0.03)",

    // Overlay/backdrop (subtle gray)
    overlay: "rgba(0, 0, 0, 0.5)",
    backdrop: "rgba(0, 0, 0, 0.3)",

    // Neutral colors (matching theme)
    neutral: "#737373",
    neutralHover: "#525252",
    neutralActive: "#404040",
  },

  typography: {
    fontFamily:
      "'System', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
    fontFamilyHeading:
      "'System', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
    fontFamilyMono: "'SF Mono', 'Menlo', 'Courier New', monospace",
    baseSize: 16,
    scale: 1.2,
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
    baseUnit: 8,
    scale: [0, 8, 16, 24, 32, 40, 48, 64, 80, 96, 128],
  },

  borders: {
    thin: 1,
    default: 1,
    thick: 1,
    radiusSubtle: 0,
    radiusRelaxed: 0,
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
      textSecondary: "#a3a3a3",
      textMuted: "#737373",
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
