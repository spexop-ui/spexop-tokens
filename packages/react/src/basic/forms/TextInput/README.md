# TextInput Component

A flexible text input component following Spexop's design system principles.

## Features

- **Accessible**: Proper labels, ARIA attributes, and keyboard navigation
- **Themed**: Automatic light/dark theme support
- **Variants**: Default, error, and success states
- **Sizes**: Small, medium, and large variants
- **Icons**: Support for left and right icons
- **Validation**: Built-in error message display
- **Help Text**: Optional help text below the input

## Props

```tsx
interface TextInputProps {
  label: string;                    // Required label
  id?: string;                      // Optional custom ID
  name?: string;                    // Form field name
  type?: "text" | "email" | "password" | "tel" | "url" | "search";
  value?: string;                   // Controlled value
  defaultValue?: string;            // Uncontrolled default value
  placeholder?: string;             // Placeholder text
  required?: boolean;               // Required field indicator
  disabled?: boolean;               // Disabled state
  readOnly?: boolean;               // Read-only state
  size?: "sm" | "md" | "lg";       // Size variant
  variant?: "default" | "error" | "success"; // Visual variant
  error?: string;                   // Error message
  helpText?: string;                // Help text
  leftIcon?: ReactNode;             // Left side icon
  rightIcon?: ReactNode;            // Right side icon
  className?: string;               // Additional CSS class
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
```

## Usage

### Basic Input

```tsx
import { TextInput } from '@spexop/react';

<TextInput
  label="Email Address"
  type="email"
  placeholder="your@email.com"
  required
/>
```

### With Icons

```tsx
import { TextInput } from '@spexop/react';
import { Mail, Search } from '@spexop/icons';

<TextInput
  label="Search"
  placeholder="Search products..."
  leftIcon={<Search size={20} />}
  rightIcon={<Mail size={20} />}
/>
```

### Error State

```tsx
<TextInput
  label="Password"
  type="password"
  error="Password must be at least 8 characters"
  required
/>
```

### Different Sizes

```tsx
<TextInput label="Small" size="sm" />
<TextInput label="Medium" size="md" />
<TextInput label="Large" size="lg" />
```

### With Help Text

```tsx
<TextInput
  label="Username"
  helpText="Choose a unique username for your account"
  placeholder="johndoe"
/>
```

## Styling

The component uses CSS Modules with design tokens:

- **Borders**: 2px solid borders (following "borders before shadows" principle)
- **Focus States**: Primary color border with subtle shadow
- **Typography**: Uses design system font sizes and weights
- **Spacing**: Consistent padding and margins using spacing tokens
- **Colors**: Automatic theme adaptation

## Accessibility

- **Labels**: Proper `htmlFor` association with input ID
- **Required Fields**: Visual asterisk indicator
- **Error Messages**: `role="alert"` for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Clear focus indicators

## Theme Support

Automatically adapts to light/dark themes:

```css
/* Light theme */
.input {
  background: var(--s-color-white);
  border-color: var(--s-color-neutral-200);
  color: var(--s-color-neutral-900);
}

/* Dark theme */
html[data-theme="dark"] .input {
  background: var(--s-color-neutral-900);
  border-color: var(--s-color-neutral-700);
  color: var(--s-color-white);
}
```

## Best Practices

**Do** ✅:

- Always provide a descriptive label
- Use appropriate input types (email, password, etc.)
- Provide helpful error messages
- Use icons sparingly and meaningfully
- Test with keyboard navigation

**Don't** ❌:

- Don't use placeholder text as the only label
- Don't skip error handling
- Don't use too many icons
- Don't forget to test in both themes

## Examples

### Contact Form

```tsx
<Grid columns={{ xs: 1, md: 2 }} gap={4}>
  <TextInput
    label="First Name"
    name="firstName"
    required
    placeholder="John"
  />
  <TextInput
    label="Last Name"
    name="lastName"
    required
    placeholder="Doe"
  />
</Grid>
```

### Search with Icon

```tsx
<TextInput
  label="Search"
  placeholder="Search products..."
  leftIcon={<Search size={20} />}
  type="search"
/>
```

### Password with Validation

```tsx
<TextInput
  label="Password"
  type="password"
  required
  error={passwordError}
  helpText="Must be at least 8 characters with numbers and symbols"
/>
```
