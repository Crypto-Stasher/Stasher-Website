#!/usr/bin/env bash
#
# deploy.sh — runs ON the Hetzner prod box, invoked by Jenkins over SSH.
# Flips the live site to an already-uploaded release using an atomic symlink swap,
# then prunes old releases. Serving model is static: nginx `root` points at
# $BASE/current, a symlink to a release dir holding the prerendered dist/client output.
#
# Usage:  deploy.sh <release-tag>
# Layout: $BASE/releases/<tag>/   (uploaded by Jenkins via rsync, contains index.html)
#         $BASE/current -> releases/<tag>
#         $BASE/.previous          (path of the release that was live before this swap)
#
set -euo pipefail

BASE="${STASHER_BASE:-/var/www/stasher}"
KEEP="${STASHER_KEEP:-5}"   # number of releases to retain

tag="${1:?usage: deploy.sh <release-tag>}"
rel="$BASE/releases/$tag"

[ -d "$rel" ]            || { echo "ERROR: release dir not found: $rel" >&2; exit 1; }
[ -f "$rel/index.html" ] || { echo "ERROR: $rel has no index.html (prerender missing?)" >&2; exit 1; }

# Record the currently-live release so rollback knows where to go back to.
if [ -L "$BASE/current" ]; then
  readlink -f "$BASE/current" > "$BASE/.previous"
fi

# Atomic swap: build the new symlink under a temp name, then rename over the old one.
# rename(2) is atomic, so there is never a moment where `current` is missing.
ln -sfn "$rel" "$BASE/current.tmp"
mv -Tf "$BASE/current.tmp" "$BASE/current"

echo "deployed: current -> $(readlink -f "$BASE/current")"

# Prune old releases, newest first, keeping $KEEP. Never delete the live one.
live="$(readlink -f "$BASE/current")"
if [ -d "$BASE/releases" ]; then
  # shellcheck disable=SC2012
  ls -1dt "$BASE"/releases/*/ 2>/dev/null | tail -n "+$((KEEP + 1))" | while read -r old; do
    [ "$(readlink -f "$old")" = "$live" ] && continue
    echo "pruning old release: $old"
    rm -rf "$old"
  done
fi
