import type { ProductLocation } from '../../types/inventory'

interface LocationCardProps {
  location: ProductLocation
  sku: string
  id: string
  onViewMap?: () => void
}

export function LocationCard({ location, sku, id, onViewMap }: LocationCardProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl shadow-sm flex flex-col justify-between">
      <div className="flex items-center gap-sm mb-md">
        <span className="material-symbols-outlined text-primary">location_on</span>
        <h3 className="font-label-lg text-on-surface">Ubicación</h3>
      </div>
      <div className="space-y-xs">
        <div className="flex justify-between items-center py-2 border-b border-surface-variant">
          <span className="font-body-md text-on-surface-variant">Número</span>
          <span className="font-label-lg text-on-surface">{id}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-surface-variant">
          <span className="font-body-md text-on-surface-variant">Caja</span>
          <span className="font-label-lg text-on-surface">{location.box}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-surface-variant">
          <span className="font-body-md text-on-surface-variant">Estantería</span>
          <span className="font-label-lg text-on-surface">{location.shelf}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-surface-variant">
          <span className="font-body-md text-on-surface-variant">Identificación</span>
          <span className="font-label-lg text-on-surface">{sku}</span>
        </div>
      </div>

    </div>
  )
}
