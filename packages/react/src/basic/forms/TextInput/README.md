# TextInput Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A versatile text input component with label, helper text, error states, and various input types. Features clean border-based design with full accessibility support.

## Features

- ✅ Multiple input types (text, email, password, number, tel, url)
- ✅ 3 sizes (sm, md, lg)
- ✅ Label and helper text
- ✅ Error state with validation
- ✅ Disabled and read-only states
- ✅ Prefix and suffix support
- ✅ Character count
- ✅ WCAG AA+ accessible
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { TextInput } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  
  return (
    <TextInput
      label="Full Name"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter your name"
    />
  );
}
```

## Sizes

### Small (sm)

Compact input for dense layouts.

```tsx
<TextInput
  size="sm"
  label="Username"
  value={username}
  onChange={handleChange}
/>
```

### Medium (md) - Default

Standard input size.

```tsx
<TextInput
  size="md"
  label="Email"
  type="email"
  value={email}
  onChange={handleChange}
/>
```

### Large (lg)

Larger input for emphasis.

```tsx
<TextInput
  size="lg"
  label="Search"
  value={query}
  onChange={handleChange}
/>
```

## Input Types

### Text (Default)

```tsx
<TextInput
  type="text"
  label="Name"
  value={name}
  onChange={handleChange}
/>
```

### Email

```tsx
<TextInput
  type="email"
  label="Email Address"
  value={email}
  onChange={handleChange}
  placeholder="you@example.com"
/>
```

### Password

```tsx
<TextInput
  type="password"
  label="Password"
  value={password}
  onChange={handleChange}
/>
```

### Number

```tsx
<TextInput
  type="number"
  label="Age"
  value={age}
  onChange={handleChange}
  min={18}
  max={120}
/>
```

### Telephone

```tsx
<TextInput
  type="tel"
  label="Phone Number"
  value={phone}
  onChange={handleChange}
  placeholder="+1 (555) 123-4567"
/>
```

### URL

```tsx
<TextInput
  type="url"
  label="Website"
  value={website}
  onChange={handleChange}
  placeholder="https://example.com"
/>
```

## States

### With Label and Helper Text

```tsx
<TextInput
  label="Username"
  helperText="Choose a unique username (3-20 characters)"
  value={username}
  onChange={setUsername}
/>
```

### Error State

```tsx
<TextInput
  label="Email"
  value={email}
  onChange={setEmail}
  error="Please enter a valid email address"
/>
```

### Disabled

```tsx
<TextInput
  label="Account ID"
  value={accountId}
  onChange={handleChange}
  disabled={true}
/>
```

### Read-Only

```tsx
<TextInput
  label="Generated Code"
  value={code}
  readOnly={true}
/>
```

### Required

```tsx
<TextInput
  label="Company Name"
  value={company}
  onChange={setCompany}
  required={true}
/>
```

## Prefix and Suffix

### With Prefix

```tsx
<TextInput
  label="Website"
  value={domain}
  onChange={setDomain}
  prefix="https://"
  placeholder="example.com"
/>
```

### With Suffix

```tsx
<TextInput
  label="Price"
  value={price}
  onChange={setPrice}
  type="number"
  suffix="USD"
/>
```

### Both Prefix and Suffix

```tsx
<TextInput
  label="Discount"
  value={discount}
  onChange={setDiscount}
  type="number"
  prefix="Save"
  suffix="%"
/>
```

## Character Count

```tsx
<TextInput
  label="Bio"
  value={bio}
  onChange={setBio}
  maxLength={160}
  showCount={true}
  helperText="Brief description about yourself"
/>
```

## Common Patterns

### Login Form

```tsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
        required
      />
      
      <TextInput
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
        required
      />
      
      <button type="submit">Sign In</button>
    </form>
  );
}
```

### Profile Form

```tsx
function ProfileForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    website: '',
  });

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  return (
    <Stack direction="vertical" gap={4}>
      <TextInput
        label="First Name"
        value={formData.firstName}
        onChange={handleChange('firstName')}
        required
      />
      
      <TextInput
        label="Last Name"
        value={formData.lastName}
        onChange={handleChange('lastName')}
        required
      />
      
      <TextInput
        type="email"
        label="Email"
        value={formData.email}
        onChange={handleChange('email')}
        required
      />
      
      <TextInput
        type="tel"
        label="Phone"
        value={formData.phone}
        onChange={handleChange('phone')}
        helperText="Optional"
      />
      
      <TextInput
        type="url"
        label="Website"
        value={formData.website}
        onChange={handleChange('website')}
        prefix="https://"
        helperText="Optional"
      />
    </Stack>
  );
}
```

### Search with Debounce

```tsx
function SearchInput() {
  const [value, setValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    if (debouncedValue) {
      // Perform search
      console.log('Searching for:', debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <TextInput
      label="Search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Type to search..."
      prefix="🔍"
    />
  );
}
```

## Props

```typescript
interface TextInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  helperText?: string;
  error?: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  size?: "sm" | "md" | "lg";
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  prefix?: string | React.ReactNode;
  suffix?: string | React.ReactNode;
  maxLength?: number;
  showCount?: boolean;
  className?: string;
  id?: string;
  name?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  min?: number;
  max?: number;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean 2px border design
2. **Typography before decoration** - Clear, readable text
3. **Tokens before magic numbers** - Uses design tokens
4. **Accessibility before aesthetics** - Full keyboard and screen reader support

## Accessibility

- ✅ Semantic HTML with proper labels
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus indicators
- ✅ Error announcements
- ✅ Required field indication
- ✅ Autocomplete support
- ✅ WCAG AA+ compliant

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `TextArea` - Multi-line text input
- `Select` - Dropdown selection
- `SearchBar` - Search-specific input
- `Checkbox` - Boolean input

## License

MIT
