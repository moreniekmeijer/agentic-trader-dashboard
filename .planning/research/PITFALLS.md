# Pitfalls Research: Trading Monitoring Dashboard

**Date:** 2026-05-06

## Pitfall 1: API Schema Drift
- Warning signs:
  - UI breaks after backend changes.
  - Unexpected null/shape mismatches in panel renderers.
- Prevention:
  - Runtime validation at API boundary.
  - Narrow typed adapters between API and UI models.
- Phase impact:
  - Address in early architecture/API client phase.

## Pitfall 2: Inconsistent Time Semantics
- Warning signs:
  - Charts look “wrong” across time zones.
  - Trade ordering appears inconsistent.
- Prevention:
  - Normalize all timestamps to UTC internally.
  - Apply local display formatting at final render only.
- Phase impact:
  - Address when implementing domain model adapters and charts.

## Pitfall 3: Polling Overload or Stale UX
- Warning signs:
  - High API load from aggressive polling.
  - Operators report delayed/inaccurate dashboard state.
- Prevention:
  - Domain-specific intervals and jitter.
  - Manual refresh control and visible “last updated” metadata.
- Phase impact:
  - Address in overview + query layer implementation.

## Pitfall 4: Visual Noise in Monitoring UI
- Warning signs:
  - Too many equal-priority panels.
  - Important risk/health signals buried.
- Prevention:
  - Priority hierarchy: health and risk first, detail second.
  - Alert severity color and ordering conventions.
- Phase impact:
  - Address in dashboard IA and component composition phase.

## Pitfall 5: Read-Only Scope Creep
- Warning signs:
  - Requests to add “quick control” buttons during v1.
  - API methods for mutations added ad hoc in frontend.
- Prevention:
  - Enforce monitor-only boundaries in requirements and roadmap.
  - Explicitly separate v2 “operational controls” track.
- Phase impact:
  - Address in requirements and acceptance criteria.

## Pitfall 6: Missing Test Coverage on Critical Panels
- Warning signs:
  - Frequent regressions in position/trade views.
  - Confidence drops before release.
- Prevention:
  - Component tests for each core panel state (loading/error/empty/data).
  - Contract tests for API adapters.
- Phase impact:
  - Address during each feature phase and verification.
