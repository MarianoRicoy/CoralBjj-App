#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

kill_port() {
  local port="$1"
  local pids
  pids="$(lsof -ti :"$port" 2>/dev/null || true)"

  if [[ -n "$pids" ]]; then
    echo "[dev-clean] Killing processes on port $port: $pids"
    kill -9 $pids 2>/dev/null || true
  fi
}

cleanup() {
  echo "[dev-clean] Stopping frontend/backend..."
  [[ -n "${BACK_PID:-}" ]] && kill "$BACK_PID" 2>/dev/null || true
  [[ -n "${FRONT_PID:-}" ]] && kill "$FRONT_PID" 2>/dev/null || true
}

trap cleanup EXIT INT TERM

kill_port 3000
kill_port 4000

rm -rf "$ROOT_DIR/frontend/.next" "$ROOT_DIR/.next"

echo "[dev-clean] Starting backend..."
npm run dev --prefix "$ROOT_DIR/backend" &
BACK_PID=$!

echo "[dev-clean] Starting frontend..."
npm run dev --prefix "$ROOT_DIR/frontend" &
FRONT_PID=$!

echo "[dev-clean] Frontend: http://localhost:3000"
echo "[dev-clean] Backend:  http://localhost:4000"
echo "[dev-clean] Press Ctrl+C to stop both"

wait -n "$BACK_PID" "$FRONT_PID"
