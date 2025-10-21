# RadioGroup Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

An accessible radio button group component for single-select options. Features clean design, keyboard navigation, and full ARIA support.

## Features

- ✅ Single selection from multiple options
- ✅ Vertical and horizontal layouts
- ✅ Label and helper text support
- ✅ Error state with validation
- ✅ Disabled state (group or individual options)
- ✅ Keyboard navigation (Arrow keys)
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
import { RadioGroup } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [value, setValue] = useState('option1');
  
  return (
    <RadioGroup
      label="Choose an option"
      value={value}
      onChange={setValue}
      options={[
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
      ]}
    />
  );
}
```

## Layouts

### Vertical (Default)

```tsx
<RadioGroup
  label="Delivery Method"
  value={deliveryMethod}
  onChange={setDeliveryMethod}
  direction="vertical"
  options={[
    { value: 'standard', label: 'Standard Shipping' },
    { value: 'express', label: 'Express Shipping' },
    { value: 'overnight', label: 'Overnight Shipping' },
  ]}
/>
```

### Horizontal

```tsx
<RadioGroup
  label="Size"
  value={size}
  onChange={setSize}
  direction="horizontal"
  options={[
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
  ]}
/>
```

## States

### With Helper Text

```tsx
<RadioGroup
  label="Payment Method"
  helperText="Choose how you'd like to pay"
  value={paymentMethod}
  onChange={setPaymentMethod}
  options={[
    { value: 'card', label: 'Credit Card' },
    { value: 'paypal', label: 'PayPal' },
    { value: 'bank', label: 'Bank Transfer' },
  ]}
/>
```

### Error State

```tsx
<RadioGroup
  label="Subscription Plan"
  value={plan}
  onChange={setPlan}
  error="Please select a plan to continue"
  options={[
    { value: 'basic', label: 'Basic' },
    { value: 'pro', label: 'Pro' },
    { value: 'enterprise', label: 'Enterprise' },
  ]}
/>
```

### Disabled Group

```tsx
<RadioGroup
  label="Unavailable Options"
  value={value}
  onChange={setValue}
  disabled={true}
  options={[
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ]}
/>
```

### Individual Disabled Options

```tsx
<RadioGroup
  label="Plan Selection"
  value={plan}
  onChange={setPlan}
  options={[
    { value: 'free', label: 'Free Plan' },
    { value: 'pro', label: 'Pro Plan' },
    { value: 'enterprise', label: 'Enterprise Plan', disabled: true },
  ]}
/>
```

## With Descriptions

```tsx
<RadioGroup
  label="Billing Frequency"
  value={frequency}
  onChange={setFrequency}
  options={[
    { 
      value: 'monthly',
      label: 'Monthly',
      description: '$29/month - Billed monthly'
    },
    { 
      value: 'annual',
      label: 'Annual',
      description: '$290/year - Save 17%'
    },
  ]}
/>
```

## Common Patterns

### Form Integration

```tsx
function ShippingForm() {
  const [formData, setFormData] = useState({
    shipping: 'standard',
    gift: 'no',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    const newErrors = {};
    if (!formData.shipping) {
      newErrors.shipping = 'Please select a shipping method';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    // Submit form
  };

  return (
    <form onSubmit={handleSubmit}>
      <RadioGroup
        label="Shipping Method"
        value={formData.shipping}
        onChange={(value) =>
          setFormData({ ...formData, shipping: value })
        }
        error={errors.shipping}
        options={[
          { 
            value: 'standard',
            label: 'Standard',
            description: '5-7 business days - Free'
          },
          { 
            value: 'express',
            label: 'Express',
            description: '2-3 business days - $9.99'
          },
          { 
            value: 'overnight',
            label: 'Overnight',
            description: 'Next business day - $24.99'
          },
        ]}
      />
      
      <RadioGroup
        label="Is this a gift?"
        value={formData.gift}
        onChange={(value) =>
          setFormData({ ...formData, gift: value })
        }
        direction="horizontal"
        options={[
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ]}
      />
      
      <button type="submit">Continue</button>
    </form>
  );
}
```

### Settings Panel

```tsx
function SettingsPanel() {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState('all');

  return (
    <Stack direction="vertical" gap={6}>
      <RadioGroup
        label="Theme"
        value={theme}
        onChange={setTheme}
        options={[
          { value: 'light', label: 'Light' },
          { value: 'dark', label: 'Dark' },
          { value: 'auto', label: 'System' },
        ]}
      />
      
      <RadioGroup
        label="Notifications"
        value={notifications}
        onChange={setNotifications}
        options={[
          { value: 'all', label: 'All notifications' },
          { value: 'important', label: 'Important only' },
          { value: 'none', label: 'None' },
        ]}
      />
    </Stack>
  );
}
```

### Survey Question

```tsx
function SurveyQuestion() {
  const [rating, setRating] = useState('');

  return (
    <RadioGroup
      label="How satisfied are you with our service?"
      value={rating}
      onChange={setRating}
      direction="horizontal"
      options={[
        { value: '1', label: '1 - Very Unsatisfied' },
        { value: '2', label: '2' },
        { value: '3', label: '3 - Neutral' },
        { value: '4', label: '4' },
        { value: '5', label: '5 - Very Satisfied' },
      ]}
    />
  );
}
```

## Props

```typescript
interface RadioGroupProps {
  /** Group label */
  label?: string;
  /** Current selected value */
  value: string;
  /** Change handler */
  onChange: (value: string) => void;
  /** Radio options */
  options: RadioOption[];
  /** Layout direction */
  direction?: "vertical" | "horizontal";
  /** Helper text */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Custom className */
  className?: string;
  /** ID for the group */
  id?: string;
  /** Name for the radio inputs */
  name?: string;
}

interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean radio button design
2. **Typography before decoration** - Clear labels
3. **Tokens before magic numbers** - Uses design tokens
4. **Accessibility before aesthetics** - Full ARIA and keyboard support

## Accessibility

- ✅ ARIA role="radiogroup"
- ✅ Proper radio button pattern
- ✅ Keyboard navigation (Arrow keys, Space)
- ✅ Focus management
- ✅ Screen reader announcements
- ✅ Disabled state indication
- ✅ Error state announcements
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `Arrow Up/Down` - Navigate options (vertical)
- `Arrow Left/Right` - Navigate options (horizontal)
- `Space` - Select focused option
- `Tab` - Move to next form field
- `Shift + Tab` - Move to previous field

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Checkbox` - Multi-select options
- `Select` - Dropdown selection
- `SegmentedButton` - Visual radio alternative
- `Toggle` - Binary on/off

## Best Practices

1. **Use for 2-7 options** - Too many options? Use Select instead
2. **Provide labels** - Always include label for the group
3. **Clear option text** - Keep labels short and descriptive
4. **Use descriptions sparingly** - Only when needed for clarity
5. **Horizontal for few options** - 2-3 options work well horizontally

## License

MIT
