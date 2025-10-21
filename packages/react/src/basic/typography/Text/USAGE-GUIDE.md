# Text Component - Usage Guide

## Common Patterns

### Article Body Text

```tsx
import { Stack, Heading, Text } from '@spexop/react';

function Article() {
  return (
    <article>
      <Stack direction="vertical" gap="md">
        <Heading level={1} weight="bold">
          Article Title
        </Heading>
        
        <Text size="lg" weight="regular">
          Introduction paragraph with slightly larger text for emphasis.
        </Text>
        
        <Text weight="regular">
          Regular body paragraph text. Lorem ipsum dolor sit amet, 
          consectetur adipiscing elit.
        </Text>
        
        <Text weight="regular">
          Another paragraph with regular body text.
        </Text>
      </Stack>
    </article>
  );
}
```

### Form Helper Text

```tsx
import { Stack, TextInput, Text } from '@spexop/react';

function FormField() {
  return (
    <Stack direction="vertical" gap="xs">
      <TextInput 
        label="Email" 
        type="email"
        placeholder="you@example.com"
      />
      <Text size="sm" variant="secondary" noMargin>
        We'll never share your email with anyone else.
      </Text>
    </Stack>
  );
}
```

### Error Messages

```tsx
import { Stack, TextInput, Text } from '@spexop/react';

function FormWithError() {
  const [error, setError] = useState('Please enter a valid email');
  
  return (
    <Stack direction="vertical" gap="xs">
      <TextInput 
        label="Email" 
        type="email"
        error={error}
      />
      <Text 
        size="sm" 
        variant="error" 
        aria-live="polite"
        id="email-error"
      >
        {error}
      </Text>
    </Stack>
  );
}
```

### Card Descriptions

```tsx
import { Card, Stack, Heading, Text, Icon } from '@spexop/react';

function FeatureCard() {
  return (
    <Card padding="md">
      <Stack direction="vertical" gap="sm">
        <Icon name="Palette" size="lg" />
        <Heading level={3} weight="semibold">
          Theme Customization
        </Heading>
        <Text weight="regular">
          Fully customizable themes with your brand colors and typography
        </Text>
      </Stack>
    </Card>
  );
}
```

### Metadata Display

```tsx
import { Stack, Heading, Text } from '@spexop/react';

function BlogPost() {
  return (
    <Stack direction="vertical" gap="sm">
      <Heading level={1} weight="bold">
        Blog Post Title
      </Heading>
      <Text size="sm" variant="secondary" noMargin>
        Published on October 21, 2025 · 5 min read · By Jane Doe
      </Text>
    </Stack>
  );
}
```

### Truncated Card Content

```tsx
import { Card, Stack, Heading, Text } from '@spexop/react';

function ProductCard() {
  return (
    <Card padding="md">
      <Stack direction="vertical" gap="xs">
        <Heading level={3} weight="semibold" truncate>
          Very Long Product Name That Might Overflow
        </Heading>
        <Text clamp={2} size="sm">
          This is a long description that will be clamped to 2 lines
          and show an ellipsis if it's too long to fit in the available space.
        </Text>
      </Stack>
    </Card>
  );
}
```

### Status Messages

```tsx
import { Alert, Text } from '@spexop/react';

function StatusAlert() {
  return (
    <>
      <Text variant="success" aria-live="polite">
        ✓ Changes saved successfully
      </Text>
      
      <Text variant="error" aria-live="assertive">
        ✗ Failed to save changes
      </Text>
      
      <Text variant="warning" aria-live="polite">
        ⚠ Unsaved changes
      </Text>
    </>
  );
}
```

### Inline Text with Links

```tsx
import { Text, Link } from '@spexop/react';

function InlineText() {
  return (
    <Text>
      Check out our{' '}
      <Link href="/docs" variant="text">
        comprehensive documentation
      </Link>
      {' '}to learn more.
    </Text>
  );
}
```

### Pricing Display

```tsx
import { Stack, Text } from '@spexop/react';

function PriceDisplay() {
  return (
    <Stack direction="horizontal" gap="xs" align="baseline">
      <Text size="3xl" weight="bold" noMargin>
        $29
      </Text>
      <Text size="base" weight="regular" variant="secondary">
        /month
      </Text>
    </Stack>
  );
}
```

## Design Token Usage

```css
/* Sizes */
xs: var(--theme-font-size-xs)      /* 12px */
sm: var(--theme-font-size-sm)      /* 14px */
base: var(--theme-font-size-base)  /* 16px */
lg: var(--theme-font-size-lg)      /* 18px */
xl: var(--theme-font-size-xl)      /* 20px */
2xl: var(--theme-font-size-2xl)    /* 24px */
3xl: var(--theme-font-size-3xl)    /* 30px */
4xl: var(--theme-font-size-4xl)    /* 36px */

/* Weights */
regular: var(--theme-font-weight-regular)   /* 400 */
semibold: var(--theme-font-weight-semibold) /* 600 */
bold: var(--theme-font-weight-bold)         /* 700 */

/* Colors */
default: var(--theme-text)
secondary: var(--theme-text-secondary)
success: var(--theme-success)
error: var(--theme-error)
warning: var(--theme-warning)
```

## Accessibility

### Live Regions

```tsx
// Polite announcements (wait for user to finish)
<Text aria-live="polite" variant="success">
  Settings saved
</Text>

// Assertive announcements (interrupt immediately)
<Text aria-live="assertive" variant="error">
  Critical error occurred
</Text>
```

### Descriptive Labels

```tsx
<Text aria-label="User count">
  1,234 users
</Text>
```

## Performance

- CSS Modules for scoped styling
- Zero runtime overhead
- Tree-shakeable
- Minimal bundle impact (~1KB)

## Related

- Heading - For semantic headings
- Link - For navigation links
- Badge - For status labels
