import { TopAppBar } from '../../components/layout/TopAppBar'
import { BottomNavBar } from '../../components/layout/BottomNavBar'
import { FloatingActionButton } from '../../components/ui/FloatingActionButton'
import { CategorySection } from '../../components/home/CategorySection'
import { RecentlyAddedSection } from '../../components/home/RecentlyAddedSection'

interface HomePageProps {
  onTabChange?: (tab: string) => void
}

export function HomePage({ onTabChange }: HomePageProps) {
  return (
    <div className="bg-background text-on-background min-h-screen pb-32">
      <TopAppBar
        title="TV Inventory"

      />
      <main className="px-margin-mobile pt-lg space-y-lg">
        <CategorySection />
        <RecentlyAddedSection />
      </main>
      <FloatingActionButton />
      <BottomNavBar activeTab="dashboard" onTabChange={onTabChange} />
    </div>
  )
}
