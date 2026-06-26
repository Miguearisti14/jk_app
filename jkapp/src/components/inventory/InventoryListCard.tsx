import type { InventoryItem } from '../../types/inventory'


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
          <p className="font-body-md text-on-surface">{item.price != null ? `$${item.price.toFixed(2)}` : '—'}</p>
          <p className="font-body-sm text-on-surface-variant line-clamp-2">{item.compatibility}</p>
        </div>
        <div className="flex justify-between items-end">

        </div>
      </div>
    </div>
  )
}
