# CommandPalette Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A powerful command palette for quick actions and navigation. Features fuzzy search, keyboard shortcuts, grouped commands, and recent actions with smooth animations.

## Features

- ✅ Fuzzy search filtering
- ✅ Keyboard shortcuts display
- ✅ Grouped commands
- ✅ Recent actions
- ✅ Icon support
- ✅ Keyboard navigation (Arrow keys)
- ✅ Global keyboard shortcut (⌘K)
- ✅ Focus trap
- ✅ WCAG AA+ accessible
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { CommandPalette } from '@spexop/react';
import { useState } from 'react';

function App() {
  const [isOpen, setIsOpen] = useState(false);
  
  const commands = [
    {
      id: 'home',
      label: 'Go to Dashboard',
      icon: Home,
      onSelect: () => navigate('/'),
      keywords: ['dashboard', 'home'],
    },
    {
      id: 'settings',
      label: 'Open Settings',
      icon: Settings,
      onSelect: () => navigate('/settings'),
      keywords: ['settings', 'preferences'],
    },
  ];
  
  return (
    <CommandPalette
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      commands={commands}
      placeholder="Search for actions..."
    />
  );
}
```

## With Keyboard Shortcuts

```tsx
const commands = [
  {
    id: 'new-doc',
    label: 'Create New Document',
    icon: FilePlus,
    onSelect: handleNewDoc,
    shortcut: ['cmd', 'n'],
  },
  {
    id: 'save',
    label: 'Save',
    icon: Save,
    onSelect: handleSave,
    shortcut: ['cmd', 's'],
  },
];

<CommandPalette
  isOpen={isOpen}
  onClose={handleClose}
  commands={commands}
/>
```

## Grouped Commands

```tsx
const commandGroups = [
  {
    title: 'Navigation',
    commands: [
      { id: 'home', label: 'Go to Dashboard', icon: Home, onSelect: () => navigate('/') },
      { id: 'projects', label: 'Go to Projects', icon: Folder, onSelect: () => navigate('/projects') },
    ],
  },
  {
    title: 'Actions',
    commands: [
      { id: 'new', label: 'Create New', icon: Plus, onSelect: handleCreate },
      { id: 'search', label: 'Search', icon: Search, onSelect: handleSearch },
    ],
  },
];

<CommandPalette
  isOpen={isOpen}
  onClose={handleClose}
  commandGroups={commandGroups}
/>
```

## Common Patterns

### Complete Command Palette

```tsx
import { CommandPalette } from '@spexop/react';
import { 
  Home, Folder, Settings, Users, 
  FilePlus, Save, Copy, Trash 
} from '@spexop/icons';

function AppWithCommands() {
  const [showCommands, setShowCommands] = useState(false);

  // Global keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommands(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const commandGroups = [
    {
      title: 'Navigation',
      commands: [
        {
          id: 'dashboard',
          label: 'Go to Dashboard',
          icon: Home,
          onSelect: () => navigate('/'),
          keywords: ['home', 'dashboard', 'main'],
        },
        {
          id: 'projects',
          label: 'Go to Projects',
          icon: Folder,
          onSelect: () => navigate('/projects'),
          keywords: ['projects', 'work'],
        },
        {
          id: 'team',
          label: 'Go to Team',
          icon: Users,
          onSelect: () => navigate('/team'),
          keywords: ['team', 'members', 'people'],
        },
      ],
    },
    {
      title: 'Actions',
      commands: [
        {
          id: 'new-project',
          label: 'Create New Project',
          icon: FilePlus,
          onSelect: handleNewProject,
          shortcut: ['cmd', 'n'],
          keywords: ['create', 'new', 'project'],
        },
        {
          id: 'save',
          label: 'Save',
          icon: Save,
          onSelect: handleSave,
          shortcut: ['cmd', 's'],
        },
        {
          id: 'copy',
          label: 'Copy',
          icon: Copy,
          onSelect: handleCopy,
          shortcut: ['cmd', 'c'],
        },
      ],
    },
    {
      title: 'Settings',
      commands: [
        {
          id: 'preferences',
          label: 'Open Settings',
          icon: Settings,
          onSelect: () => navigate('/settings'),
          shortcut: ['cmd', ','],
        },
      ],
    },
  ];

  return (
    <>
      {/* Your app */}
      
      <CommandPalette
        isOpen={showCommands}
        onClose={() => setShowCommands(false)}
        commandGroups={commandGroups}
        placeholder="Type a command or search..."
        recentCommands={recentCommands}
      />
    </>
  );
}
```

### With Recent Actions

```tsx
function CommandPaletteWithHistory() {
  const [recentCommands, setRecentCommands] = useState([]);

  const handleCommandSelect = (command) => {
    // Execute command
    command.onSelect();
    
    // Add to recent (max 5)
    setRecentCommands(prev => {
      const filtered = prev.filter(cmd => cmd.id !== command.id);
      return [command, ...filtered].slice(0, 5);
    });
  };

  return (
    <CommandPalette
      isOpen={isOpen}
      onClose={handleClose}
      commands={commands}
      recentCommands={recentCommands}
      onCommandSelect={handleCommandSelect}
    />
  );
}
```

### Context-Aware Commands

```tsx
function ContextualCommands() {
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    // Update commands based on current context
    const contextCommands = getCurrentContextCommands();
    setCommands(contextCommands);
  }, [currentPage, selectedItems]);

  return (
    <CommandPalette
      isOpen={isOpen}
      onClose={handleClose}
      commands={commands}
      placeholder={`Search ${currentPage} actions...`}
    />
  );
}
```

## Props

```typescript
interface CommandPaletteProps {
  /** Whether palette is open */
  isOpen: boolean;
  /** Close handler */
  onClose: () => void;
  /** Flat command list */
  commands?: Command[];
  /** Grouped commands */
  commandGroups?: CommandGroup[];
  /** Recent commands */
  recentCommands?: Command[];
  /** Search placeholder */
  placeholder?: string;
  /** Custom command select handler */
  onCommandSelect?: (command: Command) => void;
  /** Additional CSS class */
  className?: string;
}

interface Command {
  id: string;
  label: string;
  icon?: IconComponent;
  onSelect: () => void;
  shortcut?: string[];
  keywords?: string[];
  disabled?: boolean;
}

interface CommandGroup {
  title: string;
  commands: Command[];
}
```

## Design Principles

Following "The Spexop Way":

1. **Borders before shadows** - Clean modal design
2. **Typography before decoration** - Clear command labels
3. **Tokens before magic numbers** - Uses design tokens
4. **Accessibility before aesthetics** - Full keyboard navigation

## Accessibility

- ✅ Focus trap when open
- ✅ Keyboard navigation (Arrow keys, Enter, Escape)
- ✅ Screen reader support
- ✅ ARIA labels and roles
- ✅ Highlighted selection visible
- ✅ Search input accessible
- ✅ WCAG AA+ compliant

### Keyboard Shortcuts

- `⌘K` / `Ctrl+K` - Open palette (global)
- `Arrow Up/Down` - Navigate commands
- `Enter` - Execute selected command
- `Escape` - Close palette
- `Backspace` - Clear search (when empty)
- `Tab` - Cycle through commands

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `SearchBar` - Search input
- `SearchModal` - Full-screen search
- `Modal` - Dialog overlay
- `KeyboardShortcut` - Shortcut display

## Best Practices

1. **Provide keyboard shortcuts** - Show shortcuts for common actions
2. **Use fuzzy search** - Be forgiving with typos
3. **Group logically** - Organize commands by category
4. **Track recent actions** - Show frequently used commands
5. **Keep labels action-oriented** - Use verbs ("Go to", "Create", "Open")

## License

MIT
