/**
 * Range media query utilities
 * Use these to target specific breakpoint ranges
 */

import { sBreakpoint2xl } from "../breakpoints/sBreakpoint2xl.js";
import { sBreakpointLg } from "../breakpoints/sBreakpointLg.js";
import { sBreakpointMd } from "../breakpoints/sBreakpointMd.js";
import { sBreakpointSm } from "../breakpoints/sBreakpointSm.js";
import { sBreakpointXl } from "../breakpoints/sBreakpointXl.js";
import { sBreakpointXs } from "../breakpoints/sBreakpointXs.js";

/**
 * Media query for mobile phones only (≥480px and <640px)
 * @example
 * ```css
 * @media screen and (min-width: 480px) and (max-width: 639.98px) { ... }
 * ```
 */
export const sMediaOnlyXs = `(min-width: ${sBreakpointXs}) and (max-width: calc(${sBreakpointSm} - 0.02px))`;

/**
 * Media query for small devices only (≥640px and <768px)
 * @example
 * ```css
 * @media screen and (min-width: 640px) and (max-width: 767.98px) { ... }
 * ```
 */
export const sMediaOnlySm = `(min-width: ${sBreakpointSm}) and (max-width: calc(${sBreakpointMd} - 0.02px))`;

/**
 * Media query for tablets only (≥768px and <1024px)
 * @example
 * ```css
 * @media screen and (min-width: 768px) and (max-width: 1023.98px) { ... }
 * ```
 */
export const sMediaOnlyMd = `(min-width: ${sBreakpointMd}) and (max-width: calc(${sBreakpointLg} - 0.02px))`;

/**
 * Media query for desktops only (≥1024px and <1280px)
 * @example
 * ```css
 * @media screen and (min-width: 1024px) and (max-width: 1279.98px) { ... }
 * ```
 */
export const sMediaOnlyLg = `(min-width: ${sBreakpointLg}) and (max-width: calc(${sBreakpointXl} - 0.02px))`;

/**
 * Media query for large desktops only (≥1280px and <1440px)
 * @example
 * ```css
 * @media screen and (min-width: 1280px) and (max-width: 1439.98px) { ... }
 * ```
 */
export const sMediaOnlyXl = `(min-width: ${sBreakpointXl}) and (max-width: calc(${sBreakpoint2xl} - 0.02px))`;

/**
 * Media query for mobile and tablet range (>=480px and <1024px)
 * @example
 * ```css
 * @media screen and (min-width: 480px) and (max-width: 1023.98px) { ... }
 * ```
 */
export const sMediaMobile = `(min-width: ${sBreakpointXs}) and (max-width: calc(${sBreakpointLg} - 0.02px))`;

/**
 * Media query for tablet and desktop range (>=768px and <1440px)
 * @example
 * ```css
 * @media screen and (min-width: 768px) and (max-width: 1439.98px) { ... }
 * ```
 */
export const sMediaTabletDesktop = `(min-width: ${sBreakpointMd}) and (max-width: calc(${sBreakpoint2xl} - 0.02px))`;
