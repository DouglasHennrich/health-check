#!/usr/bin/env bash
set -euo pipefail

echo "Setting up local environment..."
pnpm install
echo "Done. Run 'pnpm run dev:all' to start development servers."
