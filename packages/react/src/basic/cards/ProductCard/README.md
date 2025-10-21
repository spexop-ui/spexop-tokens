# ProductCard Component

**Version**: 0.1.0  
**Package**: `@spexop/react`  
**Status**: Production Ready

## Overview

A specialized card component designed for e-commerce product displays. Features product image, title, price, rating, and add-to-cart functionality with clean, border-based design.

## Features

- ✅ Product image display
- ✅ Title and description
- ✅ Price with optional discount
- ✅ Rating/review display
- ✅ Stock status indicator
- ✅ Add to cart button
- ✅ Hover effects
- ✅ Responsive layout
- ✅ TypeScript support

## Installation

```bash
npm install @spexop/react @spexop/theme
# or
pnpm add @spexop/react @spexop/theme
```

## Quick Start

```tsx
import { ProductCard } from '@spexop/react';

function App() {
  return (
    <ProductCard
      image="/product.jpg"
      title="Premium Headphones"
      price={99.99}
      rating={4.5}
      reviews={128}
      onAddToCart={() => console.log('Added to cart')}
    />
  );
}
```

## Basic Usage

### Simple Product

```tsx
<ProductCard
  image="/headphones.jpg"
  title="Wireless Headphones"
  description="Premium noise-canceling headphones"
  price={149.99}
  onAddToCart={handleAddToCart}
/>
```

### With Rating

```tsx
<ProductCard
  image="/laptop.jpg"
  title="MacBook Pro 14"
  price={1999}
  rating={4.8}
  reviews={342}
  onAddToCart={handleAddToCart}
/>
```

### With Discount

```tsx
<ProductCard
  image="/watch.jpg"
  title="Smart Watch"
  price={199.99}
  originalPrice={299.99}
  discount="33% OFF"
  rating={4.6}
  reviews={89}
  onAddToCart={handleAddToCart}
/>
```

### Out of Stock

```tsx
<ProductCard
  image="/phone.jpg"
  title="Latest Smartphone"
  price={899}
  inStock={false}
  stockMessage="Out of Stock"
  onAddToCart={handleAddToCart}
  disabled={true}
/>
```

### With Badge

```tsx
<ProductCard
  image="/camera.jpg"
  title="Professional Camera"
  price={1499}
  badge="New Arrival"
  badgeVariant="info"
  rating={5.0}
  reviews={12}
  onAddToCart={handleAddToCart}
/>
```

## Common Patterns

### Product Grid

```tsx
import { Grid, GridItem, ProductCard } from '@spexop/react';

function ProductGrid() {
  const products = [
    {
      id: 1,
      image: '/product1.jpg',
      title: 'Product 1',
      price: 49.99,
      rating: 4.5,
      reviews: 89,
    },
    {
      id: 2,
      image: '/product2.jpg',
      title: 'Product 2',
      price: 79.99,
      rating: 4.8,
      reviews: 156,
    },
    // ... more products
  ];

  const handleAddToCart = (productId) => {
    console.log('Add to cart:', productId);
  };

  return (
    <Grid columns="auto-fit" minColumnWidth="280px" gap={6}>
      {products.map((product) => (
        <GridItem key={product.id}>
          <ProductCard
            {...product}
            onAddToCart={() => handleAddToCart(product.id)}
          />
        </GridItem>
      ))}
    </Grid>
  );
}
```

### With Quick View

```tsx
function ProductWithQuickView() {
  const [showQuickView, setShowQuickView] = useState(false);

  return (
    <>
      <ProductCard
        image="/product.jpg"
        title="Premium Product"
        price={149.99}
        rating={4.7}
        reviews={234}
        onAddToCart={handleAddToCart}
        onQuickView={() => setShowQuickView(true)}
      />
      
      {showQuickView && (
        <Modal
          isOpen={showQuickView}
          onClose={() => setShowQuickView(false)}
        >
          {/* Product details */}
        </Modal>
      )}
    </>
  );
}
```

### With Wishlist

```tsx
function ProductWithWishlist() {
  const [inWishlist, setInWishlist] = useState(false);

  return (
    <ProductCard
      image="/product.jpg"
      title="Favorite Item"
      price={99.99}
      onAddToCart={handleAddToCart}
      onWishlist={() => setInWishlist(!inWishlist)}
      isInWishlist={inWishlist}
    />
  );
}
```

### Sale Section

```tsx
function SaleSection() {
  const saleProducts = [
    {
      id: 1,
      image: '/sale1.jpg',
      title: 'Limited Edition Jacket',
      price: 89.99,
      originalPrice: 149.99,
      discount: '40% OFF',
      badge: 'Sale',
      badgeVariant: 'error',
    },
    // ... more sale items
  ];

  return (
    <Container maxWidth="xl" padding={8}>
      <h2>Flash Sale - 24 Hours Only</h2>
      
      <Grid columns="auto-fit" minColumnWidth="300px" gap={6}>
        {saleProducts.map((product) => (
          <GridItem key={product.id}>
            <ProductCard
              {...product}
              onAddToCart={() => handleAddToCart(product.id)}
            />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}
```

## Props

```typescript
interface ProductCardProps {
  /** Product image URL */
  image: string;
  /** Product title */
  title: string;
  /** Product description */
  description?: string;
  /** Current price */
  price: number;
  /** Original price (for showing discounts) */
  originalPrice?: number;
  /** Discount label */
  discount?: string;
  /** Currency symbol */
  currency?: string;
  /** Rating (0-5) */
  rating?: number;
  /** Number of reviews */
  reviews?: number;
  /** Stock status */
  inStock?: boolean;
  /** Stock message */
  stockMessage?: string;
  /** Badge text */
  badge?: string;
  /** Badge variant */
  badgeVariant?: "default" | "success" | "warning" | "error" | "info";
  /** Add to cart handler */
  onAddToCart: () => void;
  /** Product click handler (navigate to details) */
  onClick?: () => void;
  /** Quick view handler */
  onQuickView?: () => void;
  /** Wishlist toggle handler */
  onWishlist?: () => void;
  /** Is in wishlist */
  isInWishlist?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Additional CSS class */
  className?: string;
}
```

## Design Principles

Following "The Spexop Way":

1. **Primitives before patterns** - Built on Card primitive
2. **Borders before shadows** - Clean border-based design
3. **Typography before decoration** - Clear product information hierarchy
4. **Tokens before magic numbers** - Uses spacing and color tokens
5. **Composition before complexity** - Simple, focused component

## Accessibility

- ✅ Semantic HTML structure
- ✅ Image alt text required
- ✅ Proper heading hierarchy
- ✅ Focus indicators for interactive elements
- ✅ High contrast text
- ✅ Screen reader friendly
- ✅ Keyboard accessible buttons

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- React 18+

## Related Components

- `Card` - Base card component
- `PricingCard` - Pricing plans
- `FeatureCard` - Feature showcase
- `Badge` - Status indicators

## License

MIT
