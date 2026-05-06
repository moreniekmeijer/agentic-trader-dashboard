import { PanelFrame } from './PanelFrame'
import { type PanelData } from '../../lib/api/queries'
import type { AlertEvent } from '../../types/monitoring'

interface AlertsPanelProps {
  data?: PanelData<AlertEvent>
  isLoading: boolean
  onRefresh: () => Promise<void>
}

export function AlertsPanel({ data, isLoading, onRefresh }: AlertsPanelProps) {
  return (
    <PanelFrame
      title="Alerts"
      loading={isLoading}
      contractIssue={data?.contractIssue}
      lastGoodAt={data?.lastGoodAt}
      emptyText="No Monitoring Data Yet"
      hasData={Boolean(data?.items.length)}
      onRefresh={onRefresh}
    >
      <ul className="list">
        {data?.items.map((alert) => (
          <li key={alert.id} className="list-row">
            <div>
              <p className="row-title">{alert.message}</p>
              <p className="row-subtitle">
                {new Date(alert.timestamp).toLocaleString()} - {alert.source}
              </p>
            </div>
            <span className={`severity severity-${alert.severity}`}>{alert.severity}</span>
          </li>
        ))}
      </ul>
    </PanelFrame>
  )
}
