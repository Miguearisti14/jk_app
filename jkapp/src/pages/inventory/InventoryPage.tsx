import { useNavigate } from 'react-router-dom'
import { TopAppBar } from '../../components/layout/TopAppBar'
import { BottomNavBar } from '../../components/layout/BottomNavBar'
import { FloatingActionButton } from '../../components/ui/FloatingActionButton'
import { CategorySelectionCard } from '../../components/inventory/CategorySelectionCard'
import { QuickActionChip } from '../../components/inventory/QuickActionChip'

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

const QUICK_ACTIONS = [
  { id: 'recientes', icon: 'history', label: 'Recientes' },
  { id: 'reportes', icon: 'analytics', label: 'Reportes' },
]

export function InventoryPage() {
  const navigate = useNavigate()

  return (
    <div className="bg-background text-on-background min-h-screen pb-32">
      <TopAppBar title="TV Inventory" />
      <main className="px-margin-mobile pt-xl">
        <div className="mb-lg space-y-xs">
          <h2 className="font-headline-md text-on-surface">Bienvenido</h2>
          <p className="font-body-lg text-on-surface-variant">¿Qué desea gestionar hoy?</p>
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
        <div className="mt-xl grid grid-cols-2 gap-sm">
          {QUICK_ACTIONS.map((action) => (
            <QuickActionChip key={action.id} icon={action.icon} label={action.label} />
          ))}
        </div>
      </main>
      <FloatingActionButton />
      <BottomNavBar />
    </div>
  )
}
