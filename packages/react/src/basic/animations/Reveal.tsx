import type React from "react";
import type { AnimationProps } from "./types.js";
import { ANIMATION_PRESETS, TIMING_FUNCTIONS } from "./types.js";
import { useIntersectionObserver } from "./useIntersectionObserver.js";

/**
 * Reveal - Universal animation wrapper component
 * Animates children when they enter the viewport
 *
 * @example
 * ```tsx
 * <Reveal variant="fadeInUp" duration={800} delay={200}>
 *   <Card>Animated content</Card>
 * </Reveal>
 * ```
 */
export const Reveal: React.FC<AnimationProps> = ({
  variant = "fadeIn",
  duration = 400,
  delay = 0,
  timing = "ease-out",
  once = true,
  threshold = 0.1,
  style,
  className = "",
  children,
}) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    triggerOnce: once,
    delay,
  });

  const preset = ANIMATION_PRESETS[variant];
  const timingFunction = TIMING_FUNCTIONS[timing];

  const animationStyles: React.CSSProperties = {
    opacity: isVisible ? preset.opacity.to : preset.opacity.from,
    transform: isVisible ? preset.transform.to : preset.transform.from,
    transition: `opacity ${duration}ms ${timingFunction}, transform ${duration}ms ${timingFunction}`,
    ...style,
  };

  return (
    <div
      ref={ref}
      className={`spex-reveal spex-reveal--${variant} ${className}`}
      style={animationStyles}
    >
      {children}
    </div>
  );
};

Reveal.displayName = "Reveal";
