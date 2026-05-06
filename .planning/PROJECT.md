# Agentic Trader Monitoring Dashboard

## What This Is

A web dashboard for monitoring the `agentic-trader` system through its API surface, with focus on operational visibility rather than execution control. It is intended for a single internal operator to quickly understand what the trading agents are doing, what positions and outcomes exist, and whether anything needs attention.

The dashboard will consume data currently exposed by the `agentic-trader` API and present it in a readable monitoring interface with useful visuals (including charts/graphs where they improve clarity).

## Core Value

A single internal operator can clearly and reliably monitor all currently available `agentic-trader` API data from one place.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Monitor agent status and health.
- [ ] Monitor open positions and PnL.
- [ ] Monitor trade history and fills.
- [ ] Monitor alerts and log stream.
- [ ] Present data with clear visualizations where useful (for example charts/graphs).
- [ ] Use polling first, with architecture that can evolve to real-time later.

### Out of Scope

- Operational controls (start/stop/pause strategies) — v1 is read-only monitoring.
- External/customer multi-tenant features — audience is internal single operator.
- Building new trading logic — dashboard only monitors existing system behavior.

## Context

- Existing upstream project: `https://github.com/moreniekmeijer/agentic-trader` (reference path mentioned: `agentic_trader/`).
- There is an API folder in the upstream project intended for communication with the app; this dashboard should align with that API contract.
- Current local repository is a frontend starter scaffold and will be shaped into monitoring product UI.
- Initial uncertainty around live-refresh approach was resolved to: polling first, real-time later.

## Constraints

- **Scope**: v1 is monitor-only (read-only) — must not include trade/strategy control actions.
- **Data Source**: dashboard should reflect currently available data from the upstream `agentic-trader` API.
- **Audience**: single internal operator workflow must be optimized first.
- **Incremental Delivery**: ship a useful v1 quickly with polling, then evaluate websocket/SSE upgrade based on usage and API readiness.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Internal audience only (single operator) | Reduces complexity and keeps UX focused on operator needs | — Pending |
| v1 feature scope includes status/health, positions+PnL, trade history/fills, alerts/logs | Matches explicitly requested monitoring priorities | — Pending |
| v1 is read-only | Prevents accidental operational risk and keeps first release focused | — Pending |
| Refresh strategy: polling first, real-time later | Faster path to delivery while preserving future upgrade path | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `$gsd-transition`):
1. Requirements invalidated? -> Move to Out of Scope with reason
2. Requirements validated? -> Move to Validated with phase reference
3. New requirements emerged? -> Add to Active
4. Decisions to log? -> Add to Key Decisions
5. "What This Is" still accurate? -> Update if drifted

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check -> still the right priority?
3. Audit Out of Scope -> reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-06 after initialization*
