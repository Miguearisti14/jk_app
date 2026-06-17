import { useState } from 'react'
import { TopAppBar } from '../../components/layout/TopAppBar'
import { BottomNavBar } from '../../components/layout/BottomNavBar'
import { FloatingActionButton } from '../../components/ui/FloatingActionButton'
import { SearchBar } from '../../components/inventory/SearchBar'
import { FilterChip } from '../../components/inventory/FilterChip'
import { InventoryListCard } from '../../components/inventory/InventoryListCard'
import type { CategoryId, InventoryItem } from '../../types/inventory'

const CATEGORY_LABELS: Record<CategoryId, string> = {
  tarjetas: 'Tarjetas de TV',
  repuestos: 'Repuestos de TV',
  televisores: 'Televisores',
}

const CATEGORY_FILTERS: Record<CategoryId, string[]> = {
  tarjetas: ['Todos', 'Main Board', 'Power Supply', 'T-CON', 'Panel'],
  repuestos: ['Todos', 'Backlight', 'Remote', 'Speaker', 'Cable'],
  televisores: ['Todos', 'Samsung', 'LG', 'Sony', 'Hisense'],
}

const ALL_ITEMS: InventoryItem[] = [
  // --- Tarjetas ---
  {
    id: 't1',
    name: 'Main Board Samsung 55"',
    category: 'tarjetas',
    subcategory: 'Main Board',
    price: 145.0,
    stock_quantity: 15,
    stock_status: 'in_stock',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBtP-Pslmh7xQk9QRWOIsugEA2Yr4LwyDpH5OBqPIr7WTj0UhmQJ5a4sTduUcOqS9hKJfK-vanjmbs7zsEwKTa1YkppJJV7lCvMoBos98ub3h7U4yeYFXu1c4BAeCplkTAit4d2l16zKp4gdwtEOS4UcD4i7jE9AY_dmFlUzgnwZe4igmLxvNoPZuFhX2z9iTh3nYFBzdW23CL7fz1zn2-1MYvvJ3o1-yeEAtUOLHb_rg5e0hBsEwXPonsDiyDzYvv83upVoNQoqGJX',
    sku: 'SAM-55-MB-01',
    created_at: '2026-06-10',
  },
  {
    id: 't2',
    name: 'Power Supply Sony Bravia',
    category: 'tarjetas',
    subcategory: 'Power Supply',
    price: 89.5,
    stock_quantity: 2,
    stock_status: 'low_stock',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDKF09Gabs8K7izznm45JYGaeXGtF201FFRyosmaKS7yj3PvpIZC3k_cDViJAWBLqRhFrd454YnBZggcHSCwd2l4xg18ryrF-i8UzESBX7W4obh9ebVb6PvveUeNdENqGb2xc1NrZ7qyJWr12WJtWAZ0_syvr1mcHlUENIB3HjCSxCY9TQ05QjXgOPSi3qDcvFHcJb-_lKi5hdn5utd8X5NamQ9XLazKidv9ESes9jJcN7FOQWFV1PE-duxUi_kIQJ_RjFO8p14Puby',
    sku: 'SNY-BRV-PSU',
    created_at: '2026-06-11',
  },
  {
    id: 't3',
    name: 'T-CON Board LG 50"',
    category: 'tarjetas',
    subcategory: 'T-CON',
    price: 67.0,
    stock_quantity: 23,
    stock_status: 'in_stock',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDz2JsMe8uwdEO-yZHqDuk0nK_3Z-1EmtCLfX-Lz5S4DWdwGqAmyKTFOKyEmeqDQWpgvJrX-L-KbKFMSYTeEuUkIm4eiM4DGrR0VnEift578p-zgO4g2j8R2znbkQxGxj3Me0OprIlQK_x4a5bdiKcYZ8RStQMkWyYlvKUtqRkXL0BmuZ1vEBFJXrHIgihs9dOHNibJe1P-6rmebVk84sBpJ9917mg2mCkfg5yCFkEBdYSs3GlOr9o4XB9CtblsWMnOP64PrJ_r2ZxD',
    sku: 'LG-50-TCON',
    created_at: '2026-06-09',
  },
  {
    id: 't4',
    name: 'Main Board LG OLED 55"',
    category: 'tarjetas',
    subcategory: 'Main Board',
    price: 195.0,
    stock_quantity: 8,
    stock_status: 'in_stock',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAb6FWUClFFTIQeYzl92_Jl9-d1M_Z2mnrw3II57gemow7Og1Ga0508U0Sdw8NQTOpzzRJZEDBDSi9RCVEEyqFXOQ4HXwPtKPf2M0dlyPo67jFM4M2oUATa0P_fgXskpnqVXaCyuq71Q_tq0QfFTKVq1Hn_hN25XRGTOsw7dkWwVVDE1-x0yqvrYvc99WHTenRKTd6JIaJejhDiOhs_yo3_CutonxITaHMJ8uTT7X_AGOvyegKdnyd9luTz9NOOv1OTDEJsgCSeEbRO',
    sku: 'LG-55-OLED-MB',
    created_at: '2026-06-08',
  },
  // --- Repuestos ---
  {
    id: 'r1',
    name: 'Backlight LED LG 43"',
    category: 'repuestos',
    subcategory: 'Backlight',
    price: 35.0,
    stock_quantity: 48,
    stock_status: 'in_stock',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC8x54H_7vlmFSrZ-7M1fLIpMjlQGelz6bCjNysWC61VMj2fQ8oWqlb34qzOP-JF0Rw8RGrQbQtxSFoGDVHi2aetjab5k50NYpkI0KL7R0tN7eyu-rxICyo37ViL0a0L1AA90DvHw6js1m7g8vEQUyIhVm5oxLmdab3Duh70T8-UbiQtWlYhAzBxAJ3fhwsFdAr9LUNZW6W2j-afX2Wp3BPZhMwac3lyu6hfx3eo3mw5AUwzcBeWMrPvaFfqnPSLK49UiNzdoHs30o-',
    sku: 'LG-43-BKL',
    created_at: '2026-06-12',
  },
  {
    id: 'r2',
    name: 'Control Remoto Samsung UN',
    category: 'repuestos',
    subcategory: 'Remote',
    price: 15.0,
    stock_quantity: 120,
    stock_status: 'in_stock',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDCVuPlnyHFbE3sMGtT3QAQW5DdftPKiCmHnu39E0i1zKgALNrnkIwyCMX262lS68g2i--c7B28CPxkHSczZJDRhyKqHOFm48RHTcrAYmjo9ujKPbWRqiqJ1YsNj7wJDlpFQI7EHTjjelCohsxnOmL0oDLCgSio3JGUNca_iVAroMCJo1Iig3QBh1YaymZqOs_5fS3yykk3c208AGLyb4py0dFNlKRAr7nt9vhLi9C5mMTUUjNmJz4Ar0xSZlDNADlSwN9xOAU1fsrs',
    sku: 'SAM-RMT-UN',
    created_at: '2026-06-07',
  },
  {
    id: 'r3',
    name: 'Bocina Interna Sony 10W',
    category: 'repuestos',
    subcategory: 'Speaker',
    price: 22.0,
    stock_quantity: 3,
    stock_status: 'low_stock',
    sku: 'SNY-SPK-10W',
    created_at: '2026-06-06',
  },
  // --- Televisores ---
  {
    id: 'tv1',
    name: 'Samsung QLED 65" A1',
    category: 'televisores',
    subcategory: 'Samsung',
    price: 899.0,
    stock_quantity: 8,
    stock_status: 'in_stock',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB2QkTmU0a_QwY0Al2pi3mGWOLSZ00fb13etl6NIIDihF2nzG5rtegN8Fqq8k3PksdkDsfTHxHpVrMBhxI6utdk_PVSYO7tsnWXb0MSsm6yGMuK--rULaEmhVPZdR2-cmMiccLbuJDwmVR1riMBa7revw89YyoyQ6faePYpXD-etq1eV4S37tX51UAO2dztgmxQ7zmM9saDl5aaLIJJyQb6vsziG4m2EajewcX-skkm8FOIEWOwtZhsANsOFz_NuniA0aKWs0-hfBjX',
    sku: 'SAM-65Q-A1',
    created_at: '2026-06-13',
  },
  {
    id: 'tv2',
    name: 'LG OLED 55" C2 Serie',
    category: 'televisores',
    subcategory: 'LG',
    price: 1250.0,
    stock_quantity: 3,
    stock_status: 'low_stock',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCY6e1jCKigllhJbLiqDjVvIikMNtSNuskvmaC664jiOc9tkYIboh9QqBu4VcaNMSp4e4VBII_JNxy3wyPgunQlGLmV7bbd_JlSMzFNe88Gr24i6nb4kJiHNI6v8vYyWdRJxhaukTP43Ps7xG83u5ngifZ55yXfm5Htkc6zsQNZ46r-HN0URpjhuLTb8-yLpxUrg3OwhCEajY1xrLGJkWXM5DbeVqgPBUus97uAcxiWZl0-dNzTL3zeeyp0WSRFHUb4j0I_H8LcEZFZ',
    sku: 'LG-55C2-OLED',
    created_at: '2026-06-12',
  },
  {
    id: 'tv3',
    name: 'Sony Bravia 50" X80J',
    category: 'televisores',
    subcategory: 'Sony',
    price: 599.0,
    stock_quantity: 12,
    stock_status: 'in_stock',
    image_url:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA06zolcWCUxVkt3y2ZhOznEk-nTsB43CIwevv0in7ALiu_PMh8F9OvEjoLS5M3D4OVJjNOvmJCtZENAM1-XKLx4Ij10utQKCo0A0HnFb1Qt56nytvH_vtwv9z37FRRdEKUdKK7yv3d2lzuSYNdNy8v85spSX40k8yzQm7fiIcvajyaVYnuAmEbEMjAk1MFQLDAfoAEcWAuN8wBmRjay3dQPeNgt_IA2sUKnjl73Oa9AmsVfY3uJNKdUOfxcCpXn-_0NlW0NkWlWuFC',
    sku: 'SNY-50X80J',
    created_at: '2026-06-11',
  },
  {
    id: 'tv4',
    name: 'Hisense 58" A6H 4K',
    category: 'televisores',
    subcategory: 'Hisense',
    price: 399.0,
    stock_quantity: 17,
    stock_status: 'in_stock',
    sku: 'HIS-58A6H',
    created_at: '2026-06-10',
  },
]

interface InventoryListPageProps {
  categoryId: CategoryId
  onBack?: () => void
  onItemClick?: (itemId: string) => void
  onTabChange?: (tab: string) => void
}

export function InventoryListPage({ categoryId, onBack, onItemClick, onTabChange }: InventoryListPageProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('Todos')

  const filters = CATEGORY_FILTERS[categoryId]
  const title = CATEGORY_LABELS[categoryId]

  const items = ALL_ITEMS.filter((item) => {
    if (item.category !== categoryId) return false
    if (activeFilter !== 'Todos' && item.subcategory !== activeFilter) return false
    if (searchTerm) {
      const q = searchTerm.toLowerCase()
      return item.name.toLowerCase().includes(q) || item.sku.toLowerCase().includes(q)
    }
    return true
  })

  return (
    <div className="bg-background text-on-background min-h-screen pb-32">
      <TopAppBar
        title={title}
        leading={
          <button
            onClick={onBack}
            className="p-2 hover:bg-surface-container-low rounded-full active:scale-95 transition-transform duration-150"
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
        }
        trailing={
          <button className="material-symbols-outlined text-primary p-2 hover:bg-surface-container-low rounded-full transition-colors active:scale-95 duration-150">
            search
          </button>
        }
      />
      <main className="px-margin-mobile pt-md space-y-md pb-md">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar repuestos o modelos"
        />
        <div className="flex overflow-x-auto gap-sm hide-scrollbar py-1">
          {filters.map((filter) => (
            <FilterChip
              key={filter}
              label={filter}
              isActive={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
            />
          ))}
        </div>
        <div className="grid grid-cols-1 gap-md">
          {items.map((item) => (
            <InventoryListCard key={item.id} item={item} onClick={onItemClick} />
          ))}
          {items.length === 0 && (
            <div className="flex flex-col items-center py-xl text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl opacity-30">search_off</span>
              <p className="font-body-md mt-sm">No se encontraron resultados</p>
            </div>
          )}
        </div>
      </main>
      <FloatingActionButton />
      <BottomNavBar activeTab="inventory" onTabChange={onTabChange} />
    </div>
  )
}
