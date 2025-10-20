# RadioGroup

Radio button group component for mutually exclusive selections. Perfect for 2-5 visible options with descriptions. Built with accessibility and keyboard navigation.

## Installation

```bash
npm install @spexop/react
```

## Import

```typescript
import { RadioGroup } from '@spexop/react';
import type { RadioOption } from '@spexop/react';
```

## Basic Usage

```tsx
import { useState } from 'react';
import { RadioGroup } from '@spexop/react';

function MyComponent() {
  const [selected, setSelected] = useState('option1');
  
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ];
  
  return (
    <RadioGroup
      value={selected}
      onChange={setSelected}
      options={options}
      aria-label="Select an option"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | **Required** | Currently selected value |
| `onChange` | `(value: string) => void` | **Required** | Change handler callback |
| `options` | `RadioOption[]` | **Required** | Array of radio options |
| `disabled` | `boolean` | `false` | Disable entire group |
| `density` | `"compact"` \| `"normal"` \| `"spacious"` | `"normal"` | Spacing density |
| `className` | `string` | `""` | Additional CSS class |
| `id` | `string` | auto-generated | HTML id attribute |
| `aria-label` | `string` | `undefined` | ARIA label for accessibility |
| `aria-labelledby` | `string` | `undefined` | ARIA labelledby reference |

### RadioOption Type

```typescript
interface RadioOption {
  value: string;          // Unique value identifier
  label: string;          // Display text
  description?: string;   // Optional helper text below label
  disabled?: boolean;     // Disable this specific option
}
```

## Examples

### Basic Radio Group

```tsx
<RadioGroup
  value={plan}
  onChange={setPlan}
  options={[
    { value: 'free', label: 'Free Plan' },
    { value: 'pro', label: 'Pro Plan' },
    { value: 'enterprise', label: 'Enterprise Plan' }
  ]}
  aria-label="Select plan"
/>
```

### With Descriptions

```tsx
<RadioGroup
  value={tier}
  onChange={setTier}
  options={[
    { 
      value: 'starter', 
      label: 'Starter',
      description: 'Perfect for individuals and small projects' 
    },
    { 
      value: 'professional', 
      label: 'Professional',
      description: 'For growing teams and businesses' 
    },
    { 
      value: 'enterprise', 
      label: 'Enterprise',
      description: 'Advanced features and dedicated support' 
    }
  ]}
  aria-label="Select subscription tier"
/>
```

### With Label

```tsx
<div>
  <label id="payment-label" style={{ display: 'block', marginBottom: '12px' }}>
    Payment Method
  </label>
  <RadioGroup
    value={paymentMethod}
    onChange={setPaymentMethod}
    options={[
      { value: 'card', label: 'Credit Card' },
      { value: 'paypal', label: 'PayPal' },
      { value: 'bank', label: 'Bank Transfer' }
    ]}
    aria-labelledby="payment-label"
  />
</div>
```

### Disabled Options

```tsx
<RadioGroup
  value={plan}
  onChange={setPlan}
  options={[
    { value: 'free', label: 'Free', description: 'Basic features' },
    { 
      value: 'premium', 
      label: 'Premium', 
      description: 'Coming soon',
      disabled: true 
    }
  ]}
  aria-label="Plan selection"
/>
```

### Disabled Group

```tsx
<RadioGroup
  value={value}
  onChange={setValue}
  options={options}
  disabled={true}
  aria-label="Disabled radio group"
/>
```

### Density Variants

```tsx
// Compact - for dashboards
<RadioGroup
  value={value}
  onChange={setValue}
  options={options}
  density="compact"
  aria-label="Compact radio group"
/>

// Normal - default
<RadioGroup
  value={value}
  onChange={setValue}
  options={options}
  density="normal"
  aria-label="Normal radio group"
/>

// Spacious - for content pages
<RadioGroup
  value={value}
  onChange={setValue}
  options={options}
  density="spacious"
  aria-label="Spacious radio group"
/>
```

### In a Form

```tsx
import { Stack, RadioGroup, TextInput, Button } from '@spexop/react';

function PreferencesForm() {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  
  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="vertical" gap={6}>
        <div>
          <label id="theme-label">Theme</label>
          <RadioGroup
            value={theme}
            onChange={setTheme}
            options={[
              { value: 'light', label: 'Light', description: 'Bright and clean' },
              { value: 'dark', label: 'Dark', description: 'Easy on the eyes' },
              { value: 'auto', label: 'Auto', description: 'Match system preference' }
            ]}
            aria-labelledby="theme-label"
          />
        </div>
        
        <div>
          <label id="language-label">Language</label>
          <RadioGroup
            value={language}
            onChange={setLanguage}
            options={[
              { value: 'en', label: 'English' },
              { value: 'es', label: 'Español' },
              { value: 'fr', label: 'Français' }
            ]}
            aria-labelledby="language-label"
          />
        </div>
        
        <Button variant="primary" type="submit">
          Save Preferences
        </Button>
      </Stack>
    </form>
  );
}
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| **Tab** | Move focus to first/next radio button |
| **Shift + Tab** | Move focus to previous radio button |
| **Arrow Down** / **Arrow Right** | Select next option (wraps to first) |
| **Arrow Up** / **Arrow Left** | Select previous option (wraps to last) |
| **Space** | Select focused option |

## Accessibility

### ARIA Attributes

- `role="radiogroup"` - Container for radio buttons
- `aria-label` or `aria-labelledby` - Group label (required)
- `role="radio"` - Each option
- `aria-checked` - Current selection state
- `aria-disabled` - Disabled options
- `aria-describedby` - Option descriptions

### Focus Management

- ✅ Only one radio in group is focusable at a time
- ✅ Arrow keys change selection AND move focus
- ✅ Focus visible on keyboard navigation
- ✅ Disabled options skip keyboard navigation

### Screen Readers

- Announces group label
- Announces option count (e.g., "1 of 3")
- Announces selection state
- Reads option descriptions
- Announces when options are disabled

### Requirements

**Always provide** one of:

- `aria-label` prop
- Associated `<label>` with `aria-labelledby`

```tsx
// Option 1: aria-label
<RadioGroup aria-label="Payment method" {...props} />

// Option 2: label element
<label id="payment-label">Payment Method</label>
<RadioGroup aria-labelledby="payment-label" {...props} />
```

## Common Use Cases

### Plan Selection

```tsx
<RadioGroup
  value={plan}
  onChange={setPlan}
  options={[
    { 
      value: 'free', 
      label: 'Free',
      description: '$0/month - Basic features'
    },
    { 
      value: 'pro', 
      label: 'Professional',
      description: '$29/month - All features'
    },
    { 
      value: 'enterprise', 
      label: 'Enterprise',
      description: '$99/month - Priority support'
    }
  ]}
  density="spacious"
  aria-label="Subscription plan"
/>
```

### Shipping Method

```tsx
<RadioGroup
  value={shipping}
  onChange={setShipping}
  options={[
    { 
      value: 'standard', 
      label: 'Standard Shipping',
      description: '5-7 business days - Free'
    },
    { 
      value: 'express', 
      label: 'Express Shipping',
      description: '2-3 business days - $9.99'
    },
    { 
      value: 'overnight', 
      label: 'Overnight',
      description: 'Next business day - $24.99'
    }
  ]}
  aria-label="Shipping method"
/>
```

### Privacy Settings

```tsx
<RadioGroup
  value={visibility}
  onChange={setVisibility}
  options={[
    { 
      value: 'public', 
      label: 'Public',
      description: 'Anyone can see your profile'
    },
    { 
      value: 'friends', 
      label: 'Friends Only',
      description: 'Only friends can see your profile'
    },
    { 
      value: 'private', 
      label: 'Private',
      description: 'Only you can see your profile'
    }
  ]}
  aria-label="Profile visibility"
/>
```

## Integration with Forms

### With React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { RadioGroup } from '@spexop/react';

function Form() {
  const { control, handleSubmit } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="plan"
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onChange={field.onChange}
            options={planOptions}
            aria-label="Select plan"
          />
        )}
      />
    </form>
  );
}
```

### With Formik

```tsx
import { Formik, Form, Field } from 'formik';
import { RadioGroup } from '@spexop/react';

function MyForm() {
  return (
    <Formik initialValues={{ plan: 'free' }} onSubmit={handleSubmit}>
      <Form>
        <Field name="plan">
          {({ field }) => (
            <RadioGroup
              value={field.value}
              onChange={(value) => field.onChange({ target: { name: 'plan', value } })}
              options={planOptions}
              aria-label="Plan"
            />
          )}
        </Field>
      </Form>
    </Formik>
  );
}
```

## Styling

### Custom Styling

```tsx
<RadioGroup
  className="my-radio-group"
  value={value}
  onChange={setValue}
  options={options}
/>
```

```css
.my-radio-group {
  max-width: 400px;
  padding: var(--s-spacing-4);
}
```

### Design Tokens

Uses design tokens for consistent styling:

- Colors: `--s-color-neutral-*`, `--s-color-red-*`
- Spacing: `--s-spacing-*`
- Border radius: `--s-radius-md`
- Transitions: `--s-transition-fast`

## When to Use

### Use RadioGroup When ✅

- You have 2-5 mutually exclusive options
- All options should be visible at once
- Users need to compare options
- Descriptions help decision-making
- Single selection required

### Use Select Instead When

- You have 5+ options
- Options can grow dynamically
- Space is limited (dropdown saves space)
- Options don't need descriptions
- Users know what they're looking for

### Use SegmentedButton Instead When

- You have 2-3 toggle-style options
- Button-style appearance preferred
- Options are short (1 word)
- More compact presentation needed

## Related Components

- **Select** - Dropdown for 5+ options
- **SegmentedButton** - Button-style radio selection
- **SegmentedControl** - iOS-style control
- **Toggle** - For boolean on/off choices

## Best Practices

### Do ✅

```tsx
// Provide descriptive labels
{ value: 'pro', label: 'Professional Plan' }

// Add helpful descriptions
{ 
  value: 'pro', 
  label: 'Professional',
  description: 'For growing businesses'
}

// Use aria-label or label element
<label id="plan-label">Choose Plan</label>
<RadioGroup aria-labelledby="plan-label" {...props} />

// Keep options to 2-5 for best UX
const options = [ /* 2-5 options */ ];

// Pre-select a sensible default
const [value, setValue] = useState('free'); // Default selected
```

### Don't ❌

```tsx
// Don't use for binary choices (use Toggle instead)
<RadioGroup options={[
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' }
]} />
// Use Toggle instead for on/off

// Don't use for 10+ options (use Select instead)
<RadioGroup options={[/* 15 options */]} />
// Dropdown is better UX

// Don't skip aria-label
<RadioGroup {...props} />
// Always provide accessibility label

// Don't use long descriptions
{ value: 'option', label: 'Option', description: 'Very long paragraph...' }
// Keep descriptions concise (1-2 sentences max)
```

## Design System Integration

RadioGroup follows Spexop principles:

- **Typography-driven** - Clear, readable labels
- **Borders before shadows** - Clean design
- **Token-based** - All values from @spexop/tokens
- **Accessible** - WCAG AA compliant
- **Minimal decoration** - Focus on content

## Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

## Performance

- Zero runtime overhead
- No re-renders on hover/focus
- CSS-only hover states
- Lightweight DOM structure

---

**Part of Form Components** - Essential form controls with validation and accessibility built-in.
