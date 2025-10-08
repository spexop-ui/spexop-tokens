# Changelog

All notable changes to `@spexop/tokens` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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

### Changed

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

### Improved

- **Better tablet breakpoint**: 768px-1280px (was 768px-1024px) aligns with modern tablet displays
- **Full HD support**: 1920px breakpoint matches standard Full HD (1080p) monitors
- **2K/QHD support**: 2560px breakpoint for modern high-resolution displays
- **More appropriate responsive ranges** for contemporary device landscape

### Technical Details

- Total tokens affected: 17 (6 base tokens + 11 computed media queries)
- No breaking changes - all token names remain the same
- Only token values updated for better modern display support

## [0.2.0] - 2025-10-07

### Added

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

[0.2.2]: https://github.com/spexop-ui/design-system/releases/tag/tokens-v0.2.2
[0.2.1]: https://github.com/spexop-ui/design-system/releases/tag/tokens-v0.2.1
[0.2.0]: https://github.com/spexop-ui/design-system/releases/tag/tokens-v0.2.0
[0.1.0]: https://github.com/spexop-ui/design-system/releases/tag/tokens-v0.1.0
