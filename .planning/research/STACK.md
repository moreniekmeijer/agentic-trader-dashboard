# Stack Research: Agentic Trading Monitoring Dashboard

**Date:** 2026-05-06
**Scope:** Frontend dashboard for monitoring an existing agentic trading backend via API.

## Recommended v1 Stack

## Frontend Application
- React + TypeScript + Vite (already present in this repo).
- Data fetching/cache: TanStack Query.
- Routing: React Router (if multiple screens/views are introduced).
- Charting: Recharts for fast dashboard chart delivery.
- Table/grid: TanStack Table for sortable/filterable trade/position views.
- UI primitives: keep lightweight and consistent; use a utility-first approach only if needed.

## API Integration
- Typed HTTP client module with explicit endpoint methods.
- Runtime response validation at API boundary (for example `zod`) to guard against backend schema drift.
- Polling strategy in v1:
  - Fast panel refresh (agent health): 2-5s.
  - Mid-frequency panel refresh (positions/PnL): 5-10s.
  - Lower-frequency panels (history/log archive): 10-30s.

## State and Data Modeling
- Server state owned by query cache; avoid global custom stores until needed.
- Domain models:
  - Agent status model.
  - Position/PnL snapshot model.
  - Trade/fill history model.
  - Alert/log event model.

## Quality and Delivery
- Unit + component tests with Vitest + React Testing Library.
- Basic E2E smoke flow with Playwright once multi-view UX exists.
- Linting/type checks in CI before merge.

## Deployment
- Static frontend deployment (Vercel/Netlify or equivalent).
- Environment-based API base URL configuration.
- No secrets in frontend build artifacts.

## What to Avoid in v1
- Real-time transport complexity (websocket/SSE) before polling UX is validated.
- Heavy state libraries when query cache already solves server-state concerns.
- Over-abstracted UI architecture before concrete panel workflows stabilize.

## Confidence
- High: React/Vite + query + charts + polling path for fast v1 delivery.
- Medium: exact chart/table libraries may vary with final UX preferences.
- Medium: endpoint payload stability depends on upstream API maturity.
