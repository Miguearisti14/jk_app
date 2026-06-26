import { StockLevelCard } from './StockLevelCard'
import { LocationCard } from './LocationCard'
import { CompatibilitySection } from './CompatibilitySection'
import type { ProductDetail } from '../../types/inventory'

interface TarjetaDetailsCardProps {
  product: ProductDetail
  onQuantityChange?: (quantity: number) => void
}

export function TarjetaDetailsCard({ product, onQuantityChange }: TarjetaDetailsCardProps) {
  return (
    <div className="space-y-md">
      <StockLevelCard
        initialQuantity={product.stock_quantity}
        minThreshold={product.min_threshold}
        onUpdate={onQuantityChange}
      />
      {product.location && (
        <LocationCard location={product.location} sku={product.sku} numero_tarjeta={product.numero_tarjeta} />
      )}
      {product.compatibility && (
        <CompatibilitySection models={product.compatibility} />
      )}
    </div>
  )
}
