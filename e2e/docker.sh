#!/bin/sh
# Runs the Playwright suite in the same image CI uses, so local screenshots match CI's.
# Start the app first in another terminal: `bun run build && bun start` (port 3100).
# Extra arguments go to Playwright, e.g. `--update-snapshots` or `-g presets`.
set -e
exec docker run --rm --network host --ipc host \
  --user "$(id -u):$(id -g)" -e HOME=/tmp \
  -v "$PWD":/work -w /work \
  mcr.microsoft.com/playwright:v1.64.1-noble \
  npx playwright test "$@"
