/**
 * Spexop Theme Configuration
 * User-configurable aesthetic layer
 *
 * @packageDocumentation
 * @module @spexop/theme
 */

/**
 * Theme metadata
 */
export interface ThemeMeta {
  /** Theme name (e.g., "Acme Corp Design System") */
  name: string;
  /** Theme version (semantic versioning) */
  version: string;
  /** Theme author */
  author?: string;
  /** Theme description */
  description?: string;
  /** Theme tags for categorization */
  tags?: string[];
}

/**
 * Color system configuration
 */
export interface ThemeColors {
  // Primary brand colors
  /** Main brand color */
  primary: string;
  /** Primary hover state (auto-generated if not provided) */
  primaryHover?: string;
  /** Primary active state (auto-generated if not provided) */
  primaryActive?: string;
  /** Primary light variant (optional, for subtle backgrounds) */
  primaryLight?: string;

  // Secondary colors
  /** Secondary brand color */
  secondary?: string;
  /** Secondary hover state */
  secondaryHover?: string;
  /** Secondary active state */
  secondaryActive?: string;

  // Surface colors (backgrounds)
  /** Main background color */
  surface: string;
  /** Card/panel background color */
  surfaceSecondary: string;
  /** Hover state for interactive surfaces */
  surfaceHover: string;

  // Text colors
  /** Primary text color */
  text: string;
  /** Secondary text (subtitles, captions) */
  textSecondary: string;
  /** Muted text (disabled, placeholder) */
  textMuted: string;
  /** Tertiary text (least emphasis, optional) */
  textTertiary?: string;
  /** Inverted text color (for dark backgrounds, optional) */
  textInverted?: string;

  // Border colors
  /** Default border color */
  border: string;
  /** Strong emphasis borders */
  borderStrong: string;
  /** Subtle dividers */
  borderSubtle: string;

  // Semantic colors (optional)
  /** Success state color */
  success?: string;
  /** Warning state color */
  warning?: string;
  /** Error state color */
  error?: string;
  /** Info state color */
  info?: string;

  // Accent colors (for special highlights)
  /** Accent color for special emphasis */
  accent?: string;
  /** Accent hover state */
  accentHover?: string;
  /** Accent active state */
  accentActive?: string;

  // Link colors
  /** Hyperlink color */
  link?: string;
  /** Link hover state */
  linkHover?: string;
  /** Link active/visited state */
  linkActive?: string;

  // Interactive state colors
  /** Focus ring color (for keyboard navigation) */
  focus?: string;
  /** Generic hover overlay color */
  hover?: string;

  // Overlay/backdrop colors
  /** Overlay color for modals, tooltips */
  overlay?: string;
  /** Backdrop color for dimming background */
  backdrop?: string;

  // Neutral colors (additional gray scale control)
  /** Neutral color for balanced UI elements */
  neutral?: string;
  /** Neutral hover state */
  neutralHover?: string;
  /** Neutral active state */
  neutralActive?: string;
}

/**
 * Typography scale configuration
 */
export interface TypographySizes {
  xs2: number; // Extra small for breadcrumbs, captions
  xs: number;
  sm: number;
  base: number;
  lg: number;
  xl: number;
  "2xl": number;
  "3xl": number;
  "4xl": number;
  "5xl": number;
  "6xl": number;
}

/**
 * Font weight configuration
 */
export interface FontWeights {
  /** Regular weight (typically 400) */
  regular: number;
  /** Medium weight (typically 500) */
  medium: number;
  /** Semi-bold weight (typically 600) */
  semibold: number;
  /** Bold weight (typically 700) */
  bold: number;
}

/**
 * Line height configuration
 */
export interface LineHeights {
  /** Tight line height (typically 1.2) */
  tight: number;
  /** Snug line height (typically 1.375) */
  snug: number;
  /** Normal line height (typically 1.5) */
  normal: number;
  /** Relaxed line height (typically 1.75) */
  relaxed: number;
}

/**
 * Typography system configuration
 */
export interface ThemeTypography {
  // Font families
  /** Body font family */
  fontFamily: string;
  /** Heading font family (defaults to body font) */
  fontFamilyHeading?: string;
  /** Monospace font family for code */
  fontFamilyMono?: string;

  // Type scale
  /** Base font size in pixels */
  baseSize: number;
  /** Scale ratio (e.g., 1.25 for minor third) */
  scale: number;

  /** Custom size scale (overrides baseSize + scale) */
  sizes?: Partial<TypographySizes>;

  /** Font weights */
  weights: FontWeights;

  /** Line heights */
  lineHeights: LineHeights;
}

/**
 * Spacing scale values
 */
export interface SpacingValues {
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
  12: number;
}

/**
 * Spacing system configuration
 */
export interface ThemeSpacing {
  /** Base spacing unit in pixels */
  baseUnit: number;

  /** Auto-generated scale (multiples of baseUnit) */
  scale?: number[];

  /** Named scale values (overrides auto-generation) */
  values?: Partial<SpacingValues>;
}

/**
 * Border system configuration
 */
export interface ThemeBorders {
  // Border widths
  /** Thin border (typically 1px) */
  thin: number;
  /** Default border width (typically 2px) */
  default: number;
  /** Thick border (typically 4px) */
  thick: number;

  // Border radius
  /** Subtle radius (typically 4px) */
  radiusSubtle: number;
  /** Relaxed radius (typically 8px) */
  radiusRelaxed: number;
  /** Pill radius (9999px for fully rounded) */
  radiusPill: number;
  /** Liquid/squircle radius (optional, typically 16-24px for large elements) */
  radiusLiquid?: number;

  /** Default border style */
  defaultStyle: "solid" | "dashed" | "dotted";
}

/**
 * Responsive breakpoints
 */
export interface Breakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  "2xl": number;
}

/**
 * Button variant styling
 */
export interface ButtonVariantStyle {
  /** Button background color */
  background: string;
  /** Button text color */
  text: string;
  /** Button border color */
  border: string;
  /** Hover state background */
  backgroundHover?: string;
  /** Hover state text color */
  textHover?: string;
  /** Hover state border color */
  borderHover?: string;
  /** Active state background */
  backgroundActive?: string;
  /** Active state text color */
  textActive?: string;
  /** Active state border color */
  borderActive?: string;
}

/**
 * Button styling configuration
 */
export interface ThemeButtons {
  /** Primary button styling */
  primary?: Partial<ButtonVariantStyle>;
  /** Secondary button styling */
  secondary?: Partial<ButtonVariantStyle>;
  /** Outline button styling */
  outline?: Partial<ButtonVariantStyle>;
  /** Ghost/transparent button styling */
  ghost?: Partial<ButtonVariantStyle>;
  /** Text-only button styling */
  text?: Partial<ButtonVariantStyle>;
  /** Pill button styling (rounded pill shape) */
  pill?: Partial<ButtonVariantStyle>;
  /** Border-emphasis button styling (bold 3px border) */
  "border-emphasis"?: Partial<ButtonVariantStyle>;
  /** Danger button styling (destructive actions) */
  danger?: Partial<ButtonVariantStyle>;
  /** Success button styling (positive actions) */
  success?: Partial<ButtonVariantStyle>;
  /** Warning button styling (caution actions) */
  warning?: Partial<ButtonVariantStyle>;
  /** Info button styling (informational actions) */
  info?: Partial<ButtonVariantStyle>;
  /** Neutral button styling (cancel/secondary actions) */
  neutral?: Partial<ButtonVariantStyle>;
}

/**
 * Card variant styling
 */
export interface CardVariantStyle {
  /** Card background color */
  background: string;
  /** Card border color */
  border: string;
  /** Hover state background */
  backgroundHover?: string;
  /** Hover state border color */
  borderHover?: string;
  /** Optional: border style override (solid, dashed, dotted) */
  borderStyle?: "solid" | "dashed" | "dotted";
  /** Optional: border width override (for outlined variant) */
  borderWidth?: string;
}

/**
 * Card variants configuration
 */
export interface ThemeCards {
  /** Basic card styling (default) */
  basic?: Partial<CardVariantStyle>;
  /** Highlighted card styling (primary border for emphasis) */
  highlighted?: Partial<CardVariantStyle>;
  /** Outlined card styling (bold border) */
  outlined?: Partial<CardVariantStyle>;
  /** Interactive card styling (clickable with hover states) */
  interactive?: Partial<CardVariantStyle>;
  /** Ghost card styling (dashed border for placeholders) */
  ghost?: Partial<CardVariantStyle>;
  /** Elevated card styling (background emphasis) */
  elevated?: Partial<CardVariantStyle>;
}

/**
 * Dark mode configuration
 */
export interface DarkModeConfig {
  /** Enable dark mode */
  enabled: boolean;
  /** Dark mode color overrides */
  colors?: Partial<ThemeColors>;
  /** Dark mode button overrides */
  buttons?: ThemeButtons;
  /** Dark mode card overrides */
  cards?: ThemeCards;
}

/**
 * Complete Spexop Theme Configuration
 *
 * This interface defines the user-configurable aesthetic layer
 * for the Spexop Design System. The architecture (Grid, Stack, etc.)
 * remains fixed while colors, typography, and spacing can be customized.
 *
 * @example
 * ```typescript
 * const myTheme: SpexopThemeConfig = {
 *   meta: {
 *     name: "My Brand",
 *     version: "1.0.0"
 *   },
 *   colors: {
 *     primary: "#7C3AED",
 *     surface: "#FFFFFF",
 *     surfaceSecondary: "#F5F5F5",
 *     surfaceHover: "#E5E5E5",
 *     text: "#1A1A1A",
 *     textSecondary: "#525252",
 *     textMuted: "#737373",
 *     border: "#E5E5E5",
 *     borderStrong: "#D4D4D4",
 *     borderSubtle: "#F5F5F5"
 *   },
 *   typography: {
 *     fontFamily: "Inter, sans-serif",
 *     baseSize: 16,
 *     scale: 1.25,
 *     weights: { regular: 400, semibold: 600, bold: 700 },
 *     lineHeights: { tight: 1.2, normal: 1.5, relaxed: 1.75 }
 *   },
 *   spacing: {
 *     baseUnit: 4
 *   },
 *   borders: {
 *     thin: 1,
 *     default: 2,
 *     thick: 4,
 *     radiusSubtle: 8,
 *     radiusRelaxed: 12,
 *     radiusPill: 9999,
 *     defaultStyle: "solid"
 *   }
 * };
 * ```
 */
export interface SpexopThemeConfig {
  /** Theme metadata */
  meta: ThemeMeta;

  /** Color system */
  colors: ThemeColors;

  /** Typography system */
  typography: ThemeTypography;

  /** Spacing system */
  spacing: ThemeSpacing;

  /** Border system */
  borders: ThemeBorders;

  /** Button styling (optional customization) */
  buttons?: ThemeButtons;

  /** Card styling (optional customization) */
  cards?: ThemeCards;

  /** Responsive breakpoints (optional override) */
  breakpoints?: Partial<Breakpoints>;

  /** Dark mode configuration */
  darkMode?: DarkModeConfig;
}
