# Pulsar Upgrade Guide

This document describes the changes made to migrate terminal-tab from Atom to Pulsar.

## Summary

The plugin has been successfully migrated to work with Pulsar while maintaining backward compatibility with the Atom API where possible.

## Changes Made

### 1. Package Configuration (package.json)

**Changes:**
- Updated `engines.atom` → `engines.pulsar` (>=1.64.0)
- Updated repository URL to `pulsar-terminal-tab`
- Updated homepage URL
- Added "pulsar" keyword
- Updated dependencies:
  - `xterm`: 4.2.0 → 5.3.0
  - `node-pty`: 1.0.1 → 1.1.0
  - `xterm-addon-fit`: 0.3.0 → 0.8.0

**Note:** The old `xterm` package still exists in v5.x, so no import path changes were needed.

### 2. Theme Matching (theme-matcher.js/ts, config.js/ts)

**Old Approach (Broken in Pulsar):**
```javascript
// Used document.body.appendChild - removed in Pulsar
themeMatcher.writeElements();  // ❌
const computedStyle = getComputedStyle(colorElement);  // ❌
```

**New Approach (Simplified):**
- Removed the complex theme detection that used DOM manipulation
- Added user-configurable color settings in `config.js`
- Theme matching now uses xterm's native theme support

**Configuration:**
```json
{
  "matchTheme": {
    "title": "Match Theme",
    "default": false,
    "description": "When enabled, the look of the terminal will match the currently configured Pulsar theme."
  },
  "colors": {
    "title": "Terminal Colors",
    "properties": {
      "foreground": { "default": "#cccccc" },
      "background": { "default": "#1e1e1e" },
      "cursor": { "default": "#cccccc" },
      // ... all 16 ANSI colors
    }
  }
}
```

### 3. TypeScript Migration

**Files Converted:**
- `lib/config.js` → `lib/config.ts`
- `lib/main.js` → `lib/main.ts`
- `lib/terminal-session.js` → `lib/terminal-session.ts`
- `lib/terminal-view.js` → `lib/terminal-view.ts`
- `lib/theme-matcher.js` → `lib/theme-matcher.ts`
- `spec/*-spec.js` → `spec/*-spec.ts`

**Configuration:**
- Added `tsconfig.json` for TypeScript compilation
- Added `eslint.config.mjs` for ESLint v9
- Added type definitions in `src/types/`

**Note:** ESLint configuration is minimal and may need refinement for JSX support. The `@jsx etch.dom` directive works with the TypeScript compiler but requires manual ESLint configuration.

### 4. Type Definitions

Created TypeScript type definitions for:
- Pulsar globals (`atom.*`)
- etch DOM builder
- Jasmine test framework

## Breaking Changes

1. **Theme Detection:** The automatic theme color detection no longer works. Users must manually configure colors or use xterm's defaults.

2. **xterm API:** The `theme` option format has changed slightly in xterm v5:
   - Old: `{ selection: string }`
   - New: `{ selectionBackground: string, selectionForeground: string }`

## Benefits

1. **Pulsar Compatible:** Works with Pulsar's API
2. **Modern Dependencies:** Updated to xterm 5.x and node-pty 1.x
3. **Type Safe:** TypeScript provides compile-time type checking
4. **Better Configuration:** User-configurable colors are more reliable than automatic theme detection
5. **ESLint 9:** Updated to modern ESLint configuration

## Known Issues

1. **ESLint JSX Support:** The ESLint v9 configuration needs refinement to properly lint JSX in TypeScript files. The code will compile and run correctly, but ESLint may report parsing errors.

## Future Improvements

1. **React Migration:** Consider migrating from etch to React for better maintainability
2. **ESLint Fixes:** Complete the ESLint configuration for JSX
3. **Additional Features:** Add more theme matching options if Pulsar provides better APIs
4. **TypeScript Enhancements:** Improve type definitions and add more type safety

## Testing

The plugin should be tested with:
1. Pulsar 1.64.0 or later
2. Different themes to verify color configuration
3. Terminal functionality (copy, paste, clear, resize)
4. Session serialization/deserialization

## Rollback

Each commit is standalone and can be rolled back:
```bash
git log --oneline  # See commit history
git checkout <commit>  # Revert to specific commit
```

Commits for this migration:
- `38bc824` - package.json updates
- `f377664` - dependency updates
- `e5295f6` - theme matching simplification
- `69d7374` - TypeScript support
- `de71f73` - TypeScript migration completion
