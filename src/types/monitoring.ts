export type Severity = 'info' | 'warning' | 'critical'
export type HealthStatus = 'healthy' | 'degraded' | 'down'
export type LogLevel = 'debug' | 'info' | 'warning' | 'error'

export interface AgentHealth {
  id: string
  name: string
  status: HealthStatus
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
  source: string
  message: string
  timestamp: string
}

export interface OperationalLogEvent {
  id: string
  timestamp: string
  source: string
  level: LogLevel
  message: string
}

export interface ContractIssue {
  message: string
  lastGoodAt?: string
}
