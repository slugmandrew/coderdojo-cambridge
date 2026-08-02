# CoderDojo Cambridge

Project resources for CoderDojo Cambridge, built as a React application with a small Express server.

## Toolchain

- Node.js 24 LTS
- Yarn 4 workspaces
- React 19 and React Router 7
- Mantine 9
- Vite 8 and Vitest 4
- TypeScript 6, ESLint 10, and Prettier 3

## Development

Install dependencies and run the UI and API together:

```sh
corepack enable
yarn install --immutable
yarn dev
```

The UI runs at [http://localhost:5173](http://localhost:5173) and proxies `/api` requests to the Express server on port 3001.

## Quality checks

```sh
yarn validate
```

This checks formatting and lint rules, type-checks both workspaces, runs the browser-facing regression tests, and creates the production build.

## Production

```sh
yarn build
yarn start
```

The Vite build is written to `ui/build`, which the Express server serves along with its API routes.

<!-- deploy-smoke-test: github-to-heroku pipeline check (2026-03-01) -->
