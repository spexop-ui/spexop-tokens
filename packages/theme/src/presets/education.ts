/**
 * Education Preset Theme
 * Friendly, approachable theme with yellow and blue accents
 * Perfect for educational platforms, learning management systems
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

export const educationPreset: SpexopThemeConfig = {
  meta: {
    name: "Education",
    version: "1.0.0",
    description: "Friendly education theme with yellow and blue for learning",
    author: "Spexop Team",
    tags: ["education", "learning", "friendly", "accessible"],
  },

  colors: {
    // Primary brand color (friendly blue)
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    primaryActive: "#1d4ed8",

    // Secondary color (cheerful yellow)
    secondary: "#fbbf24",
    secondaryHover: "#f59e0b",
    secondaryActive: "#d97706",

    // Surface colors
    surface: "#ffffff",
    surfaceSecondary: "#fef9c3",
    surfaceHover: "#fef08a",

    // Text colors
    text: "#713f12",
    textSecondary: "#854d0e",
    textMuted: "#a16207",

    // Border colors
    border: "#fef08a",
    borderStrong: "#fde047",
    borderSubtle: "#fef9c3",

    // Semantic colors
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",

    // Accent colors (vibrant purple for engagement)
    accent: "#8b5cf6",
    accentHover: "#7c3aed",
    accentActive: "#6d28d9",

    // Link colors (bright blue)
    link: "#3b82f6",
    linkHover: "#2563eb",
    linkActive: "#1d4ed8",

    // Interactive states
    focus: "#3b82f6",
    hover: "rgba(59, 130, 246, 0.1)",

    // Overlay/backdrop
    overlay: "rgba(113, 63, 18, 0.75)",
    backdrop: "rgba(113, 63, 18, 0.5)",

    // Neutral colors (warm browns)
    neutral: "#a16207",
    neutralHover: "#854d0e",
    neutralActive: "#713f12",
  },

  typography: {
    fontFamily: "'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyHeading:
      "'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyMono: "'Ubuntu Mono', 'Courier New', monospace",
    baseSize: 17,
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
      surface: "#1e3a8a",
      surfaceSecondary: "#1e40af",
      surfaceHover: "#2563eb",
      text: "#dbeafe",
      textSecondary: "#bfdbfe",
      textMuted: "#93c5fd",
      border: "#2563eb",
      borderStrong: "#3b82f6",
      borderSubtle: "#1e40af",
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
