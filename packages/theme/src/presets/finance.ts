/**
 * Finance Preset Theme
 * Professional, trustworthy theme with green and gold accents
 * Perfect for financial services, banking, and fintech
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

export const financePreset: SpexopThemeConfig = {
  meta: {
    name: "Finance",
    version: "1.0.0",
    description:
      "Professional finance theme with green and gold accents for trust",
    author: "Spexop Team",
    tags: ["finance", "banking", "professional", "trustworthy"],
  },

  colors: {
    // Primary brand color (emerald green)
    primary: "#059669",
    primaryHover: "#047857",
    primaryActive: "#065f46",
    primaryLight: "#eff6ff",
    primaryDark: "#1e3a8a",

    // Secondary color (gold)
    secondary: "#d97706",
    secondaryHover: "#b45309",
    secondaryActive: "#92400e",
    secondaryLight: "#f5f3ff",
    secondaryDark: "#4c1d95",

    // Surface colors (warm white)
    surface: "#fefefe",
    surfaceSecondary: "#f9fafb",
    surfaceHover: "#f3f4f6",

    // Text colors (dark gray)
    text: "#1f2937",
    textSecondary: "#4b5563",
    textMuted: "#6b7280",

    // Border colors
    border: "#e5e7eb",
    borderStrong: "#d1d5db",
    borderSubtle: "#f3f4f6",

    // Semantic colors
    success: "#10b981",
    successLight: "#d1fae5",
    successDark: "#065f46",
    warning: "#f59e0b",
    warningLight: "#fef3c7",
    warningDark: "#92400e",
    error: "#dc2626",
    errorLight: "#fee2e2",
    errorDark: "#991b1b",
    info: "#0284c7",
    infoLight: "#dbeafe",
    infoDark: "#1e40af",

    // Accent colors (luxurious gold)
    accent: "#f59e0b",
    accentHover: "#d97706",
    accentActive: "#b45309",

    // Link colors (professional green)
    link: "#059669",
    linkHover: "#047857",
    linkActive: "#065f46",

    // Interactive states
    focus: "#0284c7",
    hover: "rgba(5, 150, 105, 0.05)",

    // Overlay/backdrop
    overlay: "rgba(31, 41, 55, 0.85)",
    backdrop: "rgba(31, 41, 55, 0.65)",

    // Neutral colors (cool grays)
    neutral: "#6b7280",
    neutralHover: "#4b5563",
    neutralActive: "#1f2937",
  },

  typography: {
    fontFamily:
      "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyHeading:
      "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyMono: "'IBM Plex Mono', 'Courier New', monospace",
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
    baseUnit: 4,
    scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64],
  },

  borders: {
    thin: 1,
    default: 1,
    thick: 2,
    radiusSubtle: 4,
    radiusRelaxed: 8,
    radiusPill: 9999,
    defaultStyle: "solid",
  },

  radii: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    "2xl": 20,
    full: 9999,
  },

  shadows: {
    none: "none",
    sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.15)",
  },

  zIndex: {
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modal: 1300,
    popover: 1400,
    tooltip: 1500,
    toast: 1600,
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
      surface: "#111827",
      surfaceSecondary: "#1f2937",
      surfaceHover: "#374151",
      text: "#f9fafb",
      textSecondary: "#d1d5db",
      textMuted: "#9ca3af",
      border: "#374151",
      borderStrong: "#4b5563",
      borderSubtle: "#1f2937",
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
