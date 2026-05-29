# qXRP-faucet

Faucet + passkey wallet + DEX marketplace + explorer for the qXRP testnet.

## Current Public Node (recommended)

- **Primary (full history)**: `http://46.224.0.140:6005` (public port only)
- Network ID: 999
- Faucet uses the genesis account (`rHb9CJAWyB4rj91VRWn96DkukG4bwdtyTh`) which holds the bootstrap supply.

## Local Development

```bash
cp .env.example .env.local
# Edit XRPLD_RPC_URL if you want a different public node
npm install
npm run dev
```

## Environment Variables

See `.env.example` for the full list. The important ones:

- `XRPLD_RPC_URL` — must be a **public** node on port 6005 (never use admin ports from the internet)
- `FAUCET_ACCOUNT` / `FAUCET_SECRET` — funded account used to drip testnet qXRP
- Upstash Redis credentials for rate limiting (when deployed on Vercel)

## Notes

- Always use public RPC ports (6005). Admin ports (5005 etc.) are intentionally restricted.
- After node infrastructure changes, make sure the faucet account actually exists on the current ledger (use the genesis account during early testnet phases).
