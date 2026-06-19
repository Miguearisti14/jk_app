import type { ProductType } from '../../types/database'

interface ProductTypeSelectorProps {
  selected: ProductType | null
  onSelect: (type: ProductType) => void
}

export function ProductTypeSelector({ selected, onSelect }: ProductTypeSelectorProps) {
  return (
    <div className="flex flex-col gap-sm">
      <span className="font-label-lg text-label-lg text-on-surface-variant px-1">
        Tipo de Producto
      </span>
      <div className="grid grid-cols-2 gap-sm">
        <TypeCard
          type="televisor"
          icon="tv"
          label="Televisor"
          selected={selected === 'televisor'}
          onSelect={onSelect}
        />
        <TypeCard
          type="tarjeta"
          icon="memory"
          label="Tarjeta"
          selected={selected === 'tarjeta'}
          onSelect={onSelect}
        />
      </div>
    </div>
  )
}

interface TypeCardProps {
  type: ProductType
  icon: string
  label: string
  selected: boolean
  onSelect: (type: ProductType) => void
}

function TypeCard({ type, icon, label, selected, onSelect }: TypeCardProps) {
  return (
    <button
      onClick={() => onSelect(type)}
      className={`flex flex-col items-center justify-center gap-xs p-md rounded-xl border-2 h-24 transition-all duration-200 active:scale-95 ${
        selected
          ? 'border-primary bg-primary-fixed text-primary'
          : 'border-outline-variant bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
      }`}
    >
      <span className={`material-symbols-outlined text-4xl ${selected ? 'text-primary' : 'text-on-surface-variant'}`}>
        {icon}
      </span>
      <span className="font-label-lg text-label-lg font-semibold">{label}</span>
    </button>
  )
}
