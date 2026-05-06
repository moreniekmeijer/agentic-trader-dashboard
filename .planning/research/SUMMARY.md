# Research Summary: Agentic Trader Monitoring Dashboard

**Date:** 2026-05-06

## Stack
Use the existing React + TypeScript + Vite frontend and add a focused data layer:
- TanStack Query for polling/caching.
- Typed API client + runtime validation.
- Recharts + table tooling for monitoring visuals.

## Table Stakes
Core v1 expectations for internal monitoring:
- Agent status/health visibility.
- Open positions and PnL visibility.
- Trade/fill history visibility.
- Alerts/log stream visibility.
- Readable visual summaries and trends.

## Watch Out For
- API payload drift without runtime validation.
- Timezone/timestamp inconsistencies in charts/history.
- Polling choices that either overload APIs or feel stale.
- Scope creep into operational controls before monitor-only v1 ships.

## Recommended v1 Execution Posture
- Keep v1 read-only and polling-first.
- Build clear domain boundaries between raw API and UI.
- Ship overview-first, then drill-downs.
- Establish testing on critical monitoring panels early.

## Inputs and Assumptions
- Upstream target is `agentic-trader` API layer in the referenced repository.
- This summary is based on product/domain best practices plus current local project context.
- Exact endpoint contract should be validated against the upstream API folder during implementation planning.
