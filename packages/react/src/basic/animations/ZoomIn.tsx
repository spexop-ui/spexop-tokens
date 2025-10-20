import type React from "react";
import { Reveal } from "./Reveal.js";
import type { AnimationProps } from "./types.js";

export interface ZoomInProps extends Omit<AnimationProps, "variant"> {
  /**
   * Zoom variant
   * @default "in"
   */
  type?: "in" | "out";
}

/**
 * ZoomIn - Zoom/scale animation
 *
 * @example
 * ```tsx
 * <ZoomIn type="in" duration={500}>
 *   <Card>Content</Card>
 * </ZoomIn>
 * ```
 */
export const ZoomIn: React.FC<ZoomInProps> = ({ type = "in", ...props }) => {
  const variantMap = {
    in: "zoomIn",
    out: "zoomOut",
  } as const;

  return <Reveal variant={variantMap[type]} {...props} />;
};

ZoomIn.displayName = "ZoomIn";
