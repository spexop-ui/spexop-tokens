# Spexop Design System

A professional TypeScript design system with comprehensive design tokens and built-in theming support.

## Packages

### [@spexop/tokens](./packages/tokens)

Production-ready design tokens package with comprehensive token library covering:

- **Colors** - Blue, Red, Slate, Neutral scales + Glass effects
- **Spacing** - 0-32 scale with component-specific variants
- **Typography** - Complete font system with responsive sizes
- **Effects** - Shadows, blur, backdrop filters
- **Borders** - Radius, widths, styles
- **Motion** - Duration, easing, transitions
- **Layout** - Breakpoints, media queries, grid, containers
- **Accessibility** - Focus indicators, constraints
- **Theme System** - 6 built-in themes with dark mode

### [@spexop/icons](./packages/icons)

Production-ready icon library with optimized SVG icons:

- **Framework-agnostic** - Works with React, Vue, Angular, Svelte, or vanilla JS
- **Tree-shakeable** - Import only the icons you need
- **Zero dependencies** - Lightweight and fast
- **TypeScript support** - Full type definitions included
- **Consistent design** - Icons designed to match our design system
- **Accessible** - Built with accessibility in mind

```bash
npm install @spexop/icons
```

## Quick Start

```bash
# Install tokens package
npm install @spexop/tokens

# Install icons package
npm install @spexop/icons

# Or with pnpm
pnpm add @spexop/tokens @spexop/icons

# Or with yarn
yarn add @spexop/tokens @spexop/icons
```

## Usage

### Tokens

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

// Apply themes via CSS
import "@spexop/tokens/tokens.css";
```

### Icons

```typescript
// Import specific icons
import { Search, Plus, Home } from "@spexop/icons";

// Use in your components
<button>
  <Search size={20} />
  Search
</button>

// Or import from specific categories
import { Search } from "@spexop/icons/actions";
import { Home } from "@spexop/icons/navigation";
```

## Features

- **Comprehensive Design Tokens** - Complete token library across multiple categories
- **Built-in Themes** - 6 themes (3 light + 3 dark)
- **TypeScript First** - Full type safety and IntelliSense
- **Multiple Exports** - ESM, CJS, CSS variables, JSON
- **Tree-Shakeable** - Import only what you need
- **Zero Dependencies** - Lightweight and fast
- **Well Tested** - Comprehensive automated test coverage
- **Accessibility-First** - WCAG 2.2 compliant
- **Icon Integration** - Works seamlessly with Lucide Icons

## Documentation

- [Tokens Package Documentation](./packages/tokens/README.md)
- [Theme System Guide](./packages/tokens/src/themes/README.md)
- [Semantic Tokens Guide](./packages/tokens/src/semantic/README.md)
- [Lucide Icons Documentation](https://lucide.dev/guide/)
- [Contributing Guide](./CONTRIBUTING.md)

## Links

- **Repository**: <https://github.com/spexop-ui/design-system>
- **npm Package**: <https://www.npmjs.com/package/@spexop/tokens>
- **Website**: <https://www.spexop.com>
- **Icons**: <https://lucide.dev>
- **Issues**: <https://github.com/spexop-ui/design-system/issues>

## License

MIT © Spexop Team

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to contribute.

---

Built with ❤️ by Cuneyt Cakar (olmstedian)
