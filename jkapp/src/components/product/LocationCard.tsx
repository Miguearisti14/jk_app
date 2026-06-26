import { DetailCard } from './DetailCard'
import { DetailRow } from './DetailRow'
import type { ProductLocation } from '../../types/inventory'

interface LocationCardProps {
  location: ProductLocation
  sku: string
  numero_tarjeta: string | undefined
}

export function LocationCard({ location, sku, numero_tarjeta }: LocationCardProps) {
  return (
    <DetailCard icon="location_on" title="Ubicación">
      <DetailRow label="Número" value={numero_tarjeta} />
      <DetailRow label="Caja" value={location.box} />
      <DetailRow label="Estantería" value={location.shelf} />
      <DetailRow label="Identificación" value={sku} last />
    </DetailCard>
  )
}
