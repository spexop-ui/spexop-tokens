/**
 * Generate CSS Custom Properties from Spexop Design Tokens
 * Converts S-prefixed TypeScript tokens → CSS variables
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateCSS() {
  try {
    // Import all tokens (will be populated as we add them)
    const tokensPath = path.resolve(__dirname, "../dist/index.js");

    if (!fs.existsSync(tokensPath)) {
      console.log("⏭️  Skipping CSS generation - no tokens built yet");
      return;
    }

    const tokens = await import(tokensPath);

    // Filter for S-prefixed exports (our design tokens)
    const tokenEntries = Object.entries(tokens).filter(
      ([key]) => key.startsWith("s") && key !== "default",
    );

    if (tokenEntries.length === 0) {
      console.log("⏭️  No S-prefix tokens found - skipping CSS generation");
      return;
    }

    // Convert to CSS custom properties
    const cssVars = tokenEntries
      .map(([key, value]) => {
        // Convert camelCase to kebab-case
        // sColorRed500 → --s-color-red-500
        const cssName = key
          .replace(/([A-Z0-9])/g, "-$1")
          .toLowerCase()
          .replace(/^s-/, "--s-");

        return `  ${cssName}: ${value};`;
      })
      .join("\n");

    // Generate CSS file
    const css = `/**
 * Spexop Design Language (SDL) - CSS Custom Properties
 * Auto-generated from TypeScript tokens
 * DO NOT EDIT MANUALLY
 */

:root {
${cssVars}
}
`;

    // Write to dist
    const outputPath = path.resolve(__dirname, "../dist/tokens.css");
    fs.writeFileSync(outputPath, css, "utf8");

    console.log(`✅ Generated tokens.css (${tokenEntries.length} tokens)`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ Error generating CSS: ${error.message}`);
    }
    process.exit(1);
  }
}

generateCSS();
