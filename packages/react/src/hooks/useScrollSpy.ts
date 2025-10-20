/**
 * useScrollSpy Hook
 * Tracks which section is currently visible in the viewport
 */

import { useEffect, useState } from "react";

export interface UseScrollSpyOptions {
  /** Array of section IDs to track */
  sectionIds: string[];
  /** Offset from top of viewport in pixels */
  offset?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
}

/**
 * Hook that tracks which section is currently in view
 * Returns the ID of the active section
 */
export function useScrollSpy({
  sectionIds,
  offset: _offset = 100,
  rootMargin = "-20% 0px -35% 0px",
}: UseScrollSpyOptions): string | null {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    // Check if IntersectionObserver is available
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find all intersecting entries
        const intersecting = entries.filter((entry) => entry.isIntersecting);

        if (intersecting.length > 0) {
          // Sort by position to get the topmost section
          const sorted = intersecting.sort((a, b) => {
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });

          const topSection = sorted[0];
          if (topSection) {
            // Use requestAnimationFrame for smooth state updates
            requestAnimationFrame(() => {
              setActiveId(topSection.target.id);
            });
          }
        }
      },
      {
        rootMargin,
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      },
    );

    // Observe all sections
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    for (const section of sections) {
      observer.observe(section);
    }

    // Set initial active section on mount
    if (sections.length > 0) {
      const initialSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top >= 0 && rect.top <= window.innerHeight / 2;
      });

      if (initialSection) {
        setActiveId(initialSection.id);
      } else if (sections[0]) {
        setActiveId(sections[0].id);
      }
    }

    // Cleanup
    return () => {
      for (const section of sections) {
        observer.unobserve(section);
      }
    };
  }, [sectionIds, rootMargin]);

  return activeId;
}
