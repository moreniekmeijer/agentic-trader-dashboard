# Coding Conventions

**Analysis Date:** 2026-05-06

## Naming Patterns

**Files:**
- `App.tsx` uses PascalCase for the current React component file.
- `main.tsx` uses lowercase for the app bootstrap entry.
- CSS files mirror their scope: `index.css` for global styles and `App.css` for app/component styles.
- No test file naming convention exists yet.

**Functions:**
- React components use PascalCase, as seen with `function App()`.
- State setters follow React hook naming, as seen with `setCount`.
- Inline event handlers are currently used for simple interactions.

**Variables:**
- Local variables use camelCase, as seen with `count`, `setCount`, and `heroImg`.
- Imported assets use descriptive camelCase names where needed.
- CSS custom properties use kebab-case, such as `--accent-border`.

**Types:**
- No project-defined TypeScript interfaces, type aliases, or enums exist yet.
- When added, match TypeScript/React norms: PascalCase for exported types and explicit props types for components.

## Code Style

**Formatting:**
- Existing TypeScript omits semicolons.
- Existing TypeScript uses single quotes.
- JSX uses two-space indentation.
- Multi-line JSX props are formatted one prop per line when the element becomes long.
- CSS uses nested selectors in `src/App.css`, enabled through the current Vite/CSS toolchain.

**Linting:**
- ESLint is configured in `eslint.config.js`.
- Run with `npm run lint`.
- Active rule sets include `@eslint/js` recommended, `typescript-eslint` recommended, React hooks recommended, and React refresh Vite rules.
- TypeScript compiler options also enforce `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`, and `noFallthroughCasesInSwitch`.

## Import Organization

**Order:**
1. External packages, such as `react` and `react-dom/client`.
2. Local assets or modules.
3. CSS side-effect imports.

**Grouping:**
- No blank-line grouping pattern is established in the small current codebase.
- Keep imports simple and readable; introduce stricter grouping only when modules grow.

**Path Aliases:**
- No path aliases are configured.
- Current imports are relative, such as `./App.tsx` and `./assets/react.svg`.

## Error Handling

**Patterns:**
- No explicit runtime error handling exists yet.
- `src/main.tsx` uses a non-null assertion for `document.getElementById('root')!`.
- There are no async operations, thrown domain errors, or Result-style return types.

**Error Types:**
- None currently.
- Future API/data code should handle loading, empty, and error states explicitly at UI boundaries.

## Logging

**Framework:**
- No logging framework is configured.
- No `console.*` calls are present in application source.

**Patterns:**
- Avoid adding persistent `console.log` calls to committed UI code unless a project logging/debug convention is established.

## Comments

**When to Comment:**
- Existing source has no application comments.
- Keep comments focused on non-obvious decisions rather than restating JSX/CSS behavior.

**JSDoc/TSDoc:**
- Not currently used.
- Add only for public/shared utilities once they exist.

**TODO Comments:**
- No TODO/FIXME comments are present.
- If introduced, make them actionable and tie them to a planning item or issue when possible.

## Function Design

**Size:**
- `App` currently contains all UI markup and is acceptable for a starter app.
- Extract components when dashboard sections gain separate behavior, data, or repeated structure.

**Parameters:**
- No custom functions with parameters currently exist.
- Use explicit props types for new React components.

**Return Values:**
- Components return JSX directly.
- Prefer early extraction over deeply nested conditional JSX as the app grows.

## Module Design

**Exports:**
- `src/App.tsx` uses a default export for the root React component.
- No named internal exports are established yet.

**Barrel Files:**
- No barrel files are currently used.
- Avoid adding barrels until there are stable public module boundaries.

---

*Convention analysis: 2026-05-06*
*Update when code style, module structure, or linting patterns change*
