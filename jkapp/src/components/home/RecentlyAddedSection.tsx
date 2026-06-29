import { ProductCard } from '../ui/ProductCard'
import type { InventoryItem } from '../../types/inventory'

const MOCK_ITEMS: InventoryItem[] = [
  { id: '1', name: 'Samsung QLED 4K-85', category: 'tarjetas', subcategory: 'Main Board', price: 185.0, stock_quantity: 45, sku: 'SM-85Q-012' },
  { id: '2', name: 'LG OLED C1 PSU', category: 'tarjetas', subcategory: 'Power Supply', price: 120.0, stock_quantity: 23, sku: 'LG-C1-PWR' },
  { id: '3', name: 'T-CON Sony Bravia', category: 'tarjetas', subcategory: 'Panel Component', price: 45.5, stock_quantity: 8, sku: 'SNY-BRV-TCON' },
]

interface RecentlyAddedSectionProps {
  onSeeAll?: () => void
  onItemClick?: (itemId: string) => void
}

export function RecentlyAddedSection({ onItemClick }: RecentlyAddedSectionProps) {
  return (
    <section className="space-y-md">
      <div className="flex justify-between items-center">
        <h2 className="font-headline-sm text-on-surface">Visto recientemente</h2>

      </div>
      <div className="flex overflow-x-auto gap-md hide-scrollbar pb-md -mx-margin-mobile px-margin-mobile">
        {MOCK_ITEMS.map((item) => (
          <ProductCard key={item.id} item={item} onClick={onItemClick} />
        ))}
      </div>
    </section>
  )
}
