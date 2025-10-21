# Getting Started with Spexop

## Installation

```bash
# Install both packages
npm install @spexop/react @spexop/theme

# Or with pnpm
pnpm add @spexop/react @spexop/theme
```

## Usage Options

### Option 1: Pre-built CSS (Easiest)

Import a ready-made theme:

```typescript
import '@spexop/theme/dist/css/tech.css';
import '@spexop/react/dist/index.css';
import { Button, Grid, Card } from '@spexop/react';

// Components automatically use the tech theme
```

Available themes: default, tech, startup, healthcare, finance, ecommerce, education, corporate, agency, minimal, dark, pastel, vibrant

### Option 2: ThemeProvider (Flexible)

Use React context for dynamic theme switching:

```typescript
import { ThemeProvider } from '@spexop/react';
import { techPreset } from '@spexop/theme';

function App() {
  return (
    <ThemeProvider theme={techPreset}>
      <YourComponents />
    </ThemeProvider>
  );
}
```

### Option 3: Custom Theme (Full Control)

Create your own theme:

```typescript
import { ThemeProvider } from '@spexop/react';
import type { SpexopThemeConfig } from '@spexop/theme';

const myTheme: SpexopThemeConfig = {
  meta: { name: "My Brand", version: "1.0.0" },
  colors: {
    primary: "#your-color",
    secondary: "#your-color",
    accent: "#your-color",
    // ... other colors
  },
};

<ThemeProvider theme={myTheme}>
  <App />
</ThemeProvider>
```

## Framework Integration

### Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
```

### Next.js

```typescript
// app/layout.tsx or pages/_app.tsx
import '@spexop/theme/dist/css/tech.css';
import '@spexop/react/dist/index.css';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
```

### Create React App

```typescript
// index.tsx
import '@spexop/theme/dist/css/tech.css';
import '@spexop/react/dist/index.css';
import App from './App';
```

## What's New in v0.3.0

### New Component Categories

- **Data Components**

```typescript
import { DataTable, DataGrid, Chart } from '@spexop/react';

<DataTable columns={columns} data={data} sortable filterable />
```

- **Feedback Components**

```typescript
import { Alert, Spinner, Progress, Skeleton, Toast, EmptyState } from '@spexop/react';

<Alert variant="success">Operation successful!</Alert>
<Spinner size="lg" />
<Progress value={75} />
```

- **Typography Components**

```typescript
import { Heading, Text, Link, Code } from '@spexop/react';

<Heading level={1}>Page Title</Heading>
<Text size="lg">Body text</Text>
<Link href="/docs">Documentation</Link>
```

### New Hooks (33+ total)

```typescript
// Storage
const [value, setValue] = useLocalStorage('key', defaultValue);

// Browser APIs
const isOnline = useOnline();
const size = useWindowSize();

// Interaction
const ref = useClickOutside(() => setIsOpen(false));
const isHovering = useHover(ref);

// Utilities
const debouncedValue = useDebounce(value, 500);
const [copied, copy] = useCopyToClipboard();
```

### New Providers

```typescript
import { 
  ThemeProvider, 
  AccessibilityProvider, 
  ModalProvider, 
  ToastProvider 
} from '@spexop/react';

<ThemeProvider theme={techPreset}>
  <AccessibilityProvider>
    <ModalProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </ModalProvider>
  </AccessibilityProvider>
</ThemeProvider>
```

### Enhanced Components

- **Carousel** - New slideshow component with touch/swipe support
- **CodeBlock v3** - Redesigned with custom syntax highlighting
- **Card** - New sub-component API (CardHeader, CardBody, CardFooter)
- **Button** - New semantic variants (danger, success, warning, info, neutral)

### Documentation

All 59 components now include:

- Comprehensive README.md
- USAGE-GUIDE.md with practical examples
- Component tests with Vitest
- TypeScript .types.ts files

## Development Status

Version 0.3.0 is an active development release. While components follow "The Spexop Way" design principles, the library is still evolving. APIs may change in future releases.

## Next Steps

- Explore [Examples](../examples/)
- Read [Theme System Guide](../packages/theme/README.md)
- Browse [Component Docs](../packages/react/README.md)
- Check [Migration Guide](../packages/react/MIGRATION-GUIDE.md)
- Try [Theme Builder](https://builder.spexop.com)
