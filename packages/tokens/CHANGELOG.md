# Changelog

All notable changes to `@spexop/tokens` will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-10-03

### Added

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

### Documentation

- Comprehensive README with usage examples
- Theme system documentation (`src/themes/README.md`)
- Semantic tokens guide (`src/semantic/README.md`)
- Media query utilities guide (`src/media/README.md`)
- TypeScript type definitions included

### Developer Experience

- Full TypeScript support with exported types
- ES Module and CommonJS exports
- CSS variables for runtime theming
- JSON export for design tool integration
- Watch mode for development (`pnpm dev`)
- Automated testing with Vitest

[0.1.0]: https://github.com/spexop-ui/design-system/releases/tag/tokens-v0.1.0
