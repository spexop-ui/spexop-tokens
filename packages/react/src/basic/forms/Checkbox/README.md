# Checkbox Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

An accessible checkbox component with label support, indeterminate state, and full keyboard navigation. Features clean border-based design following "The Spexop Way".

## Features

- ✅ Checked, unchecked, and indeterminate states
- ✅ Label and helper text support
- ✅ Disabled state
- ✅ Error state with validation
- ✅ Keyboard navigation (Space to toggle)
- ✅ WCAG AA+ accessible
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
import { Checkbox } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [checked, setChecked] = useState(false);
  
  return (
    <Checkbox
      checked={checked}
      onChange={setChecked}
      label="Accept terms and conditions"
    />
  );
}
```

## States

### Checked

```tsx
<Checkbox
  checked={true}
  onChange={handleChange}
  label="Enabled feature"
/>
```

### Unchecked

```tsx
<Checkbox
  checked={false}
  onChange={handleChange}
  label="Disabled feature"
/>
```

### Indeterminate

Used when some but not all child items are selected.

```tsx
<Checkbox
  checked={false}
  indeterminate={true}
  onChange={handleChange}
  label="Select all"
/>
```

### Disabled

```tsx
<Checkbox
  checked={true}
  disabled={true}
  onChange={handleChange}
  label="Cannot change"
/>
```

### Error State

```tsx
<Checkbox
  checked={false}
  onChange={handleChange}
  label="Required agreement"
  error="You must accept to continue"
/>
```

### With Helper Text

```tsx
<Checkbox
  checked={emailNotifications}
  onChange={setEmailNotifications}
  label="Email notifications"
  helperText="Receive updates about your account via email"
/>
```

## Common Patterns

### Form Integration

```tsx
function SignupForm() {
  const [formData, setFormData] = useState({
    terms: false,
    newsletter: false,
    privacy: false,
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    if (!formData.terms || !formData.privacy) {
      setErrors({
        terms: !formData.terms ? 'Required' : '',
        privacy: !formData.privacy ? 'Required' : '',
      });
      return;
    }
    // Submit form
  };

  return (
    <form onSubmit={handleSubmit}>
      <Checkbox
        checked={formData.terms}
        onChange={(checked) =>
          setFormData({ ...formData, terms: checked })
        }
        label="I accept the terms and conditions"
        error={errors.terms}
      />
      
      <Checkbox
        checked={formData.privacy}
        onChange={(checked) =>
          setFormData({ ...formData, privacy: checked })
        }
        label="I agree to the privacy policy"
        error={errors.privacy}
      />
      
      <Checkbox
        checked={formData.newsletter}
        onChange={(checked) =>
          setFormData({ ...formData, newsletter: checked })
        }
        label="Send me promotional emails"
        helperText="Optional - you can unsubscribe anytime"
      />
      
      <button type="submit">Sign Up</button>
    </form>
  );
}
```

### Select All with Indeterminate

```tsx
function ItemList() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', selected: false },
    { id: 2, name: 'Item 2', selected: true },
    { id: 3, name: 'Item 3', selected: false },
  ]);

  const allSelected = items.every(item => item.selected);
  const someSelected = items.some(item => item.selected) && !allSelected;

  const handleSelectAll = (checked) => {
    setItems(items.map(item => ({ ...item, selected: checked })));
  };

  const handleSelectItem = (id, checked) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, selected: checked } : item
    ));
  };

  return (
    <div>
      <Checkbox
        checked={allSelected}
        indeterminate={someSelected}
        onChange={handleSelectAll}
        label="Select all items"
      />
      
      <div style={{ marginLeft: '24px' }}>
        {items.map(item => (
          <Checkbox
            key={item.id}
            checked={item.selected}
            onChange={(checked) => handleSelectItem(item.id, checked)}
            label={item.name}
          />
        ))}
      </div>
    </div>
  );
}
```

### Checkbox Group

```tsx
function PreferencesForm() {
  const [preferences, setPreferences] = useState({
    email: true,
    sms: false,
    push: true,
    newsletter: false,
  });

  return (
    <Stack direction="vertical" gap={3}>
      <h3>Notification Preferences</h3>
      
      <Checkbox
        checked={preferences.email}
        onChange={(checked) =>
          setPreferences({ ...preferences, email: checked })
        }
        label="Email notifications"
      />
      
      <Checkbox
        checked={preferences.sms}
        onChange={(checked) =>
          setPreferences({ ...preferences, sms: checked })
        }
        label="SMS notifications"
      />
      
      <Checkbox
        checked={preferences.push}
        onChange={(checked) =>
          setPreferences({ ...preferences, push: checked })
        }
        label="Push notifications"
      />
      
      <Checkbox
        checked={preferences.newsletter}
        onChange={(checked) =>
          setPreferences({ ...preferences, newsletter: checked })
        }
        label="Weekly newsletter"
      />
    </Stack>
  );
}
```

## Props

```typescript
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  helperText?: string;
  error?: string;
  disabled?: boolean;
  indeterminate?: boolean;
  className?: string;
  id?: string;
  name?: string;
  value?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean 2px border design
2. **Typography before decoration** - Clear label text
3. **Tokens before magic numbers** - Uses design tokens
4. **Accessibility before aesthetics** - Full keyboard and screen reader support

## Accessibility

- ✅ Semantic HTML with proper ARIA roles
- ✅ Keyboard navigation (Space to toggle)
- ✅ Screen reader announcements
- ✅ Focus indicators
- ✅ Label association
- ✅ Error state announcements
- ✅ Indeterminate state properly communicated
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `Space` - Toggle checkbox
- `Tab` - Move to next checkbox
- `Shift + Tab` - Move to previous checkbox

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `RadioGroup` - Single-select options
- `Toggle` - On/off switch
- `Select` - Dropdown selection
- `TextInput` - Text entry

## License

MIT
