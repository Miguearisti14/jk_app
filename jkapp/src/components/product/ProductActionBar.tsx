interface ProductActionBarProps {
  onUpdateStock?: () => void
  label?: string
}

export function ProductActionBar({ onUpdateStock, label = 'Update Stock' }: ProductActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-md bg-surface border-t border-outline-variant z-50">
      <button
        onClick={onUpdateStock}
        className="w-full h-touch-target-min bg-primary text-on-primary rounded-xl font-headline-sm shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-sm"
      >
        <span className="material-symbols-outlined">sync</span>
        {label}
      </button>
    </div>
  )
}
