# Publishing Guide: @spexop/tokens v0.2.0

## 📦 Package Status

✅ **Ready to Publish**

**Version:** 0.2.0  
**Build Date:** 2025-10-07  
**Total Tokens:** 441  
**Status:** All tests passing ✅

---

## 🎯 Pre-Publishing Checklist

- [x] Version updated to 0.2.0 in `package.json`
- [x] CHANGELOG.md updated with all v0.2.0 changes
- [x] README.md updated with new features
- [x] Repository README.md updated with release announcement
- [x] All new color tokens created (48 tokens)
- [x] Documentation files created (TOKENS-REFERENCE.md, tokens-demo.html, tokens-quick-reference.txt)
- [x] Build successful (441 tokens generated)
- [x] All tests passing (34/34)
- [x] No linter errors
- [x] Git working directory clean

---

## 📋 What's New in v0.2.0

### Color System Expansion (48 new tokens)

1. **Purple Color Scale** (10 tokens)
   - Modern purple for premium/innovation themes
   - `sColorPurple50` → `sColorPurple900`

2. **Green Color Scale** (10 tokens)
   - Contemporary emerald-green (distinct from Success)
   - `sColorGreen50` → `sColorGreen900`

3. **Complete Red Scale** (4 new tokens)
   - Added: 200, 300, 400, 900

4. **Expanded Semantic Colors** (28 new tokens)
   - Success: 3 → 10 shades
   - Warning: 3 → 10 shades
   - Info: 3 → 10 shades
   - Error: 3 → 10 shades

### Documentation Enhancement

- **TOKENS-REFERENCE.md** (13 KB) - Complete markdown reference
- **tokens-demo.html** (43 KB) - Interactive visual showcase
- **tokens-quick-reference.txt** (7.4 KB) - CLI-friendly reference

### Statistics

- Total tokens: 393 → 441 (+12%)
- Color tokens: ~100 → 148 (+48%)
- Color families: 6 → 10
- All tests: 34 passing ✅

---

## 🚀 Publishing to npm

### Step 1: Verify Package

```bash
cd packages/tokens

# Verify version
cat package.json | grep version

# Verify build
pnpm build

# Verify tests
pnpm test

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

``` bash
+ @spexop/tokens@0.2.0
```

### Step 4: Verify Publication

```bash
# Check on npm
npm view @spexop/tokens

# Install and test
npm install @spexop/tokens@0.2.0
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
git commit -m "Release @spexop/tokens v0.2.0

- Added Purple and Green color scales (20 tokens)
- Expanded semantic colors to full 10-shade scales (28 tokens)
- Completed Red color scale (4 tokens)
- Added comprehensive documentation files
- Total: 441 tokens (up from 393)
- All tests passing

BREAKING CHANGES: None - fully backward compatible
"
```

### Step 2: Create Git Tag

```bash
# Create annotated tag
git tag -a tokens-v0.2.0 -m "@spexop/tokens v0.2.0

Major color system expansion with 48 new tokens and comprehensive documentation.

See CHANGELOG.md for full details."

# Verify tag
git tag -l "tokens-v*"
```

### Step 3: Push to GitHub

```bash
# Push commits
git push origin main

# Push tags
git push origin tokens-v0.2.0
```

### Step 4: Create GitHub Release

1. Go to: <https://github.com/spexop-ui/design-system/releases/new>
2. Select tag: `tokens-v0.2.0`
3. Release title: `@spexop/tokens v0.2.0`
4. Description (use CHANGELOG.md content):

```markdown
## @spexop/tokens v0.2.0

Major color system expansion! 🎨

### 🎨 New Color Scales (48 new tokens)

- **Purple** (10 tokens) - Modern purple for premium/innovation themes
- **Green** (10 tokens) - Contemporary emerald-green distinct from Success
- **Red** (4 tokens) - Completed scale with 200, 300, 400, 900

### ✨ Expanded Semantic Colors (28 new tokens)

All semantic colors now have full 10-shade scales:
- Success: 3 → 10 shades ✅
- Warning: 3 → 10 shades ✅
- Info: 3 → 10 shades ✅
- Error: 3 → 10 shades ✅

### 📚 New Documentation

- `TOKENS-REFERENCE.md` - Complete markdown reference (13 KB)
- `tokens-demo.html` - Interactive visual showcase (43 KB)
- `tokens-quick-reference.txt` - CLI-friendly reference (7.4 KB)

### 📊 Statistics

- **Total tokens**: 441 (up from 393, +12%)
- **Color tokens**: 148 (up from ~100, +48%)
- **Color families**: 10 complete families
- **Tests**: All 34 tests passing ✅

### 🔧 Installation

```bash
npm install @spexop/tokens@0.2.0
```

### 📖 Full Changelog

See [CHANGELOG.md](https://github.com/spexop-ui/design-system/blob/main/packages/tokens/CHANGELOG.md)

---

**No breaking changes** - Fully backward compatible ✅

``` bash

5. Click "Publish release"

---

## 📦 Package Contents

### Distributed Files

```

@spexop/tokens@0.2.0
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

## 🧪 Post-Publish Verification

### 1. Verify npm Package

```bash
# Check published version
npm view @spexop/tokens version

# Check package info
npm view @spexop/tokens

# Install in test project
mkdir test-tokens && cd test-tokens
npm init -y
npm install @spexop/tokens@0.2.0

# Verify files
ls node_modules/@spexop/tokens/
```

### 2. Test Imports

```javascript
// test.js
const tokens = require('@spexop/tokens');
console.log('Purple 500:', tokens.sColorPurple500);
console.log('Green 500:', tokens.sColorGreen500);
console.log('Success 100:', tokens.sColorSuccess100);
```

### 3. Verify Documentation

```bash
# View demo
open node_modules/@spexop/tokens/tokens-demo.html

# View text reference
cat node_modules/@spexop/tokens/tokens-quick-reference.txt
```

### 4. Test TypeScript

```typescript
// test.ts
import { 
  sColorPurple500, 
  sColorGreen500, 
  sColorSuccess100 
} from '@spexop/tokens';

const theme = {
  premium: sColorPurple500,
  nature: sColorGreen500,
  successBg: sColorSuccess100,
};
```

---

## 🎯 Announcement Templates

### Twitter/X

``` bash
🎨 @spexop/tokens v0.2.0 is here!

✨ 48 new color tokens
🎨 10 complete color families
📚 Interactive docs & visual showcase
✅ 441 tokens total

npm install @spexop/tokens@0.2.0

#DesignSystem #TypeScript #WebDev
```

### LinkedIn

``` bash
Excited to announce @spexop/tokens v0.2.0! 🚀

This release brings major color system improvements:

🎨 48 new color tokens including Purple & Green scales
📈 Expanded semantic colors (Success, Warning, Info, Error) to full 10-shade scales
📚 Interactive HTML demo + comprehensive documentation
✅ 441 professional design tokens

Perfect for building consistent, themeable interfaces with TypeScript.

npm install @spexop/tokens@0.2.0

#DesignSystem #OpenSource #TypeScript
```

### Dev.to / Hashnode

Title: **Introducing @spexop/tokens v0.2.0: Professional Design Tokens with Expanded Color System**

(Use CHANGELOG content as blog post)

---

## 📋 Next Steps After Publishing

1. **Update documentation site** (if applicable)
2. **Announce on social media**
3. **Update dependent packages** (e.g., @spexop/react)
4. **Monitor npm downloads**
5. **Watch for issues/feedback**
6. **Plan v0.3.0** based on user feedback

---

## 🐛 Rollback Plan (if needed)

If critical issues are found:

```bash
# Deprecate version
npm deprecate @spexop/tokens@0.2.0 "Critical bug, use 0.1.0"

# Or unpublish (within 72 hours)
npm unpublish @spexop/tokens@0.2.0
```

---

## ✅ Final Verification

Run these commands before publishing:

```bash
cd packages/tokens

# 1. Check version
grep '"version"' package.json

# 2. Run build
pnpm build

# 3. Run tests
pnpm test

# 4. Check files to be published
npm pack --dry-run

# 5. Verify no uncommitted changes
git status
```

All checks should pass ✅

---

**Ready to publish!** 🚀

Follow the steps above to publish @spexop/tokens v0.2.0 to npm and GitHub.

---

Generated: 2025-10-07  
Package: @spexop/tokens  
Version: 0.2.0  
Status: ✅ Ready for Publication
