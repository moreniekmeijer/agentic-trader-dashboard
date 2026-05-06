# Phase 1: API Foundation and Safety Boundaries - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-06
**Phase:** 01-API Foundation and Safety Boundaries
**Areas discussed:** API contract strategy, Polling foundation design, Read-only enforcement approach

---

## API Contract Strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Boundary normalization | Adapt raw API payloads to stable dashboard models before UI | ✓ |
| Direct payload usage | Use backend payloads directly in UI | |
| Hybrid | Normalize only critical domains first | |

**User's choice:** Boundary normalization
**Notes:** User preferred stable UI contract over short-term direct-use speed.

| Option | Description | Selected |
|--------|-------------|----------|
| Dedicated adapter layer | Separate client/validation from domain mapping | ✓ |
| Mapping in query hooks | Each hook maps its own payload | |
| Mapping in components | Components map raw payloads directly | |

**User's choice:** Dedicated adapter layer
**Notes:** Clear separation of concerns preferred.

| Option | Description | Selected |
|--------|-------------|----------|
| Fail panel only | Isolate domain failures to affected panel | ✓ |
| Fail whole dashboard | Block screen until all domains valid | |
| Silent fallback | Best-effort render with partial fields | |

**User's choice:** Fail panel only
**Notes:** Availability for unaffected panels is important.

| Option | Description | Selected |
|--------|-------------|----------|
| Operator-visible drift warning | Show panel warning with reason and last good timestamp | ✓ |
| Developer-only logs | Log without operator-facing warning | |
| Hard blocking modal | Force acknowledgment before use | |

**User's choice:** Operator-visible drift warning
**Notes:** Transparency for monitoring operator preferred.

---

## Polling Foundation Design

| Option | Description | Selected |
|--------|-------------|----------|
| Central per-domain intervals | Shared config by domain type | ✓ |
| Single global interval | Same cadence for all panels | |
| Component hardcoding | Interval decisions local to panels | |

**User's choice:** Central per-domain intervals
**Notes:** Supports tuning and consistency.

| Option | Description | Selected |
|--------|-------------|----------|
| Throttle in background | Reduce cadence when tab not focused | ✓ |
| Continue normal polling | Same cadence always | |
| Pause entirely | Stop polling in background | |

**User's choice:** Throttle in background
**Notes:** Balance between load and freshness.

| Option | Description | Selected |
|--------|-------------|----------|
| Exponential backoff with cap | Retry policy with increasing delay and cap | ✓ |
| Fixed retry interval | Static retry cadence | |
| No automatic retry | Manual retry only | |

**User's choice:** Exponential backoff with cap
**Notes:** Preferred resilient behavior during outages.

| Option | Description | Selected |
|--------|-------------|----------|
| Per-panel + global refresh | Targeted and full refresh controls | ✓ |
| Global refresh only | One dashboard-level refresh control | |
| No manual refresh | Polling-only model | |

**User's choice:** Per-panel + global refresh
**Notes:** Supports fast local recovery and operational control.

---

## Read-Only Enforcement Approach

| Option | Description | Selected |
|--------|-------------|----------|
| Hard separation | Enforce read-only via module boundaries and guards | |
| Convention-based | Team convention and review only | ✓ |
| Feature-flagged mutations | Mutation code present but hidden | |

**User's choice:** Convention-based
**Notes:** User explicitly chose convention over hard technical barriers in this phase.

| Option | Description | Selected |
|--------|-------------|----------|
| Explicit UI safeguards | Labels/absence messaging for monitor-only state | |
| Minimal safeguards | Omit obvious control buttons only | |
| None | No additional UI safeguards | ✓ |

**User's choice:** None
**Notes:** User chose not to add additional UI-level safety messaging in this phase.

| Option | Description | Selected |
|--------|-------------|----------|
| Defer control requests | Keep v1 strict and defer actions to future phase | ✓ |
| Case-by-case exceptions | Allow selected safe controls | |
| Open door to controls | Allow controls whenever requested | |

**User's choice:** Defer control requests
**Notes:** Preserves phase boundary and v1 monitor-only intent.

---

## the agent's Discretion

- Internal naming and folder layout for read client + adapter modules.
- Query hook composition details that implement selected polling choices.

## Deferred Ideas

- Any mutation/control actions remain future-phase work.
- Real-time push transport remains post-v1.
