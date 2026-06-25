import { useNavigate } from 'react-router-dom'
import { TopAppBar } from '../../components/layout/TopAppBar'
import { BottomNavBar } from '../../components/layout/BottomNavBar'
import { CategorySelectionCard } from '../../components/inventory/CategorySelectionCard'

const INVENTORY_CATEGORIES = [
  {
    id: 'televisores',
    icon: 'tv',
    title: 'Televisores',
    description: 'Gestión de stock, modelos y dimensiones de pantallas.',
  },
  {
    id: 'tarjetas',
    icon: 'memory',
    title: 'Tarjetas de TV',
    description: 'Inventario de placas base, fuentes y componentes internos.',
  },
]


export function InventoryPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-background text-on-background min-h-screen pb-32">
      <TopAppBar title="Inventario JK" />
      <main className="px-margin-mobile pt-xl">
        <div className="mb-lg space-y-xs">
          <p className="font-body-lg text-on-surface-variant">¿Qué desea mirar hoy?</p>
        </div>
        <div className="grid grid-cols-1 gap-md">
          {INVENTORY_CATEGORIES.map((cat) => (
            <CategorySelectionCard
              key={cat.id}
              icon={cat.icon}
              title={cat.title}
              description={cat.description}
              onClick={() => navigate(`/inventory/${cat.id}`)}
            />
          ))}
        </div>

      </main>
      <BottomNavBar />
    </div>
  )
}
