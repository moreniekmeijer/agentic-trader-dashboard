# External Integrations

**Analysis Date:** 2026-05-06

## APIs & External Services

**Payment Processing:**
- None currently configured.

**Email/SMS:**
- None currently configured.

**External APIs:**
- Documentation/community links only:
  - `https://vite.dev/` from `src/App.tsx`.
  - `https://react.dev/` from `src/App.tsx`.
  - `https://github.com/vitejs/vite` from `src/App.tsx`.
  - `https://chat.vite.dev/`, `https://x.com/vite_js`, and `https://bsky.app/profile/vite.dev` from `src/App.tsx`.
- There is no `fetch`, SDK client, GraphQL client, REST API module, or API base URL in the current source.

## Data Storage

**Databases:**
- None currently configured.

**File Storage:**
- None currently configured.
- Static assets are local files in `public/` and `src/assets/`.

**Caching:**
- None currently configured.

## Authentication & Identity

**Auth Provider:**
- None currently configured.
- No token storage, session management, or auth routes exist.

**OAuth Integrations:**
- None currently configured.

## Monitoring & Observability

**Error Tracking:**
- None currently configured.

**Analytics:**
- None currently configured.

**Logs:**
- No application logging exists.
- Vite/dev tooling logs are the only expected logs during development.

## CI/CD & Deployment

**Hosting:**
- No hosting provider is configured in repo.
- Build output is expected under `dist`, which is ignored by `.gitignore`.

**CI Pipeline:**
- No `.github/` directory or CI workflow exists.
- No deployment workflow exists.

## Environment Configuration

**Development:**
- Required env vars: none.
- Secret files: none present; `.gitignore` excludes `*.local`.
- Mock/stub services: none needed.

**Staging:**
- No staging environment is described.

**Production:**
- No production environment is described.
- Any future API keys, broker credentials, or trading data provider tokens should be introduced through environment variables and never hard-coded into `src/`.

## Webhooks & Callbacks

**Incoming:**
- None currently configured.

**Outgoing:**
- None currently configured.

---

*Integration audit: 2026-05-06*
*Update when adding external services, data providers, auth, analytics, CI, or deployment*
