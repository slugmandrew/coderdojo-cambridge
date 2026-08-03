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

## Deployment

The production mirror runs in Docker on the `code-club-host` exe.dev VM. A successful `Validate` workflow for a push to `master` triggers `.github/workflows/deploy-exe-dev.yml`, which uploads that exact commit and waits for the container health check before verifying the public endpoint.

The GitHub `production` environment requires an `EXE_DEV_DEPLOY_KEY` secret. Register its public key in exe.dev with the `codeclub-deploy` tag, and give the production VM the same tag so the key cannot access unrelated VMs:

```sh
ssh exe.dev ssh-key add --tag=codeclub-deploy 'ssh-ed25519 AAAA... github-actions-codeclub-deploy'
ssh exe.dev tag code-club-host codeclub-deploy
```

The VM must be public and proxy port 8000:

```sh
ssh exe.dev share port code-club-host 8000
ssh exe.dev share set-public code-club-host
```

For a manual deployment from an uploaded checkout:

```sh
DEPLOY_SHA="$(git rev-parse HEAD)" ./ops/deploy.sh
```

<!-- deploy-smoke-test: github-to-heroku pipeline check (2026-03-01) -->
