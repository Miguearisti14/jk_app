import { DetailCard } from './DetailCard'
import { DetailRow } from './DetailRow'
import type { ProductDetail } from '../../types/inventory'

interface TvDetailsCardProps {
  product: ProductDetail
}

export function TvDetailsCard({ product }: TvDetailsCardProps) {
  const smartLabel = product.smart == null ? '—' : product.smart ? 'Sí' : 'No'
  const smartClass = product.smart ? 'text-primary' : undefined

  return (
    <DetailCard icon="tv" title="Ficha técnica">
      <DetailRow label="Modelo" value={product.sku} />
      <DetailRow label="Smart TV" value={smartLabel} valueClassName={smartClass} />
      <DetailRow label="Estado" value={product.subcategory || '—'} />
      {product.observaciones && (
        <div className="pt-sm">
          <p className="font-body-sm text-on-surface-variant mb-xs">Observaciones</p>
          <p className="font-body-md text-on-surface">{product.observaciones}</p>
        </div>
      )}
    </DetailCard>
  )
}
