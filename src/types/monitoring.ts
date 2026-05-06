export type Severity = 'info' | 'warning' | 'critical'

export interface AgentHealth {
  id: string
  name: string
  status: 'healthy' | 'degraded' | 'down'
  lastHeartbeat: string
  reason?: string
}

export interface PositionSnapshot {
  id: string
  symbol: string
  side: 'long' | 'short'
  size: number
  entryPrice: number
  markPrice: number
  unrealizedPnl: number
  realizedPnl: number
}

export interface TradeRecord {
  id: string
  symbol: string
  side: 'buy' | 'sell'
  qty: number
  price: number
  timestamp: string
}

export interface AlertEvent {
  id: string
  severity: Severity
  message: string
  timestamp: string
}

export interface ContractIssue {
  message: string
  lastGoodAt?: string
}

