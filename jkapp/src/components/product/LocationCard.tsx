import type { ProductLocation } from '../../types/inventory'

interface LocationCardProps {
  location: ProductLocation
  sku: string
  onViewMap?: () => void
}

export function LocationCard({ location, sku, onViewMap }: LocationCardProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl shadow-sm flex flex-col justify-between">
      <div className="flex items-center gap-sm mb-md">
        <span className="material-symbols-outlined text-primary">location_on</span>
        <h3 className="font-label-lg text-on-surface">Location</h3>
      </div>
      <div className="space-y-xs">
        <div className="flex justify-between items-center py-2 border-b border-surface-variant">
          <span className="font-body-md text-on-surface-variant">Box (Caja)</span>
          <span className="font-label-lg text-on-surface">{location.box}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-surface-variant">
          <span className="font-body-md text-on-surface-variant">Shelf (Estantería)</span>
          <span className="font-label-lg text-on-surface">{location.shelf}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-surface-variant">
          <span className="font-body-md text-on-surface-variant">Spare Part ID</span>
          <span className="font-label-lg text-on-surface">{sku}</span>
        </div>
      </div>
      <button
        onClick={onViewMap}
        className="mt-md text-primary font-label-lg flex items-center gap-xs self-start hover:bg-primary/5 px-1 py-1 rounded transition-colors"
      >
        View on Map
        <span className="material-symbols-outlined text-[18px]">open_in_new</span>
      </button>
    </div>
  )
}
