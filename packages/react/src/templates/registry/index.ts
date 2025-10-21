/**
 * Template Registry
 * Exports all available templates
 */

export { authLogin } from "./auth-login.js";
export { blogArticle } from "./blog-article.js";
export { ctaCentered } from "./cta-centered.js";
export { dashboardSidebar } from "./dashboard-sidebar.js";
export { docsNavigation } from "./docs-navigation.js";
export { ecommerceProduct } from "./ecommerce-product.js";
export { error404 } from "./error-404.js";
export { error500 } from "./error-500.js";
export { footerComprehensive } from "./footer-comprehensive.js";
export { headerNavigation } from "./header-navigation.js";
export { heroCentered } from "./hero-centered.js";
export { landingFeatureGrid } from "./landing-feature-grid.js";
export { portfolioGallery } from "./portfolio-gallery.js";
export { pricingTiers } from "./pricing-tiers.js";
export { stateEmpty } from "./state-empty.js";
export { stateError } from "./state-error.js";
export { stateLoading } from "./state-loading.js";

import type { Template } from "../types.js";
import { authLogin } from "./auth-login.js";
import { blogArticle } from "./blog-article.js";
import { ctaCentered } from "./cta-centered.js";
import { dashboardSidebar } from "./dashboard-sidebar.js";
import { docsNavigation } from "./docs-navigation.js";
import { ecommerceProduct } from "./ecommerce-product.js";
import { error404 } from "./error-404.js";
import { error500 } from "./error-500.js";
import { footerComprehensive } from "./footer-comprehensive.js";
import { headerNavigation } from "./header-navigation.js";
import { heroCentered } from "./hero-centered.js";
import { landingFeatureGrid } from "./landing-feature-grid.js";
import { portfolioGallery } from "./portfolio-gallery.js";
import { pricingTiers } from "./pricing-tiers.js";
import { stateEmpty } from "./state-empty.js";
import { stateError } from "./state-error.js";
import { stateLoading } from "./state-loading.js";

/**
 * Array of all templates for easy iteration
 */
export const allTemplates: Template[] = [
  heroCentered,
  landingFeatureGrid,
  dashboardSidebar,
  blogArticle,
  docsNavigation,
  portfolioGallery,
  ecommerceProduct,
  authLogin,
  error404,
  error500,
  pricingTiers,
  headerNavigation,
  footerComprehensive,
  ctaCentered,
  stateLoading,
  stateEmpty,
  stateError,
];

/**
 * Get template by ID
 */
export function getTemplateById(id: string): Template | undefined {
  return allTemplates.find((template) => template.meta.id === id);
}

/**
 * Get templates by category
 */
export function getTemplatesByCategory(
  category: Template["meta"]["category"],
): Template[] {
  return allTemplates.filter((template) => template.meta.category === category);
}

/**
 * Get templates by tier
 */
export function getTemplatesByTier(tier: "free" | "premium"): Template[] {
  return allTemplates.filter((template) => template.meta.tier === tier);
}

/**
 * Search templates by name or tags
 */
export function searchTemplates(query: string): Template[] {
  const lowerQuery = query.toLowerCase();
  return allTemplates.filter(
    (template) =>
      template.meta.name.toLowerCase().includes(lowerQuery) ||
      template.meta.description.toLowerCase().includes(lowerQuery) ||
      template.meta.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  );
}
