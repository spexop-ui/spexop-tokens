# Spexop Templates System

Professional page templates built with Spexop components following modern UI/UX patterns and accessibility best practices.

## Overview

The Spexop templates system provides production-ready page templates that demonstrate best practices for building modern, accessible web interfaces. All templates follow "The Spexop Way" principles and are fully customizable.

## Features

- 10+ production-ready templates across multiple categories
- WCAG AAA accessibility compliance
- Semantic HTML5 with proper ARIA attributes
- Mobile-first responsive design
- Design token integration (zero magic numbers)
- Icon support with @spexop/icons
- Multiple export formats (React, HTML)
- Full TypeScript support
- Comprehensive customization options

## Available Templates

### Hero & Landing

#### heroCentered
Centered hero section with title, description, and call-to-action buttons. Perfect for landing pages and marketing sites.

**Features:**
- Semantic Main landmark
- Typography-driven hierarchy
- Mobile-optimized layout
- Proper heading structure

```typescript
import { heroCentered } from '@spexop/react/templates';
```

#### landingFeatureGrid
3-column responsive grid showcasing features or services with icons.

**Features:**
- Icon-enhanced feature cards
- Auto-fit responsive grid
- Section landmark with ARIA label
- Border-based card design

```typescript
import { landingFeatureGrid } from '@spexop/react/templates';
```

### Dashboard & Apps

#### dashboardSidebar
Classic sidebar navigation with main content area for dashboards and applications.

**Features:**
- Semantic Nav and Main landmarks
- Progressive breakpoints (xs, md, lg)
- Accessible navigation with aria-current
- Skip links for keyboard users
- Link-based navigation (not buttons)

```typescript
import { dashboardSidebar } from '@spexop/react/templates';
```

### Content

#### blogArticle
Article layout optimized for reading with narrow content column.

**Features:**
- Article landmark
- Optimized line length for readability
- Typography hierarchy with font-weight
- Semantic heading structure

```typescript
import { blogArticle } from '@spexop/react/templates';
```

#### docsNavigation
Documentation layout with persistent side navigation.

**Features:**
- Semantic navigation structure
- Multi-level navigation patterns
- Keyboard accessible
- Quick links and sections

```typescript
import { docsNavigation } from '@spexop/react/templates';
```

### Authentication

#### authLogin
Modern centered login form with email/password fields and social login options.

**Features:**
- Semantic Form with proper labels
- Focus management (initial focus on email)
- Accessible form controls
- Social login with icons
- Remember me checkbox
- Forgot password link

```typescript
import { authLogin } from '@spexop/react/templates';
```

### Error Pages

#### error404
Friendly 404 error page with helpful navigation and popular links.

**Features:**
- Large, clear error messaging
- Multiple navigation options
- Popular pages with icons
- Proper focus management

```typescript
import { error404 } from '@spexop/react/templates';
```

### Pricing

#### pricingTiers
3-tier pricing cards with feature comparison and clear CTAs.

**Features:**
- Responsive pricing grid
- Popular/recommended badges
- Icon-enhanced feature lists
- Clear visual hierarchy
- Progressive breakpoints

```typescript
import { pricingTiers } from '@spexop/react/templates';
```

### Portfolio & Gallery

#### portfolioGallery
Auto-fit card grid perfect for portfolios and image galleries.

**Features:**
- Responsive auto-fit grid
- Project cards with metadata
- Image placeholders
- Clean card design

```typescript
import { portfolioGallery } from '@spexop/react/templates';
```

### E-commerce

#### ecommerceProduct
Product page layout with image gallery and purchase details.

**Features:**
- 2-column responsive layout
- Image gallery with thumbnails
- Feature checklist with icons
- Clear CTAs

```typescript
import { ecommerceProduct } from '@spexop/react/templates';
```

### Navigation

#### headerNavigation
Sticky header with logo, main navigation, and CTA button.

**Features:**
- Sticky positioning with border-bottom
- Semantic Nav landmark
- Icon-enhanced logo
- Skip navigation link
- Primary CTA button

```typescript
import { headerNavigation } from '@spexop/react/templates';
```

#### footerComprehensive
Multi-column footer with links, social media, and legal information.

**Features:**
- Multi-column responsive layout
- Social media icons (Twitter, GitHub, LinkedIn)
- Organized link categories
- Legal links (Privacy, Terms, Cookies)
- Border-top separation

```typescript
import { footerComprehensive } from '@spexop/react/templates';
```

### Content Sections

#### ctaCentered
Centered call-to-action section with headline, copy, and action buttons.

**Features:**
- High-conversion layout
- Dual action buttons
- Icon-enhanced trust signals
- Background with border separation
- Compelling copy structure

```typescript
import { ctaCentered } from '@spexop/react/templates';
```

### UI States

#### stateLoading
Loading state with skeleton screens and spinner patterns.

**Features:**
- Loading spinner with animation
- Skeleton screen examples
- ARIA live regions
- Accessible loading feedback
- Semantic spacing tokens

```typescript
import { stateLoading } from '@spexop/react/templates';
```

#### stateEmpty
Empty state for no data or empty collections.

**Features:**
- Friendly empty messaging
- Clear call-to-action
- Icon-enhanced illustration
- Helpful tips section
- Proper ARIA regions

```typescript
import { stateEmpty } from '@spexop/react/templates';
```

#### stateError
Error state for validation errors and network errors.

**Features:**
- Network error example with retry
- Form validation error patterns
- ARIA live regions for screen readers
- Icon-enhanced error messages
- Clear recovery actions
- Best practices guide

```typescript
import { stateError } from '@spexop/react/templates';
```

## Usage

### Basic Usage

```typescript
import { renderTemplateToReact } from '@spexop/react/templates';
import { heroCentered } from '@spexop/react/templates';
import { techPreset } from '@spexop/theme';

// Render template to React code
const reactCode = renderTemplateToReact(heroCentered, techPreset);

console.log(reactCode);
// Output: Complete React component code
```

### With Customization

```typescript
import { renderTemplateToReact } from '@spexop/react/templates';
import { authLogin } from '@spexop/react/templates';
import { techPreset } from '@spexop/theme';

// Customize template props
const customProps = {
  maxWidth: 'md',
  padding: 'xl',
};

const reactCode = renderTemplateToReact(authLogin, techPreset, customProps);
```

### Export to HTML

```typescript
import { renderTemplateToHTML } from '@spexop/react/templates';
import { error404 } from '@spexop/react/templates';
import { techPreset } from '@spexop/theme';

// Render to standalone HTML + CSS
const { html, css } = renderTemplateToHTML(error404, techPreset);

// Save to files
fs.writeFileSync('404.html', html);
fs.writeFileSync('styles.css', css);
```

### Template Discovery

```typescript
import { 
  allTemplates, 
  getTemplateById, 
  getTemplatesByCategory,
  searchTemplates 
} from '@spexop/react/templates';

// Get all templates
console.log(allTemplates); // Array of all templates

// Get by ID
const template = getTemplateById('auth-login');

// Get by category
const authTemplates = getTemplatesByCategory('auth');
const errorTemplates = getTemplatesByCategory('error');

// Search
const accessibleTemplates = searchTemplates('accessibility-first');
const mobileTemplates = searchTemplates('mobile-optimized');
```

## Template Structure

Each template follows a consistent structure:

```typescript
interface Template {
  meta: {
    id: string;                    // Unique identifier
    name: string;                  // Display name
    description: string;           // Description
    category: string;              // Category
    tier: 'free' | 'premium';     // Tier
    thumbnail: string;             // Preview image
    tags: string[];               // Searchable tags
    author: string;               // Author
    version: string;              // Version
    accessibility?: {             // Accessibility metadata
      landmarks: Array<{ type: string; label: string }>;
      skipLinks: Array<{ target: string; label: string }>;
      focusManagement: {
        initialFocus?: string;
        returnFocus?: boolean;
      };
    };
  };
  structure: TemplateNode;         // Component tree
  customization: {                 // Customization options
    layout: {
      adjustableProps: string[];
      breakpoints: boolean;
    };
    content: {
      editableText: string[];
      editableImages: string[];
    };
  };
}
```

## Template Node Types

Templates support the following component types:

### Spexop Components
- `Container` - Content width constraints
- `Grid` - Flexible grid layout
- `GridItem` - Grid cell positioning
- `Stack` - Vertical/horizontal stacking
- `Spacer` - Flexible spacing
- `Button` - Interactive buttons
- `Card` - Content containers
- `Icon` - Icon components
- `Badge` - Status badges

### Semantic HTML5
- `Main` - Main content landmark
- `Nav` - Navigation landmark
- `Header` - Header landmark
- `Footer` - Footer landmark
- `Aside` - Complementary content
- `Article` - Article content
- `Section` - Generic section

### Form Elements
- `Form` - Form container
- `Input` - Input fields
- `Label` - Form labels
- `Checkbox` - Checkbox inputs

### Text Elements
- `Heading` - Headings (h1-h6)
- `Text` - Paragraphs
- `Link` - Hyperlinks

## Accessibility Features

All templates include:

### Semantic HTML
- Proper landmark regions
- Heading hierarchy
- Semantic form controls

### ARIA Attributes
- `aria-label` for descriptive labels
- `aria-describedby` for associations
- `aria-current` for current page indicators
- `role` attributes where needed

### Keyboard Navigation
- Logical tab order
- Skip navigation links
- Focus management
- Keyboard-accessible controls

### Screen Reader Support
- Descriptive labels
- Proper associations
- Status announcements
- Hidden decorative elements

## Design Principles

Templates follow "The Spexop Way":

### 1. Primitives before patterns
Templates build on Grid, Stack, Container primitives

### 2. Borders before shadows
Clean 2px borders instead of heavy shadows

### 3. Typography before decoration
Font-weight (bold/semibold/regular) for hierarchy

### 4. Tokens before magic numbers
All values use semantic design tokens

### 5. Composition before complexity
Simple parts compose into complex layouts

### 6. Standards before frameworks
Semantic HTML5 and web standards

### 7. Accessibility before aesthetics
WCAG AAA compliance by default

## Customization

### Layout Customization

```typescript
const customProps = {
  maxWidth: 'lg',        // Container width
  padding: 'xl',         // Spacing
  gap: 'md',            // Grid/Stack gaps
};

renderTemplateToReact(template, theme, customProps);
```

### Content Customization

Edit text content by targeting IDs:

```typescript
const contentEdits = {
  'hero-title': 'My Custom Title',
  'hero-description': 'My custom description text',
};

// Apply edits to template structure before rendering
```

### Style Customization

All templates respect your theme configuration:

```typescript
import { createTheme } from '@spexop/theme';

const myTheme = createTheme({
  colors: {
    primary: '#0066ff',
    secondary: '#00cc88',
  },
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
    },
  },
  // ... other customizations
});

renderTemplateToReact(template, myTheme);
```

## Responsive Design

Templates use progressive breakpoints:

```typescript
span: { xs: 12, md: 6, lg: 4 }
```

**Breakpoints:**
- `xs`: 0-639px (mobile)
- `sm`: 640-767px (mobile landscape)
- `md`: 768-1023px (tablet)
- `lg`: 1024-1279px (desktop)
- `xl`: 1280px+ (wide desktop)

## Template Validation

The templates system includes comprehensive validation utilities to ensure quality and compliance.

### Validate Template

```typescript
import { validateTemplate } from '@spexop/react/templates';
import { heroCentered } from '@spexop/react/templates';

const report = validateTemplate(heroCentered);

console.log(report);
// {
//   passed: true,
//   accessibility: { passed: true, score: 100, issues: [], recommendations: [] },
//   structure: { valid: true, issues: [], stats: {...} },
//   tokens: { passed: true, issues: [], stats: {...} },
//   summary: { totalIssues: 0, errors: 0, warnings: 0, score: 100 }
// }
```

### Accessibility Validation

```typescript
import { validateAccessibility } from '@spexop/react/templates';

const accessibilityReport = validateAccessibility(template);

// Check for WCAG compliance
if (accessibilityReport.passed) {
  console.log('Template is WCAG AAA compliant');
}

// Review issues
accessibilityReport.issues.forEach(issue => {
  console.log(`${issue.severity}: ${issue.message}`);
});

// Get recommendations
accessibilityReport.recommendations.forEach(rec => {
  console.log(rec);
});
```

### Structure Validation

```typescript
import { validateStructure, getComponentStats } from '@spexop/react/templates';

const structureReport = validateStructure(template);

console.log('Valid:', structureReport.valid);
console.log('Total nodes:', structureReport.stats.totalNodes);
console.log('Max depth:', structureReport.stats.depth);

// Get component usage stats
const stats = getComponentStats(template);
console.log(stats); // { Container: 2, Stack: 5, Button: 2, ... }
```

### Token Usage Validation

```typescript
import { validateTokens, findMagicNumbers, hasConsistentTokenUsage } from '@spexop/react/templates';

// Check for magic numbers
const magicNumbers = findMagicNumbers(template);
if (magicNumbers.length > 0) {
  console.log('Found magic numbers:', magicNumbers);
}

// Validate token usage
const tokenReport = validateTokens(template);
console.log('Token compliance:', tokenReport.stats.compliance + '%');
console.log('Magic numbers found:', tokenReport.stats.magicNumbers);

// Quick check for consistent usage
const isConsistent = hasConsistentTokenUsage(template);
console.log('Consistent token usage:', isConsistent);
```

### Combined Validation

```typescript
import { validateTemplate } from '@spexop/react/templates';

// Validate all templates
import { allTemplates } from '@spexop/react/templates';

for (const template of allTemplates) {
  const report = validateTemplate(template);
  
  if (!report.passed) {
    console.error(`${template.meta.name} has ${report.summary.errors} errors`);
  } else {
    console.log(`${template.meta.name} - Score: ${report.summary.score}/100`);
  }
}
```

## Browser Support

- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- iOS Safari (last 2 versions)
- Chrome Android (last 2 versions)

## Best Practices

### Do's
- Use semantic HTML landmarks
- Include ARIA labels for context
- Provide skip navigation links
- Use semantic spacing tokens
- Include icon indicators
- Follow typography hierarchy
- Test with keyboard navigation
- Test with screen readers

### Don'ts
- Don't use magic numbers
- Don't skip heading levels
- Don't use buttons for navigation
- Don't rely on color alone
- Don't forget alt text
- Don't use div soup
- Don't ignore focus states

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines on creating new templates.

## License

MIT © Spexop Team

## Support

- Documentation: https://spexop.com/docs/templates
- Examples: https://spexop.com/examples
- Issues: https://github.com/spexop-ui/spexop/issues

