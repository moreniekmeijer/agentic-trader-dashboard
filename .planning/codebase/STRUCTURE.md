# Codebase Structure

**Analysis Date:** 2026-05-06

## Directory Layout

```text
agentic-trader-dashboard/
├── public/              # Static public assets served from the web root
├── src/                 # React application source
│   ├── assets/          # Imported source assets handled by Vite
│   ├── App.css          # Component/page styling for App
│   ├── App.tsx          # Current top-level React component
│   ├── index.css        # Global CSS variables and base layout
│   └── main.tsx         # React bootstrap entry point
├── .planning/           # GSD planning artifacts
│   └── codebase/        # Codebase map documents
├── index.html           # Vite HTML shell
├── package.json         # npm scripts and dependencies
├── package-lock.json    # npm lockfile
├── vite.config.ts       # Vite config
├── eslint.config.js     # ESLint flat config
├── tsconfig.json        # TypeScript project references
├── tsconfig.app.json    # TypeScript app config
└── tsconfig.node.json   # TypeScript config for Vite config
```

## Directory Purposes

**`src/`:**
- Purpose: Browser application source.
- Contains: React components, CSS, and imported assets.
- Key files: `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/App.css`.
- Subdirectories: `src/assets/` for assets imported from source code.

**`src/assets/`:**
- Purpose: Images bundled by Vite when imported from TypeScript/TSX.
- Contains: `hero.png`, `react.svg`, and `vite.svg`.
- Key files: `src/assets/hero.png` is the central hero image in the starter UI.

**`public/`:**
- Purpose: Static files served directly from the web root.
- Contains: `public/favicon.svg` and `public/icons.svg`.
- Key files: `public/icons.svg` contains icon symbols referenced by `<use href="/icons.svg#...">`.

**`.planning/codebase/`:**
- Purpose: GSD codebase intelligence documents.
- Contains: `STACK.md`, `ARCHITECTURE.md`, `STRUCTURE.md`, `CONVENTIONS.md`, `TESTING.md`, `INTEGRATIONS.md`, and `CONCERNS.md`.
- Key files: all files in this directory are planning references, not app runtime code.

## Key File Locations

**Entry Points:**
- `index.html` - Browser shell and Vite module script.
- `src/main.tsx` - React DOM bootstrap.
- `src/App.tsx` - Current top-level app UI.

**Configuration:**
- `package.json` - npm scripts and dependency declarations.
- `package-lock.json` - exact npm dependency tree.
- `vite.config.ts` - Vite plugins.
- `eslint.config.js` - lint rules for TypeScript and TSX.
- `tsconfig.json` - project reference root.
- `tsconfig.app.json` - TypeScript settings for `src`.
- `tsconfig.node.json` - TypeScript settings for `vite.config.ts`.
- `.gitignore` - ignored logs, build outputs, dependencies, local files, and editor metadata.

**Core Logic:**
- `src/App.tsx` - Currently all UI behavior lives here.
- There are no feature folders, shared components, services, hooks, utilities, API clients, or state modules yet.

**Testing:**
- No tests or test directories exist.
- No `*.test.*`, `*.spec.*`, or E2E files are present.

**Documentation:**
- `README.md` - Default Vite/React template README.
- `.planning/codebase/*.md` - Generated codebase map.

## Naming Conventions

**Files:**
- React component file currently uses PascalCase: `App.tsx`.
- CSS files are lower/camel-ish starter names: `index.css`, `App.css`.
- Config files use conventional tool names: `vite.config.ts`, `eslint.config.js`, `tsconfig*.json`.
- Public/source asset names are lower-case or framework-provided: `hero.png`, `react.svg`, `vite.svg`, `icons.svg`.

**Directories:**
- Lowercase directory names: `src`, `public`, `assets`.
- No feature directory convention has emerged yet.

**Special Patterns:**
- `public/*` assets are referenced with root-relative URLs.
- `src/assets/*` assets are imported into modules.
- TypeScript project references split app code from Node/tooling config.

## Where to Add New Code

**New Feature:**
- Primary code: create a feature/component structure under `src/` as the app grows.
- Tests: add a test framework first, then colocate tests or add a `src/__tests__/`/`tests/` convention.
- Config if needed: extend `vite.config.ts`, `tsconfig.app.json`, or `eslint.config.js`.

**New Component/Module:**
- Implementation: `src/` until a component or feature directory structure is introduced.
- Types: colocate near implementation or add `src/types/` once shared types exist.
- Tests: choose and document a convention before adding the first test.

**New Route/Page:**
- There is no router yet.
- Add a router dependency and route structure intentionally if the dashboard needs multiple screens.

**Utilities:**
- Shared helpers: create `src/lib/` or `src/utils/` once there is real reuse.

## Special Directories

**`node_modules/`:**
- Purpose: Installed npm dependencies.
- Source: Created by `npm install`.
- Committed: No, ignored by `.gitignore`.

**`dist/`:**
- Purpose: Vite production build output.
- Source: Created by `npm run build`.
- Committed: No, ignored by `.gitignore`.

---

*Structure analysis: 2026-05-06*
*Update when directory structure changes*
