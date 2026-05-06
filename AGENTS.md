# Agentic Trader Monitoring Dashboard - Project Guide

## Project Context

- This repository hosts the frontend monitoring dashboard for the upstream `agentic-trader` system.
- The dashboard is read-only in v1 and consumes data exposed by the upstream API layer.
- Planning artifacts live in `.planning/`.

## Source of Truth

- Project definition: `.planning/PROJECT.md`
- Requirements: `.planning/REQUIREMENTS.md`
- Roadmap and phase sequence: `.planning/ROADMAP.md`
- Current state: `.planning/STATE.md`
- Codebase map: `.planning/codebase/*.md`

## Workflow Guardrails

- Respect monitor-only scope for v1. Do not add trade/control mutations unless requirements are updated.
- Keep API integration typed and validated at the frontend boundary.
- Preserve polling-first architecture and treat real-time transport as post-v1 unless roadmap changes.
- Keep requirement traceability updated when roadmap or scope changes.

## Phase Workflow

1. Run `$gsd-discuss-phase <n>` to clarify phase scope and constraints.
2. Run `$gsd-plan-phase <n>` to produce executable plans.
3. Run `$gsd-execute-phase <n>` to implement with verification.
4. Update `.planning/PROJECT.md` and `.planning/REQUIREMENTS.md` at phase transitions.

## Current Next Step

`$gsd-discuss-phase 1`
