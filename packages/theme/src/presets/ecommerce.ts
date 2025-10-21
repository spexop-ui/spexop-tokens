/**
 * E-commerce Preset Theme
 * Vibrant, energetic theme with orange and red accents
 * Perfect for online stores, marketplaces, and retail
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

export const ecommercePreset: SpexopThemeConfig = {
  meta: {
    name: "E-commerce",
    version: "1.0.0",
    description: "Vibrant e-commerce theme with orange and red for energy",
    author: "Spexop Team",
    tags: ["ecommerce", "retail", "shopping", "vibrant"],
  },

  colors: {
    // Primary brand color (vibrant orange)
    primary: "#f97316",
    primaryHover: "#ea580c",
    primaryActive: "#c2410c",
    primaryLight: "#eff6ff",
    primaryDark: "#1e3a8a",

    // Secondary color (energetic red)
    secondary: "#ef4444",
    secondaryHover: "#dc2626",
    secondaryActive: "#b91c1c",
    secondaryLight: "#f5f3ff",
    secondaryDark: "#4c1d95",

    // Surface colors
    surface: "#ffffff",
    surfaceSecondary: "#fef3c7",
    surfaceHover: "#fde68a",

    // Text colors
    text: "#78350f",
    textSecondary: "#92400e",
    textMuted: "#b45309",

    // Border colors
    border: "#fde68a",
    borderStrong: "#fcd34d",
    borderSubtle: "#fef3c7",

    // Semantic colors
    success: "#22c55e",
    successLight: "#d1fae5",
    successDark: "#065f46",
    warning: "#f59e0b",
    warningLight: "#fef3c7",
    warningDark: "#92400e",
    error: "#dc2626",
    errorLight: "#fee2e2",
    errorDark: "#991b1b",
    info: "#3b82f6",
    infoLight: "#dbeafe",
    infoDark: "#1e40af",

    // Accent colors (warm pink accent)
    accent: "#f59e0b",
    accentHover: "#d97706",
    accentActive: "#b45309",

    // Link colors (bright orange)
    link: "#f97316",
    linkHover: "#ea580c",
    linkActive: "#c2410c",

    // Interactive states
    focus: "#f97316",
    hover: "rgba(249, 115, 22, 0.1)",

    // Overlay/backdrop
    overlay: "rgba(120, 53, 15, 0.8)",
    backdrop: "rgba(120, 53, 15, 0.6)",

    // Neutral colors (warm browns)
    neutral: "#b45309",
    neutralHover: "#92400e",
    neutralActive: "#78350f",
  },

  typography: {
    fontFamily: "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyHeading:
      "'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyMono: "'Roboto Mono', 'Courier New', monospace",
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
    thick: 3,
    radiusSubtle: 6,
    radiusRelaxed: 12,
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
      surface: "#7c2d12",
      surfaceSecondary: "#9a3412",
      surfaceHover: "#c2410c",
      text: "#fff7ed",
      textSecondary: "#fed7aa",
      textMuted: "#fdba74",
      border: "#c2410c",
      borderStrong: "#ea580c",
      borderSubtle: "#9a3412",
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
