interface RefreshBarProps {
  onRefreshAll: () => Promise<void>
  refreshing?: boolean
}

export function RefreshBar({ onRefreshAll, refreshing }: RefreshBarProps) {
  return (
    <section className="refresh-bar" aria-label="Dashboard refresh controls">
      <button
        type="button"
        className="refresh-all-button"
        onClick={() => void onRefreshAll()}
        disabled={refreshing}
      >
        {refreshing ? 'Refreshing...' : 'Refresh Data'}
      </button>
    </section>
  )
}

