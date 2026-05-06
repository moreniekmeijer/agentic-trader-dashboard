---
phase: 2
slug: health-alerts-and-operational-visibility
status: approved
shadcn_initialized: false
preset: none
created: 2026-05-06
---

# Phase 2 — UI Design Contract

> Visual and interaction contract for health, alerts, and operational visibility panels. Extends Phase 1 contract without changing monitor-only boundaries.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none |
| Preset | not applicable |
| Component library | none (custom React components continued from Phase 1) |
| Icon library | lucide-react |
| Font | `Inter` (fallback: `system-ui, sans-serif`) |

---

## Spacing Scale

Declared values (multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Tight inline status/icon spacing |
| sm | 8px | Row-level compact spacing |
| md | 16px | Standard panel/card content spacing |
| lg | 24px | Panel section padding |
| xl | 32px | Grid gutters and section offsets |
| 2xl | 48px | High-level view separation |
| 3xl | 64px | Rare full-page spacing breaks |

Exceptions: none

---

## Typography

| Role | Size | Weight | Line Height |
|------|------|--------|-------------|
| Body | 14px | 400 | 1.5 |
| Label | 12px | 500 | 1.4 |
| Heading | 20px | 600 | 1.3 |
| Display | 28px | 700 | 1.2 |

---

## Color

| Role | Value | Usage |
|------|-------|-------|
| Dominant (60%) | `#F7F8FA` | App background and neutral canvas |
| Secondary (30%) | `#FFFFFF` | Panels, cards, and list containers |
| Accent (10%) | `#0F766E` | Active selection/filter focus and positive highlights |
| Destructive | `#B91C1C` | Critical/down states and destructive-error semantics |

Accent reserved for:
- Selected scope/filter state
- Positive health trend emphasis
- Non-destructive primary refresh/filter interactions

Severity color contract:
- Info: teal/cool-neutral treatment
- Warning: amber treatment
- Critical/Down: red treatment

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | Refresh Data |
| Empty state heading | No Monitoring Data Yet |
| Empty state body | We could not find data for this panel yet. Check API connectivity and refresh. |
| Error state | This panel could not load monitoring data. Check the data contract details and retry. |
| Destructive confirmation | N/A in monitor-only mode (no destructive actions in this phase) |

Health panel status labels:
- Healthy
- Degraded
- Down

Alerts panel section labels:
- Critical Alerts
- Warning Alerts
- Info Alerts

Logs panel framing copy:
- Recent Operational Logs
- Filter: Source / Level / Time Range

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | none | not required |
| third-party UI registries | none | shadcn view + diff required before adoption |

---

## Phase-Specific Interaction Contract

- Monitor-only boundary remains locked; no control-plane interactions are introduced.
- Health panel prioritization:
  - Any `down` entity must surface at top priority.
  - `degraded` entities surface next.
  - `healthy` entities listed after non-healthy states.
- Alerts ordering:
  - Severity-first ordering (`critical`, then `warning`, then `info`).
  - Within each severity, newest first.
- Logs panel:
  - Compact default row format: timestamp, source, level, message.
  - Minimal filters only (no full observability suite behavior in this phase).
- State handling consistency:
  - Empty, error, degraded, and data states use the same panel-state grammar established in Phase 1.
  - Partial endpoint failure cannot collapse unrelated panels.

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

**Approval:** approved 2026-05-06
