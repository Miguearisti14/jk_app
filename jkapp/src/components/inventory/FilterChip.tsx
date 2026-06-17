interface FilterChipProps {
  label: string
  isActive: boolean
  onClick: () => void
}

export function FilterChip({ label, isActive, onClick }: FilterChipProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 px-md py-xs rounded-full font-label-lg transition-all active:scale-95 ${
        isActive
          ? 'bg-primary text-on-primary shadow-sm'
          : 'bg-surface-container-high text-on-surface-variant border border-outline-variant hover:bg-surface-container-highest'
      }`}
    >
      {label}
    </button>
  )
}
