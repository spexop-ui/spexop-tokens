# Changelog - v0.4.0

**Release Date:** October 20, 2025  
**Status:** Ready for Release ✅

## Overview

Major security and testing release with comprehensive enhancements to validation, error handling, and test infrastructure. This release adds 330 tests (100% passing) and implements all Phase 1 critical improvements.

## 🎯 Major Features

### Security Enhancements

- **Circular Reference Detection** - Prevents DoS attacks from infinite token resolution loops
- **Input Sanitization** - Comprehensive sanitization utilities for secure theme handling
- **Prototype Pollution Prevention** - Safe deep cloning and JSON parsing
- **XSS Prevention** - HTML escaping utilities for safe display

### Enhanced Validation

- **Multi-Format Color Support** - Validates hex, RGB, RGBA, HSL, HSLA, and 147 CSS named colors
- **Flexible Validation Options** - Configurable validation with strict mode and format restrictions
- **JSON Schema** - Full JSON Schema for IDE support and structural validation
- **Enhanced Error Messages** - Errors now include hints, examples, and documentation links

### WCAG Accessibility

- **Contrast Checker** - Complete WCAG 2.1 AA/AAA contrast validation
- **Accessible Text Colors** - Automatic selection of best text color for backgrounds
- **Contrast Matrix** - Generate contrast matrices for color palettes
- **Contrast Fix Suggestions** - Helpful suggestions for improving low contrast

### Color Utilities

- **Color Manipulation** - Comprehensive color space conversions (hex, RGB, HSL)
- **Color Adjustments** - lighten, darken, saturate, desaturate, adjust hue
- **Color Mixing** - Mix colors with configurable weights
- **Palette Generation** - Generate color scales (50-900)
- **Color Inversion** - Invert colors and generate complementary colors

### Dark Mode Generation

- **Automatic Dark Mode** - Generate dark mode from light themes automatically
- **Multiple Intensities** - subtle, moderate, intense levels
- **Brand Preservation** - Preserve brand colors with smart adjustments
- **Contrast Enforcement** - Ensure WCAG compliance in dark mode
- **Quality Validation** - Validate dark mode quality with detailed reports

### Developer Experience

- **Token Resolution** - Automatic token reference resolution in CSS generator
- **Better Error Messages** - Context-aware errors with hints and examples
- **Type Safety** - Strict TypeScript with comprehensive type definitions
- **IDE Support** - JSON Schema for autocomplete and validation

## 📊 Testing

### Test Coverage

- **Total Tests:** 330 tests
- **Pass Rate:** 100% (330/330)
- **Test Suites:** 9 comprehensive test suites
- **Code Coverage:** 100% of critical paths

### Test Breakdown

- Token Resolver: 19 tests ✅
- Color Validation: 50 tests ✅
- Theme Validator: 26 tests ✅
- Contrast Checker: 32 tests ✅
- CSS Generator: 29 tests ✅
- Color Manipulation: 57 tests ✅
- Dark Mode Generator: 45 tests ✅
- Input Sanitization: 47 tests ✅
- JSON Schema: 25 tests ✅

## 🔧 Breaking Changes

### 1. Token Resolution

**Before:**

```typescript
resolveToken("colors.primary", circularTheme); 
// Silent failure or infinite loop
```

**After:**

```typescript
resolveToken("colors.primary", circularTheme);
// Throws: "Circular reference detected: colors.primary → colors.secondary → colors.primary"
```

**Migration:** Fix any circular references in your theme configuration.

### 2. Contrast Checker API

The `ContrastResult` interface has been updated:

**Before:**

```typescript
interface ContrastResult {
  ratio: number;
  level: ContrastLevel;
  passAA: boolean;
  passAAA: boolean;
  passAALarge: boolean;
  passAAALarge: boolean;
  score: number;
}
```

**After:**

```typescript
interface ContrastResult {
  ratio: number;
  AA: boolean;
  AAA: boolean;
  AALarge: boolean;
  AAALarge: boolean;
}
```

**Migration:** Update code accessing contrast results to use `result.AA` instead of `result.passAA`, etc.

### 3. Other API Changes

- `generateContrastMatrix()` now accepts `string[]` instead of `Record<string, string>`
- `getAccessibleTextColor()` has new optional parameters for custom colors
- `checkContrast()` signature simplified (removed `isLargeText` parameter)
- `getContrastDescription()` now accepts `number` instead of `ContrastResult`
- `suggestContrastFix()` returns `string | null` instead of complex object

## ✨ New Exports

### Validation & Sanitization

```typescript
// Validation
export { validateTheme } from "@spexop/theme";
export type { ValidationOptions, ValidationResult } from "@spexop/theme";

// Sanitization
export {
  sanitizeTheme,
  sanitizeThemeFromJSON,
  deepCloneSanitize,
  isThemeLike,
  sanitizeAndValidate,
  removeDangerousChars,
  escapeForDisplay,
} from "@spexop/theme";

// Schema
export {
  validateThemeSchema,
  validateAgainstSchema,
  getThemeSchema,
} from "@spexop/theme";
```

### Color Validation

```typescript
export {
  validateColor,
  isValidHexColor,
  isValidRgbColor,
  isValidHslColor,
  isNamedColor,
  isCssKeyword,
  normalizeColorToHex,
} from "@spexop/theme";
```

### Contrast Checker

```typescript
export {
  calculateContrastRatio,
  checkContrast,
  meetsMinimumContrast,
  getAccessibleTextColor,
  suggestContrastFix,
  checkMultipleContrasts,
  generateContrastMatrix,
  getContrastDescription,
  ContrastLevel,
} from "@spexop/theme";
```

### Dark Mode

```typescript
export {
  generateDarkMode,
  generateDarkModeColors,
  previewDarkMode,
  getSuggestedOptions,
  validateDarkMode,
} from "@spexop/theme";
```

## 📝 Examples

### Enhanced Validation (strictMode: true)

```typescript
import { validateTheme } from "@spexop/theme";

const result = validateTheme(theme, {
  strictMode: true,
  colorOptions: {
    allowRgb: true,
    allowHsl: true,
    requireFormat: "hex", // Enforce hex only
  },
});

if (!result.valid) {
  for (const error of result.errors) {
    console.error(error.message);
    console.log("Hint:", error.hint);
    console.log("Example:", error.example);
    console.log("Docs:", error.docsUrl);
  }
}
```

### Input Sanitization

```typescript
import { sanitizeTheme, sanitizeAndValidate } from "@spexop/theme";

// Sanitize user input
const userInput = {
  meta: { name: "  My Theme  ", version: "1.0.0" },
  colors: { primary: "  #3b82f6  " },
  // ...
};

const sanitized = sanitizeTheme(userInput);
// Result: trimmed strings, validated types, secure

// Or combine sanitization with validation
const { success, theme, errors } = sanitizeAndValidate(userInput);
```

### Contrast Checking

```typescript
import { checkContrast, getAccessibleTextColor } from "@spexop/theme";

// Check contrast
const result = checkContrast("#000000", "#ffffff");
console.log(result.ratio); // 21
console.log(result.AAA); // true

// Get accessible text color
const textColor = getAccessibleTextColor("#3b82f6");
console.log(textColor); // "#ffffff"
```

### Dark Mode Generation (intensity: "moderate", preserveBrandColors: true, ensureContrast: true)

```typescript
import { generateDarkMode, previewDarkMode } from "@spexop/theme";

// Generate dark mode
const darkTheme = generateDarkMode(lightTheme, {
  intensity: "moderate",
  preserveBrandColors: true,
  ensureContrast: true,
});

// Preview with contrast report
const preview = previewDarkMode(lightTheme);
console.log(preview.contrastReport);
```

### Color Manipulation

```typescript
import {
  lighten,
  darken,
  saturate,
  mix,
  generatePalette,
} from "@spexop/theme";

// Adjust colors
const lightBlue = lighten("#3b82f6", 20);
const darkBlue = darken("#3b82f6", 20);
const vibrant = saturate("#3b82f6", 30);

// Mix colors
const purple = mix("#3b82f6", "#ef4444", 50);

// Generate palette
const palette = generatePalette("#3b82f6", 9);
// Returns: [{ shade: 50, color: "..." }, ..., { shade: 900, color: "..." }]
```

## 🔧 Bug Fixes

- Fixed RGB color validation regex to properly reject malformed strings
- Fixed hex color normalization to consistently use uppercase
- Fixed CSS generator to handle optional `lineHeights` property
- Fixed token resolution to handle both string and number types
- Fixed border radius generation to support both object and individual properties

## 🏗️ Build & Distribution

- **Bundle Size:** 276.59 KB (ESM) [+16 KB from v0.3.0]
- **Type Definitions:** 51.42 KB [+4 KB from v0.3.0]
- **CSS Presets:** 13 pre-built files
- **Zero Dependencies:** Core functionality has zero runtime dependencies

## 📚 Documentation

- Updated IMPLEMENTATION-PROGRESS.md with comprehensive Phase 1 summary
- Added examples for all new features
- Created JSON Schema definition (theme.schema.json)
- Enhanced inline code documentation

## ⚠️ Deprecations

None - all changes are additions or improvements. Backward compatibility maintained where possible.

## 🎖️ Contributors

- @olmstedian - Implementation, testing, and documentation

## 📦 Installation

```bash
npm install @spexop/theme@0.4.0
# or
pnpm add @spexop/theme@0.4.0
# or
yarn add @spexop/theme@0.4.0
```

## 🔜 What's Next (v0.5.0)

Phase 2 features coming next:

- Theme composition utilities (mergeThemes, extendTheme)
- Missing token categories (animations, opacity, grid)
- Accessibility automation
- CLI tool package

---

**Full Changelog:** See IMPLEMENTATION-PROGRESS.md for detailed implementation notes.
