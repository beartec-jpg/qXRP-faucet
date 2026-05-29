// xrpld JSON-RPC client — pure fetch, no WebSocket needed

// Public RPC only (port 6005). Node 1 = full history node (preferred for explorers/faucet).
const RPC_URL = process.env.XRPLD_RPC_URL ?? 'http://46.224.0.140:6005'

export interface ServerInfo {
  server_state: string
  validated_ledger?: { seq: number; close_time: number; reserve_base_xrp: number }
  peers: number
  uptime: number
  load_factor: number
  complete_ledgers: string
}

export interface AccountInfo {
  account_data: { Account: string; Balance: string; Sequence: number }
}

interface RpcResponse<T> {
  result: T & { status?: string; error?: string; error_message?: string }
}

async function call<T>(method: string, params: Record<string, unknown> = {}): Promise<T> {
  const res = await fetch(RPC_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ method, params: [params] }),
    // Vercel serverless: don't cache RPC calls
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error(`RPC unreachable (${RPC_URL}): HTTP ${res.status}`)
  }
  const body = (await res.json()) as RpcResponse<T>
  if (body.result?.error) {
    throw new Error(body.result.error_message ?? body.result.error)
  }
  return body.result as T
}

export async function getServerInfo(): Promise<ServerInfo> {
  const result = await call<{ info: ServerInfo }>('server_info')
  return result.info
}

export async function getAccountInfo(account: string): Promise<AccountInfo> {
  return call<AccountInfo>('account_info', {
    account,
    ledger_index: 'current',
  })
}

export async function getLedgerIndex(): Promise<number> {
  const info = await getServerInfo()
  return info.validated_ledger?.seq ?? 0
}

export async function submitTx(tx_blob: string): Promise<{ tx_json: { hash: string }; engine_result: string; engine_result_message: string }> {
  return call('submit', { tx_blob })
}
