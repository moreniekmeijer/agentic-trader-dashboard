# Codebase Concerns

**Analysis Date:** 2026-05-06

## Tech Debt

**Starter template still present:**
- Issue: The app still renders Vite/React starter content in `src/App.tsx` and default template README guidance in `README.md`.
- Why: The repository has been scaffolded but not yet shaped into the trading dashboard product.
- Impact: Future planning should treat current UI as placeholder, not validated product behavior.
- Fix approach: Replace starter content with product-specific dashboard structure during the first implementation phase.

**All UI in one component:**
- Issue: `src/App.tsx` contains all current markup and state.
- Why: Starter app is intentionally tiny.
- Impact: This will become hard to maintain if dashboard panels, data states, and interactions are added without extracting components.
- Fix approach: Introduce feature/component boundaries under `src/` as product scope becomes concrete.

**No app-level data model yet:**
- Issue: No domain types, API clients, services, state stores, or route structure exist.
- Why: Product requirements have not been defined yet.
- Impact: Early dashboard work must establish stable data boundaries instead of scattering trading data assumptions through JSX.
- Fix approach: Define typed DTOs/adapters and UI state patterns before wiring live or mock market data.

## Known Bugs

**No known runtime bugs documented:**
- Symptoms: None observed from static inspection.
- Trigger: Not applicable.
- Workaround: Not applicable.
- Root cause: No bug reports or failing tests are present.

## Security Considerations

**External links opened in new tabs:**
- Risk: Links in `src/App.tsx` use `target="_blank"` without `rel="noreferrer"`.
- Current mitigation: None.
- Recommendations: Add `rel="noreferrer"` or remove `target="_blank"` when replacing starter links.

**Future trading credentials/data provider tokens:**
- Risk: A trading dashboard may need broker, exchange, LLM, or market-data credentials; hard-coding them in client code would expose secrets to users.
- Current mitigation: No such credentials currently exist.
- Recommendations: Keep secrets server-side. Use environment variables only for non-secret public config in Vite client code.

**No auth/authorization boundary:**
- Risk: Any future user-specific portfolio, strategy, or trade action features need authentication and authorization design before implementation.
- Current mitigation: None needed for placeholder app.
- Recommendations: Treat auth and sensitive action confirmation as first-class requirements if real trading actions enter scope.

## Performance Bottlenecks

**No measured bottlenecks yet:**
- Problem: No real data rendering or heavy computation exists.
- Measurement: Not measured.
- Cause: Not applicable.
- Improvement path: Add performance checks once dashboard lists, charts, polling, or streaming data are introduced.

**Static image/layout dependence:**
- Problem: Current hero uses fixed image dimensions and decorative positioning.
- Measurement: Not measured.
- Cause: Starter visual layout in `src/App.tsx` and `src/App.css`.
- Improvement path: Replace with dashboard-specific responsive layout and verify across viewports.

## Fragile Areas

**Root mount assertion:**
- Why fragile: `src/main.tsx` assumes `document.getElementById('root')` is always present.
- Common failures: Editing `index.html` and renaming/removing `#root` would produce a runtime failure.
- Safe modification: Keep `index.html` root id synchronized with `src/main.tsx`, or add an explicit guard if bootstrapping becomes more complex.
- Test coverage: No tests cover bootstrap behavior.

**Nested CSS syntax:**
- Why fragile: `src/App.css` uses nested selectors such as `.counter { &:hover { ... } }`.
- Common failures: Tooling or CSS pipeline changes that do not support nesting could break styles.
- Safe modification: Keep Vite/CSS tooling compatible or flatten selectors when changing build tooling.
- Test coverage: No visual or style regression tests exist.

## Scaling Limits

**Single-page starter structure:**
- Current capacity: Fine for a static starter page.
- Limit: Does not yet support dashboard routing, data fetching, caching, authentication, or complex user workflows.
- Symptoms at limit: `App.tsx` becomes large, state becomes tangled, and dashboard updates become risky.
- Scaling path: Add component boundaries, typed data services, and route/state architecture when requirements demand them.

## Dependencies at Risk

**No immediate risky dependency identified from package manifests:**
- Risk: The repo uses current major versions of React, Vite, TypeScript, and ESLint.
- Impact: Future additions should check compatibility with React 19 and TypeScript 6.
- Migration plan: Pin or verify new libraries before adding them to critical dashboard flows.

## Missing Critical Features

**Product functionality not implemented yet:**
- Problem: Despite the repository name, there is no trading dashboard functionality.
- Current workaround: None.
- Blocks: Any useful product validation.
- Implementation complexity: Depends on requirements, data source, auth/security needs, and whether real trade execution is in scope.

**Testing absent:**
- Problem: There is no automated test suite.
- Current workaround: Use `npm run build` and `npm run lint`.
- Blocks: Confident refactors once real dashboard logic appears.
- Implementation complexity: Low for initial Vitest/React Testing Library setup; higher for E2E and live data integrations.

## Test Coverage Gaps

**Entire app untested:**
- What's not tested: Component rendering, button interaction, asset references, responsive layout, and future business logic.
- Risk: Regressions may only be caught manually.
- Priority: Medium now, high once product behavior is added.
- Difficulty to test: Low after adding a Vite-compatible React test setup.

---

*Concerns audit: 2026-05-06*
*Update as issues are fixed or new ones discovered*
