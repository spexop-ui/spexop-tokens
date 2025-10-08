# Publishing Guide: @spexop/tokens v0.2.1

## 📦 Package Status

✅ **Ready to Publish**

**Version:** 0.2.1  
**Build Date:** 2025-01-08  
**Total Tokens:** 441  
**Status:** All tests passing ✅

---

## 🎯 Pre-Publishing Checklist

- [x] Version updated to 0.2.1 in `package.json`
- [x] CHANGELOG.md updated with v0.2.1 changes
- [x] README.md (tokens) - up to date
- [x] Repository README.md updated with v0.2.1 announcement
- [x] All breakpoint tokens updated (Lg, Xl, 2xl)
- [x] All container tokens updated (Lg, Xl, 2xl)
- [x] All media query tokens updated (11 tokens)
- [x] Documentation files updated (TOKENS-REFERENCE.md, tokens-demo.html, tokens-quick-reference.txt)
- [x] Build successful (441 tokens generated)
- [x] All tests passing (34/34)
- [x] No linter errors

---

## 📋 What's New in v0.2.1

### Breakpoint & Responsive Token Updates

Updated breakpoints to better support modern display sizes:

**Breakpoint Changes:**

- `sBreakpointLg`: 1024px → **1280px** (+256px)
- `sBreakpointXl`: 1280px → **1920px** (+640px)
- `sBreakpoint2xl`: 1536px → **2560px** (+1024px)

**Container Changes:**

- `sContainerLg`: 1024px → **1280px**
- `sContainerXl`: 1280px → **1920px**
- `sContainer2xl`: 1536px → **2560px**

**Media Query Changes (11 tokens automatically updated):**

- All min-width, max-width, and range media queries now use new breakpoint values
- Better support for Full HD (1920px) and 2K (2560px) displays
- Improved tablet range: 768px-1280px (was 768px-1024px)

### Why This Update?

- **Modern device landscape** - Average desktop resolution has increased
- **Better tablet breakpoint** - 1280px aligns with iPad Pro landscape and large tablets
- **Full HD support** - 1920px matches standard Full HD monitors (1080p)
- **2K/QHD support** - 2560px for modern high-resolution displays
- **More appropriate responsive ranges** for contemporary web development

### Impact

- ⚠️ **Minor breaking change** - If you hardcoded breakpoint values in your code
- ✅ **Fully compatible** - If you used the token variables (recommended)
- 🎯 **Better responsive design** - More appropriate for 2025+ web development

---

## 🚀 Publishing to npm

### Step 1: Verify Package

```bash
cd packages/tokens

# Verify version
cat package.json | grep version
# Should show: "version": "0.2.1"

# Verify build
pnpm build
# Should generate 441 tokens

# Verify tests
pnpm test
# Should pass 34/34 tests

# Check what will be published
npm pack --dry-run
```

### Step 2: Login to npm (if needed)

```bash
npm login
# Use your npm credentials
```

### Step 3: Publish

```bash
# Publish to npm
npm publish

# Or with pnpm
pnpm publish
```

**Expected output:**

```bash
+ @spexop/tokens@0.2.1
```

### Step 4: Verify Publication

```bash
# Check on npm
npm view @spexop/tokens version
# Should show: 0.2.1

# Install and test
npm install @spexop/tokens@0.2.1
```

---

## 📝 Publishing to GitHub

### Step 1: Commit All Changes

```bash
# From repository root
cd /Users/olmstedian/__DEV__/spexop-design-system-public

# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "Release @spexop/tokens v0.2.1

Updated breakpoints and containers for modern displays:
- Lg breakpoint: 1024px → 1280px
- Xl breakpoint: 1280px → 1920px
- 2xl breakpoint: 1536px → 2560px

Benefits:
- Better tablet support (768px-1280px)
- Full HD display support (1920px)
- 2K/QHD display support (2560px)
- More appropriate for modern web development

Total: 17 responsive tokens updated
All tests passing (34/34)
"
```

### Step 2: Create Git Tag

```bash
# Create annotated tag
git tag -a tokens-v0.2.1 -m "@spexop/tokens v0.2.1

Breakpoint updates for modern displays.

See CHANGELOG.md for full details."

# Verify tag
git tag -l "tokens-v*"
```

### Step 3: Push to GitHub

```bash
# Push commits
git push origin main

# Push tags
git push origin tokens-v0.2.1
```

### Step 4: Create GitHub Release

1. Go to: <https://github.com/spexop-ui/design-system/releases/new>
2. Select tag: `tokens-v0.2.1`
3. Release title: `@spexop/tokens v0.2.1`
4. Description:

```markdown
## @spexop/tokens v0.2.1

Breakpoint updates for modern displays! 📱

### 📏 Updated Breakpoints

Better support for contemporary screen sizes:

| Token | Old Value | New Value | Use Case |
|-------|-----------|-----------|----------|
| `sBreakpointLg` | 1024px | **1280px** | Standard laptops |
| `sBreakpointXl` | 1280px | **1920px** | Full HD (1080p) |
| `sBreakpoint2xl` | 1536px | **2560px** | 2K/QHD displays |

### 🎯 Benefits

- **Better tablet breakpoint**: 768px-1280px aligns with modern tablets (iPad Pro, etc.)
- **Full HD support**: 1920px matches standard Full HD monitors
- **2K/QHD support**: 2560px for high-resolution displays
- **17 responsive tokens updated**: Breakpoints, containers, and all media queries

### 📦 What Changed

**Breakpoint Tokens (3):**
- `sBreakpointLg`, `sBreakpointXl`, `sBreakpoint2xl`

**Container Tokens (3):**
- `sContainerLg`, `sContainerXl`, `sContainer2xl`

**Media Query Tokens (11):**
- `sMediaMinLg`, `sMediaMaxLg`, `sMediaMinXl`, `sMediaMaxXl`, `sMediaMin2xl`, `sMediaMax2xl`
- `sMediaOnlyLg`, `sMediaOnlyMd`, `sMediaOnlyXl`
- `sMediaMobile`, `sMediaTabletDesktop`

### ⚠️ Migration Note

If you hardcoded breakpoint values in your code, you may need to update. If you used token variables (recommended), the changes will apply automatically after updating the package.

### 🔧 Installation

```bash
npm install @spexop/tokens@0.2.1
```

### 📖 Full Changelog

See [CHANGELOG.md](https://github.com/spexop-ui/design-system/blob/main/packages/tokens/CHANGELOG.md)

---

**All tests passing** (34/34) ✅  
**No breaking changes** for users following best practices ✅

``` bash

5. Click "Publish release"

---

## 📊 Updated Breakpoint System

### **Old Breakpoints (v0.2.0):**
```

Xs: 480px   →  Sm: 640px  →  Md: 768px  →  Lg: 1024px  →  Xl: 1280px  →  2xl: 1536px

``` bash

### **New Breakpoints (v0.2.1):**
```

Xs: 480px   →  Sm: 640px  →  Md: 768px  →  Lg: 1280px  →  Xl: 1920px  →  2xl: 2560px

``` bash

### **Responsive Ranges:**

| Range | Old | New | Devices |
|-------|-----|-----|---------|
| **Mobile** | <480px | <480px | Phones (portrait) |
| **Xs** | 480-640px | 480-640px | Phones (landscape) |
| **Sm** | 640-768px | 640-768px | Small tablets |
| **Md** | 768-1024px | **768-1280px** | Tablets, small laptops |
| **Lg** | 1024-1280px | **1280-1920px** | Laptops, desktops |
| **Xl** | 1280-1536px | **1920-2560px** | Large desktops, 1080p |
| **2xl** | 1536px+ | **2560px+** | Ultra-wide, 2K/4K |

---

## 🧪 Post-Publish Verification

### 1. Verify npm Package

```bash
# Check published version
npm view @spexop/tokens version
# Should show: 0.2.1

# Check package info
npm view @spexop/tokens

# Install in test project
mkdir test-tokens-v0.2.1 && cd test-tokens-v0.2.1
npm init -y
npm install @spexop/tokens@0.2.1

# Verify breakpoints
node -e "const t = require('@spexop/tokens'); console.log('Lg:', t.sBreakpointLg, 'Xl:', t.sBreakpointXl, '2xl:', t.sBreakpoint2xl)"
# Should show: Lg: 1280px Xl: 1920px 2xl: 2560px
```

### 2. Test Imports

```javascript
// test.js
const { sBreakpointLg, sContainerLg, sMediaMinLg } = require('@spexop/tokens');

console.log('Breakpoint Lg:', sBreakpointLg);      // 1280px
console.log('Container Lg:', sContainerLg);        // 1280px
console.log('Media Min Lg:', sMediaMinLg);         // (min-width: 1280px)
```

### 3. Test TypeScript

```typescript
// test.ts
import { 
  sBreakpointLg,
  sBreakpointXl,
  sBreakpoint2xl,
  sMediaMinLg
} from '@spexop/tokens';

const breakpoints = {
  large: sBreakpointLg,      // "1280px"
  xl: sBreakpointXl,         // "1920px"
  xxl: sBreakpoint2xl,       // "2560px"
  mediaLg: sMediaMinLg,      // "(min-width: 1280px)"
};
```

---

## 🎯 Announcement Templates

### Twitter/X

``` bash
📱 @spexop/tokens v0.2.1 is here!

Updated breakpoints for modern displays:
• Lg: 1280px (was 1024px)
• Xl: 1920px (Full HD)
• 2xl: 2560px (2K/QHD)

Better tablet support + proper Full HD breakpoints

npm install @spexop/tokens@0.2.1

#DesignSystem #ResponsiveDesign #WebDev
```

### Dev.to / Blog

**Title:** @spexop/tokens v0.2.1: Updated Breakpoints for Modern Displays

**Content:**

```markdown
We've updated our breakpoint system to better align with modern device resolutions.

## What Changed

In v0.2.1, we've updated the larger breakpoints:

- **Lg**: 1024px → 1280px
- **Xl**: 1280px → 1920px
- **2xl**: 1536px → 2560px

## Why?

The web has evolved. In 2025:
- Most laptops have 1920×1080 displays (Full HD)
- Tablets like iPad Pro have 1366px width in landscape
- 2K/QHD monitors (2560×1440) are common
- The old 1024px "desktop" breakpoint is outdated

## Better Responsive Ranges

**Tablets** (Md): Now 768px-1280px (was 768px-1024px)
- Covers iPad, Surface, and large Android tablets properly

**Desktops** (Lg): Now 1280px-1920px (was 1024px-1280px)
- Standard laptop and desktop range

**Large Desktops** (Xl): Now 1920px-2560px (was 1280px-1536px)
- Full HD and QHD displays

## Migration

If you're using token variables (recommended):
```typescript
import { sBreakpointLg } from '@spexop/tokens';
// Automatically gets new value: "1280px"
```

Simply update the package and your responsive design improves automatically!

```bash
npm install @spexop/tokens@0.2.1
```

No breaking changes for best-practice usage. 🎉

``` bash

---

## 📦 Package Contents

### Distributed Files

```

@spexop/tokens@0.2.1
├── dist/
│   ├── index.js          (42 KB) - ES Module
│   ├── index.cjs         (61 KB) - CommonJS
│   ├── index.d.ts        (60 KB) - TypeScript types (ESM)
│   ├── index.d.cts       (60 KB) - TypeScript types (CJS)
│   ├── tokens.css        (17 KB) - CSS variables
│   └── tokens.json       (17 KB) - JSON export
├── README.md             (9.9 KB)
├── CHANGELOG.md          (6.9 KB)
├── TOKENS-REFERENCE.md   (13 KB)
├── tokens-demo.html      (43 KB)
└── tokens-quick-reference.txt (7.4 KB)

``` bash

**Total Package Size:** ~250 KB

---

## ⚠️ Migration Guide for Users

### If You Used Token Variables (Recommended) ✅

**No changes needed!** Just update the package:

```bash
npm install @spexop/tokens@0.2.1
```

```typescript
import { sBreakpointLg } from '@spexop/tokens';
// Automatically uses new value: "1280px"
```

### If You Hardcoded Values ⚠️

You'll need to update your code:

```typescript
// ❌ Before (hardcoded)
const breakpoint = '1024px';

// ✅ After (use token)
import { sBreakpointLg } from '@spexop/tokens';
const breakpoint = sBreakpointLg; // "1280px"
```

### CSS Media Queries

**Before:**

```css
@media (min-width: 1024px) {
  /* Desktop styles */
}
```

**After:**

```css
@import '@spexop/tokens/tokens.css';

@media var(--s-breakpoint-lg) {
  /* Or better yet, use: */
}

@media (min-width: 1280px) {
  /* Updated desktop styles */
}
```

---

## 🚀 Publishing Steps

### Quick Publish (Recommended)

```bash
# 1. Navigate to tokens package
cd packages/tokens

# 2. Verify everything is ready
pnpm build && pnpm test

# 3. Publish to npm
npm publish

# 4. Tag and push to GitHub
cd ../..
git add .
git commit -m "Release @spexop/tokens v0.2.1"
git tag -a tokens-v0.2.1 -m "@spexop/tokens v0.2.1 - Modern breakpoint updates"
git push origin main
git push origin tokens-v0.2.1
```

---

## 🎯 Version Comparison

| Version | Tokens | Major Changes |
|---------|--------|---------------|
| **0.2.1** | 441 | Updated breakpoints for modern displays |
| **0.2.0** | 441 | Added Purple, Green, expanded semantic colors (+48 tokens) |
| **0.1.0** | 393 | Initial release with comprehensive token system |

---

## ✅ Final Verification Checklist

Before publishing, run these commands:

```bash
cd packages/tokens

# 1. Check version
grep '"version"' package.json
# Output: "version": "0.2.1" ✅

# 2. Verify breakpoints in build
grep "breakpoint-lg:" dist/tokens.css
# Output: --s-breakpoint-lg: 1280px; ✅

grep "breakpoint-xl:" dist/tokens.css
# Output: --s-breakpoint-xl: 1920px; ✅

grep "breakpoint-2xl:" dist/tokens.css
# Output: --s-breakpoint-2xl: 2560px; ✅

# 3. Run full build
pnpm build
# Output: ✅ Generated tokens.css (441 tokens)

# 4. Run tests
pnpm test
# Output: ✓ src/__tests__/tokens.test.ts  (34 tests)

# 5. Check git status
git status
# Should show modified files ready to commit
```

All checks passing? **Ready to publish!** 🚀

---

## 📋 Post-Publish Tasks

1. **Update dependent packages** - If you have @spexop/react or other packages that depend on tokens

   ```bash
   # Update @spexop/react to use new breakpoints
   cd packages/react
   pnpm install @spexop/tokens@0.2.1
   pnpm build
   ```

2. **Test in real projects** - Verify responsive behavior with new breakpoints

3. **Monitor for issues** - Watch GitHub issues and npm feedback

4. **Announce** - Share the update with users

---

## 🔄 Updating Other Packages in Monorepo

If you have other packages using tokens:

```bash
# From repository root
pnpm install

# This updates all workspace packages to use the new token values

# Rebuild dependent packages
pnpm --filter @spexop/react build
```

---

## 📚 Documentation Links

- **Package README**: `packages/tokens/README.md`
- **Full Reference**: `packages/tokens/TOKENS-REFERENCE.md`
- **Visual Demo**: `packages/tokens/tokens-demo.html`
- **Quick Reference**: `packages/tokens/tokens-quick-reference.txt`
- **Changelog**: `packages/tokens/CHANGELOG.md`

---

**Ready to publish @spexop/tokens v0.2.1!** 🚀

---

Generated: 2025-01-08  
Package: @spexop/tokens  
Version: 0.2.1  
Status: ✅ Ready for Publication
