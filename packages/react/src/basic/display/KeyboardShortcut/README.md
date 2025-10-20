# KeyboardShortcut

Visual display component for keyboard shortcuts. Shows key combinations in a clean, readable format. Perfect for documentation, tooltips, and command palettes.

## Installation

```bash
npm install @spexop/react
```

## Import

```typescript
import { KeyboardShortcut } from '@spexop/react';
```

## Basic Usage

```tsx
import { KeyboardShortcut } from '@spexop/react';

<KeyboardShortcut keys={['Cmd', 'K']} />
<KeyboardShortcut keys={['Ctrl', 'S']} />
<KeyboardShortcut keys={['Shift', 'Enter']} />
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `keys` | `string[]` | **Required** | Array of key names |
| `separator` | `string` | `"+"` | Separator between keys |
| `size` | `"sm"` \| `"md"` \| `"lg"` | `"md"` | Visual size |
| `className` | `string` | `""` | Additional CSS class |

## Examples

### Single Key

```tsx
<KeyboardShortcut keys={['/']} />
<KeyboardShortcut keys={['Esc']} />
<KeyboardShortcut keys={['Enter']} />
```

### Key Combinations

```tsx
// Cmd+K (Mac) or Ctrl+K (Windows/Linux)
<KeyboardShortcut keys={['Cmd', 'K']} />
<KeyboardShortcut keys={['Ctrl', 'K']} />

// Shift+Enter
<KeyboardShortcut keys={['Shift', 'Enter']} />

// Ctrl+Alt+Delete
<KeyboardShortcut keys={['Ctrl', 'Alt', 'Delete']} />
```

### Custom Separator

```tsx
// Space separator
<KeyboardShortcut keys={['Cmd', 'K']} separator=" " />

// Arrow separator
<KeyboardShortcut keys={['Ctrl', 'P']} separator=" → " />

// Then separator
<KeyboardShortcut keys={['G', 'H']} separator=" then " />
```

### Different Sizes

```tsx
// Small - for inline text
<KeyboardShortcut keys={['Cmd', 'K']} size="sm" />

// Medium (default)
<KeyboardShortcut keys={['Cmd', 'K']} size="md" />

// Large - for emphasis
<KeyboardShortcut keys={['Cmd', 'K']} size="lg" />
```

### In SearchBar

```tsx
import { SearchBar, KeyboardShortcut } from '@spexop/react';

<SearchBar
  placeholder="Search..."
  onClick={openPalette}
  rightElement={<KeyboardShortcut keys={['Cmd', 'K']} size="sm" />}
  readOnly
/>
```

### In Command Palette

```tsx
const commands = [
  {
    id: 'search',
    label: 'Search',
    shortcut: <KeyboardShortcut keys={['Cmd', 'K']} size="sm" />,
    action: openSearch
  },
  {
    id: 'settings',
    label: 'Settings',
    shortcut: <KeyboardShortcut keys={['Cmd', ',']} size="sm" />,
    action: openSettings
  }
];
```

### In Documentation

```tsx
<p>
  Press <KeyboardShortcut keys={['Cmd', 'K']} /> to open the command palette.
</p>

<p>
  Use <KeyboardShortcut keys={['Arrow', 'Down']} /> and{' '}
  <KeyboardShortcut keys={['Arrow', 'Up']} /> to navigate.
</p>
```

## Common Key Names

### Modifier Keys

- `Cmd` / `⌘` - Mac command key
- `Ctrl` - Control key
- `Alt` / `Option` / `⌥` - Alt/Option key
- `Shift` / `⇧` - Shift key

### Special Keys

- `Enter` / `Return` / `↵`
- `Esc` / `Escape`
- `Tab` / `⇥`
- `Space` / `␣`
- `Backspace` / `Delete`

### Arrow Keys

- `Arrow Up` / `↑`
- `Arrow Down` / `↓`
- `Arrow Left` / `←`
- `Arrow Right` / `→`

### Function Keys

- `F1` through `F12`

## Platform Detection

For cross-platform shortcuts:

```tsx
const isMac = navigator.platform.includes('Mac');

<KeyboardShortcut 
  keys={isMac ? ['Cmd', 'K'] : ['Ctrl', 'K']} 
/>
```

## Styling

### Custom Styling

```tsx
<KeyboardShortcut
  className="my-shortcut"
  keys={['Cmd', 'K']}
/>
```

```css
.my-shortcut {
  background: var(--s-color-neutral-100);
  border-color: var(--s-color-neutral-300);
}
```

## Best Practices

### Do ✅

```tsx
// Use clear, standard key names
<KeyboardShortcut keys={['Cmd', 'K']} />

// Platform-appropriate naming
<KeyboardShortcut keys={isMac ? ['Cmd'] : ['Ctrl']} />

// Include in tooltips
<button title="Save (Cmd+S)">
  Save <KeyboardShortcut keys={['Cmd', 'S']} size="sm" />
</button>
```

### Don't ❌

```tsx
// Don't use unclear abbreviations
<KeyboardShortcut keys={['C', 'K']} /> // Use 'Cmd' or 'Ctrl'

// Don't use lowercase for modifiers
<KeyboardShortcut keys={['cmd', 'k']} /> // Use 'Cmd', 'K'

// Don't overcomplicate
<KeyboardShortcut keys={['Ctrl', 'Alt', 'Shift', 'K']} /> // Too complex
```

## Related Components

- **SearchBar** - Search with shortcut display
- **CommandPalette** - Command interface with shortcuts
- **Tooltip** - Tooltips with shortcuts
- **Button** - Buttons with shortcut hints

---

**Part of Display Components** - Visual indicators for keyboard shortcuts.
