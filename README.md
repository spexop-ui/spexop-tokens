# Spexop Design Tokens

A comprehensive TypeScript design token system with 369 tokens for building modern, consistent UIs.

## ✨ Key Features

- **🎨 369 Design Tokens** - Refined token system following Refined Minimalism principles
- **💯 TypeScript-First** - Full type coverage with IntelliSense support
- **📦 Multiple Formats** - ES Modules, CommonJS, CSS variables, and JSON
- **🎭 Built-in Themes** - Pre-configured theme tokens with dark mode support
- **🔧 Flexible** - Use with any framework (React, Vue, Angular, vanilla JS)
- **📱 Responsive** - Modern breakpoints for all screen sizes
- **⚡ Tree-Shakeable** - Import only the tokens you need
- **🚀 Zero Dependencies** - Lightweight and fast

## 🚀 Quick Start

```bash
# Install with npm
npm install @spexop/tokens

# Or with pnpm
pnpm add @spexop/tokens

# Or with yarn
yarn add @spexop/tokens
```

### TypeScript/JavaScript

```typescript
import { 
  sColorBlue500, 
  sSpacing4, 
  sFontSizeXl,
  sFontWeightBold,
  sRadiusMd 
} from '@spexop/tokens';

const buttonStyles = {
  backgroundColor: sColorBlue500,  // "#3b82f6"
  padding: sSpacing4,               // "16px"
  fontSize: sFontSizeXl,            // "20px"
  fontWeight: sFontWeightBold,      // "700"
  borderRadius: sRadiusMd,          // "8px"
};
```

### CSS Variables

```css
/* Import CSS variables */
@import '@spexop/tokens/dist/tokens.css';

.button {
  background-color: var(--s-color-blue-500);
  padding: var(--s-spacing-4);
  font-size: var(--s-font-size-xl);
  font-weight: var(--s-font-weight-bold);
  border-radius: var(--s-radius-md);
}
```

---

## 🆕 What's New in v0.3.0

**Current Version: v0.3.0** - Refined Minimalism Alignment 🎯

⚠️ **BREAKING CHANGES** - This release removes 83 tokens that don't align with Refined Minimalism principles

**Removed:**
- ❌ **Slate color palette** (10 tokens) - Use Neutral palette instead
- ❌ **Glass effects** (37 tokens) - Contradicts minimal decoration principle
- ❌ **Heavy shadows** (8 tokens) - Violates "Borders before shadows" principle
- ❌ **Blur/Backdrop effects** (7 tokens) - Anti-pattern for refined aesthetic
- ❌ **Container duplicates** (6 tokens) - Use breakpoints instead
- ❌ **Ultra-wide aspect ratios** (2 tokens) - Niche use cases removed

**Result:**
- ✅ **369 tokens** (down from 452) - Leaner, more focused package
- ✅ **Fully aligned** with "Borders before shadows" and "Minimal decoration" principles
- ✅ **Comprehensive migration guide** in CHANGELOG.md

[See full changelog →](https://github.com/spexop-ui/spexop-tokens/blob/main/packages/tokens/CHANGELOG.md)

---

## 📦 Token Categories

| Category | Token Count | Examples |
|----------|-------------|----------|
| **Colors** | 98 | `sColorBlue500`, `sColorRed600`, `sColorNeutral100` |
| **Spacing** | 21 | `sSpacing0` - `sSpacing32` (0px to 128px) |
| **Typography** | 43 | Font sizes, weights, line heights, letter spacing |
| **Border Radius** | 8 | `sRadiusNone` to `sRadiusPill` |
| **Shadows** | 2 | `sShadowNone`, `sShadowSubtle` (minimal use) |
| **Breakpoints** | 6 | `sBreakpointXs` to `sBreakpoint2xl` |
| **Layout** | 30+ | Grid, constraints, z-index |
| **Motion** | 15+ | Durations, easings, transitions |
| **Other** | 146+ | Aspect ratios, opacity, cursors, transforms |
| **Total** | **369** | Refined design system |

### Package Contents

The `@spexop/tokens` package includes:

- **TypeScript/JavaScript** - ES Modules (`index.js`) and CommonJS (`index.cjs`)
- **Type Definitions** - Full TypeScript support (`index.d.ts`, `index.d.cts`)
- **CSS Variables** - All tokens as CSS custom properties (`tokens.css`)
- **JSON Export** - Token values in JSON format (`tokens.json`)
- **Documentation** - Reference guide and demo HTML (`TOKENS-REFERENCE.md`, `tokens-demo.html`)

---

## 📚 Token Usage Examples

### Spacing System

```typescript
import { sSpacing0, sSpacing4, sSpacing8, sSpacing16 } from '@spexop/tokens';

// Component spacing
const cardStyles = {
  padding: sSpacing4,        // 16px
  marginBottom: sSpacing8,   // 32px
  gap: sSpacing2,            // 8px
};
```

### Color System

```typescript
import { sColorBlue500, sColorGray100, sColorRed600 } from '@spexop/tokens';

// Semantic usage
const buttonStyles = {
  primary: sColorBlue500,    // "#3b82f6"
  background: sColorGray100, // "#f3f4f6"
  error: sColorRed600,       // "#dc2626"
};
```

### Typography System

```typescript
import { 
  sFontSizeBase, 
  sFontSizeXl, 
  sFontSize3xl,
  sFontWeightBold,
  sLineHeightRelaxed 
} from '@spexop/tokens';

const typographyStyles = {
  body: {
    fontSize: sFontSizeBase,      // "16px"
    lineHeight: sLineHeightRelaxed, // "1.625"
  },
  heading: {
    fontSize: sFontSize3xl,       // "30px"
    fontWeight: sFontWeightBold,  // "700"
  },
};
```

### Responsive Breakpoints

```typescript
import { sBreakpointMd, sBreakpointLg } from '@spexop/tokens';

// Media query usage
const mediaQuery = `@media (min-width: ${sBreakpointMd})`; // "@media (min-width: 768px)"
```

---

## 📚 Documentation

- **[GitHub Repository](https://github.com/spexop-ui/spexop-tokens)** - Source code and documentation
- **[npm Package](https://www.npmjs.com/package/@spexop/tokens)** - Published package on npm
- **[Token Reference](https://github.com/spexop-ui/spexop-tokens/blob/main/packages/tokens/TOKENS-REFERENCE.md)** - Complete token list
- **[Changelog](https://github.com/spexop-ui/spexop-tokens/blob/main/packages/tokens/CHANGELOG.md)** - Version history
- **[Demo HTML](https://github.com/spexop-ui/spexop-tokens/blob/main/packages/tokens/tokens-demo.html)** - Interactive token showcase

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests on [GitHub](https://github.com/spexop-ui/spexop-tokens).

---

## 📄 License

MIT License - see [LICENSE](https://github.com/spexop-ui/spexop-tokens/blob/main/LICENSE) for details.

---

<div align="center">

**[@spexop/tokens](https://www.npmjs.com/package/@spexop/tokens)** • Built with TypeScript

[GitHub](https://github.com/spexop-ui/spexop-tokens) • [npm](https://www.npmjs.com/package/@spexop/tokens) • [Issues](https://github.com/spexop-ui/spexop-tokens/issues)

[github]: <https://github.com/olmstedian> | <ccakar@spexop.com> | <https://spexop.com>

</div>
