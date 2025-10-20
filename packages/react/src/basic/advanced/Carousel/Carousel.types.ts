import type { ReactNode } from "react";

/**
 * Carousel Item Types
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 */
export interface CarouselItem {
  /** Unique identifier for the item */
  id: string;
  /** Content to display in the carousel item */
  content: ReactNode;
  /** Optional aria-label for the item */
  ariaLabel?: string;
}

/**
 * Carousel Component Props
 */
export interface CarouselProps {
  /** Array of items to display in the carousel */
  items: CarouselItem[];
  /** Current active item index (controlled mode) */
  activeIndex?: number;
  /** Callback when active item changes */
  onChange?: (index: number) => void;
  /** Auto-advance interval in milliseconds (disabled if not provided) */
  autoPlayInterval?: number;
  /** Show navigation arrows */
  showArrows?: boolean;
  /** Show dot indicators */
  showDots?: boolean;
  /** Show item counter (e.g., "1 / 5") */
  showCounter?: boolean;
  /** Enable infinite loop */
  loop?: boolean;
  /** Enable keyboard navigation */
  enableKeyboard?: boolean;
  /** Transition duration in milliseconds */
  transitionDuration?: number;
  /** Additional CSS class */
  className?: string;
  /** ARIA label for the carousel */
  ariaLabel?: string;
  /** Pause auto-play on hover */
  pauseOnHover?: boolean;
}
