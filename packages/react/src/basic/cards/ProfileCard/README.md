# ProfileCard Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A specialized card component for displaying user profiles. Features avatar, name, bio, stats, and action buttons with clean, professional design.

## Features

- ✅ Avatar/profile image
- ✅ Name and title/role
- ✅ Bio/description
- ✅ Social links
- ✅ Stats display (followers, following, posts)
- ✅ Action buttons (Follow, Message, etc.)
- ✅ Online status indicator
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { ProfileCard } from '@spexop/react';

function App() {
  return (
    <ProfileCard
      avatar="/user-avatar.jpg"
      name="Jane Doe"
      title="Senior Developer"
      bio="Building beautiful web experiences with React"
      stats={{
        followers: 1234,
        following: 567,
        posts: 89,
      }}
    />
  );
}
```

## Basic Usage

### Simple Profile

```tsx
<ProfileCard
  avatar="/avatar.jpg"
  name="John Smith"
  title="Product Designer"
  bio="Passionate about user experience and design systems"
/>
```

### With Stats

```tsx
<ProfileCard
  avatar="/user.jpg"
  name="Sarah Johnson"
  title="Frontend Engineer"
  bio="React enthusiast and open source contributor"
  stats={{
    followers: 2456,
    following: 891,
    posts: 156,
  }}
/>
```

### With Actions

```tsx
<ProfileCard
  avatar="/profile.jpg"
  name="Mike Chen"
  title="UX Designer"
  bio="Designing intuitive interfaces"
  primaryAction={{
    label: "Follow",
    onClick: handleFollow
  }}
  secondaryAction={{
    label: "Message",
    onClick: handleMessage
  }}
/>
```

### With Social Links

```tsx
<ProfileCard
  avatar="/avatar.jpg"
  name="Emily Brown"
  title="Creative Director"
  bio="Leading design teams to create amazing products"
  socialLinks={[
    { platform: 'twitter', url: 'https://twitter.com/emily' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/emily' },
    { platform: 'github', url: 'https://github.com/emily' },
  ]}
/>
```

### With Online Status

```tsx
<ProfileCard
  avatar="/user.jpg"
  name="Alex Rivera"
  title="Software Engineer"
  bio="Full-stack developer specializing in React and Node.js"
  online={true}
  lastSeen="Active now"
/>
```

## Common Patterns

### Team Grid

```tsx
import { Grid, GridItem, ProfileCard } from '@spexop/react';

function TeamGrid() {
  const team = [
    {
      id: 1,
      avatar: '/team/john.jpg',
      name: 'John Doe',
      title: 'CEO & Founder',
      bio: 'Visionary leader with 15 years of experience',
    },
    {
      id: 2,
      avatar: '/team/jane.jpg',
      name: 'Jane Smith',
      title: 'CTO',
      bio: 'Tech expert passionate about innovation',
    },
    // ... more team members
  ];

  return (
    <Grid columns="auto-fit" minColumnWidth="300px" gap={6}>
      {team.map(member => (
        <GridItem key={member.id}>
          <ProfileCard {...member} />
        </GridItem>
      ))}
    </Grid>
  );
}
```

### User Directory

```tsx
function UserDirectory() {
  const users = [
    {
      id: 1,
      avatar: '/users/user1.jpg',
      name: 'Alice Johnson',
      title: 'Product Manager',
      bio: 'Leading product strategy and development',
      stats: { followers: 1234, following: 567, posts: 89 },
      primaryAction: {
        label: 'Follow',
        onClick: () => handleFollow(1)
      },
    },
    // ... more users
  ];

  return (
    <Grid columns={3} gap={6}>
      {users.map(user => (
        <GridItem key={user.id}>
          <ProfileCard {...user} />
        </GridItem>
      ))}
    </Grid>
  );
}
```

### Profile Page

```tsx
function ProfilePage({ userId }) {
  const user = useFetchUser(userId);

  return (
    <Container maxWidth="lg" padding={8}>
      <Grid columns={12} gap={8}>
        {/* Profile Card */}
        <GridItem span={4}>
          <ProfileCard
            avatar={user.avatar}
            name={user.name}
            title={user.title}
            bio={user.bio}
            stats={user.stats}
            socialLinks={user.socialLinks}
            primaryAction={{
              label: isFollowing ? 'Following' : 'Follow',
              onClick: handleFollow
            }}
            secondaryAction={{
              label: 'Message',
              onClick: handleMessage
            }}
          />
        </GridItem>
        
        {/* Activity Feed */}
        <GridItem span={8}>
          <Card>
            <h2>Recent Activity</h2>
            {/* Activity content */}
          </Card>
        </GridItem>
      </Grid>
    </Container>
  );
}
```

### Contact Card

```tsx
<ProfileCard
  avatar="/contact.jpg"
  name="Dr. Sarah Miller"
  title="Medical Consultant"
  bio="Specializing in preventive care and wellness"
  contactInfo={{
    email: 'sarah@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
  }}
  primaryAction={{
    label: 'Schedule Appointment',
    onClick: handleSchedule
  }}
/>
```

## Props

```typescript
interface ProfileCardProps {
  /** Avatar image URL */
  avatar: string;
  /** User's name */
  name: string;
  /** Job title or role */
  title?: string;
  /** Bio or description */
  bio?: string;
  /** User stats */
  stats?: {
    followers?: number;
    following?: number;
    posts?: number;
  };
  /** Social media links */
  socialLinks?: Array<{
    platform: string;
    url: string;
  }>;
  /** Primary action button */
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  /** Secondary action button */
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  /** Online status */
  online?: boolean;
  /** Last seen text */
  lastSeen?: string;
  /** Contact information */
  contactInfo?: {
    email?: string;
    phone?: string;
    location?: string;
  };
  /** Click handler for entire card */
  onClick?: () => void;
  /** Additional CSS class */
  className?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on Card primitive
2. **Borders before shadows** - Clean border-based design
3. **Typography before decoration** - Clear hierarchy with font weights
4. **Tokens before magic numbers** - Uses spacing and color tokens
5. **Composition before complexity** - Simple, focused component

## Accessibility

- ✅ Semantic HTML structure
- ✅ Image alt text from name
- ✅ Proper heading hierarchy
- ✅ Keyboard accessible actions
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
- `Avatar` - User avatar display
- `Badge` - Status indicators
- `Button` - Action buttons

## License

MIT
