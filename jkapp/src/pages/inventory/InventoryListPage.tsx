import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { TopAppBar } from '../../components/layout/TopAppBar'
import { BottomNavBar } from '../../components/layout/BottomNavBar'
import { FloatingActionButton } from '../../components/ui/FloatingActionButton'
import { SearchBar } from '../../components/inventory/SearchBar'
import { FilterChip } from '../../components/inventory/FilterChip'
import { InventoryListCard } from '../../components/inventory/InventoryListCard'
import type { CategoryId, InventoryItem, StockStatus } from '../../types/inventory'

const CATEGORY_LABELS: Record<CategoryId, string> = {
  tarjetas: 'Tarjetas de TV',
  televisores: 'Televisores',
}

function toStockStatus(quantity: number): StockStatus {
  if (quantity === 0) return 'out_of_stock'
  if (quantity <= 5) return 'low_stock'
  return 'in_stock'
}

async function fetchByCategory(category: CategoryId): Promise<InventoryItem[]> {
  if (category === 'tarjetas') {
    const { data, error } = await supabase
      .from('tarjetas')
      .select('id_tarjeta, modelo, precio, cantidad, marcas(descripcion_marca), inventarios(descripcion_inventario), tipos_tarjeta(descripcion_tipo)')

    if (error) throw error

    return (data ?? []).map((t: any) => ({
      id: String(t.id_tarjeta),
      name: `${t.marcas?.descripcion_marca ?? ''} ${t.modelo}`.trim(),
      category: 'tarjetas',
      subcategory: t.tipos_tarjeta?.descripcion_tipo ?? '',
      price: t.precio,
      stock_quantity: t.cantidad,
      stock_status: toStockStatus(t.cantidad),
      sku: t.modelo,
    }))
  }

  if (category === 'televisores') {
    const { data, error } = await supabase
      .from('televisores')
      .select('id_televisor, modelo, precio, marcas(descripcion_marca), estados(descripcion_estado)')

    if (error) throw error

    return (data ?? []).map((t: any) => ({
      id: String(t.id_televisor),
      name: `${t.marcas?.descripcion_marca ?? ''} ${t.modelo}`.trim(),
      category: 'televisores',
      subcategory: t.estados?.descripcion_estado ?? '',
      price: t.precio,
      stock_quantity: 1,
      stock_status: 'in_stock' as StockStatus,
      sku: t.modelo,
    }))
  }

  return []
}

export function InventoryListPage() {
  const { categoryId } = useParams<{ categoryId: CategoryId }>()
  const navigate = useNavigate()

  const [items, setItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('Todos')

  useEffect(() => {
    if (!categoryId) return
    setLoading(true)
    setError(null)
    setActiveFilter('Todos')
    fetchByCategory(categoryId as CategoryId)
      .then(setItems)
      .catch((err) => { console.error('fetchByCategory error:', err); setError('Error al cargar los datos') })
      .finally(() => setLoading(false))
  }, [categoryId])

  const filters = ['Todos', ...Array.from(new Set(items.map((i) => i.subcategory)))]

  const visibleItems = items.filter((item) => {
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
        title={CATEGORY_LABELS[categoryId as CategoryId] ?? ''}
        leading={
          <button
            onClick={() => navigate(-1)}
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
        <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Buscar por nombre o modelo" />

        {!loading && filters.length > 1 && (
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
        )}

        <div className="grid grid-cols-1 gap-md">
          {loading ? (
            <div className="flex flex-col items-center py-xl text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl opacity-30 animate-spin">progress_activity</span>
              <p className="font-body-md mt-sm">Cargando...</p>
            </div>
          ) : error ? (
            <div className="flex items-center gap-sm bg-error-container text-on-error-container rounded-xl p-md">
              <span className="material-symbols-outlined text-error shrink-0">error</span>
              <span className="font-body-md">{error}</span>
            </div>
          ) : visibleItems.length === 0 ? (
            <div className="flex flex-col items-center py-xl text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl opacity-30">search_off</span>
              <p className="font-body-md mt-sm">No se encontraron resultados</p>
            </div>
          ) : (
            visibleItems.map((item) => (
              <InventoryListCard
                key={item.id}
                item={item}
                onClick={(itemId) => navigate(`/inventory/${categoryId}/${itemId}`)}
              />
            ))
          )}
        </div>
      </main>
      <FloatingActionButton />
      <BottomNavBar />
    </div>
  )
}
