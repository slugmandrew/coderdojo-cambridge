#!/usr/bin/env bash

set -euo pipefail

readonly script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$script_dir/deploy.sh"

printf '%s' '{"configured":true,"authenticated":false}' | auth_is_configured

if printf '%s' '{"configured":false,"authenticated":false}' | auth_is_configured; then
  echo 'The deployment check accepted disabled mentor authentication.' >&2
  exit 1
fi
