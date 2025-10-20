/**
 * CSS Variables Generator
 * Converts SpexopThemeConfig to CSS custom properties
 *
 * @module @spexop/theme/generators
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";
import { resolveToken } from "../utils/tokenResolver.js";

/**
 * Generate spacing tokens from theme config
 */
function generateSpacingTokens(spacing: SpexopThemeConfig["spacing"]): string {
  const { baseUnit, scale, values } = spacing;

  // Use custom values if provided, otherwise generate from scale
  const spacingValues = values || {
    0: 0,
    1: scale?.[1] || baseUnit,
    2: scale?.[2] || baseUnit * 2,
    3: scale?.[3] || baseUnit * 3,
    4: scale?.[4] || baseUnit * 4,
    5: scale?.[5] || baseUnit * 5,
    6: scale?.[6] || baseUnit * 6,
    7: scale?.[7] || baseUnit * 7,
    8: scale?.[8] || baseUnit * 8,
    9: scale?.[9] || baseUnit * 9,
    10: scale?.[10] || baseUnit * 10,
    12: scale?.[12] || baseUnit * 12,
  };

  return Object.entries(spacingValues)
    .map(([key, value]) => `  --theme-spacing-${key}: ${value}px;`)
    .join("\n");
}

/**
 * Generate typography scale from theme config
 */
function generateTypographyScale(
  typography: SpexopThemeConfig["typography"],
): string {
  const { baseSize, scale, sizes } = typography;

  // Use custom sizes if provided, otherwise generate from scale ratio
  const typographySizes = sizes || {
    xs: Math.round(baseSize / (scale * scale)),
    sm: Math.round(baseSize / scale),
    base: baseSize,
    lg: Math.round(baseSize * scale),
    xl: Math.round(baseSize * scale * scale),
    "2xl": Math.round(baseSize * scale * scale * scale),
    "3xl": Math.round(baseSize * scale * scale * scale * scale),
    "4xl": Math.round(baseSize * scale ** 5),
    "5xl": Math.round(baseSize * scale ** 6),
    "6xl": Math.round(baseSize * scale ** 7),
  };

  return Object.entries(typographySizes)
    .map(([key, value]) => `  --theme-font-size-${key}: ${value}px;`)
    .join("\n");
}

/**
 * Generate font weight tokens
 */
function generateFontWeights(
  weights: SpexopThemeConfig["typography"]["weights"],
): string {
  return Object.entries(weights)
    .map(([key, value]) => `  --theme-font-weight-${key}: ${value};`)
    .join("\n");
}

/**
 * Generate line height tokens
 */
function generateLineHeights(
  lineHeights: SpexopThemeConfig["typography"]["lineHeights"],
): string {
  return Object.entries(lineHeights)
    .map(([key, value]) => `  --theme-line-height-${key}: ${value};`)
    .join("\n");
}

/**
 * Convert camelCase to kebab-case
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Generate dark mode color overrides
 */
function generateDarkModeTokens(
  colors?: Partial<SpexopThemeConfig["colors"]>,
): string {
  if (!colors) return "";

  return Object.entries(colors)
    .map(([key, value]) => `  --theme-${camelToKebab(key)}: ${value};`)
    .join("\n");
}

/**
 * Generate breakpoint tokens
 */
function generateBreakpoints(
  breakpoints?: Partial<SpexopThemeConfig["breakpoints"]>,
): string {
  if (!breakpoints) return "";

  return Object.entries(breakpoints)
    .map(([key, value]) => `  --theme-breakpoint-${key}: ${value}px;`)
    .join("\n");
}

/**
 * Generate button styling tokens
 * Resolves token references to actual values before generating CSS
 */
function generateButtonStyles(
  buttons?: SpexopThemeConfig["buttons"],
  config?: SpexopThemeConfig,
): string {
  if (!buttons || !config) return "";

  const variants: string[] = [];

  Object.entries(buttons).forEach(([variant, styles]) => {
    if (!styles) return;

    const variantStyles: string[] = [];

    if (styles.background) {
      const resolved = resolveToken(styles.background, config);
      variantStyles.push(`  --theme-button-${variant}-bg: ${resolved};`);
    }
    if (styles.text) {
      const resolved = resolveToken(styles.text, config);
      variantStyles.push(`  --theme-button-${variant}-text: ${resolved};`);
    }
    if (styles.border) {
      const resolved = resolveToken(styles.border, config);
      variantStyles.push(`  --theme-button-${variant}-border: ${resolved};`);
    }
    if (styles.backgroundHover) {
      const resolved = resolveToken(styles.backgroundHover, config);
      variantStyles.push(`  --theme-button-${variant}-bg-hover: ${resolved};`);
    }
    if (styles.textHover) {
      const resolved = resolveToken(styles.textHover, config);
      variantStyles.push(
        `  --theme-button-${variant}-text-hover: ${resolved};`,
      );
    }
    if (styles.borderHover) {
      const resolved = resolveToken(styles.borderHover, config);
      variantStyles.push(
        `  --theme-button-${variant}-border-hover: ${resolved};`,
      );
    }
    if (styles.backgroundActive) {
      const resolved = resolveToken(styles.backgroundActive, config);
      variantStyles.push(`  --theme-button-${variant}-bg-active: ${resolved};`);
    }
    if (styles.textActive) {
      const resolved = resolveToken(styles.textActive, config);
      variantStyles.push(
        `  --theme-button-${variant}-text-active: ${resolved};`,
      );
    }
    if (styles.borderActive) {
      const resolved = resolveToken(styles.borderActive, config);
      variantStyles.push(
        `  --theme-button-${variant}-border-active: ${resolved};`,
      );
    }

    if (variantStyles.length > 0) {
      variants.push(variantStyles.join("\n"));
    }
  });

  return variants.join("\n");
}

/**
 * Generate card variant tokens
 */
function generateCardTokens(
  cards: SpexopThemeConfig["cards"],
  config: SpexopThemeConfig,
): string {
  if (!cards) return "";

  const tokens: string[] = [];

  for (const [variant, style] of Object.entries(cards)) {
    if (!style) continue;

    const variantKebab = camelToKebab(variant);

    if (style.background) {
      tokens.push(
        `  --theme-card-${variantKebab}-bg: ${resolveToken(style.background, config)};`,
      );
    }

    if (style.border) {
      tokens.push(
        `  --theme-card-${variantKebab}-border: ${resolveToken(style.border, config)};`,
      );
    }

    if (style.backgroundHover) {
      tokens.push(
        `  --theme-card-${variantKebab}-bg-hover: ${resolveToken(style.backgroundHover, config)};`,
      );
    }

    if (style.borderHover) {
      tokens.push(
        `  --theme-card-${variantKebab}-border-hover: ${resolveToken(style.borderHover, config)};`,
      );
    }

    if (style.borderStyle) {
      tokens.push(
        `  --theme-card-${variantKebab}-border-style: ${style.borderStyle};`,
      );
    }

    if (style.borderWidth) {
      tokens.push(
        `  --theme-card-${variantKebab}-border-width: ${resolveToken(style.borderWidth, config)};`,
      );
    }
  }

  return tokens.join("\n");
}

/**
 * Generate CSS variables from theme configuration
 *
 * @param config - Spexop theme configuration
 * @param scope - Optional CSS selector to scope the variables (default: ':root')
 * @returns CSS string with custom properties
 *
 * @example
 * ```typescript
 * import { generateCSS } from '@spexop/theme/generators';
 * import { myTheme } from './theme.config';
 *
 * const css = generateCSS(myTheme);
 * // Inject into page or save to file
 *
 * // Or scope to a specific container
 * const scopedCss = generateCSS(myTheme, '.theme-preview');
 * ```
 */
export function generateCSS(
  config: SpexopThemeConfig,
  scope = ":root",
): string {
  const {
    colors,
    spacing,
    typography,
    borders,
    buttons,
    cards,
    breakpoints,
    darkMode,
  } = config;

  return `
/**
 * ${config.meta.name} - Theme Variables
 * Generated by @spexop/theme
 * Version: ${config.meta.version}
 */

${scope} {
  /* === Colors === */
  /* Primary */
  --theme-primary: ${colors.primary};
  --theme-primary-hover: ${colors.primaryHover || colors.primary};
  --theme-primary-active: ${colors.primaryActive || colors.primary};
  ${colors.primaryLight ? `--theme-primary-light: ${colors.primaryLight};` : ""}
  
  /* Secondary */
  ${colors.secondary ? `--theme-secondary: ${colors.secondary};` : ""}
  ${colors.secondaryHover ? `--theme-secondary-hover: ${colors.secondaryHover};` : ""}
  ${colors.secondaryActive ? `--theme-secondary-active: ${colors.secondaryActive};` : ""}
  
  /* Surface */
  --theme-surface: ${colors.surface};
  --theme-surface-secondary: ${colors.surfaceSecondary};
  --theme-surface-hover: ${colors.surfaceHover};
  
  /* Text */
  --theme-text: ${colors.text};
  --theme-text-secondary: ${colors.textSecondary};
  --theme-text-muted: ${colors.textMuted};
  ${colors.textTertiary ? `--theme-text-tertiary: ${colors.textTertiary};` : ""}
  ${colors.textInverted ? `--theme-text-inverted: ${colors.textInverted};` : ""}
  
  /* Border */
  --theme-border: ${colors.border};
  --theme-border-strong: ${colors.borderStrong};
  --theme-border-subtle: ${colors.borderSubtle};
  
  /* Semantic */
  ${colors.success ? `--theme-success: ${colors.success};` : ""}
  ${colors.warning ? `--theme-warning: ${colors.warning};` : ""}
  ${colors.error ? `--theme-error: ${colors.error};` : ""}
  ${colors.error ? `--theme-danger: ${colors.error};` : ""} /* Alias for error */
  ${colors.info ? `--theme-info: ${colors.info};` : ""}
  
  /* Accent */
  ${colors.accent ? `--theme-accent: ${colors.accent};` : ""}
  ${colors.accentHover ? `--theme-accent-hover: ${colors.accentHover};` : ""}
  ${colors.accentActive ? `--theme-accent-active: ${colors.accentActive};` : ""}
  
  /* Link */
  ${colors.link ? `--theme-link: ${colors.link};` : ""}
  ${colors.linkHover ? `--theme-link-hover: ${colors.linkHover};` : ""}
  ${colors.linkActive ? `--theme-link-active: ${colors.linkActive};` : ""}
  
  /* Interactive States */
  ${colors.focus ? `--theme-focus: ${colors.focus};` : ""}
  ${colors.hover ? `--theme-hover: ${colors.hover};` : ""}
  
  /* Overlay/Backdrop */
  ${colors.overlay ? `--theme-overlay: ${colors.overlay};` : ""}
  ${colors.backdrop ? `--theme-backdrop: ${colors.backdrop};` : ""}
  
  /* Neutral */
  ${colors.neutral ? `--theme-neutral: ${colors.neutral};` : ""}
  ${colors.neutralHover ? `--theme-neutral-hover: ${colors.neutralHover};` : ""}
  ${colors.neutralActive ? `--theme-neutral-active: ${colors.neutralActive};` : ""}

  /* === Spacing === */
${generateSpacingTokens(spacing)}

  /* === Typography === */
  /* Font Families */
  --theme-font-family: ${typography.fontFamily};
  --theme-font-family-heading: ${typography.fontFamilyHeading || typography.fontFamily};
  ${typography.fontFamilyMono ? `--theme-font-family-mono: ${typography.fontFamilyMono};` : ""}
  
  /* Font Sizes */
${generateTypographyScale(typography)}
  
  /* Font Weights */
${generateFontWeights(typography.weights)}
  --theme-font-weight-normal: ${typography.weights.regular}; /* Alias for regular */
  
  /* Line Heights */
${generateLineHeights(typography.lineHeights)}

  /* === Borders === */
  /* Widths */
  --theme-border-thin: ${borders.thin}px;
  --theme-border-width: ${borders.default}px;
  --theme-border-thick: ${borders.thick}px;
  
  /* Radius */
  --theme-radius-subtle: ${borders.radiusSubtle}px;
  --theme-radius-base: ${borders.radiusSubtle}px; /* Alias for subtle */
  --theme-radius-relaxed: ${borders.radiusRelaxed}px;
  --theme-radius-medium: ${borders.radiusRelaxed}px; /* Alias for relaxed */
  --theme-radius-pill: ${borders.radiusPill}px;
  ${borders.radiusLiquid ? `--theme-radius-liquid: ${borders.radiusLiquid}px;` : ""}
  
  /* Style */
  --theme-border-style: ${borders.defaultStyle};

  /* === Breakpoints === */
${generateBreakpoints(breakpoints)}

  /* === Buttons === */
${generateButtonStyles(buttons, config)}

  /* === Cards === */
${generateCardTokens(cards, config)}
}

${
  darkMode?.enabled
    ? `
/* === Dark Mode === */
${scope}[data-theme="dark"], ${scope}.dark {
${generateDarkModeTokens(darkMode.colors)}
${
  darkMode.buttons || darkMode.cards
    ? (
        () => {
          // Create merged config with dark mode colors for token resolution
          const darkConfig: SpexopThemeConfig = {
            ...config,
            colors: { ...config.colors, ...darkMode.colors },
          };
          return (
            generateButtonStyles(darkMode.buttons, darkConfig) +
            "\n" +
            generateCardTokens(darkMode.cards, darkConfig)
          );
        }
      )()
    : ""
}
}

@media (prefers-color-scheme: dark) {
  ${scope}:not([data-theme="light"]) {
${generateDarkModeTokens(darkMode.colors)}
  }
}
`
    : ""
}
`.trim();
}
