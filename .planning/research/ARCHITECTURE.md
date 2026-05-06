# Architecture Research: Monitoring Dashboard for Existing Trading Backend

**Date:** 2026-05-06
**Context:** Frontend-only monitor that consumes upstream API endpoints.

## Recommended System Shape

## Frontend Boundaries
- `api-client` layer: typed endpoint wrappers and response validation.
- `query` layer: polling, cache, invalidation policies per domain.
- `domain adapters`: map API payloads to UI-friendly models.
- `view layer`: dashboard widgets, tables, charts, and drill-down pages.

## Suggested Build Order
1. API contract inventory + typed client stubs.
2. Health + overview page with polling baseline.
3. Positions/PnL panels + trend charts.
4. Trades/fills history views with filtering.
5. Alerts/log stream and severity indicators.
6. UX hardening, error handling, and test coverage.

## Data Flow
1. UI requests domain data via query hooks.
2. Query hooks call typed API client.
3. Client validates/parses payload and returns typed model.
4. Adapter shapes model for charts/tables/cards.
5. View updates on polling intervals and manual refresh.

## Reliability Patterns
- Per-panel loading/error/empty states.
- Degraded-mode rendering when one API domain fails.
- Last-success timestamp shown per panel.
- Backoff strategy on repeated endpoint failures.

## Real-Time Upgrade Path (post-v1)
- Keep polling abstractions isolated behind query hooks.
- Introduce transport-agnostic event adapters so websocket/SSE can feed same domain models later.

## Component Boundaries
- `Overview`: high-signal KPIs and health status.
- `Positions`: open positions + PnL summary + exposure graph.
- `Trades`: history table + fill details.
- `Alerts`: event feed and severity counts.

## Risks if Boundaries Are Ignored
- UI tightly coupled to raw API payload shapes.
- Inconsistent refresh behavior across panels.
- High refactor cost when switching from polling to streaming.
