# Stack Component - Comprehensive Usage Guide

Version: 0.2.0
Package: @spexop/react
Status: Production Ready

## Table of Contents

- [Overview](#overview)
- [Core Concepts](#core-concepts)
- [Direction Switching Patterns](#direction-switching-patterns)
- [Alignment and Justification Strategies](#alignment-and-justification-strategies)
- [Wrapping Behaviors](#wrapping-behaviors)
- [Nested Stack Patterns](#nested-stack-patterns)
- [Real-World Examples](#real-world-examples)
- [Common Pitfalls](#common-pitfalls)
- [Performance Considerations](#performance-considerations)
- [Accessibility](#accessibility)
- [API Reference](#api-reference)

## Overview

Stack is one of the 5 core primitives in the Spexop design system. It provides a simple flexbox-based layout for stacking elements vertically or horizontally with consistent spacing using design tokens.

### When to Use Stack

- Vertical or horizontal stacking of elements
- Button groups with consistent spacing
- Form layouts
- Card lists
- Navigation bars
- Toolbars
- Simple one-dimensional layouts

### When NOT to Use Stack

- Multi-column grid layouts (use Grid)
- Complex two-dimensional positioning (use Grid)
- Single spacing between two elements (use Spacer)
- Content width constraints (use Container)

## Core Concepts

### Direction

- **Vertical** (default): Stacks children top to bottom
- **Horizontal**: Arranges children left to right

### Gap

Uses spacing tokens (0-10) for consistent gaps between children:

- 0 = 0px (no gap)
- 1 = 4px (minimal)
- 2 = 8px (tight)
- 3 = 12px (compact)
- 4 = 16px (standard)
- 5 = 20px (comfortable)
- 6 = 24px (generous)
- 7 = 32px (large)
- 8 = 40px (spacious)
- 9 = 48px (extra spacious)
- 10 = 64px (maximum)

### Alignment

Controls cross-axis positioning:

- **start**: Align to start (top for vertical, left for horizontal)
- **center**: Center align
- **end**: Align to end (bottom for vertical, right for horizontal)
- **stretch** (default): Stretch to fill cross-axis
- **baseline**: Align baselines (useful for text)

### Justification

Controls main-axis distribution:

- **start** (default): Pack to start
- **center**: Center content
- **end**: Pack to end
- **space-between**: Even distribution with edges
- **space-around**: Even distribution with half-size edges
- **space-evenly**: Even distribution including edges

### Wrapping

Optional `wrap` prop allows items to wrap to next line when space runs out.

## Direction Switching Patterns

### Basic Vertical Stack

```tsx
<Stack direction="vertical" gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

### Basic Horizontal Stack

```tsx
<Stack direction="horizontal" gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>
```

### Responsive Direction

Mobile stacked, desktop horizontal:

```tsx
<Stack direction={{ xs: "vertical", md: "horizontal" }} gap={6}>
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</Stack>
```

### Form Layout Direction

```tsx
<Stack direction={{ xs: "vertical", lg: "horizontal" }} gap={4}>
  <TextInput label="First Name" />
  <TextInput label="Last Name" />
</Stack>
```

### Action Button Direction

```tsx
<Stack 
  direction={{ xs: "vertical", sm: "horizontal" }} 
  gap={3}
  justify="end"
>
  <Button variant="ghost">Cancel</Button>
  <Button variant="primary">Submit</Button>
</Stack>
```

## Alignment and Justification Strategies

### Vertical Stack Alignment

Controls horizontal positioning:

```tsx
// Left-aligned (default with stretch)
<Stack direction="vertical" gap={4} align="start">
  <div style={{ width: '200px' }}>Left-aligned</div>
  <div style={{ width: '150px' }}>Left-aligned</div>
</Stack>

// Center-aligned
<Stack direction="vertical" gap={4} align="center">
  <div style={{ width: '200px' }}>Centered</div>
  <div style={{ width: '150px' }}>Centered</div>
</Stack>

// Right-aligned
<Stack direction="vertical" gap={4} align="end">
  <div style={{ width: '200px' }}>Right-aligned</div>
  <div style={{ width: '150px' }}>Right-aligned</div>
</Stack>

// Stretched (default)
<Stack direction="vertical" gap={4} align="stretch">
  <div>Full width</div>
  <div>Full width</div>
</Stack>
```

### Horizontal Stack Alignment

Controls vertical positioning:

```tsx
// Top-aligned
<Stack direction="horizontal" gap={4} align="start">
  <div style={{ height: '100px' }}>Tall</div>
  <div style={{ height: '60px' }}>Short</div>
</Stack>

// Center-aligned
<Stack direction="horizontal" gap={4} align="center">
  <div style={{ height: '100px' }}>Tall</div>
  <div style={{ height: '60px' }}>Short</div>
</Stack>

// Bottom-aligned
<Stack direction="horizontal" gap={4} align="end">
  <div style={{ height: '100px' }}>Tall</div>
  <div style={{ height: '60px' }}>Short</div>
</Stack>

// Baseline-aligned (for text)
<Stack direction="horizontal" gap={4} align="baseline">
  <h1>$99</h1>
  <span>per month</span>
</Stack>
```

### Justification Patterns

```tsx
// Start (default)
<Stack direction="horizontal" gap={4} justify="start">
  <button>Left</button>
  <button>Aligned</button>
</Stack>

// Center
<Stack direction="horizontal" gap={4} justify="center">
  <button>Centered</button>
  <button>Buttons</button>
</Stack>

// End
<Stack direction="horizontal" gap={4} justify="end">
  <button>Right</button>
  <button>Aligned</button>
</Stack>

// Space Between
<Stack direction="horizontal" gap={4} justify="space-between">
  <button>Left</button>
  <button>Right</button>
</Stack>

// Space Around
<Stack direction="horizontal" gap={4} justify="space-around">
  <button>Evenly</button>
  <button>Distributed</button>
</Stack>

// Space Evenly
<Stack direction="horizontal" gap={4} justify="space-evenly">
  <button>Perfectly</button>
  <button>Even</button>
</Stack>
```

### Combined Alignment and Justification

```tsx
// Centered both ways
<Stack 
  direction="vertical" 
  gap={4}
  align="center"
  justify="center"
  style={{ minHeight: '400px' }}
>
  <h2>Perfectly Centered</h2>
  <button>Call to Action</button>
</Stack>

// Bottom-right corner
<Stack 
  direction="horizontal" 
  gap={3}
  align="end"
  justify="end"
>
  <Button variant="ghost">Cancel</Button>
  <Button variant="primary">Submit</Button>
</Stack>
```

## Wrapping Behaviors

### Basic Wrapping

```tsx
<Stack direction="horizontal" gap={2} wrap>
  <Badge>Tag 1</Badge>
  <Badge>Tag 2</Badge>
  <Badge>Tag 3</Badge>
  <Badge>Tag 4</Badge>
  <Badge>Tag 5</Badge>
  {/* Wraps to next line when space runs out */}
</Stack>
```

### Tag Cloud

```tsx
<Stack direction="horizontal" gap={3} wrap>
  {tags.map(tag => (
    <Badge key={tag.id}>{tag.name}</Badge>
  ))}
</Stack>
```

### Responsive Navigation

```tsx
<Stack 
  direction="horizontal" 
  gap={4}
  wrap
  align="center"
>
  <a href="/">Home</a>
  <a href="/features">Features</a>
  <a href="/pricing">Pricing</a>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
  {/* Wraps on small screens */}
</Stack>
```

### Action Chips

```tsx
<Stack direction="horizontal" gap={2} wrap>
  <button>Filter 1</button>
  <button>Filter 2</button>
  <button>Filter 3</button>
  <button>Filter 4</button>
  <button>Clear All</button>
</Stack>
```

### Responsive Wrapping

```tsx
// Wrap only on mobile
<Stack 
  direction="horizontal"
  gap={3}
  wrap={width < 768}  // Conditional wrapping
>
  <button>Action 1</button>
  <button>Action 2</button>
  <button>Action 3</button>
</Stack>
```

## Nested Stack Patterns

### Vertical with Horizontal Children

```tsx
<Stack direction="vertical" gap={8}>
  <h1>Page Title</h1>
  
  <Stack direction="horizontal" gap={4}>
    <button>Action 1</button>
    <button>Action 2</button>
    <button>Action 3</button>
  </Stack>
  
  <p>Page content...</p>
</Stack>
```

### Sidebar Layout

```tsx
<Stack direction="horizontal" gap={6}>
  {/* Sidebar */}
  <Stack direction="vertical" gap={4} style={{ flex: '0 0 250px' }}>
    <h3>Navigation</h3>
    <a href="/dashboard">Dashboard</a>
    <a href="/settings">Settings</a>
    <a href="/profile">Profile</a>
  </Stack>
  
  {/* Main Content */}
  <Stack direction="vertical" gap={6} style={{ flex: 1 }}>
    <h1>Main Content</h1>
    <p>Content goes here...</p>
  </Stack>
</Stack>
```

### Card with Actions

```tsx
<Stack direction="vertical" gap={6}>
  {items.map(item => (
    <Card key={item.id}>
      <Stack direction="vertical" gap={4}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        
        <Stack direction="horizontal" gap={3} justify="end">
          <Button variant="ghost">Edit</Button>
          <Button variant="ghost">Delete</Button>
          <Button variant="primary">View</Button>
        </Stack>
      </Stack>
    </Card>
  ))}
</Stack>
```

### Complex Form Layout

```tsx
<Stack direction="vertical" gap={8}>
  <h2>Registration Form</h2>
  
  {/* Email field */}
  <TextInput label="Email" type="email" />
  
  {/* Name fields side by side */}
  <Stack direction={{ xs: "vertical", md: "horizontal" }} gap={4}>
    <TextInput label="First Name" />
    <TextInput label="Last Name" />
  </Stack>
  
  {/* Address fields */}
  <TextInput label="Street Address" />
  
  <Stack direction={{ xs: "vertical", md: "horizontal" }} gap={4}>
    <TextInput label="City" />
    <Select label="State" />
    <TextInput label="ZIP" />
  </Stack>
  
  {/* Submit buttons */}
  <Stack direction="horizontal" gap={3} justify="end">
    <Button variant="ghost">Cancel</Button>
    <Button variant="primary" type="submit">Create Account</Button>
  </Stack>
</Stack>
```

### Dashboard Layout

```tsx
<Stack direction="vertical" gap={8}>
  {/* Header with actions */}
  <Stack direction="horizontal" justify="space-between" align="center">
    <h1>Dashboard</h1>
    <Stack direction="horizontal" gap={3}>
      <button>Export</button>
      <button>Settings</button>
      <Button variant="primary">New Item</Button>
    </Stack>
  </Stack>
  
  {/* Stats row */}
  <Stack direction={{ xs: "vertical", md: "horizontal" }} gap={6}>
    <StatsCard title="Users" value="1,234" />
    <StatsCard title="Revenue" value="$5,678" />
    <StatsCard title="Orders" value="890" />
  </Stack>
  
  {/* Content cards */}
  <Stack direction="vertical" gap={6}>
    <Card>Chart content...</Card>
    <Card>Table content...</Card>
  </Stack>
</Stack>
```

## Real-World Examples

### Button Group

```tsx
function ButtonGroup() {
  return (
    <Stack direction="horizontal" gap={3} justify="end">
      <Button variant="ghost">Cancel</Button>
      <Button variant="secondary">Save Draft</Button>
      <Button variant="primary">Publish</Button>
    </Stack>
  );
}
```

### Navigation Bar

```tsx
function NavigationBar() {
  return (
    <Stack 
      as="nav"
      direction="horizontal"
      gap={6}
      align="center"
      justify="space-between"
    >
      <div className="logo">Logo</div>
      
      <Stack direction="horizontal" gap={4}>
        <a href="/">Home</a>
        <a href="/features">Features</a>
        <a href="/pricing">Pricing</a>
        <a href="/about">About</a>
      </Stack>
      
      <Button variant="primary">Sign In</Button>
    </Stack>
  );
}
```

### Form with Validation

```tsx
function LoginForm() {
  return (
    <Stack direction="vertical" gap={6}>
      <h2>Sign In</h2>
      
      <Stack direction="vertical" gap={4}>
        <TextInput 
          label="Email" 
          type="email"
          error={emailError}
        />
        <TextInput 
          label="Password" 
          type="password"
          error={passwordError}
        />
      </Stack>
      
      <Stack direction="horizontal" gap={3} justify="space-between" align="center">
        <Checkbox label="Remember me" />
        <a href="/forgot-password">Forgot password?</a>
      </Stack>
      
      <Stack direction="horizontal" gap={3}>
        <Button variant="ghost" style={{ flex: 1 }}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" style={{ flex: 1 }}>
          Sign In
        </Button>
      </Stack>
    </Stack>
  );
}
```

### Toolbar

```tsx
function Toolbar() {
  return (
    <Stack 
      direction="horizontal"
      gap={6}
      align="center"
      justify="space-between"
      style={{ 
        padding: 'var(--theme-spacing-4)',
        borderBottom: '1px solid var(--theme-border)'
      }}
    >
      {/* Left side - formatting tools */}
      <Stack direction="horizontal" gap={2}>
        <IconButton icon={<Bold />} />
        <IconButton icon={<Italic />} />
        <IconButton icon={<Underline />} />
        <Spacer size={2} direction="horizontal" />
        <IconButton icon={<Link />} />
        <IconButton icon={<Image />} />
      </Stack>
      
      {/* Right side - actions */}
      <Stack direction="horizontal" gap={3}>
        <Button variant="ghost">Save</Button>
        <Button variant="primary">Publish</Button>
      </Stack>
    </Stack>
  );
}
```

### Pricing Card

```tsx
function PricingCard({ plan, price, features }) {
  return (
    <Card>
      <Stack direction="vertical" gap={6} align="center">
        <h3>{plan}</h3>
        
        <Stack direction="horizontal" gap={2} align="baseline">
          <span style={{ fontSize: '3rem', fontWeight: 'bold' }}>
            ${price}
          </span>
          <span>/month</span>
        </Stack>
        
        <Stack direction="vertical" gap={3} style={{ width: '100%' }}>
          {features.map((feature, index) => (
            <Stack key={index} direction="horizontal" gap={2} align="center">
              <Icon name="Check" />
              <span>{feature}</span>
            </Stack>
          ))}
        </Stack>
        
        <Button variant="primary" style={{ width: '100%' }}>
          Choose Plan
        </Button>
      </Stack>
    </Card>
  );
}
```

### Comment Thread

```tsx
function CommentThread({ comments }) {
  return (
    <Stack direction="vertical" gap={6}>
      {comments.map(comment => (
        <Stack key={comment.id} direction="horizontal" gap={4}>
          <img 
            src={comment.avatar}
            alt={comment.author}
            style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          />
          
          <Stack direction="vertical" gap={2} style={{ flex: 1 }}>
            <Stack direction="horizontal" gap={3} align="center">
              <strong>{comment.author}</strong>
              <time>{comment.timestamp}</time>
            </Stack>
            
            <p>{comment.content}</p>
            
            <Stack direction="horizontal" gap={4}>
              <button>Reply</button>
              <button>Like</button>
              <button>Share</button>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
```

### Alert Banner

```tsx
function Alert({ type, message, onClose }) {
  return (
    <div className={`alert alert-${type}`}>
      <Stack direction="horizontal" gap={4} align="center" justify="space-between">
        <Stack direction="horizontal" gap={3} align="center">
          <Icon name={type === 'success' ? 'CheckCircle' : 'AlertCircle'} />
          <span>{message}</span>
        </Stack>
        
        <button onClick={onClose}>
          <Icon name="X" />
        </button>
      </Stack>
    </div>
  );
}
```

## Common Pitfalls

### Pitfall 1: Wrong Direction for Layout

```tsx
// BAD - Horizontal stack for vertical layout
<Stack direction="horizontal" gap={4}>
  <h1>Title</h1>
  <p>Content</p>
  <button>Action</button>
</Stack>

// GOOD - Vertical stack for vertical layout
<Stack direction="vertical" gap={4}>
  <h1>Title</h1>
  <p>Content</p>
  <button>Action</button>
</Stack>
```

### Pitfall 2: Using Stack When Grid is Better

```tsx
// BAD - Stack for multi-column layout
<Stack direction="horizontal" gap={6}>
  <div style={{ flex: 1 }}>Column 1</div>
  <div style={{ flex: 1 }}>Column 2</div>
  <div style={{ flex: 1 }}>Column 3</div>
</Stack>

// GOOD - Grid for multi-column layout
<Grid columns={3} gap={6}>
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</Grid>
```

### Pitfall 3: Inline Styles for Gap

```tsx
// BAD - Inline gap bypasses design tokens
<Stack direction="vertical" style={{ gap: '20px' }}>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>

// GOOD - Use gap prop with spacing scale
<Stack direction="vertical" gap={5}>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

### Pitfall 4: Forgetting Responsive Direction

```tsx
// BAD - Horizontal on mobile (cramped)
<Stack direction="horizontal" gap={4}>
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</Stack>

// GOOD - Vertical on mobile, horizontal on desktop
<Stack direction={{ xs: "vertical", md: "horizontal" }} gap={4}>
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</Stack>
```

### Pitfall 5: Misunderstanding Align vs Justify

```tsx
// BAD - Using align to center horizontally in horizontal stack
<Stack direction="horizontal" gap={4} align="center">
  {/* This centers vertically, not horizontally */}
  <button>Button</button>
</Stack>

// GOOD - Use justify to center horizontally
<Stack direction="horizontal" gap={4} justify="center">
  <button>Button</button>
</Stack>
```

## Performance Considerations

### Memoization

Stack memoizes class names:

```tsx
const classes = useMemo(() => {
  // Only recomputes when dependencies change
}, [currentDirection, currentGap, currentAlign, currentJustify, wrap]);
```

### Responsive Value Resolution

```tsx
// Efficient - Only re-renders on breakpoint changes
<Stack 
  direction={{ xs: "vertical", lg: "horizontal" }}
  gap={{ xs: 4, lg: 6 }}
>
  Content
</Stack>
```

### CSS Module Benefits

- Scoped class names (no conflicts)
- Dead code elimination
- Optimized bundle size
- Zero runtime style overhead

### Overflow Protection

Stack includes `min-width: 0` to prevent flex overflow:

```css
.stack {
  min-width: 0;
}

.stack > * {
  min-width: 0;
}
```

This prevents issues with long text, code blocks, or images that might overflow.

### Auto-Expand for Centering

When using centering or space distribution, Stack automatically expands to full width:

```css
.justifyCenter,
.justifySpaceBetween,
.justifySpaceAround,
.justifySpaceEvenly {
  width: 100%;
}
```

## Accessibility

### Semantic HTML

Use the `as` prop for semantic markup:

```tsx
<Stack as="nav" direction="horizontal" gap={4}>
  <a href="/">Home</a>
  <a href="/about">About</a>
</Stack>

<Stack as="ul" direction="vertical" gap={3}>
  <li>Item 1</li>
  <li>Item 2</li>
</Stack>
```

### Landmarks

Combine with ARIA landmarks:

```tsx
<Stack 
  as="nav"
  role="navigation"
  aria-label="Main navigation"
  direction="horizontal"
  gap={4}
>
  <a href="/">Home</a>
  <a href="/about">About</a>
</Stack>
```

### Keyboard Navigation

Stack preserves tab order:

```tsx
<Stack direction="horizontal" gap={4}>
  <button>Button 1</button>
  <button>Button 2</button>
  <button>Button 3</button>
  {/* Tab order: 1 → 2 → 3 */}
</Stack>
```

### Screen Reader Transparency

Stack is transparent to screen readers:

- Doesn't announce itself (purely layout)
- Maintains document structure
- Preserves reading order
- No ARIA attributes needed

## API Reference

### Props

```typescript
interface StackProps {
  // Content
  children: React.ReactNode;
  
  // Direction
  direction?: 
    | "vertical" 
    | "horizontal"
    | ResponsiveObject;        // Default: "vertical"
  
  // Gap between items
  gap?: SpacingScale | ResponsiveObject;  // Default: 4
  
  // Cross-axis alignment
  align?: 
    | "start" 
    | "center" 
    | "end" 
    | "stretch" 
    | "baseline"
    | ResponsiveObject;        // Default: "stretch"
  
  // Main-axis distribution
  justify?: 
    | "start" 
    | "center" 
    | "end" 
    | "space-between" 
    | "space-around" 
    | "space-evenly"
    | ResponsiveObject;        // Default: "start"
  
  // Wrapping
  wrap?: boolean;              // Default: false
  
  // Custom styles
  className?: string;
  style?: React.CSSProperties;
  
  // Polymorphic element
  as?: keyof JSX.IntrinsicElements;  // Default: "div"
}

type SpacingScale = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

type ResponsiveObject = {
  xs?: any;
  sm?: any;
  md?: any;
  lg?: any;
  xl?: any;
  "2xl"?: any;
};
```

### Defaults

```typescript
{
  direction: "vertical",
  gap: 4,
  align: "stretch",
  justify: "start",
  wrap: false,
  as: "div"
}
```

### Design Tokens

```css
/* Spacing tokens */
--theme-spacing-0: 0;
--theme-spacing-1: 4px;
--theme-spacing-2: 8px;
--theme-spacing-3: 12px;
--theme-spacing-4: 16px;
--theme-spacing-5: 20px;
--theme-spacing-6: 24px;
--theme-spacing-7: 32px;
--theme-spacing-8: 40px;
--theme-spacing-9: 48px;
--theme-spacing-10: 64px;
```

## Related Components

- **Grid** - Multi-dimensional layouts
- **GridItem** - Grid cell positioning
- **Container** - Width constraints and padding
- **Spacer** - Simple spacing utility

## Design Principles

Stack follows "The Spexop Way":

1. **Primitives before patterns** - Simple stacking primitive
2. **Tokens before magic numbers** - Uses spacing scale exclusively
3. **Composition before complexity** - Works with any content
4. **Standards before frameworks** - Standard flexbox implementation
5. **Accessibility before aesthetics** - Semantic HTML, screen reader friendly

## Further Reading

- [Grid Component USAGE-GUIDE](../Grid/USAGE-GUIDE.md)
- [Spacer Component USAGE-GUIDE](../Spacer/USAGE-GUIDE.md)
- [Container Component USAGE-GUIDE](../Container/USAGE-GUIDE.md)
- [Grid Primitives Guide](/docs/grid-primitives.md)
- [Flexbox - MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)

## License

MIT

## Author

Created by @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
