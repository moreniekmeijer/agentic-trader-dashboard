# Testing Patterns

**Analysis Date:** 2026-05-06

## Test Framework

**Runner:**
- No test runner is configured.
- `package.json` has no `test`, `test:watch`, `test:coverage`, or E2E scripts.

**Assertion Library:**
- None currently configured.

**Run Commands:**
```bash
npm run build    # Type-check and build with tsc -b && vite build
npm run lint     # Run ESLint over configured TypeScript/TSX files
```

## Test File Organization

**Location:**
- No test files exist.
- No convention for colocated tests, `__tests__/`, or top-level `tests/` has been established.

**Naming:**
- No `*.test.ts`, `*.test.tsx`, `*.spec.ts`, or E2E naming pattern exists yet.

**Structure:**
```text
src/
  App.tsx       # Source only
  main.tsx      # Source only
```

## Test Structure

**Suite Organization:**
- No existing suite structure.
- For future React UI testing, a likely fit is Vitest plus React Testing Library because the app is already Vite-based.

**Patterns:**
- No setup/teardown pattern exists.
- No test fixtures or factories exist.

## Mocking

**Framework:**
- No mocking framework is configured.

**Patterns:**
- No network, time, storage, or module mocking exists.

**What to Mock:**
- Future external trading/data-provider APIs should be mocked in component or service tests.
- Browser APIs should be mocked only when a feature uses them directly.

**What NOT to Mock:**
- Current static rendering can be tested without mocks once a test framework exists.

## Fixtures and Factories

**Test Data:**
- None currently.

**Location:**
- No fixture location exists.
- Add shared fixtures only after multiple tests need the same market/trading/dashboard data shapes.

## Coverage

**Requirements:**
- No coverage target is configured.
- No CI enforcement exists.

**Configuration:**
- No coverage tooling is configured.

**View Coverage:**
```bash
# No coverage command is available yet.
```

## Test Types

**Unit Tests:**
- Not configured.
- Useful future targets: pure formatting/calculation helpers and state reducers if they are introduced.

**Component Tests:**
- Not configured.
- Useful future targets: dashboard cards, controls, loading states, error states, and interactions.

**Integration Tests:**
- Not configured.
- Useful future targets: API client plus UI flows once external data is added.

**E2E Tests:**
- Not configured.
- Useful future targets: dashboard load, symbol search, strategy creation, and key trading workflow guardrails once product scope is defined.

## Common Patterns

**Current Verification Pattern:**
- `npm run build` is the narrowest type/build verification.
- `npm run lint` is the current static quality gate.

**Recommended First Test Setup:**
- Add Vitest, jsdom, React Testing Library, and `@testing-library/jest-dom` when meaningful UI behavior appears.
- Add a `test` script and document the chosen file naming convention here.

---

*Testing analysis: 2026-05-06*
*Update when test framework or conventions are added*
