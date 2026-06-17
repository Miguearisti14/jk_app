import type { StockStatus } from '../../types/inventory'

const STOCK_CONFIG: Record<StockStatus, { label: string; className: string }> = {
  in_stock: { label: 'In Stock', className: 'bg-green-100 text-green-800' },
  low_stock: { label: 'Low Stock', className: 'bg-orange-100 text-orange-800' },
  out_of_stock: { label: 'Out of Stock', className: 'bg-red-100 text-red-800' },
}

interface StockBadgeProps {
  status: StockStatus
}

export function StockBadge({ status }: StockBadgeProps) {
  const config = STOCK_CONFIG[status]
  return (
    <span className={`text-[10px] font-bold px-2 py-1 rounded ${config.className}`}>
      {config.label}
    </span>
  )
}
