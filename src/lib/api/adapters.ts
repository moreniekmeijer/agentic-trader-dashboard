import type {
  AgentHealth,
  AlertEvent,
  PositionSnapshot,
  TradeRecord,
} from '../../types/monitoring'
import type {
  RawAgentHealth,
  RawAlert,
  RawPosition,
  RawTrade,
} from './contracts'

export function toAgentHealth(input: RawAgentHealth): AgentHealth {
  return {
    id: String(input.id),
    name: input.name,
    status: input.status,
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
    severity: input.severity,
    message: input.message,
    timestamp: input.timestamp,
  }
}

