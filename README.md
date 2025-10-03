# Spexop Design System

A professional TypeScript design system with comprehensive design tokens and built-in theming support.

## 📦 Packages

### [@spexop/tokens](./packages/tokens)

Production-ready design tokens package with 389+ tokens covering:

- **Colors** - Blue, Red, Slate, Neutral scales + Glass effects
- **Spacing** - 0-32 scale with component-specific variants
- **Typography** - Complete font system with responsive sizes
- **Effects** - Shadows, blur, backdrop filters
- **Borders** - Radius, widths, styles
- **Motion** - Duration, easing, transitions
- **Layout** - Breakpoints, media queries, grid, containers
- **Accessibility** - Focus indicators, constraints
- **Theme System** - 6 built-in themes with dark mode

## 🚀 Quick Start

```bash
# Install the tokens package
npm install @spexop/tokens

# Or with pnpm
pnpm add @spexop/tokens

# Or with yarn
yarn add @spexop/tokens
```

## 📖 Usage

```typescript
import {
  sColorBlue500,
  sSpacing4,
  sFontSizeBase,
  minimalTheme,
  professionalTheme
} from "@spexop/tokens";

// Use tokens in your app
const styles = {
  color: sColorBlue500,      // '#3b82f6'
  padding: sSpacing4,        // '16px'
  fontSize: sFontSizeBase    // '16px'
};

// Apply themes
import "@spexop/tokens/tokens.css";
```

## 🎨 Features

- **389+ Design Tokens** - Comprehensive token library
- **Built-in Themes** - 6 themes (3 light + 3 dark)
- **TypeScript First** - Full type safety and IntelliSense
- **Multiple Exports** - ESM, CJS, CSS variables, JSON
- **Tree-Shakeable** - Import only what you need
- **Zero Dependencies** - Lightweight and fast
- **Well Tested** - 34 automated tests
- **Accessibility-First** - WCAG-compliant

## 📚 Documentation

- [Tokens Package Documentation](./packages/tokens/README.md)
- [Theme System Guide](./packages/tokens/src/themes/README.md)
- [Semantic Tokens Guide](./packages/tokens/src/semantic/README.md)
- [Contributing Guide](./CONTRIBUTING.md)

## 🔗 Links

- **Repository**: <https://github.com/spexop-ui/design-system>
- **npm Package**: <https://www.npmjs.com/package/@spexop/tokens>
- **Website**: <https://www.spexop.com>
- **Issues**: <https://github.com/spexop-ui/design-system/issues>

## 📄 License

MIT © Spexop Team

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute.

---

**Built with ❤️ by the Spexop team**
