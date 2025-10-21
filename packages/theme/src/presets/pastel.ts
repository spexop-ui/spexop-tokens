/**
 * Pastel Preset Theme
 * Soft, gentle theme with muted pastel colors
 * Perfect for lifestyle apps, wellness, and personal projects
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

export const pastelPreset: SpexopThemeConfig = {
  meta: {
    name: "Pastel",
    version: "1.0.0",
    description: "Soft gentle theme with muted pastel colors",
    author: "Spexop Team",
    tags: ["pastel", "soft", "gentle", "wellness"],
  },

  colors: {
    // Primary brand color (pastel lavender)
    primary: "#c4b5fd",
    primaryHover: "#a78bfa",
    primaryActive: "#8b5cf6",
    primaryLight: "#eff6ff",
    primaryDark: "#1e3a8a",

    // Secondary color (pastel pink)
    secondary: "#fbcfe8",
    secondaryHover: "#f9a8d4",
    secondaryActive: "#f472b6",
    secondaryLight: "#f5f3ff",
    secondaryDark: "#4c1d95",

    // Surface colors
    surface: "#ffffff",
    surfaceSecondary: "#fef5ff",
    surfaceHover: "#fce7f3",

    // Text colors
    text: "#4a044e",
    textSecondary: "#701a75",
    textMuted: "#86198f",

    // Border colors
    border: "#f5d0fe",
    borderStrong: "#f0abfc",
    borderSubtle: "#fef5ff",

    // Semantic colors (muted)
    success: "#86efac",
    successLight: "#d1fae5",
    successDark: "#065f46",
    warning: "#fde047",
    warningLight: "#fef3c7",
    warningDark: "#92400e",
    error: "#fca5a5",
    errorLight: "#fee2e2",
    errorDark: "#991b1b",
    info: "#a5f3fc",
    infoLight: "#dbeafe",
    infoDark: "#1e40af",

    // Accent colors (soft mint)
    accent: "#bef264",
    accentHover: "#a3e635",
    accentActive: "#84cc16",

    // Link colors (pastel lavender)
    link: "#c4b5fd",
    linkHover: "#a78bfa",
    linkActive: "#8b5cf6",

    // Interactive states
    focus: "#c4b5fd",
    hover: "rgba(196, 181, 253, 0.1)",

    // Overlay/backdrop
    overlay: "rgba(74, 4, 78, 0.6)",
    backdrop: "rgba(74, 4, 78, 0.4)",

    // Neutral colors (soft purples)
    neutral: "#86198f",
    neutralHover: "#701a75",
    neutralActive: "#4a044e",
  },

  typography: {
    fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyHeading:
      "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
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
      snug: 1.45,
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
    radiusSubtle: 12,
    radiusRelaxed: 20,
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
      surface: "#4a1d96",
      surfaceSecondary: "#5b21b6",
      surfaceHover: "#6d28d9",
      text: "#fdf4ff",
      textSecondary: "#f3e8ff",
      textMuted: "#e9d5ff",
      border: "#6d28d9",
      borderStrong: "#7c3aed",
      borderSubtle: "#5b21b6",
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
