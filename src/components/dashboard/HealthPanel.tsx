import { PanelFrame } from './PanelFrame'
import { orderHealth, type PanelData } from '../../lib/api/queries'
import type { AgentHealth } from '../../types/monitoring'

interface HealthPanelProps {
  data?: PanelData<AgentHealth>
  isLoading: boolean
  onRefresh: () => Promise<void>
}

export function HealthPanel({ data, isLoading, onRefresh }: HealthPanelProps) {
  const ordered = orderHealth(data?.items ?? [])

  return (
    <PanelFrame
      title="Agent Health"
      loading={isLoading}
      contractIssue={data?.contractIssue}
      lastGoodAt={data?.lastGoodAt}
      emptyText="No Monitoring Data Yet"
      hasData={ordered.length > 0}
      onRefresh={onRefresh}
    >
      <ul className="list">
        {ordered.map((agent) => (
          <li key={agent.id} className={`list-row status-${agent.status}`}>
            <div>
              <p className="row-title">{agent.name}</p>
              <p className="row-subtitle">
                {agent.reason ? `${agent.status} - ${agent.reason}` : agent.status}
              </p>
            </div>
            <p className="row-subtitle">
              Heartbeat: {new Date(agent.lastHeartbeat).toLocaleTimeString()}
            </p>
          </li>
        ))}
      </ul>
    </PanelFrame>
  )
}
