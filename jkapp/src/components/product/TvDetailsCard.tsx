import { DetailCard } from './DetailCard'
import { DetailRow } from './DetailRow'
import { ObservacionesCard } from './ObservacionesCard'
import type { ProductDetail } from '../../types/inventory'

interface TvDetailsCardProps {
  product: ProductDetail
}

export function TvDetailsCard({ product }: TvDetailsCardProps) {
  const smartLabel = product.smart == null ? '—' : product.smart ? 'Sí' : 'No'
  const smartClass = product.smart ? 'text-primary' : undefined

  return (
    <>
      <DetailCard icon="tv" title="Ficha técnica">
        {product.marca && <DetailRow label="Marca" value={product.marca} />}
        <DetailRow label="Modelo" value={product.sku} />
        <DetailRow label="Smart TV" value={smartLabel} valueClassName={smartClass} />
        <DetailRow label="Estado" value={product.subcategory || '—'} />
      </DetailCard>
      {product.observaciones && (
        <ObservacionesCard text={product.observaciones} />
      )}
    </>
  )
}
