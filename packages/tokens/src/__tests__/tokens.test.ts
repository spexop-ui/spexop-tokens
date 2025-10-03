/**
 * Token Validation Tests
 *
 * Ensures all tokens meet quality and consistency standards
 */

import { describe, expect, it } from "vitest";
import * as tokens from "../index.js";

describe("Token Package", () => {
  it("should export version information", () => {
    expect(tokens.version).toBeDefined();
    expect(typeof tokens.version).toBe("string");
  });

  it("should export tokenMetadata", () => {
    expect(tokens.tokenMetadata).toBeDefined();
    expect(tokens.tokenMetadata.version).toBeDefined();
  });
});

describe("Color Tokens", () => {
  it("should have valid hex color format", () => {
    const colorTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sColor"),
    );

    expect(colorTokens.length).toBeGreaterThan(0);

    colorTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        // Should be hex (#123456) or rgba(...)
        const isValidColor =
          /^#[0-9A-Fa-f]{6}$|^#[0-9A-Fa-f]{3}$|^rgba?\(/.test(value);
        expect(isValidColor, `${name} should be valid color: ${value}`).toBe(
          true,
        );
      }
    });
  });

  it("should follow naming convention sColor*", () => {
    const colorTokens = Object.keys(tokens).filter(
      (key) =>
        key.startsWith("sColor") &&
        typeof tokens[key as keyof typeof tokens] === "string",
    );

    expect(colorTokens.length).toBeGreaterThan(50);

    colorTokens.forEach((name) => {
      expect(name).toMatch(/^sColor[A-Z]/);
    });
  });
});

describe("Spacing Tokens", () => {
  it("should have valid spacing values", () => {
    const spacingTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sSpacing"),
    );

    expect(spacingTokens.length).toBeGreaterThan(0);

    spacingTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        // Should be px, rem, em, or 0
        const isValidSpacing = /^\d+\.?\d*(px|rem|em)$|^0$/.test(value);
        expect(
          isValidSpacing,
          `${name} should be valid spacing: ${value}`,
        ).toBe(true);
      }
    });
  });

  it("should follow naming convention sSpacing*", () => {
    const spacingTokens = Object.keys(tokens).filter(
      (key) =>
        key.startsWith("sSpacing") &&
        typeof tokens[key as keyof typeof tokens] === "string",
    );

    spacingTokens.forEach((name) => {
      expect(name).toMatch(/^sSpacing[A-Z0-9]/);
    });
  });
});

describe("Typography Tokens", () => {
  it("should have valid font size values", () => {
    const fontSizeTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sFontSize"),
    );

    expect(fontSizeTokens.length).toBeGreaterThan(0);

    fontSizeTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        // Support px, rem, em, and clamp() for responsive sizes
        const isValidSize = /^\d+\.?\d*(px|rem|em)$|^clamp\(/.test(value);
        expect(isValidSize, `${name} should be valid font size: ${value}`).toBe(
          true,
        );
      }
    });
  });

  it("should have valid font weight values", () => {
    const fontWeightTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sFontWeight"),
    );

    fontWeightTokens.forEach(([_name, value]) => {
      if (typeof value === "string" || typeof value === "number") {
        const numValue =
          typeof value === "string" ? Number.parseInt(value, 10) : value;
        expect(numValue).toBeGreaterThanOrEqual(100);
        expect(numValue).toBeLessThanOrEqual(900);
      }
    });
  });

  it("should have valid line height values", () => {
    const lineHeightTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sLineHeight"),
    );

    lineHeightTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        const isValid = /^\d+\.?\d*$|^(normal|none)$/.test(value);
        expect(isValid, `${name} should be valid line height: ${value}`).toBe(
          true,
        );
      }
    });
  });
});

describe("Theme System", () => {
  it("should export all theme objects", () => {
    expect(tokens.minimalTheme).toBeDefined();
    expect(tokens.professionalTheme).toBeDefined();
    expect(tokens.boldTheme).toBeDefined();
    expect(tokens.minimalDarkTheme).toBeDefined();
    expect(tokens.professionalDarkTheme).toBeDefined();
    expect(tokens.boldDarkTheme).toBeDefined();
  });

  it("should have all required theme properties", () => {
    const requiredProps = [
      "primary",
      "primaryHover",
      "primaryActive",
      "primaryText",
      "secondary",
      "secondaryHover",
      "secondaryActive",
      "secondaryText",
      "surface",
      "surfaceHover",
      "text",
      "textMuted",
      "textInverted",
    ];

    const themes = [
      tokens.minimalTheme,
      tokens.professionalTheme,
      tokens.boldTheme,
      tokens.minimalDarkTheme,
      tokens.professionalDarkTheme,
      tokens.boldDarkTheme,
    ];

    themes.forEach((theme, index) => {
      requiredProps.forEach((prop) => {
        expect(
          theme,
          `Theme ${index} should have property: ${prop}`,
        ).toHaveProperty(prop);
      });
    });
  });

  it("should have lightThemes and darkThemes collections", () => {
    expect(tokens.lightThemes).toBeDefined();
    expect(tokens.darkThemes).toBeDefined();
    expect(tokens.lightThemes.minimal).toBe(tokens.minimalTheme);
    expect(tokens.lightThemes.professional).toBe(tokens.professionalTheme);
    expect(tokens.lightThemes.bold).toBe(tokens.boldTheme);
    expect(tokens.darkThemes.minimal).toBe(tokens.minimalDarkTheme);
    expect(tokens.darkThemes.professional).toBe(tokens.professionalDarkTheme);
    expect(tokens.darkThemes.bold).toBe(tokens.boldDarkTheme);
  });

  it("should have default theme defined", () => {
    expect(tokens.defaultTheme).toBeDefined();
    expect(tokens.defaultDarkTheme).toBeDefined();
    expect(tokens.defaultTheme).toBe(tokens.minimalTheme);
    expect(tokens.defaultDarkTheme).toBe(tokens.minimalDarkTheme);
  });
});

describe("Breakpoint Tokens", () => {
  it("should have valid breakpoint values", () => {
    const breakpointTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sBreakpoint"),
    );

    expect(breakpointTokens.length).toBeGreaterThan(0);

    breakpointTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        const isValid = /^\d+px$/.test(value);
        expect(isValid, `${name} should be valid breakpoint: ${value}`).toBe(
          true,
        );
      }
    });
  });
});

describe("Shadow Tokens", () => {
  it("should have valid shadow values", () => {
    const shadowTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sShadow"),
    );

    expect(shadowTokens.length).toBeGreaterThan(0);

    shadowTokens.forEach(([name, value]) => {
      if (typeof value === "string" && value !== "none") {
        // Shadows should contain px and color values
        const hasValidFormat = /px/.test(value) || /rgba?\(/.test(value);
        expect(hasValidFormat, `${name} should be valid shadow: ${value}`).toBe(
          true,
        );
      }
    });
  });
});

describe("Radius Tokens", () => {
  it("should have valid radius values", () => {
    const radiusTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sRadius"),
    );

    expect(radiusTokens.length).toBeGreaterThan(0);

    radiusTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        const isValid = /^\d+\.?\d*(px|rem|%)$|^0$|^9999px$/.test(value);
        expect(isValid, `${name} should be valid radius: ${value}`).toBe(true);
      }
    });
  });
});

describe("Z-Index Tokens", () => {
  it("should have numeric z-index values", () => {
    const zIndexTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sZIndex"),
    );

    expect(zIndexTokens.length).toBeGreaterThan(0);

    zIndexTokens.forEach(([_name, value]) => {
      expect(typeof value === "number" || typeof value === "string").toBe(true);
      if (typeof value === "string") {
        expect(Number.isNaN(Number(value))).toBe(false);
      }
    });
  });

  it("should have ascending z-index values", () => {
    // Check that higher semantic importance has higher z-index
    const getValue = (token: string | number) =>
      typeof token === "string" ? Number.parseInt(token, 10) : token;

    expect(getValue(tokens.sZIndexBase)).toBeLessThan(
      getValue(tokens.sZIndexContent),
    );
    expect(getValue(tokens.sZIndexContent)).toBeLessThan(
      getValue(tokens.sZIndexDropdown),
    );
    expect(getValue(tokens.sZIndexDropdown)).toBeLessThan(
      getValue(tokens.sZIndexOverlay),
    );
  });
});

describe("Token Naming Conventions", () => {
  it("should follow s-prefix naming convention", () => {
    const allTokens = Object.keys(tokens);
    const tokenExports = allTokens.filter(
      (key) =>
        key.startsWith("s") &&
        !key.includes("Theme") &&
        !key.includes("themes") &&
        typeof tokens[key as keyof typeof tokens] === "string",
    );

    tokenExports.forEach((name) => {
      expect(name).toMatch(/^s[A-Z]/);
    });
  });

  it("should use PascalCase after prefix", () => {
    const allTokens = Object.keys(tokens);
    const tokenExports = allTokens.filter((key) => key.startsWith("s"));

    tokenExports.forEach((name) => {
      // After 's', should be uppercase letter
      expect(name.charAt(1)).toMatch(/[A-Z]/);
    });
  });
});

describe("Media Query Tokens", () => {
  it("should export media query utilities", () => {
    expect(tokens.sMediaMinSm).toBeDefined();
    expect(tokens.sMediaMaxLg).toBeDefined();
    expect(tokens.sMediaDarkScheme).toBeDefined();
    expect(tokens.sMediaReducedMotion).toBeDefined();
  });

  it("should have valid media query format", () => {
    const mediaTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sMedia"),
    );

    mediaTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        // Media queries can start with @media or just be the condition part
        const isValid = /^@media|^\(/.test(value);
        expect(isValid, `${name} should be valid media query: ${value}`).toBe(
          true,
        );
      }
    });
  });
});

describe("Motion Tokens", () => {
  it("should have valid duration values", () => {
    const durationTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sDuration"),
    );

    durationTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        const isValid = /^\d+ms$/.test(value);
        expect(isValid, `${name} should be valid duration: ${value}`).toBe(
          true,
        );
      }
    });
  });

  it("should have valid easing values", () => {
    const easingTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sEase"),
    );

    easingTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        const isValid = /^(cubic-bezier|ease|linear)/.test(value);
        expect(isValid, `${name} should be valid easing: ${value}`).toBe(true);
      }
    });
  });
});

describe("Outline Tokens", () => {
  it("should have valid outline width values", () => {
    const outlineWidthTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sOutlineWidth"),
    );

    expect(outlineWidthTokens.length).toBeGreaterThan(0);

    outlineWidthTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        const isValid = /^\d+\.?\d*(px)$/.test(value);
        expect(isValid, `${name} should be valid outline width: ${value}`).toBe(
          true,
        );
      }
    });
  });

  it("should have valid outline offset values", () => {
    const outlineOffsetTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sOutlineOffset"),
    );

    expect(outlineOffsetTokens.length).toBeGreaterThan(0);

    outlineOffsetTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        const isValid = /^\d+\.?\d*(px)$/.test(value);
        expect(
          isValid,
          `${name} should be valid outline offset: ${value}`,
        ).toBe(true);
      }
    });
  });

  it("should have valid outline style values", () => {
    const outlineStyleTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sOutlineStyle"),
    );

    expect(outlineStyleTokens.length).toBeGreaterThan(0);

    outlineStyleTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        const isValid = /^(solid|dashed|dotted|none)$/.test(value);
        expect(isValid, `${name} should be valid outline style: ${value}`).toBe(
          true,
        );
      }
    });
  });
});

describe("Grid Layout Tokens", () => {
  it("should have valid grid column values", () => {
    const gridColumnTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sGridColumns"),
    );

    expect(gridColumnTokens.length).toBeGreaterThan(0);

    gridColumnTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        const numValue = Number.parseInt(value, 10);
        expect(Number.isNaN(numValue)).toBe(false);
        expect(numValue).toBeGreaterThan(0);
        expect(
          numValue,
          `${name} should be reasonable column count: ${value}`,
        ).toBeLessThanOrEqual(24);
      }
    });
  });

  it("should have valid grid gutter values", () => {
    const gridGutterTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sGridGutter"),
    );

    expect(gridGutterTokens.length).toBeGreaterThan(0);

    gridGutterTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        const isValid = /^\d+\.?\d*(px|rem|em)$/.test(value);
        expect(
          isValid,
          `${name} should be valid gutter spacing: ${value}`,
        ).toBe(true);
      }
    });
  });
});

describe("Aspect Ratio Tokens", () => {
  it("should have valid aspect ratio format", () => {
    const aspectRatioTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sAspectRatio"),
    );

    expect(aspectRatioTokens.length).toBeGreaterThan(0);

    aspectRatioTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        // Should be in format "x / y" or "x.xxx / y"
        const isValid = /^\d+\.?\d*\s*\/\s*\d+\.?\d*$/.test(value);
        expect(isValid, `${name} should be valid aspect ratio: ${value}`).toBe(
          true,
        );
      }
    });
  });
});

describe("Constraint Tokens", () => {
  it("should have valid min width values", () => {
    const minWidthTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sMinWidth"),
    );

    expect(minWidthTokens.length).toBeGreaterThan(0);

    minWidthTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        const isValid = /^\d+\.?\d*(px|rem|em|ch)$/.test(value);
        expect(isValid, `${name} should be valid min width: ${value}`).toBe(
          true,
        );
      }
    });
  });

  it("should have valid max width values", () => {
    const maxWidthTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sMaxWidth"),
    );

    expect(maxWidthTokens.length).toBeGreaterThan(0);

    maxWidthTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        const isValid = /^\d+\.?\d*(px|rem|em|ch)$/.test(value);
        expect(isValid, `${name} should be valid max width: ${value}`).toBe(
          true,
        );
      }
    });
  });

  it("should have valid min/max height values", () => {
    const heightTokens = Object.entries(tokens).filter(
      ([key]) => key.startsWith("sMinHeight") || key.startsWith("sMaxHeight"),
    );

    expect(heightTokens.length).toBeGreaterThan(0);

    heightTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        const isValid = /^\d+\.?\d*(px|rem|em|vh)$/.test(value);
        expect(
          isValid,
          `${name} should be valid height constraint: ${value}`,
        ).toBe(true);
      }
    });
  });
});

describe("Border Style Tokens", () => {
  it("should have valid border style values", () => {
    const borderStyleTokens = Object.entries(tokens).filter(([key]) =>
      key.startsWith("sBorderStyle"),
    );

    expect(borderStyleTokens.length).toBeGreaterThan(0);

    borderStyleTokens.forEach(([name, value]) => {
      if (typeof value === "string") {
        const isValid = /^(solid|dashed|dotted|double|none)$/.test(value);
        expect(isValid, `${name} should be valid border style: ${value}`).toBe(
          true,
        );
      }
    });
  });
});
