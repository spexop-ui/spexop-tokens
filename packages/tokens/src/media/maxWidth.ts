/**
 * Max-width media query utilities
 * Use these for desktop-first responsive design
 */

import { sBreakpoint2xl } from "../breakpoints/sBreakpoint2xl.js";
import { sBreakpointLg } from "../breakpoints/sBreakpointLg.js";
import { sBreakpointMd } from "../breakpoints/sBreakpointMd.js";
import { sBreakpointSm } from "../breakpoints/sBreakpointSm.js";
import { sBreakpointXl } from "../breakpoints/sBreakpointXl.js";
import { sBreakpointXs } from "../breakpoints/sBreakpointXs.js";

/**
 * Media query for screens smaller than extra small (<480px)
 * @example
 * ```css
 * @media screen and (max-width: 479.98px) { ... }
 * ```
 */
export const sMediaMaxXs = `(max-width: calc(${sBreakpointXs} - 0.02px))`;

/**
 * Media query for screens smaller than small (<640px)
 * @example
 * ```css
 * @media screen and (max-width: 639.98px) { ... }
 * ```
 */
export const sMediaMaxSm = `(max-width: calc(${sBreakpointSm} - 0.02px))`;

/**
 * Media query for screens smaller than medium (<768px)
 * @example
 * ```css
 * @media screen and (max-width: 767.98px) { ... }
 * ```
 */
export const sMediaMaxMd = `(max-width: calc(${sBreakpointMd} - 0.02px))`;

/**
 * Media query for screens smaller than large (<1024px)
 * @example
 * ```css
 * @media screen and (max-width: 1023.98px) { ... }
 * ```
 */
export const sMediaMaxLg = `(max-width: calc(${sBreakpointLg} - 0.02px))`;

/**
 * Media query for screens smaller than extra large (<1280px)
 * @example
 * ```css
 * @media screen and (max-width: 1279.98px) { ... }
 * ```
 */
export const sMediaMaxXl = `(max-width: calc(${sBreakpointXl} - 0.02px))`;

/**
 * Media query for screens smaller than 2x large (<1440px)
 * @example
 * ```css
 * @media screen and (max-width: 1439.98px) { ... }
 * ```
 */
export const sMediaMax2xl = `(max-width: calc(${sBreakpoint2xl} - 0.02px))`;
