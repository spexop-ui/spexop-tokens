/**
 * Min-width media query utilities
 * Use these for mobile-first responsive design
 */

import { sBreakpoint2xl } from "../breakpoints/sBreakpoint2xl.js";
import { sBreakpointLg } from "../breakpoints/sBreakpointLg.js";
import { sBreakpointMd } from "../breakpoints/sBreakpointMd.js";
import { sBreakpointSm } from "../breakpoints/sBreakpointSm.js";
import { sBreakpointXl } from "../breakpoints/sBreakpointXl.js";
import { sBreakpointXs } from "../breakpoints/sBreakpointXs.js";

/**
 * Media query for extra small screens and up (≥480px)
 * @example
 * ```css
 * @media screen and (min-width: 480px) { ... }
 * ```
 */
export const sMediaMinXs = `(min-width: ${sBreakpointXs})`;

/**
 * Media query for small screens and up (≥640px)
 * @example
 * ```css
 * @media screen and (min-width: 640px) { ... }
 * ```
 */
export const sMediaMinSm = `(min-width: ${sBreakpointSm})`;

/**
 * Media query for medium screens and up (≥768px)
 * @example
 * ```css
 * @media screen and (min-width: 768px) { ... }
 * ```
 */
export const sMediaMinMd = `(min-width: ${sBreakpointMd})`;

/**
 * Media query for large screens and up (≥1024px)
 * @example
 * ```css
 * @media screen and (min-width: 1024px) { ... }
 * ```
 */
export const sMediaMinLg = `(min-width: ${sBreakpointLg})`;

/**
 * Media query for extra large screens and up (≥1280px)
 * @example
 * ```css
 * @media screen and (min-width: 1280px) { ... }
 * ```
 */
export const sMediaMinXl = `(min-width: ${sBreakpointXl})`;

/**
 * Media query for 2x large screens and up (≥1440px)
 * @example
 * ```css
 * @media screen and (min-width: 1440px) { ... }
 * ```
 */
export const sMediaMin2xl = `(min-width: ${sBreakpoint2xl})`;
