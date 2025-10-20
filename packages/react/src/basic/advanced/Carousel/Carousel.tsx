import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Carousel.module.css";
import type { CarouselProps } from "./Carousel.types.js";

/**
 * Carousel - Slideshow component following Spexop design principles
 *
 * @olmstedian | github.com/olmstedian | @spexop | github.com/spexop-ui
 *
 * Features:
 * - Border-based design (3px bold borders, no shadows)
 * - High-contrast navigation controls (WCAG AAA)
 * - Keyboard accessible (Arrow keys, Home, End)
 * - Auto-play with pause on hover
 * - Dot indicators and item counter
 * - Infinite loop support
 * - Reduced motion support
 *
 * Design Principles:
 * - Borders Before Shadows (Principle #2) - 3px borders, zero shadows
 * - Typography Before Decoration (Principle #3) - Semibold counter
 * - Accessibility Before Aesthetics (Principle #7) - WCAG AAA, keyboard, ARIA
 * - Tokens Before Magic Numbers (Principle #4) - All spacing uses tokens
 *
 * @example
 * ```tsx
 * const items = [
 *   { id: '1', content: <img src="slide1.jpg" alt="Slide 1" /> },
 *   { id: '2', content: <img src="slide2.jpg" alt="Slide 2" /> },
 *   { id: '3', content: <img src="slide3.jpg" alt="Slide 3" /> }
 * ];
 *
 * <Carousel
 *   items={items}
 *   showArrows
 *   showDots
 *   ariaLabel="Product showcase"
 * />
 * ```
 */
export function Carousel({
  items,
  activeIndex: controlledIndex,
  onChange,
  autoPlayInterval,
  showArrows = true,
  showDots = true,
  showCounter = false,
  loop = true,
  enableKeyboard = true,
  transitionDuration = 300,
  className = "",
  ariaLabel = "Carousel",
  pauseOnHover = true,
}: CarouselProps) {
  const [internalIndex, setInternalIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Use controlled or uncontrolled index
  const activeIndex = controlledIndex ?? internalIndex;

  // Clear auto-play timer
  const clearAutoPlayTimer = useCallback(() => {
    if (autoPlayTimerRef.current) {
      clearTimeout(autoPlayTimerRef.current);
      autoPlayTimerRef.current = null;
    }
  }, []);

  // Navigate to specific index
  const goToIndex = useCallback(
    (index: number) => {
      if (isTransitioning) return;

      let newIndex = index;

      // Handle looping
      if (loop) {
        if (newIndex < 0) {
          newIndex = items.length - 1;
        } else if (newIndex >= items.length) {
          newIndex = 0;
        }
      } else {
        // Clamp to valid range
        newIndex = Math.max(0, Math.min(items.length - 1, newIndex));
      }

      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), transitionDuration);

      if (controlledIndex === undefined) {
        setInternalIndex(newIndex);
      }

      onChange?.(newIndex);
    },
    [
      isTransitioning,
      loop,
      items.length,
      controlledIndex,
      onChange,
      transitionDuration,
    ],
  );

  // Navigate to previous item
  const goToPrevious = useCallback(() => {
    goToIndex(activeIndex - 1);
  }, [activeIndex, goToIndex]);

  // Navigate to next item
  const goToNext = useCallback(() => {
    goToIndex(activeIndex + 1);
  }, [activeIndex, goToIndex]);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlayInterval) return;

    const shouldPause = pauseOnHover && isHovered;

    if (shouldPause) {
      clearAutoPlayTimer();
      return;
    }

    clearAutoPlayTimer();
    autoPlayTimerRef.current = setTimeout(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearAutoPlayTimer();
  }, [autoPlayInterval, pauseOnHover, isHovered, goToNext, clearAutoPlayTimer]);

  // Keyboard navigation
  useEffect(() => {
    if (!enableKeyboard) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle if carousel is focused or contains focused element
      if (!carouselRef.current?.contains(document.activeElement)) return;

      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          event.preventDefault();
          goToNext();
          break;
        case "Home":
          event.preventDefault();
          goToIndex(0);
          break;
        case "End":
          event.preventDefault();
          goToIndex(items.length - 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableKeyboard, goToPrevious, goToNext, goToIndex, items.length]);

  // Determine if previous/next buttons should be disabled
  const isPreviousDisabled = !loop && activeIndex === 0;
  const isNextDisabled = !loop && activeIndex === items.length - 1;

  return (
    <section
      ref={carouselRef}
      className={`${styles.carousel} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabel}
      aria-roledescription="carousel"
    >
      {/* Carousel viewport */}
      <div className={styles.viewport}>
        {/* Slides container */}
        <div
          className={styles.slidesContainer}
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            transitionDuration: `${transitionDuration}ms`,
          }}
          aria-live="polite"
          aria-atomic="true"
        >
          {items.map((item, index) => (
            // biome-ignore lint/a11y/useSemanticElements: role="group" is semantically correct for carousel slides
            <div
              key={item.id}
              className={styles.slide}
              aria-hidden={index !== activeIndex}
              aria-label={item.ariaLabel}
              role="group"
              aria-roledescription="slide"
            >
              {item.content}
            </div>
          ))}
        </div>

        {/* Previous button */}
        {showArrows && (
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowPrevious}`}
            onClick={goToPrevious}
            disabled={isPreviousDisabled}
            aria-label="Previous slide"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Next button */}
        {showArrows && (
          <button
            type="button"
            className={`${styles.arrowButton} ${styles.arrowNext}`}
            onClick={goToNext}
            disabled={isNextDisabled}
            aria-label="Next slide"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* Controls (dots and counter) */}
      <div className={styles.controls}>
        {/* Dot indicators */}
        {showDots && (
          <div
            className={styles.dots}
            role="tablist"
            aria-label="Carousel navigation"
          >
            {items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ""}`}
                onClick={() => goToIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-selected={index === activeIndex}
                role="tab"
              />
            ))}
          </div>
        )}

        {/* Counter */}
        {showCounter && (
          <div className={styles.counter} aria-live="polite" aria-atomic="true">
            {activeIndex + 1} / {items.length}
          </div>
        )}
      </div>
    </section>
  );
}
