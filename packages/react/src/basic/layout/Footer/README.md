# Footer Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A comprehensive footer component for websites and applications. Features multiple columns, social links, copyright, and newsletter signup with responsive design.

## Features

- ✅ Multi-column layout
- ✅ Logo and description
- ✅ Link groups/sections
- ✅ Social media links
- ✅ Newsletter signup
- ✅ Copyright notice
- ✅ Responsive stacking
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/icons @spexop/theme
# or
pnpm add @spexop/react @spexop/icons @spexop/theme
```

## Quick Start

```tsx
import { Footer } from '@spexop/react';

function App() {
  return (
    <Footer
      logo={{
        text: 'MyApp',
        href: '/',
      }}
      description="Building amazing web experiences"
      sections={[
        {
          title: 'Product',
          links: [
            { label: 'Features', href: '/features' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Docs', href: '/docs' },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About', href: '/about' },
            { label: 'Blog', href: '/blog' },
            { label: 'Contact', href: '/contact' },
          ],
        },
      ]}
      copyright="© 2025 MyApp. All rights reserved."
    />
  );
}
```

## With Social Links

```tsx
import { Twitter, GitHub, LinkedIn } from '@spexop/icons';

<Footer
  logo={{ text: 'MyApp', href: '/' }}
  description="Your description here"
  sections={linkSections}
  socialLinks={[
    { platform: 'Twitter', icon: Twitter, href: 'https://twitter.com/myapp' },
    { platform: 'GitHub', icon: GitHub, href: 'https://github.com/myapp' },
    { platform: 'LinkedIn', icon: LinkedIn, href: 'https://linkedin.com/company/myapp' },
  ]}
  copyright="© 2025 MyApp"
/>
```

## With Newsletter

```tsx
<Footer
  logo={logo}
  sections={sections}
  newsletter={{
    title: 'Subscribe to our newsletter',
    description: 'Get updates on new features and releases',
    placeholder: 'Enter your email',
    buttonText: 'Subscribe',
    onSubmit: handleNewsletterSubmit,
  }}
  copyright={copyright}
/>
```

## Common Patterns

### Complete Footer

```tsx
import { Footer } from '@spexop/react';
import { Twitter, GitHub, LinkedIn, Facebook } from '@spexop/icons';

function SiteFooter() {
  const sections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Security', href: '/security' },
        { label: 'Roadmap', href: '/roadmap' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'API Reference', href: '/api' },
        { label: 'Guides', href: '/guides' },
        { label: 'Blog', href: '/blog' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Press', href: '/press' },
        { label: 'Contact', href: '/contact' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
      ],
    },
  ];

  const socialLinks = [
    { platform: 'Twitter', icon: Twitter, href: 'https://twitter.com/company' },
    { platform: 'GitHub', icon: GitHub, href: 'https://github.com/company' },
    { platform: 'LinkedIn', icon: LinkedIn, href: 'https://linkedin.com/company' },
    { platform: 'Facebook', icon: Facebook, href: 'https://facebook.com/company' },
  ];

  return (
    <Footer
      logo={{
        text: 'Spexop',
        icon: Logo,
        href: '/',
      }}
      description="Modern design system for building beautiful web applications"
      sections={sections}
      socialLinks={socialLinks}
      newsletter={{
        title: 'Stay Updated',
        description: 'Subscribe to our newsletter for updates',
        placeholder: 'you@example.com',
        buttonText: 'Subscribe',
        onSubmit: handleSubscribe,
      }}
      copyright="© 2025 Spexop. All rights reserved."
    />
  );
}
```

### Simple Footer

```tsx
<Footer
  sections={[
    {
      title: 'Links',
      links: [
        { label: 'Home', href: '/' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy', href: '/privacy' },
      ],
    },
  ]}
  copyright="© 2025 MyCompany"
/>
```

### Marketing Footer

```tsx
function MarketingFooter() {
  return (
    <Footer
      logo={{
        text: 'ProductName',
        href: '/',
      }}
      description="The best tool for modern teams"
      sections={[
        {
          title: 'Product',
          links: [
            { label: 'Features', href: '/#features' },
            { label: 'Pricing', href: '/#pricing' },
            { label: 'Customers', href: '/customers' },
            { label: 'Changelog', href: '/changelog' },
          ],
        },
        {
          title: 'Support',
          links: [
            { label: 'Help Center', href: '/help' },
            { label: 'Tutorials', href: '/tutorials' },
            { label: 'Status', href: 'https://status.example.com', external: true },
          ],
        },
      ]}
      socialLinks={socialLinks}
      copyright="© 2025 ProductName. All rights reserved."
    />
  );
}
```

## Props

```typescript
interface FooterProps {
  /** Logo configuration */
  logo?: {
    text: string;
    icon?: IconComponent;
    href: string;
  };
  /** Footer description */
  description?: string;
  /** Link sections */
  sections?: FooterSection[];
  /** Social media links */
  socialLinks?: SocialLink[];
  /** Newsletter signup */
  newsletter?: {
    title: string;
    description?: string;
    placeholder: string;
    buttonText: string;
    onSubmit: (email: string) => void;
  };
  /** Copyright text */
  copyright?: string;
  /** Additional CSS class */
  className?: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface SocialLink {
  platform: string;
  icon: IconComponent;
  href: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on Grid and Stack
2. **Borders before shadows** - Clean top border separation
3. **Typography before decoration** - Clear link hierarchy
4. **Tokens before magic numbers** - Uses spacing tokens
5. **Composition before complexity** - Modular sections

## Accessibility

- ✅ Semantic HTML (`<footer>` element)
- ✅ Proper heading hierarchy
- ✅ Keyboard navigation
- ✅ External link indication
- ✅ Focus indicators
- ✅ Screen reader support
- ✅ WCAG AA+ compliant

## Responsive Behavior

- **Desktop:** Multi-column layout
- **Tablet:** 2-column layout
- **Mobile:** Single column stack

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Container` - Width constraint
- `Grid` - Column layout
- `Stack` - Vertical stacking
- `TextInput` - Newsletter input

## License

MIT
