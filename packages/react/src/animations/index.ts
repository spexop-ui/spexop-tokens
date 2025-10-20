/**
 * Animation Utilities
 * Performant, scroll-triggered animations using IntersectionObserver
 */

export type { FadeInProps } from "./FadeIn.js";
// Convenience Components
export { FadeIn } from "./FadeIn.js";
export type { MotionProps } from "./Motion.js";
// Motion Utilities (Spring & Easing-based animations)
export { Motion } from "./Motion.js";
// Core Component
export { Reveal } from "./Reveal.js";
export type { RotateInProps } from "./RotateIn.js";
export { RotateIn } from "./RotateIn.js";
export type { ScaleUpProps } from "./ScaleUp.js";
export { ScaleUp } from "./ScaleUp.js";
export type { SlideInProps } from "./SlideIn.js";
export { SlideIn } from "./SlideIn.js";
export type { StaggerProps } from "./Stagger.js";
export { Stagger } from "./Stagger.js";
// Types & Constants
export {
  ANIMATION_PRESETS,
  type AnimationProps,
  type AnimationTimingFunction,
  type AnimationVariant,
  TIMING_FUNCTIONS,
} from "./types.js";
export type { UseIntersectionObserverOptions } from "./useIntersectionObserver.js";
// Hooks
export { useIntersectionObserver } from "./useIntersectionObserver.js";
export type { EasingType } from "./useMotionValue.js";
export { EASINGS, useMotionValue } from "./useMotionValue.js";
export type { SpringConfig, SpringPreset } from "./useSpring.js";
export { SPRING_PRESETS, useSpring } from "./useSpring.js";
export type { ZoomInProps } from "./ZoomIn.js";
export { ZoomIn } from "./ZoomIn.js";
