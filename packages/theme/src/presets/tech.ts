/**
 * Tech/SaaS Preset Theme
 * Modern, professional theme with blue and purple accents
 * Perfect for technology companies and SaaS applications
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";

export const techPreset: SpexopThemeConfig = {
  meta: {
    name: "Tech",
    version: "1.0.0",
    description: "Modern tech/SaaS theme with blue and purple accents",
    author: "Spexop Team",
    tags: ["tech", "saas", "modern", "professional"],
  },

  colors: {
    // Primary brand color (vibrant blue)
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    primaryActive: "#1d4ed8",
    primaryLight: "#eff6ff",
    primaryDark: "#1e3a8a",

    // Secondary color (purple accent)
    secondary: "#8b5cf6",
    secondaryHover: "#7c3aed",
    secondaryActive: "#6d28d9",
    secondaryLight: "#f5f3ff",
    secondaryDark: "#4c1d95",

    // Surface colors (clean white)
    surface: "#ffffff",
    surfaceSecondary: "#f9fafb",
    surfaceHover: "#f3f4f6",

    // Text colors
    text: "#111827",
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
    error: "#ef4444",
    errorLight: "#fee2e2",
    errorDark: "#991b1b",
    info: "#3b82f6",
    infoLight: "#dbeafe",
    infoDark: "#1e40af",

    // Accent colors (vibrant purple)
    accent: "#8b5cf6",
    accentHover: "#7c3aed",
    accentActive: "#6d28d9",

    // Link colors (bright blue)
    link: "#3b82f6",
    linkHover: "#2563eb",
    linkActive: "#1d4ed8",

    // Interactive states
    focus: "#3b82f6",
    hover: "rgba(59, 130, 246, 0.05)",

    // Overlay/backdrop
    overlay: "rgba(17, 24, 39, 0.85)",
    backdrop: "rgba(17, 24, 39, 0.65)",

    // Neutral colors (cool grays)
    neutral: "#6b7280",
    neutralHover: "#4b5563",
    neutralActive: "#111827",
  },

  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyHeading: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontFamilyMono: "'Fira Code', 'Courier New', monospace",
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
    sm: "0 1px 2px rgba(0, 0, 0, 0.04)",
    md: "0 4px 6px rgba(0, 0, 0, 0.08)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
    xl: "0 20px 25px rgba(0, 0, 0, 0.12)",
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
