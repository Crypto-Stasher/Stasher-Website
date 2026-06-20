#!/usr/bin/env bash
#
# rollback.sh — runs ON the Hetzner prod box. Reverts the live site to the
# previous release. Called by Jenkins when a post-deploy health check fails,
# or manually in an emergency:  ssh deploy@prod 'bash /var/www/stasher/bin/rollback.sh'
#
# Picks the target from $BASE/.previous (written by deploy.sh before each swap).
# Falls back to the second-newest release dir if .previous is missing.
#
set -euo pipefail

BASE="${STASHER_BASE:-/var/www/stasher}"

target=""
if [ -f "$BASE/.previous" ]; then
  target="$(cat "$BASE/.previous")"
fi

# Fallback: second-newest release (newest is the broken one we're leaving).
if [ -z "$target" ] || [ ! -d "$target" ]; then
  # shellcheck disable=SC2012
  target="$(ls -1dt "$BASE"/releases/*/ 2>/dev/null | sed -n 2p)"
fi

[ -n "$target" ] && [ -d "$target" ] || { echo "ERROR: no previous release to roll back to" >&2; exit 1; }

ln -sfn "$target" "$BASE/current.tmp"
mv -Tf "$BASE/current.tmp" "$BASE/current"

echo "rolled back: current -> $(readlink -f "$BASE/current")"
