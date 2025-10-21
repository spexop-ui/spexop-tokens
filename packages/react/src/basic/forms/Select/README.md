# Select Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

An accessible select dropdown component with custom styling, multiple sizes, states, and full keyboard navigation support.

## Features

- ✅ 3 sizes (sm, md, lg)
- ✅ Error and disabled states
- ✅ Optional label and helper text
- ✅ Full keyboard navigation
- ✅ WCAG AA+ accessible
- ✅ Design token integration
- ✅ Custom styling support
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { Select } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  
  return (
    <Select
      label="Country"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
    </Select>
  );
}
```

## Sizes

### Small (sm)

Compact select for dense layouts.

```tsx
<Select
  size="sm"
  label="Size"
  value={value}
  onChange={handleChange}
>
  <option value="xs">Extra Small</option>
  <option value="sm">Small</option>
  <option value="md">Medium</option>
</Select>
```

### Medium (md) - Default

Standard select size.

```tsx
<Select
  size="md"
  label="Category"
  value={category}
  onChange={handleChange}
>
  <option value="">Choose category</option>
  <option value="tech">Technology</option>
  <option value="design">Design</option>
</Select>
```

### Large (lg)

Larger select for emphasis.

```tsx
<Select
  size="lg"
  label="Priority"
  value={priority}
  onChange={handleChange}
>
  <option value="low">Low</option>
  <option value="medium">Medium</option>
  <option value="high">High</option>
</Select>
```

## States

### With Label

```tsx
<Select
  label="Language"
  value={language}
  onChange={setLanguage}
>
  <option value="en">English</option>
  <option value="es">Spanish</option>
  <option value="fr">French</option>
</Select>
```

### With Helper Text

```tsx
<Select
  label="Theme"
  helperText="Choose your preferred color theme"
  value={theme}
  onChange={setTheme}
>
  <option value="light">Light</option>
  <option value="dark">Dark</option>
  <option value="auto">Auto</option>
</Select>
```

### Error State

```tsx
<Select
  label="Required Field"
  error="Please select an option"
  value={value}
  onChange={setValue}
>
  <option value="">Select...</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</Select>
```

### Disabled State

```tsx
<Select
  label="Disabled Select"
  disabled={true}
  value={value}
  onChange={setValue}
>
  <option value="">Not available</option>
</Select>
```

## Common Patterns

### Form Integration

```tsx
function ProfileForm() {
  const [formData, setFormData] = useState({
    country: '',
    timezone: '',
    language: 'en',
  });

  return (
    <form>
      <Select
        label="Country"
        value={formData.country}
        onChange={(e) =>
          setFormData({ ...formData, country: e.target.value })
        }
        error={!formData.country ? 'Country is required' : ''}
      >
        <option value="">Select country</option>
        <option value="us">United States</option>
        <option value="uk">United Kingdom</option>
        <option value="ca">Canada</option>
      </Select>

      <Select
        label="Timezone"
        value={formData.timezone}
        onChange={(e) =>
          setFormData({ ...formData, timezone: e.target.value })
        }
      >
        <option value="">Select timezone</option>
        <option value="pst">Pacific Time</option>
        <option value="est">Eastern Time</option>
        <option value="gmt">GMT</option>
      </Select>
    </form>
  );
}
```

### Grouped Options

```tsx
<Select label="Food" value={food} onChange={setFood}>
  <optgroup label="Fruits">
    <option value="apple">Apple</option>
    <option value="banana">Banana</option>
    <option value="orange">Orange</option>
  </optgroup>
  <optgroup label="Vegetables">
    <option value="carrot">Carrot</option>
    <option value="broccoli">Broccoli</option>
    <option value="spinach">Spinach</option>
  </optgroup>
</Select>
```

### Dynamic Options

```tsx
function CountrySelect() {
  const [value, setValue] = useState('');
  const countries = useFetchCountries();

  return (
    <Select
      label="Country"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    >
      <option value="">Select a country</option>
      {countries.map((country) => (
        <option key={country.code} value={country.code}>
          {country.name}
        </option>
      ))}
    </Select>
  );
}
```

## Props

```typescript
interface SelectProps {
  children: React.ReactNode;
  label?: string;
  helperText?: string;
  error?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean 2px border design
2. **Typography before decoration** - Clear, readable options
3. **Tokens before magic numbers** - Uses design tokens
4. **Accessibility before aesthetics** - Full ARIA and keyboard support

## Accessibility

- ✅ Semantic HTML (`<select>` element)
- ✅ Proper label association
- ✅ Keyboard navigation (Arrow keys, Enter, Escape)
- ✅ Screen reader support
- ✅ Focus indicators
- ✅ Error state announcements
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `Arrow Up/Down` - Navigate options
- `Enter/Space` - Select option
- `Escape` - Close dropdown
- `Home` - First option
- `End` - Last option
- `Tab` - Move to next field

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `TextInput` - Text input field
- `Checkbox` - Multi-select options
- `RadioGroup` - Single-select buttons
- `SearchBar` - Search with autocomplete

## License

MIT
