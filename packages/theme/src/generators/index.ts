/**
 * Theme generators
 * @module @spexop/theme/generators
 */

import type { SpexopThemeConfig } from "../types/SpexopThemeConfig.js";
import { generateAdobeXD } from "./adobeXD.js";
import { generateAngular } from "./angular.js";
import { generateCanva } from "./canva.js";
import { generateChakraUI } from "./chakraUI.js";

// Core formats (Phase 1)
import { generateCSS } from "./css.js";
import { generateDocusaurus } from "./docusaurus.js";
// CSS-in-JS (4)
import { generateEmotion } from "./emotion.js";
import { generateFigma } from "./figma.js";
import { generateFlutter } from "./flutter.js";
// Universal Formats (3)
import { generateJavaScript } from "./javascript.js";
import { generateJSON } from "./json.js";
import { generateLess } from "./less.js";
import { generatePandaCSS } from "./pandaCSS.js";
import { generatePostCSS } from "./postcss.js";
import { generateReactNative } from "./reactNative.js";
// CSS Preprocessors (5)
import { generateSCSS } from "./scss.js";
import { generateSketch } from "./sketch.js";
// Documentation Tools (3)
import { generateStorybook } from "./storybook.js";
import { generateStyleDictionary } from "./styleDictionary.js";
import { generateStyledComponents } from "./styledComponents.js";
import { generateSvelte } from "./svelte.js";
import { generateTailwind } from "./tailwind.js";
// Design Tools (6)
import { generateTokensStudio } from "./tokensStudio.js";
import { generateTypeScript } from "./typescript.js";
import { generateUnoCSS } from "./unocss.js";
import { generateVanillaExtract } from "./vanillaExtract.js";
// Frameworks (6)
import { generateVue } from "./vue.js";
import { generateW3C } from "./w3c.js";
import { generateYAML } from "./yaml.js";
import { generateZeplin } from "./zeplin.js";

// Re-export all 29 generators
export {
  // Core (3)
  generateCSS,
  generateTypeScript,
  generateFigma,
  // CSS Preprocessors (5)
  generateSCSS,
  generateLess,
  generateTailwind,
  generateUnoCSS,
  generatePostCSS,
  // CSS-in-JS (4)
  generateEmotion,
  generateStyledComponents,
  generateVanillaExtract,
  generatePandaCSS,
  // Frameworks (6)
  generateVue,
  generateSvelte,
  generateAngular,
  generateReactNative,
  generateFlutter,
  generateChakraUI,
  // Design Tools (6)
  generateTokensStudio,
  generateStyleDictionary,
  generateSketch,
  generateCanva,
  generateAdobeXD,
  generateZeplin,
  // Documentation (3)
  generateStorybook,
  generateDocusaurus,
  generateW3C,
  // Universal (3)
  generateJavaScript,
  generateJSON,
  generateYAML,
};

/**
 * Generator output format
 */
export interface GeneratorOutput {
  format: string;
  content: string;
  filename: string;
  mimeType: string;
}

/**
 * Generate all available formats
 *
 * @param config - Spexop theme configuration
 * @returns Array of all generated formats
 */
export function generateAllFormats(
  config: SpexopThemeConfig,
): GeneratorOutput[] {
  const baseName = config.meta.name.toLowerCase().replace(/\s+/g, "-");

  return [
    // Core (3)
    {
      format: "CSS Variables",
      content: generateCSS(config),
      filename: `${baseName}-theme.css`,
      mimeType: "text/css",
    },
    {
      format: "TypeScript",
      content: generateTypeScript(config),
      filename: `${baseName}-theme.config.ts`,
      mimeType: "text/typescript",
    },
    {
      format: "Figma",
      content: generateFigma(config),
      filename: `${baseName}-figma.json`,
      mimeType: "application/json",
    },
    // CSS Preprocessors (5)
    {
      format: "SCSS",
      content: generateSCSS(config),
      filename: `${baseName}-theme.scss`,
      mimeType: "text/x-scss",
    },
    {
      format: "Less",
      content: generateLess(config),
      filename: `${baseName}-theme.less`,
      mimeType: "text/x-less",
    },
    {
      format: "Tailwind CSS",
      content: generateTailwind(config),
      filename: "tailwind.config.js",
      mimeType: "text/javascript",
    },
    {
      format: "UnoCSS",
      content: generateUnoCSS(config),
      filename: "uno.config.ts",
      mimeType: "text/typescript",
    },
    {
      format: "PostCSS Plugin",
      content: generatePostCSS(config),
      filename: "postcss-spexop-theme.js",
      mimeType: "text/javascript",
    },
    // CSS-in-JS (4)
    {
      format: "Emotion",
      content: generateEmotion(config),
      filename: "theme.emotion.ts",
      mimeType: "text/typescript",
    },
    {
      format: "Styled Components",
      content: generateStyledComponents(config),
      filename: "theme.styled.ts",
      mimeType: "text/typescript",
    },
    {
      format: "Vanilla Extract",
      content: generateVanillaExtract(config),
      filename: "theme.css.ts",
      mimeType: "text/typescript",
    },
    {
      format: "Panda CSS",
      content: generatePandaCSS(config),
      filename: "panda.config.ts",
      mimeType: "text/typescript",
    },
    // Frameworks (6)
    {
      format: "Vue/Nuxt",
      content: generateVue(config),
      filename: "theme.vue.js",
      mimeType: "text/javascript",
    },
    {
      format: "Svelte",
      content: generateSvelte(config),
      filename: "theme.svelte.js",
      mimeType: "text/javascript",
    },
    {
      format: "Angular Material",
      content: generateAngular(config),
      filename: "theme.angular.scss",
      mimeType: "text/x-scss",
    },
    {
      format: "React Native",
      content: generateReactNative(config),
      filename: "theme.native.ts",
      mimeType: "text/typescript",
    },
    {
      format: "Flutter",
      content: generateFlutter(config),
      filename: "app_theme.dart",
      mimeType: "text/x-dart",
    },
    {
      format: "Chakra UI",
      content: generateChakraUI(config),
      filename: "theme.chakra.ts",
      mimeType: "text/typescript",
    },
    // Design Tools (6)
    {
      format: "Tokens Studio",
      content: generateTokensStudio(config),
      filename: "tokens-studio.json",
      mimeType: "application/json",
    },
    {
      format: "Style Dictionary",
      content: generateStyleDictionary(config),
      filename: "tokens.json",
      mimeType: "application/json",
    },
    {
      format: "Sketch",
      content: generateSketch(config),
      filename: `${baseName}-sketch-palette.json`,
      mimeType: "application/json",
    },
    {
      format: "Canva Brand Kit",
      content: generateCanva(config),
      filename: `${baseName}-canva-brand.json`,
      mimeType: "application/json",
    },
    {
      format: "Adobe XD",
      content: generateAdobeXD(config),
      filename: `${baseName}-adobe-xd.json`,
      mimeType: "application/json",
    },
    {
      format: "Zeplin/Penpot",
      content: generateZeplin(config),
      filename: `${baseName}-zeplin.json`,
      mimeType: "application/json",
    },
    // Documentation (3)
    {
      format: "Storybook",
      content: generateStorybook(config),
      filename: "storybook-theme.ts",
      mimeType: "text/typescript",
    },
    {
      format: "Docusaurus",
      content: generateDocusaurus(config),
      filename: "docusaurus-theme.js",
      mimeType: "text/javascript",
    },
    {
      format: "W3C Design Tokens",
      content: generateW3C(config),
      filename: "design-tokens.json",
      mimeType: "application/json",
    },
    // Universal (3)
    {
      format: "JavaScript",
      content: generateJavaScript(config),
      filename: `${baseName}-theme.js`,
      mimeType: "text/javascript",
    },
    {
      format: "JSON",
      content: generateJSON(config),
      filename: `${baseName}-theme.json`,
      mimeType: "application/json",
    },
    {
      format: "YAML",
      content: generateYAML(config),
      filename: `${baseName}-theme.yaml`,
      mimeType: "text/yaml",
    },
  ];
}
