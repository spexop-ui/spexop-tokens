# Theme System

The Spexop theme system provides pre-configured color schemes with automatic dark mode support. Themes allow you to maintain consistent styling across your application while offering flexibility for customization.

## Available Themes

### Minimal Theme (Default)

Clean, sophisticated black-based design for professional applications.

```typescript
import { minimalTheme, minimalDarkTheme } from "@spexop/tokens";
```

**Color Palette:**

- Primary: Near-black (#1a1a1a)
- Secondary: Cool gray
- Best for: Professional apps, portfolios, corporate sites

### Professional Theme

Modern blue-based theme for SaaS and business applications.

```typescript
import { professionalTheme, professionalDarkTheme } from "@spexop/tokens";
```

**Color Palette:**

- Primary: Professional blue (#2563eb)
- Secondary: Cool gray
- Best for: SaaS platforms, productivity tools, business apps

### Bold Theme

Vibrant red-based theme for brands that want to make a statement.

```typescript
import { boldTheme, boldDarkTheme } from "@spexop/tokens";
```

**Color Palette:**

- Primary: Bold red (#f44336)
- Secondary: Near-black
- Best for: Gaming, sports, brands wanting strong visual impact

## Theme Structure

Each theme provides consistent color properties:

```typescript
interface ThemeColors {
  // Primary colors (main brand color)
  primary: string;
  primaryHover: string;
  primaryActive: string;
  primaryText: string;        // Text color on primary background
  
  // Secondary colors (accent)
  secondary: string;
  secondaryHover: string;
  secondaryActive: string;
  secondaryText: string;      // Text color on secondary background
  
  // Surface colors (backgrounds)
  surface: string;
  surfaceHover: string;
  
  // Text colors
  text: string;               // Primary text
  textMuted: string;          // Secondary text
  textInverted: string;       // Text on dark backgrounds
}
```

## Basic Usage

### Using Pre-built Themes

```typescript
import { minimalTheme } from "@spexop/tokens";

const buttonStyles = {
  backgroundColor: minimalTheme.primary,
  color: minimalTheme.primaryText,
  '&:hover': {
    backgroundColor: minimalTheme.primaryHover
  }
};
```

### Accessing All Themes

```typescript
import { themes, lightThemes, darkThemes } from "@spexop/tokens";

// Access by name
const theme = themes.minimal;
const darkTheme = darkThemes.minimal;

// Iterate over themes
Object.entries(lightThemes).forEach(([name, theme]) => {
  console.log(`${name}: ${theme.primary}`);
});
```

### Using Default Theme

```typescript
import { defaultTheme, defaultDarkTheme } from "@spexop/tokens";

// Defaults to minimal theme
const styles = {
  color: defaultTheme.text,
  backgroundColor: defaultTheme.surface
};
```

## Dark Mode Support

Each theme has a corresponding dark variant:

```typescript
import { 
  minimalTheme, 
  minimalDarkTheme,
  professionalTheme,
  professionalDarkTheme 
} from "@spexop/tokens";

function App() {
  const [isDark, setIsDark] = useState(false);
  const theme = isDark ? minimalDarkTheme : minimalTheme;
  
  return (
    <div style={{ 
      backgroundColor: theme.surface,
      color: theme.text 
    }}>
      <button 
        style={{ 
          backgroundColor: theme.primary,
          color: theme.primaryText 
        }}
      >
        Click me
      </button>
    </div>
  );
}
```

### Detecting System Preference

```typescript
import { sMediaDarkScheme } from "@spexop/tokens";

// CSS-in-JS
const styles = {
  root: {
    backgroundColor: minimalTheme.surface,
    color: minimalTheme.text,
    
    [`@media screen and ${sMediaDarkScheme}`]: {
      backgroundColor: minimalDarkTheme.surface,
      color: minimalDarkTheme.text
    }
  }
};
```

## Advanced Usage

### Dynamic Theme Switching

```typescript
import { lightThemes, darkThemes, type ThemeName } from "@spexop/tokens";

function useTheme() {
  const [themeName, setThemeName] = useState<ThemeName>("minimal");
  const [isDark, setIsDark] = useState(false);
  
  const theme = isDark 
    ? darkThemes[themeName] 
    : lightThemes[themeName];
  
  return { theme, setThemeName, isDark, setIsDark };
}

// Usage
function App() {
  const { theme, setThemeName, setIsDark } = useTheme();
  
  return (
    <div style={{ backgroundColor: theme.surface }}>
      <select onChange={(e) => setThemeName(e.target.value as ThemeName)}>
        <option value="minimal">Minimal</option>
        <option value="professional">Professional</option>
        <option value="bold">Bold</option>
      </select>
      
      <button onClick={() => setIsDark(prev => !prev)}>
        Toggle Dark Mode
      </button>
    </div>
  );
}
```

### CSS Variables Integration

```typescript
import { minimalTheme } from "@spexop/tokens";

// Set CSS variables based on theme
function applyTheme(theme: ThemeColors) {
  const root = document.documentElement;
  root.style.setProperty('--theme-primary', theme.primary);
  root.style.setProperty('--theme-text', theme.text);
  root.style.setProperty('--theme-surface', theme.surface);
}

applyTheme(minimalTheme);
```

```css
/* Use in CSS */
.button {
  background-color: var(--theme-primary);
  color: var(--theme-text);
}
```

### Creating Custom Themes

Extend or create custom themes based on existing ones:

```typescript
import { minimalTheme, type ThemeColors } from "@spexop/tokens";
import { sColorBlue600 } from "@spexop/tokens";

const customTheme: ThemeColors = {
  ...minimalTheme,
  primary: sColorBlue600,        // Override primary color
  primaryText: '#ffffff',
};
```

### React Context Provider Example

```typescript
import { createContext, useContext } from 'react';
import { minimalTheme, type ThemeColors } from "@spexop/tokens";

const ThemeContext = createContext<ThemeColors>(minimalTheme);

export function ThemeProvider({ 
  theme, 
  children 
}: { 
  theme: ThemeColors;
  children: React.ReactNode;
}) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// Usage
function Button() {
  const theme = useTheme();
  return (
    <button style={{ 
      backgroundColor: theme.primary,
      color: theme.primaryText 
    }}>
      Click me
    </button>
  );
}
```

## Best Practices

### 1. Use Theme Properties Consistently

```typescript
// ✅ Good - Uses theme properties
const styles = {
  color: theme.text,
  backgroundColor: theme.surface
};

// ❌ Bad - Hardcoded colors
const styles = {
  color: '#1a1a1a',
  backgroundColor: '#ffffff'
};
```

### 2. Always Provide Dark Mode Support

```typescript
// ✅ Good - Supports both modes
const theme = isDarkMode ? minimalDarkTheme : minimalTheme;

// ❌ Bad - Light mode only
const theme = minimalTheme;
```

### 3. Use State Colors for Interactive Elements

```typescript
// ✅ Good - Uses hover/active states
const buttonStyles = {
  backgroundColor: theme.primary,
  '&:hover': {
    backgroundColor: theme.primaryHover
  },
  '&:active': {
    backgroundColor: theme.primaryActive
  }
};
```

### 4. Consider Accessibility

```typescript
// Ensure sufficient contrast between text and background
const hasGoodContrast = checkContrast(theme.text, theme.surface) >= 4.5;
```

## TypeScript Support

Full type definitions included:

```typescript
import type { 
  ThemeColors,    // Theme structure
  ThemeName,      // "minimal" | "professional" | "bold"
  ColorMode       // "light" | "dark"
} from "@spexop/tokens";

const themeName: ThemeName = "professional";
const mode: ColorMode = "dark";
```

## Framework Examples

### React with styled-components

```typescript
import styled, { ThemeProvider } from 'styled-components';
import { minimalTheme } from "@spexop/tokens";

const Button = styled.button`
  background-color: ${props => props.theme.primary};
  color: ${props => props.theme.primaryText};
  
  &:hover {
    background-color: ${props => props.theme.primaryHover};
  }
`;

function App() {
  return (
    <ThemeProvider theme={minimalTheme}>
      <Button>Click me</Button>
    </ThemeProvider>
  );
}
```

### Vue with Composition API

```typescript
import { ref, computed } from 'vue';
import { minimalTheme, minimalDarkTheme } from "@spexop/tokens";

export function useTheme() {
  const isDark = ref(false);
  
  const theme = computed(() => 
    isDark.value ? minimalDarkTheme : minimalTheme
  );
  
  return { theme, isDark };
}
```

### Angular with Services

```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { minimalTheme, minimalDarkTheme, type ThemeColors } from "@spexop/tokens";

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private isDarkSubject = new BehaviorSubject(false);
  isDark$ = this.isDarkSubject.asObservable();
  
  get theme(): ThemeColors {
    return this.isDarkSubject.value ? minimalDarkTheme : minimalTheme;
  }
  
  toggleDarkMode() {
    this.isDarkSubject.next(!this.isDarkSubject.value);
  }
}
```

## Related Documentation

- [Main README](../README.md) - Package overview
- [Semantic Tokens](../semantic/README.md) - Theme-aware semantic tokens
- [Color Tokens](../color/) - Base color palette
