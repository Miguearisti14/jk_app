interface QuickActionChipProps {
  icon: string
  label: string
  onClick?: () => void
}

export function QuickActionChip({ icon, label, onClick }: QuickActionChipProps) {
  return (
    <button
      onClick={onClick}
      className="p-md rounded-lg bg-surface-container-low border border-outline-variant flex items-center gap-xs hover:bg-surface-container transition-colors active:scale-95 duration-150"
    >
      <span className="material-symbols-outlined text-secondary">{icon}</span>
      <span className="font-label-sm text-on-surface-variant">{label}</span>
    </button>
  )
}
