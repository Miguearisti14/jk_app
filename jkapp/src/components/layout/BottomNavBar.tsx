import { useNavigate, useLocation } from 'react-router-dom'

type NavItem = {
  id: string
  label: string
  icon: string
  path: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Home', icon: 'dashboard', path: '/' },
  { id: 'inventory', label: 'Inventario', icon: 'inventory_2', path: '/inventory' },
  { id: 'scanner', label: 'Subir', icon: 'upload', path: '/upload' },
]

function getActiveTab(pathname: string): string {
  if (pathname.startsWith('/inventory')) return 'inventory'
  if (pathname.startsWith('/upload')) return 'scanner'
  return 'dashboard'
}

export function BottomNavBar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const activeTab = getActiveTab(pathname)

  return (
    <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center py-2 px-gutter-mobile bg-surface-container shadow-sm">
      {NAV_ITEMS.map((item) => {
        const isActive = item.id === activeTab
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center px-4 py-1 rounded-xl transition-all active:scale-90 duration-200 ${isActive
              ? 'bg-primary-container text-on-primary-container'
              : 'text-on-surface-variant hover:bg-surface-container-high'
              }`}
          >
            <span
              className="material-symbols-outlined"
              style={isActive ? { fontVariationSettings: '"FILL" 1' } : undefined}
            >
              {item.icon}
            </span>
            <span className="font-label-sm">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
