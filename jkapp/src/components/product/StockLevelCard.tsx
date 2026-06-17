import { useState } from 'react'

interface StockLevelCardProps {
  initialQuantity: number
  minThreshold: number
  onUpdate?: (newQuantity: number) => void
}

export function StockLevelCard({ initialQuantity, minThreshold, onUpdate }: StockLevelCardProps) {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [animClass, setAnimClass] = useState('')

  const flash = (cls: string) => {
    setAnimClass(cls)
    setTimeout(() => setAnimClass(''), 150)
  }

  const increment = () => {
    const next = quantity + 1
    setQuantity(next)
    flash('scale-110 text-primary')
    onUpdate?.(next)
  }

  const decrement = () => {
    if (quantity <= 0) return
    const next = quantity - 1
    setQuantity(next)
    flash('scale-90 text-error')
    onUpdate?.(next)
  }

  const isLow = quantity <= minThreshold

  return (
    <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl shadow-sm flex flex-col justify-between">
      <div className="flex items-center gap-sm mb-md">
        <span className="material-symbols-outlined text-primary">inventory_2</span>
        <h3 className="font-label-lg text-on-surface">Stock Level</h3>
      </div>
      <div className="flex items-center justify-between bg-surface-container-low rounded-xl p-xs border border-outline-variant">
        <button
          onClick={decrement}
          disabled={quantity <= 0}
          className="h-touch-target-min w-touch-target-min flex items-center justify-center bg-secondary-container text-on-secondary-container rounded-lg active:scale-90 transition-transform disabled:opacity-40"
        >
          <span className="material-symbols-outlined">remove</span>
        </button>
        <span className={`font-headline-md font-bold transition-all duration-150 ${isLow ? 'text-error' : 'text-on-surface'} ${animClass}`}>
          {quantity}
        </span>
        <button
          onClick={increment}
          className="h-touch-target-min w-touch-target-min flex items-center justify-center bg-primary-container text-on-primary-container rounded-lg active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
      <p className="font-label-sm text-on-surface-variant mt-sm">
        Minimum threshold: {minThreshold} units
      </p>
    </div>
  )
}
