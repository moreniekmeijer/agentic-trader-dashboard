import type { ReactNode } from 'react'
import type { ContractIssue } from '../../types/monitoring'
import { ContractWarning } from './ContractWarning'
import { LastUpdated } from './LastUpdated'

interface PanelFrameProps {
  title: string
  loading: boolean
  contractIssue?: ContractIssue
  lastGoodAt?: string
  emptyText: string
  hasData: boolean
  onRefresh: () => Promise<void> | void
  children: ReactNode
}

export function PanelFrame({
  title,
  loading,
  contractIssue,
  lastGoodAt,
  emptyText,
  hasData,
  onRefresh,
  children,
}: PanelFrameProps) {
  return (
    <article className="panel-frame">
      <header className="panel-header">
        <h2>{title}</h2>
        <button type="button" className="panel-refresh" onClick={() => void onRefresh()}>
          Refresh
        </button>
      </header>
      {loading ? <p className="panel-state">Loading monitoring data...</p> : null}
      {contractIssue ? (
        <ContractWarning message={contractIssue.message} lastGoodAt={contractIssue.lastGoodAt} />
      ) : null}
      {!loading && !contractIssue && !hasData ? (
        <p className="panel-state">{emptyText}</p>
      ) : null}
      {!loading && hasData ? children : null}
      <LastUpdated at={lastGoodAt} />
    </article>
  )
}

