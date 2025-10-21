/**
 * Build Pre-Built CSS Files
 *
 * Generates CSS files for default theme and all presets.
 * Output: dist/css/*.css
 *
 * Usage: node --loader ts-node/esm scripts/build-css-presets.ts
 * Or: tsx scripts/build-css-presets.ts
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defaultTheme } from "../src/defaults/index.js";
import { generateCSS } from "../src/generators/css.js";
import { presets } from "../src/presets/index.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "../dist/css");

/**
 * Ensure output directory exists
 */
function ensureOutputDir() {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`✓ Created directory: ${OUTPUT_DIR}`);
  }
}

/**
 * Write CSS file
 */
function writeCSSFile(name: string, css: string) {
  const filename = `${name}.css`;
  const filepath = join(OUTPUT_DIR, filename);
  writeFileSync(filepath, css, "utf-8");

  const sizeKB = (Buffer.byteLength(css, "utf-8") / 1024).toFixed(2);
  console.log(`✓ Generated ${filename} (${sizeKB} KB)`);
}

/**
 * Main build function
 */
function buildPresets() {
  console.log("\n🎨 Building pre-built CSS files...\n");

  ensureOutputDir();

  // Generate default theme
  const defaultCSS = generateCSS(defaultTheme);
  writeCSSFile("default", defaultCSS);

  // Generate all presets
  for (const [name, config] of Object.entries(presets)) {
    const css = generateCSS(config);
    writeCSSFile(name, css);
  }

  console.log(
    `\n✅ Successfully generated ${Object.keys(presets).length + 1} CSS files\n`,
  );
  console.log(`Output directory: ${OUTPUT_DIR}\n`);
}

// Run build
try {
  buildPresets();
} catch (error) {
  console.error("\n❌ Build failed:", error);
  process.exit(1);
}
