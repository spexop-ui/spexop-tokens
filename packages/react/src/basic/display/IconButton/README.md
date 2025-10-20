# IconButton

Icon-only button component for toolbars, actions, and compact interfaces. Square button with icon, perfect for mobile and dense UIs.

## Installation

```bash
npm install @spexop/react @spexop/icons
```

## Import

```typescript
import { IconButton } from '@spexop/react';
import { Settings } from '@spexop/icons';
```

## Basic Usage

```tsx
import { IconButton } from '@spexop/react';
import { Settings } from '@spexop/icons';

<IconButton onClick={handleClick} aria-label="Settings">
  <Settings size={20} />
</IconButton>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | **Required** | Icon element |
| `onClick` | `() => void` | **Required** | Click handler |
| `variant` | `"ghost"` \| `"filled"` \| `"outlined"` | `"ghost"` | Visual style |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Button size |
| `disabled` | `boolean` | `false` | Disable button |
| `aria-label` | `string` | **Required** | Accessibility label |
| `className` | `string` | `""` | Additional CSS class |

## Examples

### Toolbar

```tsx
import { Bold, Italic, Underline } from '@spexop/icons';

<div style={{ display: 'flex', gap: '4px' }}>
  <IconButton onClick={handleBold} aria-label="Bold">
    <Bold size={20} />
  </IconButton>
  <IconButton onClick={handleItalic} aria-label="Italic">
    <Italic size={20} />
  </IconButton>
  <IconButton onClick={handleUnderline} aria-label="Underline">
    <Underline size={20} />
  </IconButton>
</div>
```

### Variants

```tsx
// Ghost (default) - transparent
<IconButton variant="ghost" aria-label="Delete">
  <Trash size={20} />
</IconButton>

// Filled - solid background
<IconButton variant="filled" aria-label="Add">
  <Plus size={20} />
</IconButton>

// Outlined - border only
<IconButton variant="outlined" aria-label="Edit">
  <Edit size={20} />
</IconButton>
```

### Sizes

```tsx
// Small - 32×32px
<IconButton size="sm" aria-label="Close">
  <X size={16} />
</IconButton>

// Medium - 40×40px (default)
<IconButton size="md" aria-label="Settings">
  <Settings size={20} />
</IconButton>

// Large - 48×48px
<IconButton size="lg" aria-label="Menu">
  <Menu size={24} />
</IconButton>
```

### In TopBar

```tsx
import { TopBar } from '@spexop/react';
import { Search, Bell, Settings } from '@spexop/icons';

<TopBar
  rightActions={
    <>
      <IconButton onClick={openSearch} aria-label="Search">
        <Search size={20} />
      </IconButton>
      <IconButton onClick={openNotifications} aria-label="Notifications">
        <Bell size={20} />
      </IconButton>
      <IconButton onClick={openSettings} aria-label="Settings">
        <Settings size={20} />
      </IconButton>
    </>
  }
/>
```

## Accessibility

**CRITICAL**: Always provide `aria-label` for icon-only buttons.

```tsx
// ✅ Good
<IconButton aria-label="Close dialog">
  <X size={20} />
</IconButton>

// ❌ Bad - screen readers can't identify
<IconButton>
  <X size={20} />
</IconButton>
```

## When to Use

**Use IconButton When**:

- Space is limited (toolbars, mobile)
- Icon meaning is clear
- Compact UI needed

**Use Button Instead When**:

- Text label improves clarity
- Desktop with space available
- Important primary actions

## Related Components

- **Button** - Full button with text
- **Icon** - Icon wrapper
- **ButtonGroup** - Group multiple buttons

---

**Part of Display Components** - Compact, icon-only buttons for dense interfaces.
