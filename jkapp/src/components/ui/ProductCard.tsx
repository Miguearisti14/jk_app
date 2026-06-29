import type { InventoryItem } from '../../types/inventory'

interface ProductCardProps {
  item: InventoryItem
  onClick?: (itemId: string) => void
}

export function ProductCard({ item, onClick }: ProductCardProps) {
  return (
    <div
      onClick={() => onClick?.(item.id)}
      className="flex-none w-64 bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="h-32 bg-surface-container flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-on-surface-variant opacity-30">
          inventory_2
        </span>
      </div>
      <div className="p-md space-y-xs">
        <p className="font-label-sm text-primary uppercase">{item.subcategory}</p>
        <h4 className="font-body-lg font-bold text-on-surface truncate">{item.name}</h4>
        <p className="font-body-md text-on-surface-variant">ID: {item.sku}</p>
        <div className="pt-sm">
          <span className="font-headline-sm text-primary">
            {item.price != null ? `$${item.price.toFixed(2)}` : '—'}
          </span>
        </div>
      </div>
    </div>
  )
}
