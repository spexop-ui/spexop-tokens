import type React from "react";
import { Reveal } from "./Reveal.js";
import type { AnimationProps } from "./types.js";

export type RotateInProps = Omit<AnimationProps, "variant">;

/**
 * RotateIn - Rotate and fade in animation
 *
 * @example
 * ```tsx
 * <RotateIn duration={700} timing="bounce">
 *   <Card>Content</Card>
 * </RotateIn>
 * ```
 */
export const RotateIn: React.FC<RotateInProps> = (props) => {
  return <Reveal variant="rotateIn" {...props} />;
};

RotateIn.displayName = "RotateIn";
