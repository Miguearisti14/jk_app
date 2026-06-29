import { useNavigate } from 'react-router-dom'
import { TopAppBar } from '../../components/layout/TopAppBar'
import { BottomNavBar } from '../../components/layout/BottomNavBar'
import { FloatingActionButton } from '../../components/ui/FloatingActionButton'
import { CategorySection } from '../../components/home/CategorySection'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <div className="bg-background text-on-background min-h-screen pb-32">
      <TopAppBar title="Inventario JK" />
      <main className="px-margin-mobile pt-lg space-y-lg">
        <CategorySection onCategoryClick={(categoryId) => navigate(`/inventory/${categoryId}`)} />
      </main>
      <FloatingActionButton onClick={() => navigate('/products/add')} />
      <BottomNavBar />
    </div>
  )
}
