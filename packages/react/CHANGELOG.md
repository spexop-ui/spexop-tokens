# Changelog

All notable changes to @spexop/react will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2025-10-20

### Added

- Theme system integration via @spexop/theme
- UnifiedThemeProvider for runtime theme switching and configuration
- Support for pre-built CSS themes (13 presets)
- ThemeProvider export (alias for UnifiedThemeProvider)
- useTheme hook for accessing theme context

### Changed

- All components now support theme system with --theme-* CSS variables
- Updated component styling to be fully themeable
- Improved TypeScript types for theme integration

### Removed

- Dependency on @spexop/tokens (deprecated in favor of @spexop/theme)
- Dependency on @spexop/utils (unused, private package)

### Migration from v0.1.0

No breaking changes - fully backward compatible. Theme system is opt-in:

**Without theme** (still works):

```typescript
import { Grid, Button } from '@spexop/react';
// Works exactly as before
```

**With theme** (new capability):

```typescript
import { Grid, Button, ThemeProvider } from '@spexop/react';
import { techPreset } from '@spexop/theme';

<ThemeProvider theme={techPreset}>
  <Grid><Button>Themed Button</Button></Grid>
</ThemeProvider>
```

## [0.1.0] - 2025-10-15

### Added

Initial release of @spexop/react with 60+ production-ready components.

#### Grid Primitives (5 components)

- Grid - Responsive CSS Grid with columns, gap, alignment
- GridItem - Grid child with span, positioning, areas
- Stack - Flexbox stacking (horizontal/vertical)
- Container - Max-width wrapper with responsive padding
- Spacer - Quick spacing utility

#### Navigation (5 components)

- TopBar - Fixed header with logo, search, actions
- Sidebar - Tree-based sidebar with responsive behavior
- NavSection - Accordion sections for sidebar
- NavLink - Individual navigation links
- SidebarFooter - Footer area for version selectors

#### Forms (7 components)

- TextInput - Text input with label, error, helper text
- TextArea - Multi-line text input
- Select - Dropdown select with options
- RadioGroup - Radio button group
- Toggle - Switch/toggle component
- Slider - Range slider control
- SearchBar - Search input with shortcuts

#### Buttons (5 components)

- Button - 7 variants (primary, secondary, outline, ghost, text, pill, border-emphasis)
- ButtonGroup - Connected buttons (horizontal/vertical)
- SegmentedButton - Radio-style button selection
- SplitButton - Primary action + dropdown menu
- ButtonGridItem - Interactive media card

#### Cards (5 components)

- Card - Container with 6 variants
- CardHeader, CardBody, CardFooter - Card sub-components
- ServiceCard - Specialized card with animations

#### Layout (6 components)

- Section - Page section with variants
- Hero - Hero section with multiple variants
- Footer - Page footer with links
- ContextNav - Sticky navigation
- StickySection - Section that sticks on scroll
- PanelSection - Collapsible panel

#### Overlays (5 components)

- Drawer - Side drawer/panel
- SearchModal - Full search interface
- SearchOverlay - Overlay with search results
- CommandPalette - Command/action palette
- Snackbar - Toast notifications

#### Display (4 components)

- Badge - Status badges and labels
- Icon - Icon wrapper
- IconButton - Icon-only button
- KeyboardShortcut - Keyboard shortcut display

#### Settings (3 components)

- SettingsPanel - Panel for app settings
- SettingsCard - Individual setting card
- SettingItem - Single setting item

#### Advanced (6 components)

- CodeBlock - Code syntax highlighting
- SegmentedControl - iOS-style control
- ThemeToggle - Light/dark mode toggle
- ScrollHeader - Scroll-reactive header
- SubmenuPanel - Nested menu panel
- Navigation - Legacy navigation

#### Animations (10+ components)

- Motion, FadeIn, SlideIn, ScaleUp, RotateIn, ZoomIn - Animation primitives
- Stagger - Staggered animations
- Reveal - Reveal on scroll
- AnimatedBackground - Animated backgrounds

#### Hooks (13 hooks)

- useAccordion - Accordion state management
- useBodyScrollLock - Lock body scroll
- useFocusTrap - Trap focus in container
- useEscapeKey - Handle Escape key
- useBreakpoint - Current breakpoint detection
- useMediaQuery - Media query matching
- useResponsiveValue - Responsive value resolution
- useScrollSpy - Scroll position tracking
- useTheme - Theme management
- useDebug - Debug utilities
- useIntersectionObserver - Intersection observer
- useMotionValue - Animation value tracking
- useSpring - Spring animations

#### Providers (2 providers)

- ThemeProvider - Theme context and management
- DebugProvider - Debug mode and utilities

#### Features

- Full TypeScript support with comprehensive type definitions
- CSS Modules for scoped styling
- Responsive design with breakpoint utilities
- Accessibility built-in (WCAG AA compliant)
- Tree-shakeable ESM bundle
- Theme support (light/dark modes)
- Integration with @spexop/tokens (452 design tokens)
- Integration with @spexop/icons (262 icons)

### Known Limitations

- Animation components are experimental and APIs may change in minor versions
- Some components have limited test coverage (will be expanded in patches)
- Documentation is being actively expanded

### Dependencies

- @spexop/tokens: ^0.2.2
- @spexop/icons: ^0.1.1
- react: ^18.2.0 || ^19.0.0 (peer)
- react-dom: ^18.2.0 || ^19.0.0 (peer)

### Package Info

- **Size**: ~260KB JS + ~198KB CSS (uncompressed)
- **Build**: ESM bundle with TypeScript definitions
- **License**: MIT
- **Repository**: <https://github.com/spexop-ui/spexop-design-system>

---

## [Unreleased]

Future releases will be documented here.
