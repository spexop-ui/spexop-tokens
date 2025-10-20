# PanelSection

Collapsible panel section component for organizing content. Features smooth animations, optional icons, and accordion behavior. Perfect for FAQs, settings groups, and expandable content.

## Installation

```bash
npm install @spexop/react
```

## Import

```typescript
import { PanelSection } from '@spexop/react';
```

## Basic Usage

```tsx
import { useState } from 'react';
import { PanelSection } from '@spexop/react';

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <PanelSection
      title="Section Title"
      isOpen={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
    >
      <p>Collapsible content goes here...</p>
    </PanelSection>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | **Required** | Section title |
| `children` | `ReactNode` | **Required** | Section content |
| `isOpen` | `boolean` | **Required** | Whether section is expanded |
| `onToggle` | `() => void` | **Required** | Toggle callback |
| `icon` | `ReactNode` | `undefined` | Optional icon |
| `disabled` | `boolean` | `false` | Disable toggling |
| `className` | `string` | `""` | Additional CSS class |

## Examples

### Basic Collapsible

```tsx
<PanelSection
  title="Additional Information"
  isOpen={showInfo}
  onToggle={() => setShowInfo(!showInfo)}
>
  <p>Detailed information content...</p>
</PanelSection>
```

### With Icon

```tsx
import { Settings } from '@spexop/icons';

<PanelSection
  title="Settings"
  icon={<Settings size={20} />}
  isOpen={settingsOpen}
  onToggle={() => setSettingsOpen(!settingsOpen)}
>
  {/* Settings content */}
</PanelSection>
```

### FAQ Accordion

```tsx
import { Stack, PanelSection } from '@spexop/react';

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs = [
    { q: 'What is Spexop?', a: 'A React design system...' },
    { q: 'How do I install?', a: 'Run npm install...' },
    { q: 'Is it free?', a: 'Yes, MIT licensed...' }
  ];
  
  return (
    <Stack direction="vertical" gap={2}>
      {faqs.map((faq, index) => (
        <PanelSection
          key={index}
          title={faq.q}
          isOpen={openIndex === index}
          onToggle={() => setOpenIndex(openIndex === index ? null : index)}
        >
          <p>{faq.a}</p>
        </PanelSection>
      ))}
    </Stack>
  );
}
```

### Settings Groups

```tsx
<Stack direction="vertical" gap={4}>
  <PanelSection
    title="General"
    icon={<Settings size={20} />}
    isOpen={generalOpen}
    onToggle={() => setGeneralOpen(!generalOpen)}
  >
    <Toggle label="Auto-save" checked={autoSave} onChange={setAutoSave} />
    <Toggle label="Notifications" checked={notifications} onChange={setNotifications} />
  </PanelSection>
  
  <PanelSection
    title="Privacy"
    icon={<Lock size={20} />}
    isOpen={privacyOpen}
    onToggle={() => setPrivacyOpen(!privacyOpen)}
  >
    <Toggle label="Public profile" checked={publicProfile} onChange={setPublicProfile} />
    <Toggle label="Show activity" checked={showActivity} onChange={setShowActivity} />
  </PanelSection>
</Stack>
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| **Enter** / **Space** | Toggle section |
| **Arrow Down** | Move to next section |
| **Arrow Up** | Move to previous section |

## Accessibility

- `role="button"` - Clickable header
- `aria-expanded` - Current state
- `aria-controls` - Points to content
- Keyboard accessible
- Focus visible

## Best Practices

### Do ✅

```tsx
// Use for grouping related content
<PanelSection title="Advanced Options" {...props}>
  {/* Related settings */}
</PanelSection>

// Provide clear titles
<PanelSection title="Payment Methods" {...props} />

// Use icons for visual hierarchy
<PanelSection title="Security" icon={<Lock />} {...props} />
```

### Don't ❌

```tsx
// Don't nest too many levels
<PanelSection>
  <PanelSection> // Confusing
  </PanelSection>
</PanelSection>

// Don't use for single items
<PanelSection title="One thing">
  <p>Just one item</p> // Not worth collapsing
</PanelSection>
```

## Related Components

- **Section** - Page sections
- **Card** - Content containers
- **NavSection** - Sidebar accordion
- **Accordion** - Multiple collapsible panels

---

**Part of Layout Components** - Collapsible sections for organized content.
