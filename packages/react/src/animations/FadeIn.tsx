import type React from "react";
import { Reveal } from "./Reveal.js";
import type { AnimationProps } from "./types.js";

export interface FadeInProps extends Omit<AnimationProps, "variant"> {
  /**
   * Direction of fade
   * @default "none"
   */
  direction?: "up" | "down" | "left" | "right" | "none";
}

/**
 * FadeIn - Convenient wrapper for fade animations
 *
 * @example
 * ```tsx
 * <FadeIn direction="up" duration={800}>
 *   <Card>Content</Card>
 * </FadeIn>
 * ```
 */
export const FadeIn: React.FC<FadeInProps> = ({
  direction = "none",
  ...props
}) => {
  const variantMap = {
    none: "fadeIn",
    up: "fadeInUp",
    down: "fadeInDown",
    left: "fadeInLeft",
    right: "fadeInRight",
  } as const;

  return <Reveal variant={variantMap[direction]} {...props} />;
};

FadeIn.displayName = "FadeIn";
