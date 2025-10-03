# Lucide Icons Integration Guide

## Why Lucide?

After careful consideration, **Spexop Design System recommends Lucide Icons** as the official icon solution rather than maintaining a separate icon package.

## Benefits of Using Lucide

### 1. **Quality & Consistency**

- Beautiful, stroke-based design that matches our minimal theme
- Professionally designed and maintained
- Consistent style across 1000+ icons

### 2. **Comprehensive Coverage**

- Over 1000 icons vs. a limited custom set
- Regular updates with new icons
- Covers all common UI needs

### 3. **Framework Support**

- React: `lucide-react`
- Vue 3: `lucide-vue-next`
- Angular: `lucide-angular`
- Svelte: `lucide-svelte`
- Vanilla JS: `lucide`

### 4. **Open Source & Free**

- ISC License (permissive)
- No attribution required
- Active community support

### 5. **Better Resource Allocation**

- Allows us to focus on unique design tokens and components
- Leverages a proven, well-maintained library
- Avoids duplication of effort

## Installation

```bash
# For React
npm install lucide-react

# For Vue 3
npm install lucide-vue-next

# For Angular
npm install lucide-angular

# For Svelte
npm install lucide-svelte

# For Vanilla JS
npm install lucide
```

## Integration with Spexop Tokens

Lucide icons integrate seamlessly with Spexop design tokens:

### React Example

```tsx
import { sColorPrimary, sSizeIconBase, sSizeIconLg } from '@spexop/tokens';
import { Search, Menu, X, ChevronRight } from 'lucide-react';

function MyComponent() {
  return (
    <>
      {/* Using token for color */}
      <Search color={sColorPrimary} size={24} />
      
      {/* Using token for size */}
      <Menu size={parseInt(sSizeIconBase)} />
      
      {/* Combining both */}
      <ChevronRight 
        color={sColorPrimary} 
        size={parseInt(sSizeIconLg)}
        strokeWidth={2}
      />
    </>
  );
}
```

### Vue 3 Example

```vue
<script setup>
import { sColorPrimary, sSizeIconBase } from '@spexop/tokens';
import { Search, Menu } from 'lucide-vue-next';
</script>

<template>
  <Search :color="sColorPrimary" :size="parseInt(sSizeIconBase)" />
  <Menu :size="24" />
</template>
```

### Vanilla JS Example

```javascript
import { sColorPrimary, sSizeIconBase } from '@spexop/tokens';
import { Search } from 'lucide';

const icon = Search;
icon.setAttribute('color', sColorPrimary);
icon.setAttribute('size', sSizeIconBase);

document.getElementById('icon-container').appendChild(icon);
```

## Common Icon Categories

Lucide provides comprehensive coverage for all UI needs:

### Navigation

- `ChevronRight`, `ChevronLeft`, `ChevronDown`, `ChevronUp`
- `ArrowRight`, `ArrowLeft`, `ArrowUp`, `ArrowDown`
- `Menu`, `X`, `Home`

### Actions

- `Search`, `Edit`, `Trash`, `Plus`, `Minus`
- `Settings`, `MoreHorizontal`, `MoreVertical`
- `Download`, `Upload`, `Share`

### UI Elements

- `Check`, `X`, `Heart`, `Star`
- `Eye`, `EyeOff`, `Lock`, `Unlock`
- `User`, `Users`, `Bell`

### Status/Alert

- `Info`, `AlertCircle`, `AlertTriangle`
- `CheckCircle`, `XCircle`

### Files & Data

- `File`, `FileText`, `Folder`
- `Image`, `Code`, `Database`

### Communication

- `Mail`, `MessageSquare`, `Phone`
- `Video`, `Send`

### Social

- `Github`, `Twitter`, `Linkedin`, `Facebook`

## Best Practices

### 1. **Use Token Sizes**

```tsx
import { sSizeIconSm, sSizeIconBase, sSizeIconLg } from '@spexop/tokens';

// Small icons (16px)
<Icon size={parseInt(sSizeIconSm)} />

// Base icons (20px)
<Icon size={parseInt(sSizeIconBase)} />

// Large icons (24px)
<Icon size={parseInt(sSizeIconLg)} />
```

### 2. **Use Token Colors**

```tsx
import { 
  sColorPrimary, 
  sColorTextSecondary,
  sColorError500 
} from '@spexop/tokens';

<Search color={sColorPrimary} />
<Menu color={sColorTextSecondary} />
<AlertTriangle color={sColorError500} />
```

### 3. **Accessibility**

```tsx
// React
<Search aria-label="Search" role="img" />

// Or use a wrapper with label
<button aria-label="Search">
  <Search aria-hidden="true" />
</button>
```

### 4. **Consistent Stroke Width**

```tsx
// Use consistent stroke width across your app
<Icon strokeWidth={2} /> // Default, matches our design
```

## Resources

- **Lucide Website**: [https://lucide.dev](https://lucide.dev)
- **Icon Browser**: [https://lucide.dev/icons](https://lucide.dev/icons)
- **GitHub**: [https://github.com/lucide-icons/lucide](https://github.com/lucide-icons/lucide)
- **Documentation**: [https://lucide.dev/guide/](https://lucide.dev/guide/)

## Migration from Other Libraries

### From Heroicons

Most Heroicons have direct Lucide equivalents with similar names.

### From Feather Icons

Lucide is a fork of Feather Icons with more icons and better maintenance.

### From Material Icons

Lucide's stroke-based style is different but comprehensive coverage exists.

## Support

For icon-specific questions:

- Lucide GitHub Issues: <https://github.com/lucide-icons/lucide/issues>
- Lucide Discord: Link in their GitHub repo

For Spexop integration questions:

- Spexop Issues: <https://github.com/spexop-ui/design-system/issues>

---

**Last Updated**: October 2025  
**Lucide Version**: 0.x (check latest)  
**Spexop Tokens Version**: 0.1.0

Special thanks to the Lucide team for their amazing work!
