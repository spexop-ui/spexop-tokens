# TextArea Component

A flexible textarea component following Spexop's design system principles.

## Features

- **Accessible**: Proper labels, ARIA attributes, and keyboard navigation
- **Themed**: Automatic light/dark theme support
- **Variants**: Default, error, and success states
- **Sizes**: Small, medium, and large variants
- **Auto-resize**: Optional automatic height adjustment
- **Validation**: Built-in error message display
- **Help Text**: Optional help text below the textarea

## Props

```tsx
interface TextAreaProps {
  label: string;                    // Required label
  id?: string;                      // Optional custom ID
  name?: string;                    // Form field name
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
  rows?: number;                    // Number of rows (default: 4)
  minRows?: number;                 // Minimum rows for auto-resize
  maxRows?: number;                 // Maximum rows for auto-resize
  autoResize?: boolean;             // Enable auto-resize
  className?: string;               // Additional CSS class
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}
```

## Usage

### Basic TextArea

```tsx
import { TextArea } from '@spexop/react';

<TextArea
  label="Message"
  placeholder="Enter your message here..."
  rows={6}
  required
/>
```

### Auto-resize TextArea

```tsx
<TextArea
  label="Description"
  placeholder="Describe your project..."
  autoResize
  minRows={3}
  maxRows={10}
/>
```

### Error State

```tsx
<TextArea
  label="Comments"
  error="Please provide more details about your request"
  required
/>
```

### Different Sizes

```tsx
<TextArea label="Small" size="sm" rows={3} />
<TextArea label="Medium" size="md" rows={4} />
<TextArea label="Large" size="lg" rows={6} />
```

### With Help Text

```tsx
<TextArea
  label="Project Details"
  helpText="Please describe your project requirements in detail"
  placeholder="Project description..."
  rows={8}
/>
```

## Auto-resize Feature

The auto-resize feature automatically adjusts the textarea height based on content:

```tsx
<TextArea
  label="Dynamic Content"
  autoResize
  minRows={2}    // Minimum 2 rows
  maxRows={8}    // Maximum 8 rows
  placeholder="Type to see auto-resize in action..."
/>
```

**How it works**:

- Calculates content height using `scrollHeight`
- Respects `minRows` and `maxRows` constraints
- Uses line-height for accurate row calculations
- Automatically removes resize handle when enabled

## Styling

The component uses CSS Modules with design tokens:

- **Borders**: 2px solid borders (following "borders before shadows" principle)
- **Focus States**: Primary color border with subtle shadow
- **Typography**: Uses design system font sizes and weights
- **Spacing**: Consistent padding and margins using spacing tokens
- **Colors**: Automatic theme adaptation
- **Resize**: Vertical resize by default (disabled with auto-resize)

## Accessibility

- **Labels**: Proper `htmlFor` association with textarea ID
- **Required Fields**: Visual asterisk indicator
- **Error Messages**: `role="alert"` for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Clear focus indicators

## Theme Support

Automatically adapts to light/dark themes:

```css
/* Light theme */
.textarea {
  background: var(--s-color-white);
  border-color: var(--s-color-neutral-200);
  color: var(--s-color-neutral-900);
}

/* Dark theme */
html[data-theme="dark"] .textarea {
  background: var(--s-color-neutral-900);
  border-color: var(--s-color-neutral-700);
  color: var(--s-color-white);
}
```

## Best Practices

**Do** ✅:

- Always provide a descriptive label
- Use appropriate `rows` for expected content length
- Provide helpful error messages
- Consider auto-resize for dynamic content
- Test with keyboard navigation

**Don't** ❌:

- Don't use placeholder text as the only label
- Don't skip error handling
- Don't use auto-resize for fixed-height requirements
- Don't forget to test in both themes

## Examples

### Contact Form

```tsx
<TextArea
  label="Message"
  name="message"
  placeholder="Tell us about your project..."
  rows={6}
  required
/>
```

### Feedback Form

```tsx
<TextArea
  label="Feedback"
  placeholder="Share your thoughts..."
  helpText="Your feedback helps us improve our service"
  autoResize
  minRows={3}
  maxRows={8}
/>
```

### Error Handling

```tsx
const [message, setMessage] = useState('');
const [error, setError] = useState('');

const validateMessage = (value: string) => {
  if (value.length < 10) {
    setError('Message must be at least 10 characters');
  } else {
    setError('');
  }
};

<TextArea
  label="Message"
  value={message}
  onChange={(e) => {
    setMessage(e.target.value);
    validateMessage(e.target.value);
  }}
  error={error}
  required
/>
```

### Auto-resize with Validation

```tsx
<TextArea
  label="Description"
  autoResize
  minRows={2}
  maxRows={10}
  helpText="Describe your project in detail (2-10 lines)"
  placeholder="Start typing..."
/>
```
