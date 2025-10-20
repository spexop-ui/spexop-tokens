# ScrollHeader Sidebar Integration

## Overview

Fixed the ScrollHeader component to properly position itself relative to the Sidebar, preventing overflow issues and ensuring proper centering across all screen sizes.

## Problem

The ScrollHeader was being overflown by the Sidebar due to incorrect z-index layering and lack of dynamic positioning. Additionally, on mobile, it was appearing on top of the AppBar. The header needed to:

1. Stay above the sidebar in the stacking context
2. Position below the AppBar on mobile devices (< 768px)
3. Adjust its position when the sidebar is visible vs hidden
4. Center properly on all screen sizes
5. Smoothly transition when sidebar state changes

## Solution

### 1. Z-Index Hierarchy

Updated z-index values to establish proper stacking order:

```css
/* Before */
z-index: var(--s-z-index-sticky, 400);

/* After */
z-index: 500; /* Above sidebar (200), appbar (300), and sticky content (400) */
```

### 2. Mobile AppBar Integration

Positioned ScrollHeader below AppBar on mobile devices:

```css
/* Mobile (< 768px) */
@media (max-width: 767px) {
  .scrollHeader {
    top: 64px; /* AppBar height */
    height: 56px;
    /* Slide from above AppBar when hidden */
    transform: translateY(calc(-100% - 64px));
  }

  .scrollHeader.visible {
    transform: translateY(0);
  }
}
```

### 3. Dynamic Positioning

Added `sidebarState` prop to ScrollHeader component:

```typescript
interface ScrollHeaderProps {
  // ... existing props
  /** Sidebar state for responsive positioning (default: "hidden") */
  sidebarState?: "icons" | "hidden";
}
```

### 4. Responsive Positioning

Implemented dynamic positioning based on screen size:

**Mobile (< 768px):**

- Top: 64px (below AppBar)
- Left: 0px (no sidebar offset)
- Transform: `translateY(calc(-100% - 64px))` when hidden, `translateY(0)` when visible

**Tablet/Desktop (≥ 768px):**

- Top: 0px (top of viewport)
- Left: Dynamic offset based on sidebar state
  - `icons` state: 96px offset
  - `hidden` state: 0px offset

```typescript
const calculateOffset = () => {
  // Mobile: no sidebar offset (sidebar is below AppBar)
  if (window.innerWidth < 768) {
    return 0;
  }
  // Tablet/Desktop: account for sidebar width when visible
  return sidebarState === "icons" ? 96 : 0;
};
```

### 5. Smooth Transitions

Added smooth transition for left offset changes:

```css
transition: 
  opacity var(--s-duration-normal) var(--s-ease-smooth),
  transform var(--s-duration-normal) var(--s-ease-smooth),
  left var(--s-duration-normal) var(--s-ease-smooth);
```

### 6. Window Resize Handling

Added resize listener to recalculate offset when window size changes:

```typescript
useEffect(() => {
  const updateOffset = () => {
    setSidebarOffset(calculateOffset());
  };

  // Initial calculation
  updateOffset();

  // Listen for resize events
  window.addEventListener("resize", updateOffset);

  return () => window.removeEventListener("resize", updateOffset);
}, [sidebarState]);
```

## Changes Made

### Files Modified

1. **packages/react/src/components/ScrollHeader/ScrollHeader.types.ts**
   - Added `sidebarState` prop to `ScrollHeaderProps`

2. **packages/react/src/components/ScrollHeader/ScrollHeader.tsx**
   - Added `sidebarState` prop with default value `"hidden"`
   - Added state management for `sidebarOffset`
   - Implemented dynamic offset calculation
   - Added window resize listener
   - Applied dynamic left offset via inline style

3. **packages/react/src/components/ScrollHeader/ScrollHeader.module.css**
   - Updated z-index from `var(--s-z-index-sticky, 400)` to `500`
   - Added `justify-content: center` for proper centering
   - Added `left` to transition properties
   - Removed hardcoded `left: 96px` media query (now handled dynamically)
   - Mobile: Added `top: 64px` to position below AppBar
   - Mobile: Added custom transform `translateY(calc(-100% - 64px))` for proper slide animation

4. **apps/website/src/pages/HomePage.tsx**
   - Added `sidebarState={context.sidebarState}` prop to ScrollHeader

5. **packages/react/src/components/ScrollHeader/scroll-header-component.md**
   - Updated basic example to include `sidebarState` prop
   - Added documentation for sidebar integration feature
   - Updated API reference table

6. **.github/copilot-instructions.md**
   - Documented ScrollHeader requirement for `sidebarState` prop

## Behavior

### Mobile (< 768px)

- Top position: **64px** (below AppBar)
- Left offset: **0px** (no sidebar adjustment)
- ScrollHeader spans full width
- Height: **56px** (compact)
- Slides from above AppBar when appearing (`translateY(calc(-100% - 64px))` → `translateY(0)`)
- Sidebar is below AppBar, not overlapping

### Tablet (768px - 1023px)

- Left offset: **96px** when sidebar is `icons`, **0px** when `hidden`
- ScrollHeader adjusts position smoothly
- Content remains centered

### Desktop (≥ 1024px)

- Left offset: **96px** when sidebar is `icons`, **0px** when `hidden`
- ScrollHeader adjusts position smoothly
- Content remains centered

## Usage

```tsx
import { ScrollHeader } from '@spexop/react';
import { useSContext } from '../providers/SProvider';

function MyPage() {
  const context = useSContext();
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <ScrollHeader
      sections={pageSections}
      scrollThreshold={250}
      activeSection={activeSection}
      onSectionClick={setActiveSection}
      sidebarState={context.sidebarState} // Required for proper positioning
    />
  );
}
```

## Benefits

1. **No Overflow**: ScrollHeader stays above sidebar in z-index hierarchy
2. **Proper Centering**: Content is properly centered on all screen sizes
3. **Responsive**: Adjusts automatically to sidebar state changes
4. **Smooth UX**: Transitions smoothly when sidebar toggles
5. **Maintainable**: Uses design system tokens and global state management

## Testing

### Build Verification

```bash
pnpm --filter @spexop/react build
```

✅ Build successful with no errors

### Linter Verification

```bash
pnpm lint
```

✅ No linter errors

## Related Documentation

- `packages/react/src/components/ScrollHeader/scroll-header-component.md` - Component documentation
- `docs/global-state-management.md` - SProvider and sidebar state management
- `docs/layout-architecture.md` - Layout system architecture
- `.github/copilot-instructions.md` - Development guidelines

## Future Considerations

1. **Custom Sidebar Width**: If sidebar width becomes configurable, update offset calculation
2. **Additional Breakpoints**: If new breakpoints are added, update responsive logic
3. **Z-Index Tokens**: Consider creating z-index tokens in @spexop/tokens package
4. **Animation Preferences**: Respect `prefers-reduced-motion` for transitions

## Conclusion

The ScrollHeader now properly integrates with the Sidebar, preventing overflow issues and providing a seamless user experience across all screen sizes and sidebar states. The implementation follows the design system's patterns and uses global state management for consistency.
