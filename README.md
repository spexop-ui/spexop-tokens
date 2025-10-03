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

### Recommended: Lucide Icons

For icons, we recommend using [**Lucide Icons**](https://lucide.dev/) - a beautiful, consistent open-source icon library that perfectly complements our design tokens:

- **1000+ icons** - Comprehensive coverage
- **Consistent style** - Stroke-based, matches our minimal theme
- **Framework support** - React, Vue, Angular, Svelte, Vanilla JS
- **ISC License** - Free and open-source
- **Tree-shakeable** - Import only what you need

```bash
npm install lucide-react    # For React
npm install lucide          # For Vanilla JS
npm install lucide-vue-next # For Vue
```

## Quick Start

```bash
# Install tokens package
npm install @spexop/tokens

# Or with pnpm
pnpm add @spexop/tokens

# Or with yarn
yarn add @spexop/tokens

# Optional: Add Lucide Icons
npm install lucide-react  # or lucide / lucide-vue-next
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

### Icons (with Lucide)

```typescript
// React
import { Search, Plus } from "lucide-react";

<button>
  <Search size={20} />
  Search
</button>

// Vue
import { Search } from "lucide-vue-next";

<Search :size="20" />

// Vanilla JS
import { Search } from "lucide";

const icon = Search;
document.getElementById('icon').appendChild(icon);
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
