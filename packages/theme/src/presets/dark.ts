/**
 * Dark Preset Theme
 * Dark-first theme optimized for low-light environments
 * Perfect for apps used in dark conditions or developer tools
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

export const darkPreset: SpexopThemeConfig = {
  meta: {
    name: "Dark",
    version: "1.0.0",
    description: "Dark-first theme optimized for low-light usage",
    author: "Spexop Team",
    tags: ["dark", "night", "developer", "low-light"],
  },

  colors: {
    // Primary brand color (cyan)
    primary: "#06b6d4",
    primaryHover: "#0891b2",
    primaryActive: "#0e7490",
    primaryLight: "#eff6ff",
    primaryDark: "#1e3a8a",

    // Secondary color (purple)
    secondary: "#a78bfa",
    secondaryHover: "#8b5cf6",
    secondaryActive: "#7c3aed",
    secondaryLight: "#f5f3ff",
    secondaryDark: "#4c1d95",

    // Surface colors (dark)
    surface: "#0a0a0a",
    surfaceSecondary: "#171717",
    surfaceHover: "#262626",

    // Text colors (light)
    text: "#fafafa",
    textSecondary: "#d4d4d4",
    textMuted: "#a3a3a3",

    // Border colors (subtle)
    border: "#262626",
    borderStrong: "#404040",
    borderSubtle: "#171717",

    // Semantic colors
    success: "#10b981",
    successLight: "#d1fae5",
    successDark: "#065f46",
    warning: "#fbbf24",
    warningLight: "#fef3c7",
    warningDark: "#92400e",
    error: "#f87171",
    errorLight: "#fee2e2",
    errorDark: "#991b1b",
    info: "#60a5fa",
    infoLight: "#dbeafe",
    infoDark: "#1e40af",

    // Accent colors (vibrant purple for dark mode)
    accent: "#c084fc",
    accentHover: "#a78bfa",
    accentActive: "#8b5cf6",

    // Link colors (bright cyan to match primary)
    link: "#22d3ee",
    linkHover: "#06b6d4",
    linkActive: "#0891b2",

    // Interactive states
    focus: "#22d3ee",
    hover: "rgba(255, 255, 255, 0.1)",

    // Overlay/backdrop (very dark)
    overlay: "rgba(0, 0, 0, 0.95)",
    backdrop: "rgba(0, 0, 0, 0.8)",

    // Neutral colors (mid-grays)
    neutral: "#737373",
    neutralHover: "#a3a3a3",
    neutralActive: "#d4d4d4",
  },

  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyHeading: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyMono: "'Fira Code', 'Courier New', monospace",
    baseSize: 15,
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
    radiusSubtle: 6,
    radiusRelaxed: 10,
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
      surface: "#000000",
      surfaceSecondary: "#0a0a0a",
      surfaceHover: "#171717",
      text: "#ffffff",
      textSecondary: "#e5e5e5",
      textMuted: "#d4d4d4",
      border: "#171717",
      borderStrong: "#262626",
      borderSubtle: "#0a0a0a",
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
