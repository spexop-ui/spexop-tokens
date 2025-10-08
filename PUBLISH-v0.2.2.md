# Publishing Guide: @spexop/tokens v0.2.2

## 🚨 Critical Bug Fix Release

**Version:** 0.2.2  
**Build Date:** 2025-10-08  
**Status:** ✅ Ready to Publish  
**Priority:** HIGH - Fixes CSS variable naming bug in v0.2.1

---

## ⚠️ What Happened with v0.2.1

**v0.2.1 was published with a CSS variable naming bug:**

```css
/* ❌ v0.2.1 (Broken) */
--s-color-red-5-0-0: #b04554;
--s-color-blue-1-0-0: #dbeafe;
```

**v0.2.2 fixes this:**

```css
/* ✅ v0.2.2 (Fixed) */
--s-color-red-500: #b04554;
--s-color-blue-100: #dbeafe;
```

**Action Required:** Deprecate v0.2.1 and publish v0.2.2

---

## 🎯 Pre-Publishing Checklist

- [x] Version updated to 0.2.2 in `package.json`
- [x] CHANGELOG.md updated with v0.2.2 entry
- [x] CHANGELOG.md marks v0.2.1 as buggy (skip this version)
- [x] CSS generation script fixed (`generate-css.ts`)
- [x] All documentation updated to v0.2.2
- [x] Build successful (441 tokens with correct CSS variables)
- [x] All tests passing (34/34)
- [x] Verified CSS variables are clean and consistent

---

## 📋 What's in v0.2.2

### 1. Critical Bug Fix 🐛

- **Fixed CSS variable naming** - All 148 color tokens now have clean, consistent names
- **Root cause:** Regex was splitting digits individually
- **Solution:** Updated regex to preserve number sequences

### 2. Breakpoint Updates 📱 (from v0.2.1)

- Updated for modern displays
- Lg: 1024px → 1280px
- Xl: 1280px → 1920px
- 2xl: 1536px → 2560px

---

## 🚀 Publishing Steps

### Step 1: Deprecate v0.2.1

```bash
npm deprecate @spexop/tokens@0.2.1 "CSS variable naming bug. Please use v0.2.2 instead."
```

This warns users not to use v0.2.1.

### Step 2: Publish v0.2.2

```bash
cd packages/tokens

# Verify version
cat package.json | grep version
# Should show: "version": "0.2.2"

# Publish
npm publish
```

**Expected output:**

```bash
+ @spexop/tokens@0.2.2
```

### Step 3: Verify Publication

```bash
# Check version
npm view @spexop/tokens version
# Should show: 0.2.2

# Check deprecation
npm view @spexop/tokens
# Should show v0.2.1 marked as deprecated

# Test installation
npm install @spexop/tokens@0.2.2

# Verify CSS variables
node -e "const t = require('@spexop/tokens'); console.log(t.sColorRed500)"
# Should show: #b04554
```

### Step 4: Git Tag and Push

```bash
cd /Users/olmstedian/__DEV__/spexop-design-system-public

# Add and commit
git add .
git commit -m "Release @spexop/tokens v0.2.2

Critical bug fix: CSS variable naming
- Fixed CSS generation script regex
- All color tokens now have clean CSS variable names
- Example: --s-color-red-500 (not --s-color-red-5-0-0)

Also includes v0.2.1 features:
- Updated breakpoints for modern displays
- Better tablet, Full HD, and 2K support

Deprecates: v0.2.1 (has CSS naming bug)
"

# Tag
git tag -a tokens-v0.2.2 -m "@spexop/tokens v0.2.2 - Critical CSS variable naming fix"

# Push
git push origin main
git push origin tokens-v0.2.2
```

### Step 5: Create GitHub Release

1. Go to: <https://github.com/spexop-ui/design-system/releases/new>
2. Select tag: `tokens-v0.2.2`
3. Release title: `@spexop/tokens v0.2.2 - Critical CSS Fix`
4. Mark as "Set as latest release"
5. Description:

```markdown
## @spexop/tokens v0.2.2 - Critical Bug Fix

🚨 **Important:** This release fixes a critical CSS variable naming bug in v0.2.1.

### 🐛 Critical Fix: CSS Variable Naming

**v0.2.1 had broken CSS variable names:**
```css
--s-color-red-5-0-0: #b04554;    /* ❌ Broken */
--s-color-blue-1-0-0: #dbeafe;  /* ❌ Broken */
```

**v0.2.2 has correct naming:**

```css
--s-color-red-500: #b04554;     /* ✅ Fixed */
--s-color-blue-100: #dbeafe;   /* ✅ Fixed */
```

**Impact:** All 148 color tokens now have clean, consistent CSS variable names.

### 📱 Also Includes (from v0.2.1)

Updated breakpoints for modern displays:

| Token | Old | New |
|-------|-----|-----|
| sBreakpointLg | 1024px | **1280px** |
| sBreakpointXl | 1280px | **1920px** |
| sBreakpoint2xl | 1536px | **2560px** |

- Better tablet support (768px-1280px)
- Full HD support (1920px)
- 2K/QHD support (2560px)

### ⚠️ Migration from v0.2.1

If you installed v0.2.1, upgrade immediately:

```bash
npm install @spexop/tokens@0.2.2
```

**v0.2.1 has been deprecated** on npm.

### 🔧 Installation

```bash
npm install @spexop/tokens@0.2.2
```

### 📖 Full Changelog

See [CHANGELOG.md](https://github.com/spexop-ui/design-system/blob/main/packages/tokens/CHANGELOG.md)

---

**All tests passing** (34/34) ✅

``` bash

6. Click "Publish release"

---

## 📢 Important Deprecation Notice

### After Publishing v0.2.2

**Immediately deprecate v0.2.1:**

```bash
npm deprecate @spexop/tokens@0.2.1 "CSS variable naming bug. Use v0.2.2 instead."
```

This will show a warning when anyone tries to install v0.2.1.

---

## 🧪 Post-Publish Verification

```bash
# 1. Check latest version
npm view @spexop/tokens version
# Should show: 0.2.2

# 2. Verify v0.2.1 is deprecated
npm view @spexop/tokens@0.2.1
# Should show: "deprecated": "CSS variable naming bug. Use v0.2.2 instead."

# 3. Test CSS variables
mkdir test-v0.2.2 && cd test-v0.2.2
npm init -y
npm install @spexop/tokens@0.2.2

# 4. Check CSS file
cat node_modules/@spexop/tokens/dist/tokens.css | grep "color-red-500"
# Should show: --s-color-red-500: #b04554;

# 5. NOT the broken format
cat node_modules/@spexop/tokens/dist/tokens.css | grep "color-red-5-0-0"
# Should show: (nothing)
```

---

## 📊 Version Timeline

| Version | Status | Issue |
|---------|--------|-------|
| **0.2.2** | ✅ Latest | CSS bug fixed, breakpoints updated |
| **0.2.1** | ⚠️ Deprecated | CSS variable naming bug |
| **0.2.0** | ✅ OK | Major color expansion (no CSS bug) |
| **0.1.0** | ✅ OK | Initial release |

---

## 📢 Announcement Template

### Twitter/X

``` bash
🚨 @spexop/tokens v0.2.2 is out!

Critical bug fix: CSS variables now properly named
✅ --s-color-red-500 (not --s-color-red-5-0-0)

Also includes modern breakpoint updates:
• Lg: 1280px (Full HD ready)
• Xl: 1920px
• 2xl: 2560px (2K/QHD)

⚠️ Skip v0.2.1 - use v0.2.2

npm install @spexop/tokens@0.2.2
```

### Dev Community

```markdown
## Critical Update: @spexop/tokens v0.2.2

We discovered and fixed a critical CSS variable naming bug in v0.2.1.

### The Bug

v0.2.1 generated malformed CSS variable names:
- `--s-color-red-5-0-0` instead of `--s-color-red-500`
- Affected all 148 color tokens

### The Fix

v0.2.2 corrects this:
- Clean, consistent naming: `--s-color-{name}-{shade}`
- All color families now work properly in CSS

### Action Required

If you installed v0.2.1, upgrade immediately:

```bash
npm install @spexop/tokens@0.2.2
```

v0.2.1 has been deprecated on npm.

### Bonus

v0.2.2 also includes modern breakpoint updates from v0.2.1:

- Better support for tablets (1280px)
- Full HD displays (1920px)
- 2K/QHD displays (2560px)

Sorry for the confusion! 🙏

``` bash

---

## ✅ Final Checks Before Publishing

```bash
cd packages/tokens

# 1. Version
grep '"version"' package.json
# Output: "version": "0.2.2" ✅

# 2. CSS variables (correct format)
grep "color-red-500:" dist/tokens.css
# Output: --s-color-red-500: #b04554; ✅

# 3. No broken format
grep "color-.*-[0-9]-[0-9]-[0-9]:" dist/tokens.css
# Output: (empty) ✅

# 4. Tests
pnpm test
# Output: 34 tests passing ✅
```

---

## 🎯 Summary

**What Went Wrong:**

- v0.2.1 was published with CSS variable naming bug
- Bug affected all 148 color tokens

**Solution:**

- Fix bug in generate-css.ts ✅
- Bump to v0.2.2 ✅
- Deprecate v0.2.1 ⏭️
- Publish v0.2.2 ⏭️

**Status:** Ready to publish v0.2.2

---

Generated: 2025-10-08  
Package: @spexop/tokens  
Version: 0.2.2  
Status: ✅ Ready (Critical Bug Fix)  
Action: Publish + Deprecate v0.2.1
