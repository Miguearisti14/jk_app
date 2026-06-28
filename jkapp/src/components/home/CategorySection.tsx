import { CategoryCard } from '../ui/CategoryCard'
import type { Category } from '../../types/inventory'

const CATEGORIES: Category[] = [
  {
    id: 'tarjetas',
    name: 'Tarjetas de TV',
    icon: 'memory',
    itemCount: 452,
    imageUrl: '/images/categories/tarjetas.webp',
    imageAlt: 'Tarjetas y circuitos de televisión',
  },
  {
    id: 'televisores',
    name: 'Televisores Completos',
    icon: 'tv',
    itemCount: 120,
    imageUrl: '/images/categories/televisores.jpg',
    imageAlt: 'Televisores completos en inventario',
  },
]

interface CategorySectionProps {
  onCategoryClick?: (categoryId: string) => void
}

export function CategorySection({ onCategoryClick }: CategorySectionProps) {
  return (
    <section className="space-y-md">
      <h2 className="font-headline-sm text-on-surface">Categorias</h2>
      <div className="grid grid-cols-1 gap-md">
        {CATEGORIES.map((category) => (
          <CategoryCard key={category.id} category={category} onClick={onCategoryClick} />
        ))}
      </div>
    </section>
  )
}
