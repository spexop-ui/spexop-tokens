# CommandPalette

Keyboard-first command palette for quick actions and navigation. Inspired by Cmd+K interfaces in modern apps. Features fuzzy search, keyboard navigation, and categorized commands.

## Installation

```bash
npm install @spexop/react
```

## Import

```typescript
import { CommandPalette } from '@spexop/react';
import type { CommandPaletteCommand } from '@spexop/react';
```

## Basic Usage

```tsx
import { useState } from 'react';
import { CommandPalette } from '@spexop/react';

function MyApp() {
  const [isOpen, setIsOpen] = useState(false);
  
  const commands = [
    {
      id: 'home',
      label: 'Go to Home',
      action: () => navigate('/'),
      keywords: ['home', 'dashboard']
    },
    {
      id: 'settings',
      label: 'Open Settings',
      action: () => navigate('/settings'),
      keywords: ['settings', 'preferences']
    }
  ];
  
  return (
    <CommandPalette
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      commands={commands}
      placeholder="Type a command..."
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | **Required** | Whether palette is open |
| `onClose` | `() => void` | **Required** | Close callback |
| `commands` | `CommandPaletteCommand[]` | **Required** | Available commands |
| `placeholder` | `string` | `"Type a command..."` | Search placeholder |
| `className` | `string` | `""` | Additional CSS class |

### CommandPaletteCommand Type

```typescript
interface CommandPaletteCommand {
  id: string;                    // Unique identifier
  label: string;                 // Display text
  action: () => void;            // Callback when selected
  keywords?: string[];           // Search keywords
  icon?: ReactNode;              // Optional icon
  category?: string;             // Optional category
  disabled?: boolean;            // Disable command
}
```

## Examples

### With Icons

```tsx
import { Home, Settings, Users } from '@spexop/icons';

const commands = [
  {
    id: 'home',
    label: 'Go to Home',
    icon: <Home size={20} />,
    action: () => navigate('/'),
    category: 'Navigation'
  },
  {
    id: 'settings',
    label: 'Open Settings',
    icon: <Settings size={20} />,
    action: () => navigate('/settings'),
    category: 'Navigation'
  },
  {
    id: 'users',
    label: 'Manage Users',
    icon: <Users size={20} />,
    action: () => navigate('/users'),
    category: 'Admin'
  }
];
```

### With Categories

```tsx
const commands = [
  // Navigation
  { id: 'home', label: 'Home', action: goHome, category: 'Navigation' },
  { id: 'about', label: 'About', action: goAbout, category: 'Navigation' },
  
  // Actions
  { id: 'new', label: 'New Document', action: createNew, category: 'Actions' },
  { id: 'save', label: 'Save', action: save, category: 'Actions' },
  
  // Settings
  { id: 'theme', label: 'Toggle Theme', action: toggleTheme, category: 'Settings' }
];
```

### With Keyboard Shortcut

```tsx
// Trigger with Cmd+K / Ctrl+K
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen(true);
    }
  };
  
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### With SearchBar Trigger

```tsx
import { SearchBar, CommandPalette } from '@spexop/react';

<>
  <SearchBar
    onClick={() => setPaletteOpen(true)}
    showShortcut={true}
    placeholder="Search or run command..."
    readOnly
  />
  
  <CommandPalette
    isOpen={paletteOpen}
    onClose={() => setPaletteOpen(false)}
    commands={commands}
  />
</>
```

## Keyboard Navigation

| Key | Action |
|-----|--------|
| **Cmd/Ctrl + K** | Open palette (implement in your app) |
| **Arrow Down** | Move to next command |
| **Arrow Up** | Move to previous command |
| **Enter** | Execute selected command |
| **Escape** | Close palette |
| **Tab** | Move to next command |
| **Shift + Tab** | Move to previous command |

## Accessibility

- `role="dialog"` - Modal dialog
- `role="combobox"` - Search input
- `role="listbox"` - Command list
- `role="option"` - Each command
- ARIA labels and descriptions
- Focus management
- Keyboard navigation

## Common Use Cases

### Navigation

```tsx
const navCommands = [
  { id: 'home', label: 'Go to Home', action: () => navigate('/') },
  { id: 'dashboard', label: 'Dashboard', action: () => navigate('/dashboard') },
  { id: 'profile', label: 'My Profile', action: () => navigate('/profile') }
];
```

### Actions

```tsx
const actionCommands = [
  { id: 'new', label: 'Create New', action: createNew },
  { id: 'save', label: 'Save Changes', action: save },
  { id: 'export', label: 'Export Data', action: exportData }
];
```

### Theme Switching

```tsx
const themeCommands = [
  { id: 'light', label: 'Switch to Light Mode', action: () => setTheme('light') },
  { id: 'dark', label: 'Switch to Dark Mode', action: () => setTheme('dark') },
  { id: 'auto', label: 'Auto Theme', action: () => setTheme('auto') }
];
```

## Related Components

- **SearchModal** - Full search interface
- **SearchBar** - Search input (great trigger for CommandPalette)
- **SearchOverlay** - Search with results
- **Drawer** - General side panel

## Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

---

**Part of Overlay Components** - Keyboard-first interfaces for power users.
