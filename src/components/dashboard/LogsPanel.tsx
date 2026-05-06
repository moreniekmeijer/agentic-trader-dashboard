import { useMemo, useState } from 'react'
import type { LogLevel, OperationalLogEvent } from '../../types/monitoring'
import { type PanelData } from '../../lib/api/queries'
import { PanelFrame } from './PanelFrame'

type TimeWindow = '15m' | '1h' | '24h'

interface LogsPanelProps {
  data?: PanelData<OperationalLogEvent>
  isLoading: boolean
  onRefresh: () => Promise<void>
}

export function LogsPanel({ data, isLoading, onRefresh }: LogsPanelProps) {
  const [sourceFilter, setSourceFilter] = useState('all')
  const [levelFilter, setLevelFilter] = useState<'all' | LogLevel>('all')
  const [timeWindow, setTimeWindow] = useState<TimeWindow>('1h')

  const sources = useMemo(() => {
    const raw = data?.items ?? []
    return [...new Set(raw.map((entry) => entry.source))].sort()
  }, [data?.items])

  const filtered = useMemo(() => {
    const raw = data?.items ?? []
    const referenceTimeMs = raw.reduce((max, entry) => {
      const parsed = new Date(entry.timestamp).getTime()
      return Number.isNaN(parsed) ? max : Math.max(max, parsed)
    }, 0)
    const windowMs =
      timeWindow === '15m' ? 15 * 60_000 : timeWindow === '1h' ? 60 * 60_000 : 24 * 60 * 60_000
    return raw.filter((entry) => {
      const entryTimeMs = new Date(entry.timestamp).getTime()
      if (Number.isNaN(entryTimeMs)) {
        return false
      }
      const inWindow = referenceTimeMs - entryTimeMs <= windowMs
      const sourceOk = sourceFilter === 'all' || entry.source === sourceFilter
      const levelOk = levelFilter === 'all' || entry.level === levelFilter
      return inWindow && sourceOk && levelOk
    })
  }, [data?.items, levelFilter, sourceFilter, timeWindow])

  return (
    <PanelFrame
      title="Recent Operational Logs"
      loading={isLoading}
      contractIssue={data?.contractIssue}
      lastGoodAt={data?.lastGoodAt}
      emptyText="No Monitoring Data Yet"
      hasData={filtered.length > 0}
      onRefresh={onRefresh}
    >
      <div className="log-filters" aria-label="Filter: Source / Level / Time Range">
        <select value={sourceFilter} onChange={(event) => setSourceFilter(event.target.value)}>
          <option value="all">Source: All</option>
          {sources.map((source) => (
            <option key={source} value={source}>
              Source: {source}
            </option>
          ))}
        </select>
        <select
          value={levelFilter}
          onChange={(event) => setLevelFilter(event.target.value as 'all' | LogLevel)}
        >
          <option value="all">Level: All</option>
          <option value="error">Level: Error</option>
          <option value="warning">Level: Warning</option>
          <option value="info">Level: Info</option>
          <option value="debug">Level: Debug</option>
        </select>
        <select
          value={timeWindow}
          onChange={(event) => setTimeWindow(event.target.value as TimeWindow)}
        >
          <option value="15m">Time: 15m</option>
          <option value="1h">Time: 1h</option>
          <option value="24h">Time: 24h</option>
        </select>
      </div>
      <ul className="list">
        {filtered.map((log) => (
          <li key={log.id} className="list-row">
            <div className="log-main">
              <p className="row-subtitle">{new Date(log.timestamp).toLocaleString()}</p>
              <p className="row-subtitle">{log.source}</p>
            </div>
            <p className="row-title log-message">{log.message}</p>
            <span
              className={`severity severity-${
                log.level === 'error'
                  ? 'critical'
                  : log.level === 'debug'
                    ? 'info'
                    : log.level
              }`}
            >
              {log.level}
            </span>
          </li>
        ))}
      </ul>
    </PanelFrame>
  )
}
