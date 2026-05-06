import { LastUpdated } from './LastUpdated'

interface ContractWarningProps {
  message: string
  lastGoodAt?: string
}

export function ContractWarning({ message, lastGoodAt }: ContractWarningProps) {
  return (
    <div className="contract-warning" role="status" aria-live="polite">
      <p className="contract-warning-title">Data contract issue</p>
      <p className="contract-warning-message">{message}</p>
      <LastUpdated at={lastGoodAt} />
    </div>
  )
}

