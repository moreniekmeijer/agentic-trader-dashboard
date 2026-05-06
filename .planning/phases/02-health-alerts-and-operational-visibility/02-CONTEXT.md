# Phase 2: Health, Alerts, and Operational Visibility - Context

**Gathered:** 2026-05-06
**Status:** Ready for planning

<domain>
## Phase Boundary

Deliver operator-facing health status, alerts, and operational visibility panels on top of the Phase 1 monitoring foundation. This phase implements the first complete visibility loop for status and incident awareness, not execution controls.

</domain>

<decisions>
## Implementation Decisions

### Discussion Outcome
- **D-01:** No additional deep-dive discussion requested for Phase 2; proceed with default implementation decisions aligned to existing project context.

### Inherited Constraints (Locked)
- **D-02:** Monitor-only scope remains locked (no strategy/trade control actions).
- **D-03:** Panel-level failure isolation remains required.
- **D-04:** Centralized polling policy and background throttling remain required.
- **D-05:** Contract warning + last-updated behavior remains required.

### Phase 2 Default Direction
- **D-06:** Health state UX should prioritize degraded/down signals first when mixed statuses exist.
- **D-07:** Alerts should be ordered by severity and recency (critical first, newest first inside severity).
- **D-08:** Operational log view should start with a compact, readable default (timestamp, source, level, message) and minimal filtering.
- **D-09:** Empty, error, and degraded panel states should be visually distinct and consistent across health/alerts/logs panels.

### the agent's Discretion
- Exact UI component composition and panel layout for health/alerts/logs.
- Precise filtering affordances for logs (as long as they stay minimal and operator-friendly).
- Internal data shaping details when mapping backend health/alert/log payloads.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Scope and Requirements
- `.planning/ROADMAP.md` — Phase 2 goal, requirement IDs, and success criteria
- `.planning/REQUIREMENTS.md` — `HLTH-01..03`, `ALRT-01..03`
- `.planning/PROJECT.md` — monitor-only constraints and overall product intent

### Prior Phase Decisions and Implementation
- `.planning/phases/01-api-foundation-and-safety-boundaries/01-CONTEXT.md` — locked architecture decisions inherited into Phase 2
- `.planning/phases/01-api-foundation-and-safety-boundaries/01-01-PLAN.md` — implementation contract for Phase 1
- `.planning/phases/01-api-foundation-and-safety-boundaries/01-01-SUMMARY.md` — what shipped in foundation phase
- `.planning/phases/01-api-foundation-and-safety-boundaries/01-UAT.md` — validated outcomes from UAT

### Codebase and UX Contracts
- `.planning/phases/01-api-foundation-and-safety-boundaries/01-UI-SPEC.md` — established spacing/typography/color/copy contract
- `.planning/research/SUMMARY.md` — guidance on monitoring dashboard patterns and risks

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/lib/api/queries.ts` — centralized query hooks and polling behavior baseline
- `src/components/dashboard/PanelFrame.tsx` — panel state handling pattern (loading/error/contract-warning/empty/data)
- `src/components/dashboard/ContractWarning.tsx` and `LastUpdated.tsx` — reusable status primitives
- `src/types/monitoring.ts` — domain type foundation for extending health/alerts/log models

### Established Patterns
- Read-only API boundary via contracts/adapters
- Per-panel refresh + global refresh
- Operator-visible contract issues instead of silent failures

### Integration Points
- Extend existing query layer for richer health/alerts/log semantics
- Expand App shell panel composition with concrete status/alerts/log workflows
- Reuse panel primitives to keep failure/empty/updated behavior consistent

</code_context>

<specifics>
## Specific Ideas

- Keep health overview high-signal and quick to scan for degradation.
- Ensure alert severity visuals are obvious but not noisy.
- Keep logs usable without overbuilding a full observability tool in this phase.

</specifics>

<deferred>
## Deferred Ideas

- Any control-plane actions (start/stop/pause/execute).
- Real-time streaming transport migration (websocket/SSE).

</deferred>

---

*Phase: 2-Health, Alerts, and Operational Visibility*
*Context gathered: 2026-05-06*
