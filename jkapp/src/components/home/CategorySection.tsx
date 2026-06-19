import { CategoryCard } from '../ui/CategoryCard'
import type { Category } from '../../types/inventory'

const CATEGORIES: Category[] = [
  {
    id: 'tarjetas',
    name: 'Tarjetas de TV',
    icon: 'memory',
    itemCount: 452,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQuopGLiYD921ZwK9miWxQrXvweCjfeFThVKJ_c2gLNKnv0Ti9eDqNbXHdUHwLQuHQ8lriuCW-_FAuPwDbcQNqQRmNr5X-8rupryn64VCd9Hw-6ODHuVGeRkuEdiL7e08HorIIqFnpfk6Wp81JDqi3mTzSKtyF7Bf_TutUm6fyN-Il_G7Wok52h6xa-ASqn04PYhU1OZ5vY-3ypWPRxXAAWy19TjKLvnnReD72_mKrQKM-eMSS2P64T6z1hcXZbAmiSB1-XOWuaovc',
    imageAlt: 'Tarjetas y circuitos de televisión',
  },

  {
    id: 'televisores',
    name: 'Televisores Completos',
    icon: 'tv',
    itemCount: 120,
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCY6e1jCKigllhJbLiqDjVvIikMNtSNuskvmaC664jiOc9tkYIboh9QqBu4VcaNMSp4e4VBII_JNxy3wyPgunQlGLmV7bbd_JlSMzFNe88Gr24i6nb4kJiHNI6v8vYyWdRJxhaukTP43Ps7xG83u5ngifZ55yXfm5Htkc6zsQNZ46r-HN0URpjhuLTb8-yLpxUrg3OwhCEajY1xrLGJkWXM5DbeVqgPBUus97uAcxiWZl0-dNzTL3zeeyp0WSRFHUb4j0I_H8LcEZFZ',
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
