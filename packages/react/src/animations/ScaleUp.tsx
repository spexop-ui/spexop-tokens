import type React from "react";
import { Reveal } from "./Reveal.js";
import type { AnimationProps } from "./types.js";

export type ScaleUpProps = Omit<AnimationProps, "variant">;

/**
 * ScaleUp - Scale from small to normal size
 *
 * @example
 * ```tsx
 * <ScaleUp duration={600} timing="elastic">
 *   <Card>Content</Card>
 * </ScaleUp>
 * ```
 */
export const ScaleUp: React.FC<ScaleUpProps> = (props) => {
  return <Reveal variant="scaleUp" {...props} />;
};

ScaleUp.displayName = "ScaleUp";
