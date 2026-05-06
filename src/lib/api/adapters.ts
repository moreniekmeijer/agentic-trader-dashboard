import type {
  AgentHealth,
  AlertEvent,
  HealthStatus,
  LogLevel,
  OperationalLogEvent,
  PositionSnapshot,
  Severity,
  TradeRecord,
} from '../../types/monitoring'
import type {
  RawAgentHealth,
  RawAlert,
  RawDecision,
  RawOperationalLog,
  RawPosition,
  RawTrade,
} from './contracts'

function normalizeHealthStatus(input: string): HealthStatus {
  if (input === 'down') return 'down'
  if (input === 'degraded') return 'degraded'
  return 'healthy'
}

function normalizeSeverity(input: string): Severity {
  if (input === 'critical') return 'critical'
  if (input === 'warning') return 'warning'
  return 'info'
}

function normalizeLevel(input: string): LogLevel {
  if (input === 'error') return 'error'
  if (input === 'warning') return 'warning'
  if (input === 'debug') return 'debug'
  return 'info'
}

export function toAgentHealth(input: RawAgentHealth): AgentHealth {
  return {
    id: String(input.id),
    name: input.name,
    status: normalizeHealthStatus(input.status),
    lastHeartbeat: input.lastHeartbeat,
    reason: input.reason,
  }
}

export function toPositionSnapshot(input: RawPosition): PositionSnapshot {
  return {
    id: String(input.id),
    symbol: input.symbol.toUpperCase(),
    side: input.side,
    size: input.size,
    entryPrice: input.entryPrice,
    markPrice: input.markPrice,
    unrealizedPnl: input.unrealizedPnl,
    realizedPnl: input.realizedPnl,
  }
}

export function toTradeRecord(input: RawTrade): TradeRecord {
  return {
    id: String(input.id),
    symbol: input.symbol.toUpperCase(),
    side: input.side,
    qty: input.qty,
    price: input.price,
    timestamp: input.timestamp,
  }
}

export function toAlertEvent(input: RawAlert): AlertEvent {
  return {
    id: String(input.id),
    severity: normalizeSeverity(input.severity),
    source: input.source,
    message: input.message,
    timestamp: input.timestamp,
  }
}

export function toOperationalLogEvent(
  input: RawOperationalLog,
  index: number,
): OperationalLogEvent {
  return {
    id: String(input.id ?? `${input.timestamp}-${input.source}-${index}`),
    timestamp: input.timestamp,
    source: input.source,
    level: normalizeLevel(input.level),
    message: input.message,
  }
}

export function toPseudoPositionFromTrade(input: RawTrade): PositionSnapshot {
  const side = input.side.toLowerCase() === 'buy' ? 'long' : 'short'
  return {
    id: `trade-${input.id}`,
    symbol: input.symbol.toUpperCase(),
    side,
    size: input.qty,
    entryPrice: input.price,
    markPrice: input.price,
    unrealizedPnl: 0,
    realizedPnl: 0,
  }
}

export function toPseudoHealthFromDecision(input: RawDecision): AgentHealth {
  const blocked = Boolean(input.blocked_reason)
  const status: HealthStatus = blocked ? 'degraded' : 'healthy'
  return {
    id: `decision-${input.id}`,
    name: input.symbol.toUpperCase(),
    status,
    lastHeartbeat: input.timestamp,
    reason: blocked ? input.blocked_reason ?? undefined : `Signal: ${input.signal}`,
  }
}

export function toPseudoAlertFromDecision(input: RawDecision): AlertEvent | null {
  if (!input.blocked_reason) {
    return null
  }
  return {
    id: `decision-alert-${input.id}`,
    severity: 'warning',
    source: input.symbol.toUpperCase(),
    message: input.blocked_reason,
    timestamp: input.timestamp,
  }
}

export function toPseudoLogFromDecision(input: RawDecision): OperationalLogEvent {
  return {
    id: `decision-log-${input.id}`,
    timestamp: input.timestamp,
    source: input.symbol.toUpperCase(),
    level: input.blocked_reason ? 'warning' : 'info',
    message: input.blocked_reason
      ? `Decision blocked: ${input.blocked_reason}`
      : `Decision ${input.signal} (confidence ${input.confidence.toFixed(2)})`,
  }
}
