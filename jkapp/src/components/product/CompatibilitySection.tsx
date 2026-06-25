import { DetailCard } from './DetailCard'

interface CompatibilitySectionProps {
  models: string
}

export function CompatibilitySection({ models }: CompatibilitySectionProps) {
  return (
    <DetailCard icon="devices" title="Compatibilidades">
      <p className="font-body-md text-on-surface pt-xs">{models}</p>
    </DetailCard>
  )
}
