import type { StockStatus } from '../../types/inventory'

interface StockCountBadgeProps {
  quantity: number
  status: StockStatus
}

export function StockCountBadge({ quantity, status }: StockCountBadgeProps) {
  if (status === 'low_stock') {
    return (
      <div className="flex items-center gap-xs px-sm py-1 rounded-full bg-error-container flex-shrink-0">
        <span className="material-symbols-outlined text-error text-[14px]">warning</span>
        <span className="font-label-sm text-error font-bold">Stock: {quantity}</span>
      </div>
    )
  }

  if (status === 'out_of_stock') {
    return (
      <div className="flex items-center gap-xs px-sm py-1 rounded-full bg-surface-container-high flex-shrink-0">
        <span className="w-2 h-2 rounded-full bg-outline opacity-50 flex-shrink-0" />
        <span className="font-label-sm text-on-surface-variant">Sin stock</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-xs px-sm py-1 rounded-full bg-green-50 flex-shrink-0">
      <span className="w-2 h-2 rounded-full bg-green-600 flex-shrink-0" />
      <span className="font-label-sm text-green-700">Stock: {quantity}</span>
    </div>
  )
}
