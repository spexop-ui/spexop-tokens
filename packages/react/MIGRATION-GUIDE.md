# Migration Guide: v0.2.x to v0.3.0

This guide helps you migrate from @spexop/react v0.2.x to v0.3.0.

## Overview

Version 0.3.0 is a significant release with new components, hooks, providers, and comprehensive documentation. Most changes are additive and backward compatible, with one breaking change related to animation imports.

## Breaking Changes

### 1. Animations Import Path

The duplicate `src/animations/` folder has been removed. All animation components are now exclusively in `src/basic/animations/`.

**Before (v0.2.x):**

```typescript
// ❌ These paths no longer work
import { FadeIn, Motion, Reveal } from '@spexop/react/animations';
import { useIntersectionObserver } from '@spexop/react/animations';
```

**After (v0.3.0):**

```typescript
// ✅ Import from main package (recommended)
import { FadeIn, Motion, Reveal, useIntersectionObserver } from '@spexop/react';

// ✅ Or use explicit path
import { FadeIn } from '@spexop/react/basic/animations';
```

**Migration Steps:**

1. Search your codebase for imports from `'@spexop/react/animations'`
2. Replace with imports from `'@spexop/react'`
3. Or update relative paths from `'../animations/'` to `'../basic/animations/'`

**Find and replace:**

```bash
# Linux/Mac
find . -name "*.tsx" -o -name "*.ts" | xargs sed -i "s|from '@spexop/react/animations'|from '@spexop/react'|g"

# Or manually update each import
```

## Deprecations

### Card Component Old API

The `icon`, `title`, and `description` props on the Card component are deprecated in favor of the new sub-component API.

**Old API (deprecated but still works):**

```typescript
import { Card } from '@spexop/react';
import { Package } from '@spexop/icons';

<Card 
  icon={<Package />} 
  title="Feature Title" 
  description="Feature description"
  density="compact"
>
  Additional content
</Card>
```

**New API (recommended):**

```typescript
import { Card, CardHeader, CardBody, CardFooter } from '@spexop/react';
import { Package } from '@spexop/icons';

<Card density="compact">
  <CardHeader 
    icon={<Package />}
    title="Feature Title" 
    subtitle="Feature description"
  />
  <CardBody>
    Additional content
  </CardBody>
  <CardFooter align="right">
    {/* Footer actions */}
  </CardFooter>
</Card>
```

**Migration:**

The old API still works and shows deprecation warnings in development mode. Migrate at your own pace.

## New Features

### New Component Categories

#### Data Components

```typescript
import { DataTable, DataGrid, Chart } from '@spexop/react';

// Sortable, filterable table
<DataTable
  columns={columns}
  data={data}
  sortable
  filterable
  pagination
/>

// Advanced grid
<DataGrid
  columns={columns}
  data={largeDataset}
  virtualScroll
/>

// Charts
<Chart
  type="line"
  data={chartData}
  options={chartOptions}
/>
```

#### Feedback Components

```typescript
import { 
  Alert, 
  Spinner, 
  Progress, 
  Skeleton, 
  Toast, 
  EmptyState 
} from '@spexop/react';

// Contextual alerts
<Alert variant="success">Operation successful!</Alert>

// Loading states
<Spinner size="lg" />
<Progress value={75} max={100} />
<Skeleton count={3} />

// Empty states
<EmptyState
  icon={<Inbox />}
  title="No items found"
  description="Get started by creating a new item"
  action={<Button>Create Item</Button>}
/>
```

#### Typography Components

```typescript
import { Heading, Text, Link, Code } from '@spexop/react';

<Heading level={1} variant="display">Page Title</Heading>
<Text size="lg" weight="semibold">Introduction text</Text>
<Link href="/docs" variant="primary">Read docs</Link>
<Code>const x = 42;</Code>
```

### New Hooks (20+ added)

```typescript
// Click outside detection
const ref = useClickOutside(() => setIsOpen(false));

// Copy to clipboard
const [copied, copy] = useCopyToClipboard();

// Dark mode
const { isDark, toggle } = useDarkMode();

// Debounce/Throttle
const debouncedValue = useDebounce(value, 500);
const throttledValue = useThrottle(value, 1000);

// Storage
const [value, setValue] = useLocalStorage('key', defaultValue);
const [session, setSession] = useSessionStorage('key', defaultValue);

// Browser APIs
const position = useGeolocation();
const isOnline = useOnline();
const isVisible = usePageVisibility();
const size = useWindowSize();
const scrollPos = useScroll();

// Interaction
const isHovering = useHover(ref);
const isPressed = useLongPress(onLongPress, { delay: 500 });
const isIdle = useIdle(5000);

// URL Management
const hash = useHash();
const [params, setParams] = useQueryParams();

// Observers
const isIntersecting = useIntersectionObserver(ref, options);
const size = useResizeObserver(ref);

// Utilities
const previousValue = usePrevious(value);
const [isOn, toggle] = useToggle(false);
const prefersReducedMotion = useReducedMotion();
const hasPermission = usePermission('geolocation');
const isKeyPressed = useKeyPress('Enter');
```

### New Providers

#### AccessibilityProvider

```typescript
import { AccessibilityProvider, useAccessibility } from '@spexop/react';

<AccessibilityProvider>
  <App />
</AccessibilityProvider>

// In components
const { announce, prefersReducedMotion } = useAccessibility();
announce('Item added to cart');
```

#### ModalProvider

```typescript
import { ModalProvider, useModal } from '@spexop/react';

<ModalProvider>
  <App />
</ModalProvider>

// In components
const { openModal, closeModal } = useModal();
openModal('confirmDialog');
```

#### ToastProvider

```typescript
import { ToastProvider, useToast } from '@spexop/react';

<ToastProvider position="top-right">
  <App />
</ToastProvider>

// In components
const { showToast } = useToast();
showToast({
  title: 'Success',
  message: 'Item saved',
  variant: 'success'
});
```

### Enhanced Components

#### Carousel (New)

```typescript
import { Carousel } from '@spexop/react';

<Carousel
  items={slides}
  autoPlay
  showThumbnails
  transition="slide"
  aspectRatio={16/9}
/>
```

#### CodeBlock v3

```typescript
import { CodeBlock } from '@spexop/react';

// Multi-framework support
<CodeBlock
  code={[
    { framework: 'react', label: 'React', code: reactCode },
    { framework: 'vue', label: 'Vue 3', code: vueCode },
  ]}
  language="typescript"
  showLineNumbers
  showCopy
  title="Example"
/>
```

#### Button - New Variants

```typescript
import { Button } from '@spexop/react';

<Button variant="danger">Delete</Button>
<Button variant="success">Confirm</Button>
<Button variant="warning">Warning</Button>
<Button variant="info">Info</Button>
<Button variant="neutral">Neutral</Button>
```

## Documentation

All 59 components now include:

- **README.md** - API documentation, props, examples
- **USAGE-GUIDE.md** - Practical patterns, common use cases
- **Component.test.tsx** - Vitest tests
- **Component.types.ts** - TypeScript definitions

## Step-by-Step Migration

### 1. Update Package

```bash
npm install @spexop/react@0.3.0
# or
pnpm add @spexop/react@0.3.0
```

### 2. Fix Animation Imports

Search and replace animation imports:

```bash
# Find files with old imports
grep -r "from '@spexop/react/animations'" .

# Update them to:
# from '@spexop/react'
```

### 3. Test Your Application

```bash
npm run build
npm run test
```

### 4. Update Card Components (Optional)

Gradually migrate Card components to the new sub-component API. The old API still works.

### 5. Explore New Features

Check out the new components, hooks, and providers to enhance your application.

## Need Help?

- Check component README files for detailed documentation
- Review USAGE-GUIDE files for practical examples
- Open an issue on [GitHub](https://github.com/spexop-ui/spexop-design-system/issues)

## Development Status

Version 0.3.0 is an active development release. While components follow "The Spexop Way" design principles, the library is still evolving. APIs may change in future releases.
