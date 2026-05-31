#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

PORT="${PORT:-8092}"

echo "Serving Strudel local sketch at http://localhost:${PORT}/"
echo "Open: http://localhost:${PORT}/"
echo
echo "Stop with Ctrl+C."

python3 -m http.server "${PORT}"
