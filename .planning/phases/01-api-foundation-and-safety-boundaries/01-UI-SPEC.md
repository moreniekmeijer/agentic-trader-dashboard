---
phase: 1
slug: api-foundation-and-safety-boundaries
status: approved
shadcn_initialized: false
preset: none
created: 2026-05-06
---

# Phase 1 — UI Design Contract

> Visual and interaction contract for frontend phases. Generated for `$gsd-ui-phase` and verified against Phase 1 decisions.

---

## Design System

| Property | Value |
|----------|-------|
| Tool | none |
| Preset | not applicable |
| Component library | none (custom React components for v1 foundations) |
| Icon library | lucide-react |
| Font | `Inter` (fallback: `system-ui, sans-serif`) |

---

## Spacing Scale

Declared values (multiples of 4):

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Inline icon gaps, tiny badges |
| sm | 8px | Tight control spacing, row gaps |
| md | 16px | Default card content spacing |
| lg | 24px | Section and panel padding |
| xl | 32px | Primary layout gutters |
| 2xl | 48px | Top-level view separation |
| 3xl | 64px | Rare page-level vertical breaks |

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
| Dominant (60%) | `#F7F8FA` | App background and neutral page surfaces |
| Secondary (30%) | `#FFFFFF` | Cards, panels, and table containers |
| Accent (10%) | `#0F766E` | Positive state highlights, selected filters, key trend emphasis |
| Destructive | `#B91C1C` | Error badges and destructive status indicators only |

Accent reserved for:
- Active data-highlight accents (selected timeframe, active panel state)
- Positive trend visual emphasis where appropriate
- Primary non-destructive action emphasis (for refresh/filter interactions only)

---

## Copywriting Contract

| Element | Copy |
|---------|------|
| Primary CTA | Refresh Data |
| Empty state heading | No Monitoring Data Yet |
| Empty state body | We could not find data for this panel yet. Check API connectivity and refresh. |
| Error state | This panel could not load monitoring data. Check the data contract details and retry. |
| Destructive confirmation | N/A in v1 monitor-only mode (no destructive actions allowed) |

---

## Registry Safety

| Registry | Blocks Used | Safety Gate |
|----------|-------------|-------------|
| shadcn official | none | not required |
| third-party UI registries | none | shadcn view + diff required before adoption |

---

## Phase-Specific Interaction Contract

- Dashboard remains monitor-only. No strategy/trade control buttons are shown in v1.
- API schema drift must be panel-visible with clear status copy and last known good timestamp.
- Polling freshness state is visible per panel (`Last updated ...`).
- Partial failure model is required: one panel may fail while the rest remain usable.
- Manual refresh supports both panel-local refresh and global refresh action.

---

## Checker Sign-Off

- [x] Dimension 1 Copywriting: PASS
- [x] Dimension 2 Visuals: PASS
- [x] Dimension 3 Color: PASS
- [x] Dimension 4 Typography: PASS
- [x] Dimension 5 Spacing: PASS
- [x] Dimension 6 Registry Safety: PASS

**Approval:** approved 2026-05-06
