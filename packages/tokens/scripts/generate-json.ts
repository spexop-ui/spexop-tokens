/**
 * Generate JSON from Spexop Design Tokens
 * Converts S-prefixed TypeScript tokens → JSON for tooling
 */

import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateJSON() {
  try {
    // Import all tokens (will be populated as we add them)
    const tokensPath = path.resolve(__dirname, "../dist/index.js");

    if (!fs.existsSync(tokensPath)) {
      console.log("⏭️  Skipping JSON generation - no tokens built yet");
      return;
    }

    const tokens = await import(tokensPath);

    // Filter for S-prefixed exports (our design tokens)
    const tokenEntries = Object.entries(tokens).filter(
      ([key]) => key.startsWith("s") && key !== "default",
    );

    if (tokenEntries.length === 0) {
      console.log("⏭️  No S-prefix tokens found - skipping JSON generation");
      return;
    }

    // Convert to JSON object
    const jsonTokens = tokenEntries.reduce(
      (acc, [key, value]) => {
        acc[key] = value;
        return acc;
      },
      {} as Record<string, unknown>,
    );

    // Generate JSON with metadata
    const output = {
      $schema: "https://spexop.dev/schemas/tokens.json",
      version: "1.0.0",
      generated: new Date().toISOString(),
      tokens: jsonTokens,
    };

    // Write to dist
    const outputPath = path.resolve(__dirname, "../dist/tokens.json");
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), "utf8");

    console.log(`✅ Generated tokens.json (${tokenEntries.length} tokens)`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ Error generating JSON: ${error.message}`);
    }
    process.exit(1);
  }
}

generateJSON();
