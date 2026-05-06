# Feature Research: Trading Monitoring Dashboard

**Date:** 2026-05-06
**Product Goal:** Internal, read-only monitoring for existing agentic trading operations.

## Table Stakes (v1-critical)

## Agent Health
- Agent/process status by strategy or worker.
- Last heartbeat / last successful action timestamp.
- Error state indicator and basic error reason.

## Positions and PnL
- Open positions list with symbol, side, size, entry, mark, unrealized PnL.
- Realized PnL summary and period filters.
- Portfolio-level aggregation (exposure totals).

## Trade History and Fills
- Chronological trade/fill feed.
- Search/filter by symbol, strategy, date range.
- Details panel for execution metadata.

## Alerts and Logs
- Recent alert stream with severity.
- Structured operational logs view.
- Basic acknowledge/snooze in UI is optional; monitor-only display is required.

## Usability Baseline
- Clear overview screen that surfaces “is system healthy?”
- Drill-down views for position and trade detail.
- Visual trend components (PnL curve, exposure mix, alert volume over time).

## Differentiators (v2 candidates)
- Correlation views between agent decisions and outcome quality.
- Strategy-level performance attribution and benchmark overlays.
- “Anomaly detection” visuals for sudden behavior changes.
- Explainability overlays for agent actions.

## Anti-Features for v1
- Trade execution controls (start/stop/pause, manual order actions).
- Multi-tenant external user management.
- Highly customizable dashboard builder UX.

## Dependency Notes
- Position/PnL views depend on reliable and frequent API snapshots.
- Alert/log usefulness depends on normalized severity/type fields.
- Good graphs depend on consistent timestamped historical data.
