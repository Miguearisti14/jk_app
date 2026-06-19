import { TopAppBar } from '../../components/layout/TopAppBar'
import { BottomNavBar } from '../../components/layout/BottomNavBar'
import { FloatingActionButton } from '../../components/ui/FloatingActionButton'
import { CategorySection } from '../../components/home/CategorySection'
import { RecentlyAddedSection } from '../../components/home/RecentlyAddedSection'

interface HomePageProps {
  onTabChange?: (tab: string) => void
  onCategorySelect?: (categoryId: string) => void
  onAddProduct?: () => void
}

export function HomePage({ onTabChange, onCategorySelect, onAddProduct }: HomePageProps) {
  return (
    <div className="bg-background text-on-background min-h-screen pb-32">
      <TopAppBar
        title="Inventario JK"

      />
      <main className="px-margin-mobile pt-lg space-y-lg">
        <CategorySection onCategoryClick={onCategorySelect} />
        <RecentlyAddedSection />
      </main>
      <FloatingActionButton onClick={onAddProduct} />
      <BottomNavBar activeTab="dashboard" onTabChange={onTabChange} />
    </div>
  )
}
