import type { InventoryItem } from '../../types/inventory'
import { StockCountBadge } from '../ui/StockCountBadge'

interface InventoryListCardProps {
  item: InventoryItem
  onClick?: (itemId: string) => void
}

export function InventoryListCard({ item, onClick }: InventoryListCardProps) {
  return (
    <div
      onClick={() => onClick?.(item.id)}
      className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex gap-md shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98]"
    >

      <div className="flex flex-col justify-between flex-grow min-w-0">
        <div>
          <div className="flex justify-between items-start gap-xs">
            <h3 className="font-headline-sm text-on-surface leading-tight flex-1 truncate">
              {item.name}
            </h3>
            <span className="material-symbols-outlined text-on-surface-variant text-[20px] flex-shrink-0">
              chevron_right
            </span>
          </div>
          <p className="font-body-md text-on-surface-variant">{item.subcategory}</p>
        </div>
        <div className="flex justify-between items-end">
          <span className="font-headline-sm text-primary">${item.price.toFixed(2)}</span>
          <StockCountBadge quantity={item.stock_quantity} status={item.stock_status} />
        </div>
      </div>
    </div>
  )
}
