# Tokens Reference Guide

Quick reference for all design tokens in `@spexop/tokens`.

**Total Tokens:** 441  
**Version:** 0.2.2

---

## 🎨 Colors (148 tokens)

### Base Colors

#### Neutral (12 shades)

```typescript
sColorNeutral50    // #fafafa
sColorNeutral100   // #f5f5f5
sColorNeutral200   // #e5e5e5
sColorNeutral300   // #d4d4d4
sColorNeutral400   // #a3a3a3
sColorNeutral500   // #737373
sColorNeutral600   // #525252
sColorNeutral700   // #404040
sColorNeutral800   // #262626
sColorNeutral850   // #1f1f1f
sColorNeutral900   // #171717
sColorNeutral950   // #0a0a0a
```

#### Slate (10 shades)

```typescript
sColorSlate50     // #f8fafc
sColorSlate100    // #f1f5f9
sColorSlate200    // #e2e8f0
sColorSlate300    // #cbd5e1
sColorSlate400    // #94a3b8
sColorSlate500    // #64748b
sColorSlate600    // #475569
sColorSlate700    // #334155
sColorSlate800    // #1e293b
sColorSlate900    // #0f172a
```

#### Blue (10 shades)

```typescript
sColorBlue50      // #eff6ff
sColorBlue100     // #dbeafe
sColorBlue200     // #cbd5e1
sColorBlue300     // #93c5fd
sColorBlue400     // #60a5fa
sColorBlue500     // #3b82f6
sColorBlue600     // #2563eb
sColorBlue700     // #1d4ed8
sColorBlue800     // #1e40af
sColorBlue900     // #1e3a8a
```

#### Red (10 shades)

```typescript
sColorRed50       // #f8eff0
sColorRed100      // #f0dce0
sColorRed200      // #e8c5cb
sColorRed300      // #d9a0ab
sColorRed400      // #c5707f
sColorRed500      // #b04554
sColorRed600      // #9d3b4a
sColorRed700      // #8a3240
sColorRed800      // #762837
sColorRed900      // #5a1e28
```

#### Purple (10 shades)

```typescript
sColorPurple50    // #f3e5f5
sColorPurple100   // #e1bee7
sColorPurple200   // #ce93d8
sColorPurple300   // #ba68c8
sColorPurple400   // #ab47bc
sColorPurple500   // #9c27b0
sColorPurple600   // #8e24aa
sColorPurple700   // #7b1fa2
sColorPurple800   // #6a1b9a
sColorPurple900   // #4a148c
```

#### Green (10 shades)

```typescript
sColorGreen50     // #ecfdf5
sColorGreen100    // #d1fae5
sColorGreen200    // #a7f3d0
sColorGreen300    // #6ee7b7
sColorGreen400    // #34d399
sColorGreen500    // #10b981
sColorGreen600    // #059669
sColorGreen700    // #047857
sColorGreen800    // #065f46
sColorGreen900    // #064e3b
```

### Semantic Colors

#### Success (10 shades)

```typescript
sColorSuccess50   // #e8f5e9
sColorSuccess100  // #c8e6c9
sColorSuccess200  // #a5d6a7
sColorSuccess300  // #81c784
sColorSuccess400  // #66bb6a
sColorSuccess500  // #4caf50
sColorSuccess600  // #43a047
sColorSuccess700  // #388e3c
sColorSuccess800  // #2e7d32
sColorSuccess900  // #1b5e20
```

#### Warning (10 shades)

```typescript
sColorWarning50   // #fff3e0
sColorWarning100  // #ffe0b2
sColorWarning200  // #ffcc80
sColorWarning300  // #ffb74d
sColorWarning400  // #ffa726
sColorWarning500  // #ff9800
sColorWarning600  // #fb8c00
sColorWarning700  // #f57c00
sColorWarning800  // #ef6c00
sColorWarning900  // #e65100
```

#### Info (10 shades)

```typescript
sColorInfo50      // #e3f2fd
sColorInfo100     // #bbdefb
sColorInfo200     // #90caf9
sColorInfo300     // #64b5f6
sColorInfo400     // #42a5f5
sColorInfo500     // #2196f3
sColorInfo600     // #1e88e5
sColorInfo700     // #1976d2
sColorInfo800     // #1565c0
sColorInfo900     // #0d47a1
```

#### Error (10 shades)

```typescript
sColorError50     // #ffebee
sColorError100    // #ffcdd2
sColorError200    // #ef9a9a
sColorError300    // #e57373
sColorError400    // #ef5350
sColorError500    // #f44336
sColorError600    // #e53935
sColorError700    // #d32f2f
sColorError800    // #c62828
sColorError900    // #b71c1c
```

### Utilities

```typescript
sColorBlack       // #000000
sColorWhite       // #ffffff
```

---

## 📏 Spacing (19 tokens)

```typescript
sSpacing0         // 0px
sSpacing1         // 4px
sSpacing2         // 8px
sSpacing3         // 12px
sSpacing4         // 16px
sSpacing5         // 20px
sSpacing6         // 24px
sSpacing8         // 32px
sSpacing10        // 40px
sSpacing12        // 48px
sSpacing14        // 56px
sSpacing16        // 64px
sSpacing20        // 80px
sSpacing24        // 96px
sSpacing32        // 128px

// Layout-specific
sPaddingContainerMobile      // 16px
sPaddingContainerDesktop     // 24px
sPaddingSectionVertical      // 48px
sPaddingSectionHorizontal    // 16px
```

---

## 🔤 Typography (34 tokens)

### Font Families

```typescript
sFontFamilyBase   // -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto...
sFontFamilyMono   // "SF Mono", Monaco, "Cascadia Code", "Roboto Mono"...
```

### Font Sizes

```typescript
sFontSize3xs      // 10px
sFontSizeXxs      // 11px
sFontSize2xs      // 11px
sFontSizeXs       // 12px
sFontSizeSm       // 14px
sFontSizeBase     // 16px
sFontSizeLg       // 18px
sFontSizeXl       // 20px
sFontSize2xl      // 24px
sFontSize3xl      // 30px
sFontSize4xl      // 36px
sFontSize5xl      // 48px
sFontSizeHero     // 72px
```

### Font Weights

```typescript
sFontWeightNormal     // 400
sFontWeightMedium     // 500
sFontWeightSemibold   // 600
sFontWeightBold       // 700
sFontWeightExtrabold  // 800
sFontWeightBlack      // 900
```

### Line Heights

```typescript
sLineHeightNone       // 1
sLineHeightTight      // 1.25
sLineHeightSnug       // 1.375
sLineHeightNormal     // 1.5
sLineHeightRelaxed    // 1.625
```

### Letter Spacing

```typescript
sLetterSpacingTighter  // -0.05em
sLetterSpacingTight    // -0.025em
sLetterSpacingNormal   // 0em
sLetterSpacingWide     // 0.025em
sLetterSpacingWider    // 0.05em
sLetterSpacingWidest   // 0.1em
```

---

## 🎭 Effects (20 tokens)

### Shadows

```typescript
sShadowNone              // none
sShadowSubtle            // 0 1px 2px rgba(0,0,0,0.05)
sShadowCard              // 0 1px 3px rgba(0,0,0,0.1)
sShadowFloat             // 0 4px 6px rgba(0,0,0,0.1)
sShadowDrawer            // 0 10px 15px rgba(0,0,0,0.1)
sShadowGlassLight        // Glass effect shadow (light)
sShadowGlassDark         // Glass effect shadow (dark)
sShadowFloating          // Floating button shadow
sShadowFloatingHover     // Floating button hover
sShadowFloatingActive    // Floating button active
```

### Blur

```typescript
sBlurSubtle       // blur(4px)
sBlurGlass        // blur(12px)
sBlurStrong       // blur(24px)
sBlurLiquid       // blur(40px)
```

### Backdrop

```typescript
sBackdropLight    // blur(8px)
sBackdropGlass    // blur(12px)
sBackdropStrong   // blur(16px)
```

---

## 🔘 Border Radius (6 tokens)

```typescript
sRadiusNone       // 0px
sRadiusTight      // 4px
sRadiusSubtle     // 8px
sRadiusRelaxed    // 12px
sRadiusLiquid     // 16px
sRadiusPill       // 9999px
```

---

## ⏱️ Motion (15 tokens)

### Durations

```typescript
sDurationFast     // 150ms
sDurationNormal   // 250ms
sDurationRipple   // 600ms
sDurationSlow     // 400ms
```

### Easing

```typescript
sEaseSmooth       // cubic-bezier(0.4, 0, 0.2, 1)
sEaseDecelerate   // cubic-bezier(0, 0, 0.2, 1)
sEaseBounce       // cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

### Transitions

```typescript
sTransitionBase       // all 250ms ease
sTransitionFast       // all 150ms ease
sTransitionSlow       // all 400ms ease
sTransitionSmooth     // all 250ms cubic-bezier(0.4, 0, 0.2, 1)
sTransitionColors     // background-color, border-color, color...
sTransitionOpacity    // opacity 250ms ease
sTransitionTransform  // transform 250ms ease
sTransitionReveal     // Multi-property reveal
```

---

## 📱 Breakpoints (6 tokens)

```typescript
sBreakpointXs     // 480px
sBreakpointSm     // 640px
sBreakpointMd     // 768px
sBreakpointLg     // 1280px
sBreakpointXl     // 1920px
sBreakpoint2xl    // 2560px
```

---

## 🪟 Media Queries (30+ tokens)

### Min-Width (Mobile First)

```typescript
sMediaMinXs       // @media (min-width: 480px)
sMediaMinSm       // @media (min-width: 640px)
sMediaMinMd       // @media (min-width: 768px)
sMediaMinLg       // @media (min-width: 1024px)
sMediaMinXl       // @media (min-width: 1280px)
sMediaMin2xl      // @media (min-width: 1536px)
```

### Max-Width (Desktop First)

```typescript
sMediaMaxXs       // @media (max-width: 479px)
sMediaMaxSm       // @media (max-width: 639px)
sMediaMaxMd       // @media (max-width: 767px)
sMediaMaxLg       // @media (max-width: 1023px)
sMediaMaxXl       // @media (max-width: 1279px)
sMediaMax2xl      // @media (max-width: 1535px)
```

### Feature Queries

```typescript
sMediaDarkScheme        // @media (prefers-color-scheme: dark)
sMediaLightScheme       // @media (prefers-color-scheme: light)
sMediaReducedMotion     // @media (prefers-reduced-motion: reduce)
sMediaMotion            // @media (prefers-reduced-motion: no-preference)
sMediaHover             // @media (hover: hover)
sMediaNoHover           // @media (hover: none)
sMediaHighContrast      // @media (prefers-contrast: high)
sMediaReducedTransparency  // @media (prefers-reduced-transparency: reduce)
```

---

## 📐 Z-Index (13 tokens)

```typescript
sZIndexBase              // 0
sZIndexContent           // 10
sZIndexSticky            // 100
sZIndexFloating          // 500
sZIndexDropdown          // 1000
sZIndexPopover           // 1500
sZIndexOverlayBackground // 1900
sZIndexOverlay           // 2000
sZIndexBanner            // 2500
sZIndexAnnouncement      // 2600
sZIndexToast             // 3000
sZIndexTooltip           // 3500
sZIndexVideoBackground   // -1
```

---

## 📦 Containers (7 tokens)

```typescript
sContainerXs      // 480px
sContainerSm      // 640px
sContainerMd      // 768px
sContainerLg      // 1280px
sContainerXl      // 1920px
sContainer2xl     // 2560px
sContainerFull    // 100%
```

---

## 🎯 Constraints (8 tokens)

```typescript
// Width
sMinWidthButton   // 88px
sMinWidthInput    // 200px
sMinWidthCard     // 280px
sMaxWidthText     // 65ch
sMaxWidthProse    // 75ch

// Height
sMinHeightButton  // 44px (WCAG touch target)
sMinHeightInput   // 44px (WCAG touch target)
sMaxHeightModal   // 90vh
```

---

## 📊 Grid (6 tokens)

```typescript
// Columns
sGridColumns12    // 12
sGridColumns16    // 16
sGridColumns24    // 24

// Gutters
sGridGutterSm     // 16px
sGridGutterMd     // 24px
sGridGutterLg     // 32px
```

---

## 📐 Aspect Ratios (7 tokens)

```typescript
sAspectRatioSquare     // 1 / 1
sAspectRatioVideo      // 16 / 9
sAspectRatioWide       // 21 / 9
sAspectRatioUltraWide  // 32 / 9
sAspectRatioClassic    // 4 / 3
sAspectRatioPortrait   // 3 / 4
sAspectRatioGolden     // 1.618 / 1
```

---

## 🖱️ Cursors (8 tokens)

```typescript
sCursorAuto          // auto
sCursorDefault       // default
sCursorPointer       // pointer
sCursorText          // text
sCursorMove          // move
sCursorGrab          // grab
sCursorHelp          // help
sCursorNotAllowed    // not-allowed
```

---

## 🎨 Semantic Tokens

### Color Semantics

```typescript
// Text
sColorTextPrimary, sColorTextSecondary, sColorTextMuted
sColorTextInverted, sColorTextDisabled

// Backgrounds
sColorBackgroundPrimary, sColorBackgroundSecondary
sColorBackgroundTertiary, sColorBackgroundHover

// Surfaces
sColorSurface, sColorSurfaceRaised, sColorSurfaceHover

// Borders
sColorBorder, sColorBorderSubtle
sColorBorderHover, sColorBorderFocus

// Interactive
sColorPrimary, sColorPrimaryHover, sColorPrimaryActive
sColorInteractiveHover, sColorInteractiveFocus, sColorInteractiveActive

// Overlays
sColorOverlay, sColorOverlayLight, sColorOverlayHeavy
```

### Glass Semantics

```typescript
sGlassSurface, sGlassOverlay, sGlassNav, sGlassHero
sGlassLight10, sGlassLight20, sGlassLight30, sGlassLight50
sGlassDark10, sGlassDark20, sGlassDark30, sGlassDark50
```

---

## 📚 Usage Examples

### TypeScript/JavaScript

```typescript
import { 
  sColorPrimary, 
  sSpacing4, 
  sShadowCard,
  sRadiusSubtle 
} from "@spexop/tokens";

const buttonStyles = {
  backgroundColor: sColorPrimary,
  padding: sSpacing4,
  boxShadow: sShadowCard,
  borderRadius: sRadiusSubtle,
};
```

### CSS Variables

```css
@import '@spexop/tokens/tokens.css';

.button {
  background-color: var(--s-color-primary);
  padding: var(--s-spacing-4);
  box-shadow: var(--s-shadow-card);
  border-radius: var(--s-radius-subtle);
}
```

### Styled Components

```typescript
import styled from 'styled-components';
import { sColorPrimary, sSpacing4 } from '@spexop/tokens';

const Button = styled.button`
  background-color: ${sColorPrimary};
  padding: ${sSpacing4};
`;
```

---

## 🔍 Quick Search Tips

- **Colors:** All color tokens start with `sColor`
- **Spacing:** All spacing tokens start with `sSpacing`
- **Typography:** Font tokens start with `sFont`, `sLine`, or `sLetter`
- **Effects:** Shadow/blur tokens start with `sShadow`, `sBlur`, or `sBackdrop`
- **Motion:** Animation tokens start with `sDuration`, `sEase`, or `sTransition`
- **Layout:** Size/container tokens start with `sContainer`, `sSize`, `sMin`, or `sMax`

---

**Documentation Version:** 0.2.2  
**Last Updated:**10-08
