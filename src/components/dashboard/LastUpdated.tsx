interface LastUpdatedProps {
  at?: string
}

function formatTimestamp(value?: string): string {
  if (!value) {
    return 'No successful fetch yet'
  }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return 'Unknown update time'
  }
  return date.toLocaleTimeString()
}

export function LastUpdated({ at }: LastUpdatedProps) {
  return <p className="last-updated">Last updated: {formatTimestamp(at)}</p>
}

