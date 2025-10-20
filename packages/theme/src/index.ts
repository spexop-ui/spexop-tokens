/**
 * @spexop/theme
 * Theme system for Spexop Design System
 *
 * @packageDocumentation
 */

// Defaults
export { defaultTheme } from "./defaults/index.js";
export type { GeneratorOutput } from "./generators/index.js";
// Generators (29 total)
export {
  generateAdobeXD,
  // Utility
  generateAllFormats,
  generateAngular,
  generateCanva,
  generateChakraUI,
  // Core (3)
  generateCSS,
  generateDocusaurus,
  // CSS-in-JS (4)
  generateEmotion,
  generateFigma,
  generateFlutter,
  // Universal (3)
  generateJavaScript,
  generateJSON,
  generateLess,
  generatePandaCSS,
  generatePostCSS,
  generateReactNative,
  // CSS Preprocessors (5)
  generateSCSS,
  generateSketch,
  // Documentation (3)
  generateStorybook,
  generateStyleDictionary,
  generateStyledComponents,
  generateSvelte,
  generateTailwind,
  // Design Tools (6)
  generateTokensStudio,
  generateTypeScript,
  generateUnoCSS,
  generateVanillaExtract,
  // Frameworks (6)
  generateVue,
  generateW3C,
  generateYAML,
  generateZeplin,
} from "./generators/index.js";
export type { FigmaTokens, TailwindConfig } from "./importers/index.js";
// Importers
export {
  autoImport,
  importFromCSS,
  importFromFigma,
  importFromJSON,
  importFromTailwind,
  parseCSSVariables,
  parseFigmaTokens,
  parseTailwindConfig,
} from "./importers/index.js";
// Presets
export {
  agencyPreset,
  corporatePreset,
  darkPreset,
  ecommercePreset,
  educationPreset,
  financePreset,
  getPreset,
  getPresetNames,
  getPresetsByTag,
  healthcarePreset,
  minimalPreset,
  pastelPreset,
  presetMeta,
  presets,
  startupPreset,
  techPreset,
  vibrantPreset,
} from "./presets/index.js";
// Types
export type {
  Breakpoints,
  ButtonVariantStyle,
  DarkModeConfig,
  FontWeights,
  LineHeights,
  SpacingValues,
  SpexopThemeConfig,
  ThemeBorders,
  ThemeButtons,
  ThemeColors,
  ThemeMeta,
  ThemeSpacing,
  ThemeTypography,
  TypographySizes,
} from "./types/index.js";
export type { HSL, RGB } from "./utils/colorManipulation.js";
// Utilities
export {
  adjustHue,
  adjustLightness,
  adjustSaturation,
  complementary,
  darken,
  desaturate,
  generatePalette,
  grayscale,
  hexToHsl,
  hexToRgb,
  hslToHex,
  hslToRgb,
  invert,
  isDark,
  isLight,
  lighten,
  mix,
  rgbToHex,
  rgbToHsl,
  saturate,
} from "./utils/colorManipulation.js";
export type {
  ColorCombination,
  ContrastReport,
  ContrastResult,
} from "./utils/contrastChecker.js";
export {
  ContrastLevel,
  calculateContrastRatio,
  checkContrast,
  checkMultipleContrasts,
  generateContrastMatrix,
  getAccessibleTextColor,
  getContrastDescription,
  getContrastLevelColor,
  meetsMinimumContrast,
  suggestContrastFix,
} from "./utils/contrastChecker.js";
export type { DarkModeOptions } from "./utils/darkModeGenerator.js";
export {
  generateDarkMode,
  generateDarkModeColors,
  getSuggestedOptions,
  previewDarkMode,
  validateDarkMode,
} from "./utils/darkModeGenerator.js";
export {
  findTokenForValue,
  isTokenReference,
  resolveButtonTokens,
  resolveToken,
} from "./utils/tokenResolver.js";
export type { ValidationError, ValidationResult } from "./validators/index.js";
// Validators
export { validateTheme } from "./validators/index.js";
