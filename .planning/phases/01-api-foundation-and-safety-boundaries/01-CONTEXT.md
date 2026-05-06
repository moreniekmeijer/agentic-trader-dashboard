# Phase 1: API Foundation and Safety Boundaries - Context

**Gathered:** 2026-05-06
**Status:** Ready for planning

<domain>
## Phase Boundary

This phase establishes the frontend API foundation for the monitoring dashboard and defines safety boundaries so v1 remains monitor-only. Scope includes typed read-path integration patterns, payload adaptation strategy, polling foundation choices, and explicit handling for schema drift and endpoint failures.

</domain>

<decisions>
## Implementation Decisions

### API Contract Strategy
- **D-01:** Use boundary normalization for v1. Raw upstream API payloads are adapted into stable dashboard domain models before reaching UI components.
- **D-02:** Keep normalization in a dedicated adapter layer (separate from components and from rendering concerns).
- **D-03:** If validation/adaptation fails for one domain, fail that panel only; do not fail the entire dashboard.
- **D-04:** Schema drift should be operator-visible in the affected panel, with concise reason and last good update timestamp.

### Polling Foundation Design
- **D-05:** Use centrally defined per-domain polling intervals (not one global interval, not panel-local hardcoding).
- **D-06:** Throttle polling when the tab is in background; resume normal cadence on focus.
- **D-07:** Use exponential backoff with cap for repeated endpoint failures, with automatic recovery on success.
- **D-08:** Support both per-panel refresh and a global refresh control in v1.

### Read-Only Safety Boundaries
- **D-09:** Enforce read-only behavior by convention in v1 (no hard technical mutation barrier selected for this phase).
- **D-10:** No additional UI-level safeguard labeling is required in this phase.
- **D-11:** Any request for control actions during v1 is deferred to a future phase and kept out of current scope.

### the agent's Discretion
- Final file/module naming for API client/adapters is at implementation discretion, as long as decisions D-01 through D-08 remain intact.
- Choice of exact query-hook API and helper abstractions is at implementation discretion, as long as centralized polling policy is preserved.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Phase Scope and Requirements
- `.planning/ROADMAP.md` — Phase 1 goal, requirement mapping, and success criteria
- `.planning/REQUIREMENTS.md` — `SAFE-01` requirement and v1 read-only constraints
- `.planning/PROJECT.md` — product context, scope boundaries, and key decisions

### Codebase Context
- `.planning/codebase/STACK.md` — current frontend/runtime/tooling baseline
- `.planning/codebase/ARCHITECTURE.md` — current app structure and entry points
- `.planning/codebase/INTEGRATIONS.md` — confirms no existing API integration layer yet

### Research Inputs
- `.planning/research/SUMMARY.md` — recommended polling-first approach and boundary guidance
- `.planning/research/STACK.md` — proposed dashboard stack additions
- `.planning/research/PITFALLS.md` — schema drift and polling failure risks

### External Upstream Reference
- No repository-local spec/ADR file exists yet for the upstream API contract.
- Use the upstream API folder reference from PROJECT context during planning:
  `https://github.com/moreniekmeijer/agentic-trader/blob/main/agentic_trader/`

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/main.tsx`: bootstrap entry where provider setup can be introduced.
- `src/App.tsx`: current placeholder root suitable for replacement with dashboard shell.
- `src/index.css` and `src/App.css`: existing styling baseline that can be incrementally replaced.

### Established Patterns
- React + TypeScript + Vite starter pattern is in place.
- No data fetching library, routing layer, or API client currently exists.
- No test framework currently exists; lint/build checks are available.

### Integration Points
- New API client and adapter modules will be added under `src/` and consumed via query hooks from dashboard panels.
- Polling and refresh controls should be integrated at dashboard shell/panel boundaries without introducing write actions.
- Read-only safety is currently procedural (convention + phase scope), not enforced by dedicated mutation-blocking tooling.

</code_context>

<specifics>
## Specific Ideas

- Panel isolation is important: broken data in one domain should not collapse whole-dashboard visibility.
- Operator-facing transparency for data-contract issues is preferred over silent failures.
- Refresh UX should support both quick all-dashboard refresh and targeted panel refresh.

</specifics>

<deferred>
## Deferred Ideas

- Control actions (start/stop/pause or any mutation endpoint usage) are explicitly deferred beyond v1.
- Real-time transport (websocket/SSE) remains a later phase concern after polling-first delivery.

</deferred>

---

*Phase: 1-API Foundation and Safety Boundaries*
*Context gathered: 2026-05-06*
