import type React from "react";
import { Reveal } from "./Reveal.js";
import type { AnimationProps } from "./types.js";

export interface SlideInProps extends Omit<AnimationProps, "variant"> {
  /**
   * Direction of slide
   * @default "up"
   */
  direction?: "up" | "down" | "left" | "right";
}

/**
 * SlideIn - Slide animation from specified direction
 *
 * @example
 * ```tsx
 * <SlideIn direction="left" duration={700}>
 *   <Card>Content</Card>
 * </SlideIn>
 * ```
 */
export const SlideIn: React.FC<SlideInProps> = ({
  direction = "up",
  ...props
}) => {
  const variantMap = {
    up: "slideUp",
    down: "slideDown",
    left: "slideLeft",
    right: "slideRight",
  } as const;

  return <Reveal variant={variantMap[direction]} {...props} />;
};

SlideIn.displayName = "SlideIn";
