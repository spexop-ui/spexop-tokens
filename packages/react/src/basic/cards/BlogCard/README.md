# BlogCard Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A specialized card component for blog posts and articles. Features image, title, excerpt, author info, date, tags, and read more functionality.

## Features

- ✅ Featured image with aspect ratio
- ✅ Title and excerpt
- ✅ Author information
- ✅ Publication date
- ✅ Reading time estimate
- ✅ Tags/categories
- ✅ Read more button
- ✅ Hover effects
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { BlogCard } from '@spexop/react';

function App() {
  return (
    <BlogCard
      image="/blog-post.jpg"
      title="Getting Started with React"
      excerpt="Learn the fundamentals of React development..."
      author="Jane Doe"
      date="2025-01-15"
      readingTime="5 min"
      onClick={() => navigate('/blog/getting-started')}
    />
  );
}
```

## Basic Usage

### Simple Blog Card

```tsx
<BlogCard
  image="/post1.jpg"
  title="10 Tips for Better Code"
  excerpt="Improve your coding skills with these proven techniques..."
  author="John Smith"
  date="2025-01-10"
  onClick={handleClick}
/>
```

### With Reading Time

```tsx
<BlogCard
  image="/post2.jpg"
  title="React Performance Optimization"
  excerpt="Learn how to make your React apps faster..."
  author="Sarah Johnson"
  date="2025-01-12"
  readingTime="8 min read"
  onClick={handleClick}
/>
```

### With Tags

```tsx
<BlogCard
  image="/post3.jpg"
  title="Building Design Systems"
  excerpt="A comprehensive guide to creating design systems..."
  author="Mike Chen"
  date="2025-01-08"
  readingTime="12 min"
  tags={['Design', 'React', 'TypeScript']}
  onClick={handleClick}
/>
```

### With Category

```tsx
<BlogCard
  image="/post4.jpg"
  title="Modern CSS Techniques"
  excerpt="Explore the latest CSS features and best practices..."
  author="Emily Brown"
  date="2025-01-05"
  category="Tutorial"
  readingTime="6 min"
  onClick={handleClick}
/>
```

## Common Patterns

### Blog Grid

```tsx
import { Grid, GridItem, BlogCard } from '@spexop/react';

function BlogGrid() {
  const posts = [
    {
      id: 1,
      image: '/post1.jpg',
      title: 'React Best Practices',
      excerpt: 'Learn the best practices for React development...',
      author: 'John Doe',
      date: '2025-01-15',
      readingTime: '5 min',
      tags: ['React', 'JavaScript'],
    },
    {
      id: 2,
      image: '/post2.jpg',
      title: 'TypeScript Guide',
      excerpt: 'Master TypeScript for better code quality...',
      author: 'Jane Smith',
      date: '2025-01-12',
      readingTime: '8 min',
      tags: ['TypeScript', 'Tutorial'],
    },
    // ... more posts
  ];

  return (
    <Grid columns="auto-fit" minColumnWidth="340px" gap={6}>
      {posts.map((post) => (
        <GridItem key={post.id}>
          <BlogCard
            {...post}
            onClick={() => navigate(`/blog/${post.id}`)}
          />
        </GridItem>
      ))}
    </Grid>
  );
}
```

### Featured Post

```tsx
<Container maxWidth="xl" padding={8}>
  <Grid columns={12} gap={6}>
    {/* Featured post - full width */}
    <GridItem span={12}>
      <BlogCard
        image="/featured.jpg"
        title="Major Update: Design System 2.0"
        excerpt="We're excited to announce the release of our new design system with 60+ components..."
        author="Spexop Team"
        date="2025-01-20"
        readingTime="10 min"
        tags={['Announcement', 'Design System']}
        featured={true}
        onClick={handleFeaturedClick}
      />
    </GridItem>
    
    {/* Recent posts - 3 columns */}
    {recentPosts.map(post => (
      <GridItem key={post.id} span={4}>
        <BlogCard {...post} onClick={() => navigate(`/blog/${post.id}`)} />
      </GridItem>
    ))}
  </Grid>
</Container>
```

### Blog List with Sidebar

```tsx
<Grid columns={12} gap={8}>
  {/* Main content */}
  <GridItem span={8}>
    <Stack direction="vertical" gap={6}>
      {blogPosts.map(post => (
        <BlogCard
          key={post.id}
          {...post}
          onClick={() => navigate(`/blog/${post.id}`)}
        />
      ))}
    </Stack>
  </GridItem>
  
  {/* Sidebar */}
  <GridItem span={4}>
    <Card>
      <h3>Popular Posts</h3>
      {/* Sidebar content */}
    </Card>
  </GridItem>
</Grid>
```

### With Author Avatar

```tsx
<BlogCard
  image="/post.jpg"
  title="Advanced React Patterns"
  excerpt="Dive deep into advanced React patterns and techniques..."
  author={{
    name: "Alex Rivera",
    avatar: "/authors/alex.jpg",
    bio: "Senior React Developer"
  }}
  date="2025-01-18"
  readingTime="15 min"
  onClick={handleClick}
/>
```

## Props

```typescript
interface BlogCardProps {
  /** Featured image URL */
  image: string;
  /** Image alt text */
  imageAlt?: string;
  /** Post title */
  title: string;
  /** Post excerpt/summary */
  excerpt: string;
  /** Author name or object */
  author: string | {
    name: string;
    avatar?: string;
    bio?: string;
  };
  /** Publication date */
  date: string;
  /** Reading time estimate */
  readingTime?: string;
  /** Category */
  category?: string;
  /** Tags array */
  tags?: string[];
  /** Featured post */
  featured?: boolean;
  /** Click handler */
  onClick: () => void;
  /** Additional CSS class */
  className?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on Card primitive
2. **Borders before shadows** - Clean border-based design
3. **Typography before decoration** - Clear content hierarchy
4. **Tokens before magic numbers** - Uses spacing and color tokens
5. **Composition before complexity** - Simple, focused component

## Accessibility

- ✅ Semantic HTML structure
- ✅ Image alt text support
- ✅ Proper heading hierarchy
- ✅ Keyboard accessible
- ✅ Focus indicators
- ✅ High contrast text
- ✅ Screen reader friendly

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Card` - Base card component
- `FeatureCard` - Feature showcase
- `ProductCard` - Product display
- `TimelineCard` - Timeline events

## License

MIT

