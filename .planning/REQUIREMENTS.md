# Requirements: Agentic Trader Monitoring Dashboard

**Defined:** 2026-05-06
**Core Value:** A single internal operator can clearly and reliably monitor all currently available `agentic-trader` API data from one place.

## v1 Requirements

Requirements for initial release. Each maps to exactly one roadmap phase.

### Agent Health

- [ ] **HLTH-01**: User can view current status of all monitored agents/services.
- [ ] **HLTH-02**: User can view last heartbeat/last update timestamp per agent/service.
- [ ] **HLTH-03**: User can see when an agent/service is in degraded/error state.

### Positions and PnL

- [ ] **POS-01**: User can view all open positions with symbol, side, size, and entry context.
- [ ] **POS-02**: User can view current unrealized PnL per open position.
- [ ] **POS-03**: User can view realized PnL summaries for a selected period.
- [ ] **POS-04**: User can view aggregated exposure metrics across open positions.

### Trade History and Fills

- [ ] **TRAD-01**: User can view chronological trade history.
- [ ] **TRAD-02**: User can filter trade history by symbol and date range.
- [ ] **TRAD-03**: User can view execution/fill details for an individual trade entry.
- [ ] **TRAD-04**: User can search trade/fill records by key identifiers.

### Alerts and Logs

- [ ] **ALRT-01**: User can view a live-updating alert feed via polling.
- [ ] **ALRT-02**: User can distinguish alert severity levels visually.
- [ ] **ALRT-03**: User can view recent operational log events relevant to monitoring.

### Monitoring UX and Visuals

- [ ] **VIZ-01**: User can view high-signal overview cards for health and key trading metrics.
- [ ] **VIZ-02**: User can view at least one PnL trend visualization.
- [ ] **VIZ-03**: User can see a “last updated” indicator per major dashboard panel.

### Read-Only Safety

- [ ] **SAFE-01**: User cannot trigger trading or strategy control actions from the v1 dashboard.

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Real-Time and Controls

- **CTRL-01**: User can start/stop/pause strategy runs from the dashboard.
- **CTRL-02**: User can execute manual operational actions with confirmation safeguards.
- **RT-01**: User receives low-latency push updates via websocket/SSE.
- **RT-02**: User can configure per-panel refresh transport and interval policies.

### Advanced Analytics

- **ANL-01**: User can compare strategy performance with benchmark overlays.
- **ANL-02**: User can inspect anomaly signals for unusual trading behavior.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Direct trade execution and strategy controls | Explicitly deferred to post-v1 to keep v1 monitor-only and reduce operational risk |
| Multi-tenant user management and customer-facing access | v1 audience is a single internal operator |
| Replacing backend trading logic | Dashboard scope is observability and monitoring, not engine behavior |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SAFE-01 | Phase 1 | Pending |
| HLTH-01 | Phase 2 | Pending |
| HLTH-02 | Phase 2 | Pending |
| HLTH-03 | Phase 2 | Pending |
| ALRT-01 | Phase 2 | Pending |
| ALRT-02 | Phase 2 | Pending |
| ALRT-03 | Phase 2 | Pending |
| POS-01 | Phase 3 | Pending |
| POS-02 | Phase 3 | Pending |
| POS-03 | Phase 3 | Pending |
| POS-04 | Phase 3 | Pending |
| VIZ-02 | Phase 3 | Pending |
| TRAD-01 | Phase 4 | Pending |
| TRAD-02 | Phase 4 | Pending |
| TRAD-03 | Phase 4 | Pending |
| TRAD-04 | Phase 4 | Pending |
| VIZ-01 | Phase 5 | Pending |
| VIZ-03 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 18 total
- Mapped to phases: 18
- Unmapped: 0

---
*Requirements defined: 2026-05-06*
*Last updated: 2026-05-06 after initialization*
