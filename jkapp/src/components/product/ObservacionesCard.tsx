import { DetailCard } from './DetailCard'

interface ObservacionesCardProps {
  text: string
}

export function ObservacionesCard({ text }: ObservacionesCardProps) {
  return (
    <DetailCard icon="notes" title="Observaciones">
      <p className="font-body-md text-on-surface pt-xs">{text}</p>
    </DetailCard>
  )
}