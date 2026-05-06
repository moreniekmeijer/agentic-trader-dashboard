import { useMemo, useRef } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type {
  AgentHealth,
  AlertEvent,
  ContractIssue,
  OperationalLogEvent,
  PositionSnapshot,
} from '../../types/monitoring'
import {
  rawDecisionListSchema,
  rawTradeListSchema,
} from './contracts'
import { getJson } from './httpClient'
import { backoffDelayMs, pollingIntervalMs } from './pollingPolicy'
import {
  toPseudoAlertFromDecision,
  toPseudoHealthFromDecision,
  toPseudoLogFromDecision,
  toPseudoPositionFromTrade,
  toTradeRecord,
} from './adapters'

export interface PanelData<T> {
  items: T[]
  contractIssue?: ContractIssue
  lastGoodAt?: string
}

type Domain = 'health' | 'positions' | 'trades' | 'alerts' | 'logs'

async function fetchPanel<T>(
  path: string,
  parse: (value: unknown) => T[],
  lastGoodAt?: string,
): Promise<PanelData<T>> {
  try {
    const json = await getJson(path)
    const items = parse(json)
    return {
      items,
      lastGoodAt: new Date().toISOString(),
    }
  } catch (error) {
    return {
      items: [],
      contractIssue: {
        message:
          error instanceof Error
            ? error.message
            : 'Unknown data contract issue in panel response',
        lastGoodAt,
      },
      lastGoodAt,
    }
  }
}

function queryKey(domain: Domain): string[] {
  return ['monitoring', domain]
}

function useRefresh(domain: Domain): () => Promise<void> {
  const queryClient = useQueryClient()
  return useMemo(
    () => async () => {
      await queryClient.invalidateQueries({ queryKey: queryKey(domain) })
    },
    [domain, queryClient],
  )
}

export function useAgentHealthPanel() {
  const lastGoodRef = useRef<string>()
  const query = useQuery({
    queryKey: queryKey('health'),
    queryFn: async () => {
      const result = await fetchPanel(
        '/decisions',
        (value) =>
          rawDecisionListSchema
            .parse(value)
            .map((entry) => toPseudoHealthFromDecision(entry)),
        lastGoodRef.current,
      )
      if (result.lastGoodAt) {
        lastGoodRef.current = result.lastGoodAt
      }
      return result
    },
    refetchInterval: pollingIntervalMs('health'),
    retry: 3,
    retryDelay: (failures) => backoffDelayMs('health', failures),
  })

  return { ...query, refresh: useRefresh('health') }
}

export function usePositionsPanel() {
  const lastGoodRef = useRef<string>()
  const query = useQuery({
    queryKey: queryKey('positions'),
    queryFn: async () => {
      const result = await fetchPanel(
        '/trades',
        (value) =>
          rawTradeListSchema
            .parse(value)
            .map((entry) => toPseudoPositionFromTrade(entry)),
        lastGoodRef.current,
      )
      if (result.lastGoodAt) {
        lastGoodRef.current = result.lastGoodAt
      }
      return result
    },
    refetchInterval: pollingIntervalMs('positions'),
    retry: 3,
    retryDelay: (failures) => backoffDelayMs('positions', failures),
  })

  return { ...query, refresh: useRefresh('positions') }
}

export function useTradesPanel() {
  const lastGoodRef = useRef<string>()
  const query = useQuery({
    queryKey: queryKey('trades'),
    queryFn: async () => {
      const result = await fetchPanel(
        '/trades',
        (value) => rawTradeListSchema.parse(value).map((entry) => toTradeRecord(entry)),
        lastGoodRef.current,
      )
      if (result.lastGoodAt) {
        lastGoodRef.current = result.lastGoodAt
      }
      return result
    },
    refetchInterval: pollingIntervalMs('trades'),
    retry: 3,
    retryDelay: (failures) => backoffDelayMs('trades', failures),
  })

  return { ...query, refresh: useRefresh('trades') }
}

export function useAlertsPanel() {
  const lastGoodRef = useRef<string>()
  const query = useQuery({
    queryKey: queryKey('alerts'),
    queryFn: async () => {
      const result = await fetchPanel(
        '/decisions',
        (value) =>
          rawDecisionListSchema
            .parse(value)
            .map((entry) => toPseudoAlertFromDecision(entry))
            .filter((entry): entry is AlertEvent => entry !== null)
            .sort(orderAlerts),
        lastGoodRef.current,
      )
      if (result.lastGoodAt) {
        lastGoodRef.current = result.lastGoodAt
      }
      return result
    },
    refetchInterval: pollingIntervalMs('alerts'),
    retry: 3,
    retryDelay: (failures) => backoffDelayMs('alerts', failures),
  })

  return { ...query, refresh: useRefresh('alerts') }
}

export function useLogsPanel() {
  const lastGoodRef = useRef<string>()
  const query = useQuery({
    queryKey: queryKey('logs'),
    queryFn: async () => {
      const result = await fetchPanel(
        '/decisions',
        (value) =>
          rawDecisionListSchema
            .parse(value)
            .map((entry) => toPseudoLogFromDecision(entry))
            .sort(orderLogsNewestFirst),
        lastGoodRef.current,
      )
      if (result.lastGoodAt) {
        lastGoodRef.current = result.lastGoodAt
      }
      return result
    },
    refetchInterval: pollingIntervalMs('logs'),
    retry: 3,
    retryDelay: (failures) => backoffDelayMs('logs', failures),
  })

  return { ...query, refresh: useRefresh('logs') }
}

export async function refreshAllPanels(
  refreshers: Array<() => Promise<void>>,
): Promise<void> {
  await Promise.all(refreshers.map((refresh) => refresh()))
}

export function summarizePnl(positions: PositionSnapshot[]): {
  unrealized: number
  realized: number
} {
  return positions.reduce(
    (acc, position) => ({
      unrealized: acc.unrealized + position.unrealizedPnl,
      realized: acc.realized + position.realizedPnl,
    }),
    { unrealized: 0, realized: 0 },
  )
}

export function highestSeverity(alerts: AlertEvent[]): AlertEvent['severity'] | null {
  if (alerts.some((alert) => alert.severity === 'critical')) {
    return 'critical'
  }
  if (alerts.some((alert) => alert.severity === 'warning')) {
    return 'warning'
  }
  if (alerts.some((alert) => alert.severity === 'info')) {
    return 'info'
  }
  return null
}

export function orderHealth(health: AgentHealth[]): AgentHealth[] {
  const rank: Record<AgentHealth['status'], number> = {
    down: 0,
    degraded: 1,
    healthy: 2,
  }
  return [...health].sort((a, b) => rank[a.status] - rank[b.status])
}

function orderAlerts(a: AlertEvent, b: AlertEvent): number {
  const rank: Record<AlertEvent['severity'], number> = {
    critical: 0,
    warning: 1,
    info: 2,
  }
  const severityDiff = rank[a.severity] - rank[b.severity]
  if (severityDiff !== 0) return severityDiff
  return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
}

function orderLogsNewestFirst(a: OperationalLogEvent, b: OperationalLogEvent): number {
  return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
}
