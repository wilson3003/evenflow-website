#!/bin/bash
# Even Flow concept server — run this to view designs on MacBook via Tailscale
# http://100.88.123.103:3456
cd "$(dirname "$0")"
unset ANTHROPIC_API_KEY
npm run dev -- --port 3456
