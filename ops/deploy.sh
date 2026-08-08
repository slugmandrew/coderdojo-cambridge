#!/usr/bin/env bash

set -euo pipefail

readonly app_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$app_dir"

: "${DEPLOY_SHA:?DEPLOY_SHA must contain the Git commit being deployed}"

if [[ ! "$DEPLOY_SHA" =~ ^[0-9a-f]{40}$ ]]; then
  echo 'DEPLOY_SHA must be a full Git commit SHA' >&2
  exit 1
fi

export DEPLOY_SHA

docker compose build --pull web
docker compose up --detach --wait --remove-orphans web

curl --fail --silent --show-error http://127.0.0.1:8000/healthz >/dev/null
curl --fail --silent --show-error http://127.0.0.1:8000/api/auth/me \
  | node -e "let body=''; process.stdin.on('data', chunk => body += chunk).on('end', () => { if (JSON.parse(body).configured !== true) process.exit(1) })"
docker compose ps
docker image prune --force --filter label=org.codeclub.cambridge.service=web >/dev/null
