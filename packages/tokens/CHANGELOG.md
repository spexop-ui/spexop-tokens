# Changelog

All notable changes to `@spexop/tokens` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2025-10-17

### Added

#### Large Spacing Tokens (10 new tokens)

Added spacing tokens for large layouts, hero sections, and full-height designs:

- `sSpacing40` = "160px" (10rem) - Large component spacing
- `sSpacing48` = "192px" (12rem) - Section spacing
- `sSpacing56` = "224px" (14rem) - Large section spacing
- `sSpacing64` = "256px" (16rem) - Hero section vertical spacing
- `sSpacing80` = "320px" (20rem) - Extra large spacing
- `sSpacing96` = "384px" (24rem) - Massive spacing
- `sSpacing100` = "400px" (25rem) - Ultra spacing
- `sSpacing128` = "512px" (32rem) - Full-viewport-like spacing
- `sSpacing160` = "640px" (40rem) - Matches sBreakpointSm
- `sSpacing192` = "768px" (48rem) - Matches sBreakpointMd

**Usage Examples:**

```typescript
// Large hero section
paddingTop: sSpacing64,     // 256px
paddingBottom: sSpacing64,

// Full-height section divider
marginBottom: sSpacing160,  // 640px (breakpoint-aligned)
```

### Changed

- **Total Token Count**: 369 → 379 tokens (+10 tokens, +2.7%)
- **Spacing Scale**: Now covers 0px to 768px (was 0px to 128px)

### Improved

- Better support for modern large-screen layouts (1920px+, 2560px+)
- Spacing tokens aligned with breakpoints for consistent responsive design
- Complete spacing scale for hero sections and full-height designs

---

## [0.3.0] - 2025-10-17

### ⚠️ BREAKING CHANGES - Refined Minimalism Alignment

This release removes **83 tokens (18.3%)** that don't align with the Spexop design system's core principles of **Refined Minimalism**. The package now contains **369 tokens** (down from 452).

#### Design Principles Enforced

1. **"Borders before shadows"** - Heavy drop shadows removed; use borders for structure
2. **"Minimal decoration"** - Glass effects and blur removed; favor clean aesthetics
3. **"Purpose over decoration"** - Ultra-wide aspect ratios and niche tokens removed

---

### Removed Tokens (83 total)

#### 1. Slate Color Palette (10 tokens) - ❌ REMOVED

**Reason**: Redundant with Neutral palette

**Removed:**

- `sColorSlate50` through `sColorSlate900` (10 shades)

**Migration:**

```typescript
// Before (v0.2.3)
import { sColorSlate500 } from '@spexop/tokens';
color: sColorSlate500;

// After (v0.3.0)
import { sColorNeutral500 } from '@spexop/tokens';
color: sColorNeutral500;
```

#### 2. Glass Color Tokens (37 tokens) - ❌ REMOVED

**Reason**: Contradicts minimal decoration principle

**Removed:**

- All files in `/color/glass/` directory (15 tokens)
- `sColorGlassDark4` through `sColorGlassDark95` (13 tokens)
- `sColorGlassLight8` through `sColorGlassLight75` (9 tokens)

**Migration:**

```typescript
// Before (v0.2.3)
background: sColorGlassLight20;
backdropFilter: sBlurGlass;

// After (v0.3.0)
background: 'rgba(255, 255, 255, 0.2)';
// No backdrop filter - use solid colors
```

#### 3. Glass Semantic Tokens (12 tokens) - ❌ REMOVED

**Reason**: Glass aesthetic contradicts Refined Minimalism

**Removed:**

- `sGlassSurface`, `sGlassOverlay`, `sGlassNav`, `sGlassHero`
- `sGlassLight10`, `sGlassLight20`, `sGlassLight30`, `sGlassLight50`
- `sGlassDark10`, `sGlassDark20`, `sGlassDark30`, `sGlassDark50`

**Migration:**

```typescript
// Before (v0.2.3)
import { sGlassSurface } from '@spexop/tokens';
background: sGlassSurface;

// After (v0.3.0)
import { sColorSurface, sColorBorder } from '@spexop/tokens';
background: sColorSurface;
border: `1px solid ${sColorBorder}`;
```

#### 4. Heavy Shadow Tokens (8 tokens) - ❌ REMOVED

**Reason**: Violates "Borders before shadows" principle

**Removed from `/effects/`:**

- `sShadowCard` - Use border instead
- `sShadowDrawer` - Use border instead
- `sShadowFloat` - Use border instead
- `sShadowGlassLight` - Glass effect removed
- `sShadowGlassDark` - Glass effect removed

**Removed from `/shadow/`:**

- `sShadowFloating` - Use border instead
- `sShadowFloatingActive` - Use border color change
- `sShadowFloatingHover` - Use border color change

**Kept (minimal use only):**

- `sShadowNone` - No shadow
- `sShadowSubtle` - Minimal shadow for rare cases

**Migration:**

```typescript
// Before (v0.2.3)
boxShadow: sShadowDrawer; // Heavy shadow

// After (v0.3.0)
border: '2px solid var(--s-color-neutral-400)'; // Border instead

// For hover states
'&:hover': {
  borderColor: sColorNeutral500,
}
```

#### 5. Blur & Backdrop Effects (7 tokens) - ❌ REMOVED

**Reason**: Anti-pattern for minimal decoration

**Removed:**

- `sBlurSubtle` - blur(4px)
- `sBlurGlass` - blur(12px)
- `sBlurStrong` - blur(24px)
- `sBlurLiquid` - blur(40px)
- `sBackdropLight` - blur(8px)
- `sBackdropGlass` - blur(12px)
- `sBackdropStrong` - blur(16px)
- `sEffectGlassBlur` - Combined glass effect

**Migration:**

```typescript
// Before (v0.2.3)
backdropFilter: sBlurGlass;
background: sColorGlassLight20;

// After (v0.3.0)
background: 'rgba(0, 0, 0, 0.8)'; // Solid overlay
// No backdrop-filter
```

#### 6. Container Duplicate Tokens (6 tokens) - ❌ REMOVED

**Reason**: Duplicate breakpoint values - use breakpoints directly

**Removed:**

- `sContainerXs` - Use `sBreakpointXs` (480px)
- `sContainerSm` - Use `sBreakpointSm` (640px)
- `sContainerMd` - Use `sBreakpointMd` (768px)
- `sContainerLg` - Use `sBreakpointLg` (1280px)
- `sContainerXl` - Use `sBreakpointXl` (1920px)
- `sContainer2xl` - Use `sBreakpoint2xl` (2560px)

**Kept:**

- `sContainerFull` - 100% width

**Migration:**

```typescript
// Before (v0.2.3)
maxWidth: sContainerLg; // 1280px

// After (v0.3.0)
maxWidth: sBreakpointLg; // 1280px (same value)
```

#### 7. Ultra-Wide Aspect Ratios (2 tokens) - ❌ REMOVED

**Reason**: Niche use cases not core to design system

**Removed:**

- `sAspectRatioWide` - 21:9 (ultra-wide monitors)
- `sAspectRatioUltraWide` - 32:9 (super ultra-wide)

**Kept (core ratios):**

- `sAspectRatioSquare` - 1:1
- `sAspectRatioVideo` - 16:9
- `sAspectRatioClassic` - 4:3
- `sAspectRatioPortrait` - 3:4
- `sAspectRatioGolden` - 1.618:1

**Migration:**

```typescript
// Before (v0.2.3)
aspectRatio: sAspectRatioUltraWide; // 32/9

// After (v0.3.0)
aspectRatio: '32 / 9'; // Define manually if needed
```

---

### Migration Summary

| Category | Tokens Removed | Migration Strategy |
|----------|----------------|-------------------|
| **Slate Colors** | 10 | Replace with Neutral colors |
| **Glass Colors** | 37 | Use solid colors with rgba() |
| **Glass Semantic** | 12 | Use sColorSurface + borders |
| **Heavy Shadows** | 8 | Use borders (2px solid) |
| **Blur/Backdrop** | 7 | Use solid backgrounds |
| **Containers** | 6 | Use breakpoint tokens |
| **Ultra-wide Ratios** | 2 | Define manually if needed |
| **Total** | **83** | **Borders before shadows** |

---

### Updated Token Count

- **v0.2.3**: 452 tokens
- **v0.3.0**: 369 tokens
- **Change**: -83 tokens (-18.3%)

---

### Package Size Impact

- **v0.2.3**: ~15KB minified CSS
- **v0.3.0**: ~13KB minified CSS
- **Savings**: ~2KB (13% reduction)

---

### Benefits

✅ **Leaner package** - 13% smaller bundle size  
✅ **Clearer philosophy** - Fully aligned with Refined Minimalism  
✅ **Easier decisions** - Less redundancy, clearer token purposes  
✅ **Better maintenance** - Fewer tokens to maintain and document  
✅ **Consistent aesthetic** - All tokens support the same design language  

---

### Breaking Change Checklist

If you're using any of these tokens, you'll need to update your code:

- [ ] Replace `sColorSlate*` with `sColorNeutral*`
- [ ] Replace `sGlass*` tokens with solid colors + borders
- [ ] Replace heavy shadows (`sShadowCard`, `sShadowDrawer`, etc.) with borders
- [ ] Remove all `blur` and `backdrop-filter` effects
- [ ] Replace `sContainer*` with `sBreakpoint*` tokens
- [ ] Define custom aspect ratios for ultra-wide displays if needed

---

### Support

Need help migrating? Open an issue on [GitHub](https://github.com/spexop-ui/spexop-tokens/issues) or check the updated documentation.

---

## [0.2.3] - 2025-10-11

### Added on 2025-10-11

#### New Spacing Tokens (2 tokens)

Added missing spacing tokens to fill gaps in the scale:

- `sSpacing7` = "28px" - Fills gap between 24px and 32px
- `sSpacing9` = "36px" - Fills gap between 32px and 40px

Complete spacing scale now: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 20, 24, 32

#### New Font Size Tokens (2 tokens)

Added larger font sizes for headlines and hero sections:

- `sFontSize6xl` = "60px" - Extra large headlines
- `sFontSize7xl` = "72px" - Hero headlines

Complete font size scale now: 3xs, 2xs, xxs, xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, hero

#### New Font Weight Tokens (7 tokens)

Added numbered font weight tokens for flexibility and consistency with industry standards (Tailwind, etc.):

- `sFontWeight300` = "300" (Light)
- `sFontWeight400` = "400" (Normal/Regular)
- `sFontWeight500` = "500" (Medium)
- `sFontWeight600` = "600" (Semibold)
- `sFontWeight700` = "700" (Bold)
- `sFontWeight800` = "800" (Extrabold)
- `sFontWeight900` = "900" (Black/Heavy)

Note: These are provided alongside existing named versions (sFontWeightNormal, sFontWeightBold, etc.) for flexibility. Use whichever naming convention you prefer - both point to the same values.

### Changed on 2025-10-11

- **Total Token Count**: 441 → 452 tokens (+11 tokens, +2.5%)
- **Repository Name**: Renamed from "spexop-design-system-public" to "spexop-tokens" for clarity
- All GitHub URLs updated to reflect new repository name

### Improved on 2025-10-11

- **More complete spacing scale** - Fewer gaps, better granularity
- **Larger font sizes** - Better support for hero sections and large headlines
- **Flexible font weights** - Both semantic names and numeric values available
- **Clearer repository focus** - Name now reflects that this is a tokens-focused package

## [0.2.2] - 2025-10-08

### Fixed

#### CSS Variable Naming Bug (Critical Fix for v0.2.1)

Fixed the critical CSS variable naming bug that was present in v0.2.1:

**Before (v0.2.1 - Broken):**

```css
--s-color-red-5-0-0: #b04554;    /* ❌ Wrong - numbers split up */
--s-color-blue-1-0-0: #dbeafe;  /* ❌ Wrong - inconsistent */
```

**After (v0.2.2 - Fixed):**

```css
--s-color-red-500: #b04554;     /* ✅ Correct - clean naming */
--s-color-blue-100: #dbeafe;   /* ✅ Correct - consistent */
```

**Impact:** All 148 color tokens now have consistent, predictable CSS variable names
**Root Cause:** Regex in `generate-css.ts` was splitting each digit separately
**Solution:** Updated regex to preserve number sequences as single units

**⚠️ IMPORTANT:** If you installed v0.2.1, please upgrade to v0.2.2 immediately to get correct CSS variable names.

## [0.2.1] - 2025-10-08

⚠️ **This version has a CSS variable naming bug. Please use v0.2.2 instead.**

### Fixed on 2025-10-08

#### CSS Variable Naming Bug (Critical)

Fixed a critical bug in the CSS generation script that was creating inconsistent variable names:

**Before (Broken):**

```css
--s-color-red-5-0-0: #b04554;    /* ❌ Wrong - numbers split up */
--s-color-blue-1-0-0: #dbeafe;  /* ❌ Wrong - inconsistent */
```

**After (Fixed):**

```css
--s-color-red-500: #b04554;     /* ✅ Correct - clean naming */
--s-color-blue-100: #dbeafe;   /* ✅ Correct - consistent */
```

**Impact:** All 148 color tokens now have consistent, predictable CSS variable names
**Root Cause:** Regex in `generate-css.ts` was splitting each digit separately
**Solution:** Updated regex to preserve number sequences as single units

### Changed Tokens

#### Breakpoint Updates for Modern Displays

Updated breakpoint, container, and media query tokens to better support modern screen sizes:

**Breakpoint Tokens (3 tokens):**

- `sBreakpointLg`: `1024px` → `1280px` (+256px)
- `sBreakpointXl`: `1280px` → `1920px` (+640px)
- `sBreakpoint2xl`: `1536px` → `2560px` (+1024px)

**Container Tokens (3 tokens):**

- `sContainerLg`: `1024px` → `1280px` (+256px)
- `sContainerXl`: `1280px` → `1920px` (+640px)
- `sContainer2xl`: `1536px` → `2560px` (+1024px)

**Media Query Tokens (11 tokens automatically updated):**

- `sMediaMinLg`, `sMediaMaxLg` - Now use 1280px
- `sMediaMinXl`, `sMediaMaxXl` - Now use 1920px
- `sMediaMin2xl`, `sMediaMax2xl` - Now use 2560px
- `sMediaOnlyLg`, `sMediaOnlyMd`, `sMediaOnlyXl` - Updated ranges
- `sMediaMobile`, `sMediaTabletDesktop` - Updated ranges

### Improved Functionality

- **Better tablet breakpoint**: 768px-1280px (was 768px-1024px) aligns with modern tablet displays
- **Full HD support**: 1920px breakpoint matches standard Full HD (1080p) monitors
- **2K/QHD support**: 2560px breakpoint for modern high-resolution displays
- **More appropriate responsive ranges** for contemporary device landscape

### Technical Details

- Total tokens affected: 17 (6 base tokens + 11 computed media queries)
- No breaking changes - all token names remain the same
- Only token values updated for better modern display support

## [0.2.0] - 2025-10-07

### Added on 2025-10-07

#### New Color Scales (48 new color tokens)

- **Purple Color Scale** (10 tokens) - Contemporary purple for premium/innovation themes
  - `sColorPurple50` through `sColorPurple900` (#f3e5f5 → #4a148c)
  - Perfect for premium features, creativity, innovation themes
  - Used by: Stripe, Figma, Twitch

- **Green Color Scale** (10 tokens) - Modern emerald-green distinct from Success
  - `sColorGreen50` through `sColorGreen900` (#ecfdf5 → #064e3b)
  - Contemporary teal-infused emerald palette
  - Ideal for: nature, growth, money, environmental themes
  - Distinct from Success green (material design green)

- **Complete Red Color Scale** (4 new tokens added)
  - Added: `sColorRed200`, `sColorRed300`, `sColorRed400`, `sColorRed900`
  - Now complete 10-shade scale matching other brand colors

#### Expanded Semantic Color Scales (28 new tokens)

All semantic colors expanded from 3 shades to full 10-shade scales:

- **Success Colors** - Added 7 shades (100, 200, 300, 400, 600, 800, 900)
  - Now supports: light backgrounds, hover states, text colors, disabled states
  
- **Warning Colors** - Added 7 shades (100, 200, 300, 400, 600, 800, 900)
  - Complete orange-based warning palette for all use cases
  
- **Info Colors** - Added 7 shades (100, 200, 300, 400, 600, 800, 900)
  - Full blue-based informational color range
  
- **Error Colors** - Added 7 shades (100, 200, 300, 400, 600, 800, 900)
  - Comprehensive red-based error state palette

#### Documentation & Developer Experience

- **TOKENS-REFERENCE.md** (13 KB) - Complete markdown reference guide
  - All 441 tokens organized by category
  - Usage examples (TypeScript, CSS Variables, Styled Components)
  - Quick search tips
  
- **tokens-demo.html** (43 KB) - Interactive visual showcase
  - Beautiful color swatch gallery with all 148 colors
  - Click-to-copy hex codes
  - Responsive design
  - Complete standalone HTML (no dependencies)
  
- **tokens-quick-reference.txt** (7.4 KB) - Plain text quick reference
  - Terminal-friendly format
  - Perfect for grep/cat/less commands
  - All colors with hex values

### Changed of 0.2.0

- **Total Token Count**: Increased from 393 to 441 tokens (+12%)
- **Color Token Count**: Increased from ~100 to 148 tokens (+48%)
- **Color Families**: Now 10 complete color families (up from 6)
  - Neutrals, Slate, Blue, Red, Purple, Green (all 10+ shades)
  - Success, Warning, Info, Error (all expanded to 10 shades)

### Improved of 0.2.0

- **Semantic Color System** - Now production-ready with complete scales
  - Can handle all component states: default, hover, active, disabled
  - Supports backgrounds, borders, text, icons
  - No more missing shades for edge cases

- **Brand Color Versatility** - Added Purple and Green for richer palette
  - 6 brand color families provide wide design flexibility
  - Matches or exceeds industry standards (Material Design, Tailwind, Chakra UI)

- **Package Distribution** - All documentation now included in npm package
  - Users can access visual demo and references locally
  - Better developer experience with multiple reference formats

### Documentation

- Updated README with new color scales
- Added comprehensive usage examples for all new colors
- Updated all documentation to reflect 441 tokens
- Added visual comparison between Success (material green) and Green (emerald)

### Developer Experience

- All documentation files included in npm package distribution
- Multiple reference formats (Markdown, HTML, TXT) for different workflows
- Visual demo for designers and developers
- No breaking changes - fully backward compatible

## [0.1.0] - 2025-10-03

### Added to 0.1.0

#### New Token Categories

- **Outline Tokens** (11 tokens) - Accessibility-focused focus indicators
  - Width tokens: `sOutlineWidth1` through `sOutlineWidth4`
  - Offset tokens: `sOutlineOffset0`, `sOutlineOffset2`, `sOutlineOffset4`, `sOutlineOffset8`
  - Style tokens: `sOutlineStyleSolid`, `sOutlineStyleDashed`, `sOutlineStyleDotted`

- **Grid Layout Tokens** (6 tokens) - Flexible grid system configuration
  - Column tokens: `sGridColumns12`, `sGridColumns16`, `sGridColumns24`
  - Gutter tokens: `sGridGutterSm`, `sGridGutterMd`, `sGridGutterLg`

- **Aspect Ratio Tokens** (7 tokens) - Standard aspect ratios for media and containers
  - `sAspectRatioSquare` (1:1)
  - `sAspectRatioVideo` (16:9)
  - `sAspectRatioWide` (21:9)
  - `sAspectRatioClassic` (4:3)
  - `sAspectRatioPortrait` (3:4)
  - `sAspectRatioGolden` (1.618:1)
  - `sAspectRatioUltraWide` (32:9)

- **Constraint Tokens** (8 tokens) - Min/max width and height constraints
  - Width constraints: `sMinWidthButton`, `sMinWidthInput`, `sMinWidthCard`, `sMaxWidthText`, `sMaxWidthProse`
  - Height constraints: `sMinHeightButton`, `sMinHeightInput`, `sMaxHeightModal`

- **Border Style Tokens** (4 additional styles)
  - `sBorderStyleDashed`
  - `sBorderStyleDotted`
  - `sBorderStyleDouble`
  - `sBorderStyleNone`

#### Theme System

- Three built-in light themes: Minimal, Professional, Bold
- Three built-in dark themes: Minimal Dark, Professional Dark, Bold Dark
- Automatic dark mode support
- Theme-aware semantic tokens

#### Core Features

- 389+ TypeScript design tokens with full type safety
- Automatic CSS variable generation (`tokens.css`)
- JSON export for design tools (`tokens.json`)
- Tree-shakeable ES modules
- CommonJS compatibility
- Comprehensive test coverage (34 tests)

#### Token Categories

- **Colors**: Blue, Red, Slate, Neutral scales + Glass effects + Semantic colors
- **Spacing**: 0-32 scale with component-specific variants
- **Typography**: Font families, sizes (with responsive clamp), weights, line heights, letter spacing
- **Effects**: Shadows, blur effects, backdrop filters
- **Border Radius**: 6 scale points from none to pill
- **Motion**: Duration, easing, transition presets
- **Breakpoints**: 6 responsive breakpoints (xs to 2xl)
- **Media Queries**: Mobile-first, desktop-first, ranges, feature detection
- **Z-Index**: 6-layer system (base to tooltip)
- **Cursors**: 8 cursor styles
- **Container Sizes**: 7 max-width presets
- **Viewport Sizes**: Percentage-based sizing utilities

### Documentation of 0.1.0

- Comprehensive README with usage examples
- Theme system documentation (`src/themes/README.md`)
- Semantic tokens guide (`src/semantic/README.md`)
- Media query utilities guide (`src/media/README.md`)
- TypeScript type definitions included

### Developer Experience of 0.1.0

- Full TypeScript support with exported types
- ES Module and CommonJS exports
- CSS variables for runtime theming
- JSON export for design tool integration
- Watch mode for development (`pnpm dev`)
- Automated testing with Vitest

[0.4.0]: https://github.com/spexop-ui/spexop-tokens/releases/tag/tokens-v0.4.0
[0.3.0]: https://github.com/spexop-ui/spexop-tokens/releases/tag/tokens-v0.3.0
[0.2.3]: https://github.com/spexop-ui/spexop-tokens/releases/tag/tokens-v0.2.3
[0.2.2]: https://github.com/spexop-ui/spexop-tokens/releases/tag/tokens-v0.2.2
[0.2.1]: https://github.com/spexop-ui/spexop-tokens/releases/tag/tokens-v0.2.1
[0.2.0]: https://github.com/spexop-ui/spexop-tokens/releases/tag/tokens-v0.2.0
[0.1.0]: https://github.com/spexop-ui/spexop-tokens/releases/tag/tokens-v0.1.0
