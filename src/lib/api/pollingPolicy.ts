export type PollingDomain = 'health' | 'positions' | 'trades' | 'alerts' | 'logs'

interface DomainPolicy {
  baseMs: number
  backgroundMultiplier: number
  maxBackoffMs: number
}

const DOMAIN_POLICIES: Record<PollingDomain, DomainPolicy> = {
  health: { baseMs: 3000, backgroundMultiplier: 3, maxBackoffMs: 30000 },
  positions: { baseMs: 5000, backgroundMultiplier: 2, maxBackoffMs: 45000 },
  trades: { baseMs: 10000, backgroundMultiplier: 2, maxBackoffMs: 60000 },
  alerts: { baseMs: 5000, backgroundMultiplier: 2, maxBackoffMs: 45000 },
  logs: { baseMs: 5000, backgroundMultiplier: 2, maxBackoffMs: 45000 },
}

function isBackgroundTab(): boolean {
  if (typeof document === 'undefined') {
    return false
  }
  return document.visibilityState === 'hidden'
}

export function pollingIntervalMs(domain: PollingDomain): number {
  const policy = DOMAIN_POLICIES[domain]
  if (isBackgroundTab()) {
    return policy.baseMs * policy.backgroundMultiplier
  }
  return policy.baseMs
}

export function backoffDelayMs(domain: PollingDomain, failures: number): number {
  const policy = DOMAIN_POLICIES[domain]
  const base = policy.baseMs * 2 ** Math.max(0, failures - 1)
  return Math.min(base, policy.maxBackoffMs)
}
