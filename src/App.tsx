import { useMemo, useState } from 'react'
import { PanelFrame } from './components/dashboard/PanelFrame'
import { RefreshBar } from './components/dashboard/RefreshBar'
import {
  highestSeverity,
  refreshAllPanels,
  summarizePnl,
  useAgentHealthPanel,
  useAlertsPanel,
  usePositionsPanel,
  useTradesPanel,
} from './lib/api/queries'
import './index.css'

function App() {
  const [refreshingAll, setRefreshingAll] = useState(false)
  const health = useAgentHealthPanel()
  const positions = usePositionsPanel()
  const trades = useTradesPanel()
  const alerts = useAlertsPanel()

  const pnl = useMemo(
    () => summarizePnl(positions.data?.items ?? []),
    [positions.data?.items],
  )
  const topSeverity = highestSeverity(alerts.data?.items ?? [])

  const refreshAll = async () => {
    setRefreshingAll(true)
    try {
      await refreshAllPanels([
        health.refresh,
        positions.refresh,
        trades.refresh,
        alerts.refresh,
      ])
    } finally {
      setRefreshingAll(false)
    }
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Agentic Trader Monitoring</p>
          <h1>Operations Dashboard</h1>
        </div>
        <div className="status-chip">
          <span className={`severity severity-${topSeverity ?? 'info'}`}>
            {topSeverity ? `Alerts: ${topSeverity}` : 'Alerts: none'}
          </span>
        </div>
      </header>

      <RefreshBar onRefreshAll={refreshAll} refreshing={refreshingAll} />

      <section className="overview-grid">
        <article className="overview-card">
          <p className="card-label">Open Positions</p>
          <p className="card-value">{positions.data?.items.length ?? 0}</p>
        </article>
        <article className="overview-card">
          <p className="card-label">Unrealized PnL</p>
          <p className="card-value">${pnl.unrealized.toFixed(2)}</p>
        </article>
        <article className="overview-card">
          <p className="card-label">Realized PnL</p>
          <p className="card-value">${pnl.realized.toFixed(2)}</p>
        </article>
      </section>

      <section className="panel-grid">
        <PanelFrame
          title="Agent Health"
          loading={health.isLoading}
          contractIssue={health.data?.contractIssue}
          lastGoodAt={health.data?.lastGoodAt}
          emptyText="No Monitoring Data Yet"
          hasData={Boolean(health.data?.items.length)}
          onRefresh={health.refresh}
        >
          <ul className="list">
            {health.data?.items.map((agent) => (
              <li key={agent.id} className="list-row">
                <div>
                  <p className="row-title">{agent.name}</p>
                  <p className="row-subtitle">{agent.status}</p>
                </div>
                <p className="row-subtitle">
                  Heartbeat: {new Date(agent.lastHeartbeat).toLocaleTimeString()}
                </p>
              </li>
            ))}
          </ul>
        </PanelFrame>

        <PanelFrame
          title="Positions"
          loading={positions.isLoading}
          contractIssue={positions.data?.contractIssue}
          lastGoodAt={positions.data?.lastGoodAt}
          emptyText="No Monitoring Data Yet"
          hasData={Boolean(positions.data?.items.length)}
          onRefresh={positions.refresh}
        >
          <ul className="list">
            {positions.data?.items.map((position) => (
              <li key={position.id} className="list-row">
                <div>
                  <p className="row-title">
                    {position.symbol} ({position.side})
                  </p>
                  <p className="row-subtitle">Size: {position.size}</p>
                </div>
                <p className="row-subtitle">${position.unrealizedPnl.toFixed(2)}</p>
              </li>
            ))}
          </ul>
        </PanelFrame>

        <PanelFrame
          title="Trades"
          loading={trades.isLoading}
          contractIssue={trades.data?.contractIssue}
          lastGoodAt={trades.data?.lastGoodAt}
          emptyText="No Monitoring Data Yet"
          hasData={Boolean(trades.data?.items.length)}
          onRefresh={trades.refresh}
        >
          <ul className="list">
            {trades.data?.items.map((trade) => (
              <li key={trade.id} className="list-row">
                <div>
                  <p className="row-title">
                    {trade.symbol} {trade.side}
                  </p>
                  <p className="row-subtitle">
                    {new Date(trade.timestamp).toLocaleString()}
                  </p>
                </div>
                <p className="row-subtitle">
                  {trade.qty} @ ${trade.price}
                </p>
              </li>
            ))}
          </ul>
        </PanelFrame>

        <PanelFrame
          title="Alerts"
          loading={alerts.isLoading}
          contractIssue={alerts.data?.contractIssue}
          lastGoodAt={alerts.data?.lastGoodAt}
          emptyText="No Monitoring Data Yet"
          hasData={Boolean(alerts.data?.items.length)}
          onRefresh={alerts.refresh}
        >
          <ul className="list">
            {alerts.data?.items.map((alert) => (
              <li key={alert.id} className="list-row">
                <div>
                  <p className="row-title">{alert.message}</p>
                  <p className="row-subtitle">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
                <span className={`severity severity-${alert.severity}`}>
                  {alert.severity}
                </span>
              </li>
            ))}
          </ul>
        </PanelFrame>
      </section>
      <footer className="footer-note">
        <p>Monitor-only mode is active for v1.</p>
      </footer>
    </div>
  )
}

export default App
