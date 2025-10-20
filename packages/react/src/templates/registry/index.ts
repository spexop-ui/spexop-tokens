/**
 * Template Registry
 * Exports all available templates
 */

export { blogArticle } from "./blog-article.js";
export { dashboardSidebar } from "./dashboard-sidebar.js";
export { docsNavigation } from "./docs-navigation.js";
export { ecommerceProduct } from "./ecommerce-product.js";
export { heroCentered } from "./hero-centered.js";
export { landingFeatureGrid } from "./landing-feature-grid.js";
export { portfolioGallery } from "./portfolio-gallery.js";

import type { Template } from "../types.js";
import { blogArticle } from "./blog-article.js";
import { dashboardSidebar } from "./dashboard-sidebar.js";
import { docsNavigation } from "./docs-navigation.js";
import { ecommerceProduct } from "./ecommerce-product.js";
import { heroCentered } from "./hero-centered.js";
import { landingFeatureGrid } from "./landing-feature-grid.js";
import { portfolioGallery } from "./portfolio-gallery.js";

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
