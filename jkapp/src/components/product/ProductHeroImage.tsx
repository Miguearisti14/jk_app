import type { StockStatus } from '../../types/inventory'

const STOCK_LABEL: Record<StockStatus, string> = {
  in_stock: 'In Stock',
  low_stock: 'Low Stock',
  out_of_stock: 'Out of Stock',
}

interface ProductHeroImageProps {
  imageUrl?: string
  name: string
  stockStatus: StockStatus
}

export function ProductHeroImage({ imageUrl, name, stockStatus }: ProductHeroImageProps) {
  return (
    <section className="relative w-full aspect-video bg-surface-container overflow-hidden">
      {imageUrl ? (
        <img className="w-full h-full object-cover" src={imageUrl} alt={name} />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant opacity-30">
            inventory_2
          </span>
        </div>
      )}
      <div className="absolute top-4 right-4">
        <span className="bg-primary text-on-primary font-label-sm px-3 py-1 rounded-full uppercase tracking-wider">
          {STOCK_LABEL[stockStatus]}
        </span>
      </div>
    </section>
  )
}
