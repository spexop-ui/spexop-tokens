# Toggle

Modern toggle/switch component for boolean on/off selections. Features smooth animations, keyboard accessibility, and theme-aware styling.

## Installation

```bash
npm install @spexop/react
```

## Import

```typescript
import { Toggle } from '@spexop/react';
```

## Basic Usage

```tsx
import { useState } from 'react';
import { Toggle } from '@spexop/react';

function MyComponent() {
  const [enabled, setEnabled] = useState(false);
  
  return (
    <Toggle
      checked={enabled}
      onChange={setEnabled}
      label="Enable notifications"
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `checked` | `boolean` | **Required** | Whether toggle is on/off |
| `onChange` | `(checked: boolean) => void` | **Required** | Change handler callback |
| `disabled` | `boolean` | `false` | Disable the toggle |
| `label` | `string` | `undefined` | Optional label text |
| `density` | `"compact"` \| `"normal"` \| `"spacious"` | `"normal"` | Spacing density |
| `className` | `string` | `""` | Additional CSS class |
| `id` | `string` | auto-generated | HTML id attribute |
| `aria-label` | `string` | `undefined` | ARIA label (required if no label prop) |
| `aria-labelledby` | `string` | `undefined` | ARIA labelledby reference |

### Density Variants

| Density | Height | Use Case |
|---------|--------|----------|
| `compact` | 20px | Dashboards, toolbars, dense UIs |
| `normal` | 24px | Default, forms, settings |
| `spacious` | 28px | Content pages, prominent toggles |

## Examples

### Basic Toggle

```tsx
<Toggle
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable feature"
/>
```

### Without Label (Requires aria-label)

```tsx
<Toggle
  checked={darkMode}
  onChange={setDarkMode}
  aria-label="Dark mode toggle"
/>
```

### With External Label

```tsx
<div>
  <label htmlFor="notifications-toggle" style={{ display: 'block', marginBottom: '8px' }}>
    Email Notifications
  </label>
  <Toggle
    id="notifications-toggle"
    checked={emailNotifications}
    onChange={setEmailNotifications}
  />
</div>
```

### Disabled State

```tsx
<Toggle
  checked={value}
  onChange={setValue}
  label="This feature is disabled"
  disabled={true}
/>
```

### Density Variants (Compact, Normal, Spacious)

```tsx
// Compact - for toolbars
<Toggle
  checked={compact}
  onChange={setCompact}
  label="Compact view"
  density="compact"
/>

// Normal - default
<Toggle
  checked={normal}
  onChange={setNormal}
  label="Normal toggle"
  density="normal"
/>

// Spacious - for content pages
<Toggle
  checked={spacious}
  onChange={setSpacious}
  label="Spacious toggle"
  density="spacious"
/>
```

### Settings Panel

```tsx
import { Stack, Toggle } from '@spexop/react';

function SettingsPanel() {
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  
  return (
    <Stack direction="vertical" gap={4}>
      <Toggle
        checked={notifications}
        onChange={setNotifications}
        label="Email notifications"
      />
      
      <Toggle
        checked={autoSave}
        onChange={setAutoSave}
        label="Auto-save"
      />
      
      <Toggle
        checked={darkMode}
        onChange={setDarkMode}
        label="Dark mode"
      />
    </Stack>
  );
}
```

### With Descriptions

```tsx
<div>
  <Toggle
    checked={analytics}
    onChange={setAnalytics}
    label="Analytics"
    id="analytics-toggle"
  />
  <p style={{ marginTop: '4px', fontSize: '14px', color: 'var(--s-color-neutral-600)' }}>
    Help us improve by sharing anonymous usage data
  </p>
</div>
```

### Privacy Settings

```tsx
function PrivacySettings() {
  const [publicProfile, setPublicProfile] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [allowMessages, setAllowMessages] = useState(true);
  
  return (
    <Stack direction="vertical" gap={6}>
      <div>
        <Toggle
          checked={publicProfile}
          onChange={setPublicProfile}
          label="Public profile"
        />
        <p className="helper-text">
          Allow others to see your profile
        </p>
      </div>
      
      <div>
        <Toggle
          checked={showEmail}
          onChange={setShowEmail}
          label="Show email address"
          disabled={!publicProfile}
        />
        <p className="helper-text">
          Display your email on your public profile
        </p>
      </div>
      
      <div>
        <Toggle
          checked={allowMessages}
          onChange={setAllowMessages}
          label="Allow messages"
        />
        <p className="helper-text">
          Let other users send you messages
        </p>
      </div>
    </Stack>
  );
}
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| **Space** | Toggle on/off |
| **Enter** | Toggle on/off |
| **Tab** | Move to next focusable element |
| **Shift + Tab** | Move to previous focusable element |

## Accessibility

### ARIA Attributes

- `role="switch"` - Identifies toggle behavior
- `aria-checked` - Current checked state (true/false)
- `aria-label` or `aria-labelledby` - Label for screen readers
- `aria-disabled` - Disabled state

### Focus Management

- ✅ Focus visible on keyboard navigation
- ✅ Smooth focus outline
- ✅ Disabled toggles skip focus
- ✅ Consistent focus behavior

### Screen Readers

- Announces role as "switch"
- Announces checked state ("on" or "off")
- Announces label text
- Announces when disabled

### Requirements

**Always provide** one of:

- `label` prop (rendered next to toggle)
- `aria-label` prop (for screen readers only)
- Associated `<label>` element with `aria-labelledby`

```tsx
// Option 1: label prop
<Toggle label="Dark mode" {...props} />

// Option 2: aria-label
<Toggle aria-label="Dark mode" {...props} />

// Option 3: label element
<label id="dark-mode-label">Dark Mode</label>
<Toggle aria-labelledby="dark-mode-label" {...props} />
```

## Integration with Forms

### Controlled Component

```tsx
function Form() {
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert('Please agree to terms');
      return;
    }
    // Submit form
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Toggle
        checked={agreeToTerms}
        onChange={setAgreeToTerms}
        label="I agree to the terms and conditions"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### With React Hook Form

```tsx
import { useForm, Controller } from 'react-hook-form';
import { Toggle } from '@spexop/react';

function Form() {
  const { control, handleSubmit } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="emailNotifications"
        control={control}
        render={({ field }) => (
          <Toggle
            checked={field.value}
            onChange={field.onChange}
            label="Email notifications"
          />
        )}
      />
    </form>
  );
}
```

## Styling

### Custom Styling

```tsx
<Toggle
  className="my-toggle"
  checked={value}
  onChange={setValue}
  label="Custom styled toggle"
/>
```

```css
.my-toggle {
  /* Override spacing, colors, etc. */
}
```

### Design Tokens

Uses design tokens for theming:

- Colors: `--s-color-neutral-*`, `--s-color-red-500`
- Spacing: `--s-spacing-*`
- Border radius: `--s-radius-full`
- Transitions: `--s-transition-fast`

## When to Use

### Use Toggle When ✅

- Binary on/off choice
- Immediate effect (no save button needed)
- Settings or preferences
- Feature enable/disable
- Visibility controls

### Use Checkbox Instead When

- Multiple selections allowed
- Part of a list or group
- Requires save/submit action
- Traditional form submission

### Use RadioGroup Instead When

- Mutually exclusive choice between 2+ options
- Options are not binary
- All options should be visible
- Need option descriptions

## Best Practices

### Do ✅

```tsx
// Use for immediate actions
<Toggle label="Dark mode" checked={darkMode} onChange={setDarkMode} />

// Provide clear labels
<Toggle label="Enable email notifications" {...props} />

// Use for settings
<Toggle label="Auto-save" checked={autoSave} onChange={setAutoSave} />

// Include helper text for clarity
<div>
  <Toggle label="Public profile" {...props} />
  <p className="helper-text">Others can see your profile</p>
</div>
```

### Don't ❌

```tsx
// Don't use for destructive actions without confirmation
<Toggle label="Delete account" /> // Bad - use confirmation dialog

// Don't use for multi-step processes
<Toggle label="Submit form" /> // Bad - use Button instead

// Don't skip labels
<Toggle checked={value} onChange={setValue} /> // Bad - no accessibility

// Don't use for more than 2 options
<Toggle label="Small/Medium/Large" /> // Bad - use RadioGroup
```

## Common Patterns

### Dark Mode Toggle

```tsx
import { Toggle } from '@spexop/react';
import { Moon, Sun } from '@spexop/icons';

<Toggle
  checked={darkMode}
  onChange={setDarkMode}
  label="Dark mode"
  aria-label="Toggle dark mode"
/>
```

### Feature Flags

```tsx
function FeatureSettings() {
  const [betaFeatures, setBetaFeatures] = useState(false);
  
  return (
    <div>
      <Toggle
        checked={betaFeatures}
        onChange={setBetaFeatures}
        label="Beta features"
      />
      <p style={{ marginTop: '8px', fontSize: '14px' }}>
        {betaFeatures 
          ? '✓ Beta features enabled - you may see experimental functionality' 
          : 'Enable to try new features before they\'re released'}
      </p>
    </div>
  );
}
```

### Privacy Controls

```tsx
<Stack direction="vertical" gap={6}>
  <div>
    <Toggle
      checked={publicProfile}
      onChange={setPublicProfile}
      label="Public profile"
    />
    <p className="description">Allow anyone to view your profile</p>
  </div>
  
  <div>
    <Toggle
      checked={showActivity}
      onChange={setShowActivity}
      label="Show activity"
      disabled={!publicProfile}
    />
    <p className="description">Display your recent activity</p>
  </div>
</Stack>
```

## Design System Integration

Toggle follows Spexop principles:

- **Minimal decoration** - Clean, simple design
- **Token-based** - All values from @spexop/tokens
- **Accessible** - WCAG AA compliant
- **Smooth animations** - GPU-accelerated transitions
- **Theme-aware** - Works with light/dark modes

## Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

## Performance

- Zero runtime overhead (beyond React)
- CSS-only animations
- No re-renders on hover
- Lightweight component (~200 bytes JS)

## Related Components

- **Checkbox** - For multi-select or form submission
- **RadioGroup** - For mutually exclusive options
- **SegmentedButton** - For button-style selection
- **Select** - For dropdown selection

## TypeScript

Full TypeScript support:

```typescript
import type { ToggleProps, ToggleDensity } from '@spexop/react';

const props: ToggleProps = {
  checked: true,
  onChange: (checked) => console.log(checked),
  label: 'Dark mode',
  density: 'normal'
};
```

---

**Part of Form Components** - Essential form controls with validation and accessibility built-in.
