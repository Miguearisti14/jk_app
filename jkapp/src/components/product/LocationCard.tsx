import { DetailCard } from './DetailCard'
import { DetailRow } from './DetailRow'
import type { ProductLocation } from '../../types/inventory'

interface LocationCardProps {
  location: ProductLocation
  sku: string
  id: string
}

export function LocationCard({ location, sku, id }: LocationCardProps) {
  return (
    <DetailCard icon="location_on" title="Ubicación">
      <DetailRow label="Número" value={id} />
      <DetailRow label="Caja" value={location.box} />
      <DetailRow label="Estantería" value={location.shelf} />
      <DetailRow label="Identificación" value={sku} last />
    </DetailCard>
  )
}
