import type { Category } from '../../types/inventory'

interface CategoryCardProps {
  category: Category
  onClick?: (categoryId: string) => void
}

export function CategoryCard({ category, onClick }: CategoryCardProps) {
  return (
    <div
      onClick={() => onClick?.(category.id)}
      className="group relative overflow-hidden rounded-xl h-48 border border-outline-variant shadow-sm bg-white active:scale-[0.98] transition-transform cursor-pointer"
    >
      {category.imageUrl && (
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-500"
            src={category.imageUrl}
            alt={category.imageAlt ?? category.name}
          />
        </div>
      )}
      <div className="relative z-10 p-md h-full flex flex-col justify-between">
        <div className="bg-primary-container/10 w-12 h-12 rounded-lg flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-2xl">{category.icon}</span>
        </div>
        <div>
          <h3 className="font-headline-sm text-on-surface">{category.name}</h3>
        </div>
      </div>
    </div>
  )
}
