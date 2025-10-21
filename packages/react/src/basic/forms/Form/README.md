# Form Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A semantic form wrapper component with validation, loading states, error display, and full accessibility support. Handles form submission, validation feedback, and loading indicators.

## Features

- Semantic HTML form element
- Loading state with overlay
- Validation error display
- Disabled state management
- 2 variants (default, card)
- Prevents multiple submissions
- WCAG AA+ accessible
- TypeScript support
- FormData integration

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { Form, TextInput, Button } from '@spexop/react';
import { useState } from 'react';

function LoginForm() {
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (event, formData) => {
    setLoading(true);
    // Submit logic
    await submitLogin(formData);
    setLoading(false);
  };
  
  return (
    <Form onSubmit={handleSubmit} loading={loading}>
      <TextInput label="Email" type="email" name="email" required />
      <TextInput label="Password" type="password" name="password" required />
      <Button type="submit">Sign In</Button>
    </Form>
  );
}
```

## Variants

### Default

```tsx
<Form onSubmit={handleSubmit}>
  {/* form fields */}
</Form>
```

### Card

Adds card styling with border and padding.

```tsx
<Form variant="card" onSubmit={handleSubmit}>
  {/* form fields */}
</Form>
```

## Loading State

### With Loading Overlay

```tsx
<Form loading={isLoading} onSubmit={handleSubmit}>
  <TextInput label="Email" type="email" />
  <Button type="submit">Submit</Button>
</Form>
```

### Without Loading Indicator

```tsx
<Form loading={isLoading} showLoadingIndicator={false} onSubmit={handleSubmit}>
  <TextInput label="Email" type="email" />
  <Button type="submit" loading={isLoading}>Submit</Button>
</Form>
```

## Validation

### With Validation Errors

```tsx
import { Form, TextInput, Button } from '@spexop/react';
import { useState } from 'react';

function SignupForm() {
  const [validation, setValidation] = useState({
    isValid: false,
    errors: ['Password must be at least 8 characters'],
    fieldErrors: {
      email: 'Invalid email format',
      password: 'Too short',
    },
  });
  
  return (
    <Form validation={validation} onSubmit={handleSubmit}>
      <TextInput 
        label="Email" 
        type="email" 
        error={validation.fieldErrors.email}
      />
      <TextInput 
        label="Password" 
        type="password" 
        error={validation.fieldErrors.password}
      />
      <Button type="submit">Sign Up</Button>
    </Form>
  );
}
```

## Disabled State

```tsx
<Form disabled onSubmit={handleSubmit}>
  <TextInput label="Email" type="email" />
  <Button type="submit">Submit</Button>
</Form>
```

## Advanced Usage

### With FormData Access

```tsx
const handleSubmit = async (event, formData) => {
  const email = formData.get('email');
  const password = formData.get('password');
  
  console.log({ email, password });
  
  // Submit to API
  await fetch('/api/login', {
    method: 'POST',
    body: formData,
  });
};

<Form onSubmit={handleSubmit}>
  <TextInput label="Email" type="email" name="email" />
  <TextInput label="Password" type="password" name="password" />
  <Button type="submit">Submit</Button>
</Form>
```

### With Custom Validation

```tsx
import { useState } from 'react';

function ContactForm() {
  const [validation, setValidation] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (event, formData) => {
    setLoading(true);
    
    // Client-side validation
    const email = formData.get('email');
    if (!email || !email.includes('@')) {
      setValidation({
        isValid: false,
        errors: ['Please provide a valid email address'],
        fieldErrors: { email: 'Invalid email format' },
      });
      setLoading(false);
      return;
    }
    
    // Submit
    try {
      await submitContact(formData);
      setValidation({ isValid: true, errors: [], fieldErrors: {} });
    } catch (error) {
      setValidation({
        isValid: false,
        errors: ['Failed to submit form'],
        fieldErrors: {},
      });
    }
    
    setLoading(false);
  };
  
  return (
    <Form 
      variant="card"
      onSubmit={handleSubmit} 
      loading={loading}
      validation={validation}
    >
      <TextInput label="Email" type="email" name="email" required />
      <TextArea label="Message" name="message" required />
      <Button type="submit">Send Message</Button>
    </Form>
  );
}
```

## Design Principles

### Borders before shadows

Card variant uses clean 2px border instead of heavy shadows.

### Standards before frameworks

Uses native HTML form element with proper semantic structure.

### Accessibility before aesthetics

Form errors use ARIA live regions, disabled state uses fieldset, and loading state is announced to screen readers.

## Accessibility

### Form Labels

```tsx
<Form aria-label="Login form" onSubmit={handleSubmit}>
  <TextInput label="Email" type="email" />
  <Button type="submit">Submit</Button>
</Form>
```

### Error Announcements

Errors are automatically announced with `role="alert"` and `aria-live="polite"`.

### Loading State (aria-busy="true")

Loading overlay uses `aria-busy="true"` and `role="status"`.

### Disabled State (fieldset disabled)

Uses `<fieldset disabled>` to properly disable all form controls.

## API Reference

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | required | Form content |
| `onSubmit` | `function` | - | Submit handler |
| `action` | `string` | - | Form action URL |
| `method` | `string` | `"post"` | HTTP method |
| `loading` | `boolean` | `false` | Loading state |
| `disabled` | `boolean` | `false` | Disabled state |
| `validation` | `object` | - | Validation state |
| `showLoadingIndicator` | `boolean` | `true` | Show loading overlay |
| `variant` | `FormVariant` | `"default"` | Form styling |
| `className` | `string` | - | Additional CSS class |
| `id` | `string` | - | Form ID |
| `noValidate` | `boolean` | `false` | Skip browser validation |
| `aria-label` | `string` | - | ARIA label |

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari (last 2 versions)
- Chrome Android (last 2 versions)

## Related Components

- TextInput - Text input fields
- TextArea - Multi-line text input
- Checkbox - Checkbox input
- Select - Select dropdown
- Button - Submit buttons

## Best Practices

### Do's

- Use semantic field names
- Provide clear error messages
- Show loading state during submission
- Use validation prop for errors
- Add aria-label for complex forms

### Don'ts

- Don't allow multiple submissions
- Don't forget to prevent default
- Don't skip error feedback
- Don't use div instead of form

## License

MIT © Spexop Team
