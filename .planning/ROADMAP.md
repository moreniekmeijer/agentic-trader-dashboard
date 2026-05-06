# Roadmap: Agentic Trader Monitoring Dashboard

**Created:** 2026-05-06
**Granularity:** standard
**Mode:** interactive

## Overview

**5 phases** | **18 v1 requirements mapped** | **Coverage: 100%**

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | API Foundation and Safety Boundaries | Establish typed API integration and enforce read-only boundaries | SAFE-01 | 3 |
| 2 | Health, Alerts, and Operational Visibility | Deliver core health status and alert/log monitoring views | HLTH-01, HLTH-02, HLTH-03, ALRT-01, ALRT-02, ALRT-03 | 5 |
| 3 | Positions and PnL Monitoring | Deliver position and PnL panels with trend visibility | POS-01, POS-02, POS-03, POS-04, VIZ-02 | 5 |
| 4 | Trade History and Fill Inspection | Deliver searchable/filterable trade history and detailed fills | TRAD-01, TRAD-02, TRAD-03, TRAD-04 | 4 |
| 5 | Dashboard Synthesis and UX Hardening | Compose a high-signal dashboard experience and reliability polish | VIZ-01, VIZ-03 | 5 |

## Phase Details

## Phase 1: API Foundation and Safety Boundaries

**Goal:** Build a reliable frontend API boundary to the upstream `agentic-trader` API and codify monitor-only constraints.

**Requirements:** SAFE-01

**UI hint:** yes

**Success criteria:**
1. Typed API client modules exist for all currently used monitoring endpoints.
2. Runtime validation/adaptation guards UI against malformed or changed payloads.
3. UI architecture and routes do not expose control/action mutations.

## Phase 2: Health, Alerts, and Operational Visibility

**Goal:** Provide immediate operational awareness for agent/system status and alert/log signals.

**Requirements:** HLTH-01, HLTH-02, HLTH-03, ALRT-01, ALRT-02, ALRT-03

**UI hint:** yes

**Success criteria:**
1. Operator can identify healthy vs degraded agents/services at a glance.
2. Last update/heartbeat time is visible for each monitored unit.
3. Alert feed refreshes on polling schedule and displays severity clearly.
4. Log stream surfaces recent relevant events for monitoring workflow.
5. Partial endpoint failure does not fully break the monitoring surface.

## Phase 3: Positions and PnL Monitoring

**Goal:** Enable continuous position and PnL visibility through clear cards, tables, and trend graphing.

**Requirements:** POS-01, POS-02, POS-03, POS-04, VIZ-02

**UI hint:** yes

**Success criteria:**
1. Open positions list includes key trading fields and updates via polling.
2. Unrealized PnL is visible per position with clear numeric formatting.
3. Realized PnL summaries can be inspected for a selected time period.
4. Portfolio exposure aggregation is visible for fast risk scanning.
5. At least one trend visualization communicates PnL movement over time.

## Phase 4: Trade History and Fill Inspection

**Goal:** Provide accurate and navigable historical trade/fill visibility.

**Requirements:** TRAD-01, TRAD-02, TRAD-03, TRAD-04

**UI hint:** yes

**Success criteria:**
1. Trade history is chronologically ordered and easy to scan.
2. Filtering by symbol/date narrows data accurately.
3. Drill-down details show useful execution/fill context.
4. Search by key identifiers retrieves expected records.

## Phase 5: Dashboard Synthesis and UX Hardening

**Goal:** Finalize an operator-ready overview experience and stabilize refresh/reliability behavior.

**Requirements:** VIZ-01, VIZ-03

**UI hint:** yes

**Success criteria:**
1. Overview cards expose the highest-value metrics first.
2. Every major panel shows “last updated” freshness information.
3. Polling intervals are tuned per domain and configurable in code.
4. Error/loading/empty states are consistent and clear across views.
5. Core monitoring workflows are verified end-to-end for v1 readiness.

## Execution Notes

- Refresh strategy for v1 is polling-first; real-time transport remains a deliberate post-v1 upgrade.
- Parallel plan execution is enabled where task dependencies allow it.
- Requirements-to-phase mapping is one-to-one for clear ownership and verification.

---
*Roadmap created: 2026-05-06*
*Last updated: 2026-05-06 after project initialization*
