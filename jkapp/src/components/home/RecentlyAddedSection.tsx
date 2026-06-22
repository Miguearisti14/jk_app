import { ProductCard } from '../ui/ProductCard'
import type { InventoryItem } from '../../types/inventory'

const MOCK_ITEMS: InventoryItem[] = [
  {
    id: '1',
    name: 'Samsung QLED 4K-85',
    category: 'tarjetas',
    subcategory: 'Main Board',
    price: 185.0,
    stock_quantity: 45,
    stock_status: 'in_stock',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAb6FWUClFFTIQeYzl92_Jl9-d1M_Z2mnrw3II57gemow7Og1Ga0508U0Sdw8NQTOpzzRJZEDBDSi9RCVEEyqFXOQ4HXwPtKPf2M0dlyPo67jFM4M2oUATa0P_fgXskpnqVXaCyuq71Q_tq0QfFTKVq1Hn_hN25XRGTOsw7dkWwVVDE1-x0yqvrYvc99WHTenRKTd6JIaJejhDiOhs_yo3_CutonxITaHMJ8uTT7X_AGOvyegKdnyd9luTz9NOOv1OTDEJsgCSeEbRO',
    sku: 'SM-85Q-012',
  },
  {
    id: '2',
    name: 'LG OLED C1 PSU',
    category: 'tarjetas',
    subcategory: 'Power Supply',
    price: 120.0,
    stock_quantity: 23,
    stock_status: 'in_stock',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCVuPlnyHFbE3sMGtT3QAQW5DdftPKiCmHnu39E0i1zKgALNrnkIwyCMW262lS68g2i--c7B28CPxkHSczZJDRhyKqHOFm48RHTcrAYmjo9ujKPbWRqiqJ1YsNj7wJDlpFQI7EHTjjelCohsxnOmL0oDLCgSio3JGUNca_iVAroMCJo1Iig3QBh1YaymZqOs_5fS3yykk3c208AGLyb4py0dFNlKRAr7nt9vhLi9C5mMTUUjNmJz4Ar0xSZlDNADlSwN9xOAU1fsrs',
    sku: 'LG-C1-PWR',
  },
  {
    id: '3',
    name: 'T-CON Sony Bravia',
    category: 'tarjetas',
    subcategory: 'Panel Component',
    price: 45.5,
    stock_quantity: 8,
    stock_status: 'low_stock',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDz2JsMe8uwdEO-yZHqDuk0nK_3Z-1EmtCLfX-Lz5S4DWdwGqAmyKTFOKyEmeqDQWpgvJrX-L-KbKFMSYTeEuUkIm4eiM4DGrR0VnEift578p-zgO4g2j8R2znbkQxGxj3Me0OprIlQK_x4a5bdiKcYZ8RStQMkWyYlvKUtqRkXL0BmuZ1vEBFJXrHIgihs9dOHNibJe1P-6rmebVk84sBpJ9917mg2mCkfg5yCFkEBdYSs3GlOr9o4XB9CtblsWMnOP64PrJ_r2ZxD',
    sku: 'SNY-BRV-TCON',
  },
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
