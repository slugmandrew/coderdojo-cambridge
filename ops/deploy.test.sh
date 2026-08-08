#!/usr/bin/env bash

set -euo pipefail

readonly script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
readonly repo_dir="$(cd "$script_dir/.." && pwd)"
readonly production_url='https://code-club-host.exe.xyz'
source "$script_dir/deploy.sh"

grep -Fq "PUBLIC_URL: $production_url" "$repo_dir/.github/workflows/deploy-exe-dev.yml"
grep -Fq "PUBLIC_URL: \${PUBLIC_URL:-$production_url}" "$repo_dir/compose.yaml"

if grep -R -Fq 'https://club-host.exe.xyz' \
  "$repo_dir/.github" \
  "$repo_dir/compose.yaml" \
  "$repo_dir/README.md"; then
  echo 'A production configuration still uses the obsolete public hostname.' >&2
  exit 1
fi

printf '%s' '{"configured":true,"authenticated":false}' | auth_is_configured

if printf '%s' '{"configured":false,"authenticated":false}' | auth_is_configured; then
  echo 'The deployment check accepted disabled mentor authentication.' >&2
  exit 1
fi
