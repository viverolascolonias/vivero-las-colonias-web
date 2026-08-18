#!/bin/bash
export PATH="$HOME/dev-tools/node/bin:$PATH"
cd "$(dirname "$0")"
exec npm run dev
