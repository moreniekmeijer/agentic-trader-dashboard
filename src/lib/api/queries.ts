import { useMemo, useRef } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type {
  AgentHealth,
  AlertEvent,
  ContractIssue,
  PositionSnapshot,
  TradeRecord,
} from '../../types/monitoring'
import {
  rawAgentHealthListSchema,
  rawAlertListSchema,
  rawPositionListSchema,
  rawTradeListSchema,
} from './contracts'
import { getJson } from './httpClient'
import { backoffDelayMs, pollingIntervalMs } from './pollingPolicy'
import {
  toAgentHealth,
  toAlertEvent,
  toPositionSnapshot,
  toTradeRecord,
} from './adapters'

export interface PanelData<T> {
  items: T[]
  contractIssue?: ContractIssue
  lastGoodAt?: string
}

type Domain = 'health' | 'positions' | 'trades' | 'alerts'

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
        '/api/health',
        (value) =>
          rawAgentHealthListSchema.parse(value).map((entry) => toAgentHealth(entry)),
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
        '/api/positions',
        (value) =>
          rawPositionListSchema
            .parse(value)
            .map((entry) => toPositionSnapshot(entry)),
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
        '/api/trades',
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
        '/api/alerts',
        (value) => rawAlertListSchema.parse(value).map((entry) => toAlertEvent(entry)),
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
