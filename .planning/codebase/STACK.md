# Technology Stack

**Analysis Date:** 2026-05-06

## Languages

**Primary:**
- TypeScript - Application source in `src/main.tsx` and `src/App.tsx`.
- TSX/JSX - React component rendering in `src/App.tsx`.
- CSS - Global and component styling in `src/index.css` and `src/App.css`.

**Secondary:**
- JavaScript/TypeScript config files - Tooling configuration in `eslint.config.js` and `vite.config.ts`.
- HTML - Vite HTML shell in `index.html`.
- SVG/PNG assets - Static visual assets in `public/` and `src/assets/`.

## Runtime

**Environment:**
- Browser runtime - The app is a client-side React single page app mounted into `#root` from `index.html`.
- Node.js is required for development tooling, but no `.nvmrc` or `engines` field pins a specific Node version.

**Package Manager:**
- npm - `package-lock.json` is present and lockfileVersion is 3.
- Scripts are defined in `package.json`.

## Frameworks

**Core:**
- React `^19.2.5` - UI framework.
- React DOM `^19.2.5` - Browser rendering through `createRoot`.
- Vite `^8.0.10` - Dev server and production bundler.

**Testing:**
- No test framework is currently configured.
- No `test` script exists in `package.json`.

**Build/Dev:**
- TypeScript `~6.0.2` - Type checking through `tsc -b`.
- `@vitejs/plugin-react` `^6.0.1` - React transform and Vite integration.
- ESLint `^10.2.1` - Linting through `npm run lint`.
- `typescript-eslint` `^8.58.2`, `eslint-plugin-react-hooks` `^7.1.1`, and `eslint-plugin-react-refresh` `^0.5.2` - TypeScript and React lint rules.

## Key Dependencies

**Critical:**
- `react` - Component model and hooks, used by `src/App.tsx`.
- `react-dom` - DOM mounting, used by `src/main.tsx`.

**Infrastructure:**
- `vite` - Local server, asset pipeline, and build output generation.
- `typescript` - Project references and strict-ish compile checks.
- `eslint` plus React/TypeScript plugins - Static analysis for source files.

## Configuration

**Environment:**
- No runtime environment variables are referenced in the current source.
- `.gitignore` excludes `*.local`, so local env files are expected to stay untracked if added later.

**Build:**
- `vite.config.ts` registers the React plugin only.
- `tsconfig.json` uses project references for app and Vite config builds.
- `tsconfig.app.json` includes `src`, targets ES2023 and DOM, uses bundler module resolution, `jsx: react-jsx`, and `noEmit`.
- `tsconfig.node.json` includes `vite.config.ts` and targets ES2023 with Node types.
- `eslint.config.js` applies rules to `**/*.{ts,tsx}` and globally ignores `dist`.

## Platform Requirements

**Development:**
- Any platform capable of running Node.js and npm.
- Commands: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`.

**Production:**
- Static asset deployment from Vite build output (`dist`).
- No server, database, background worker, or deployment provider is currently configured.

---

*Stack analysis: 2026-05-06*
*Update after major dependency or runtime changes*
