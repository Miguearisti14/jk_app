interface FloatingActionButtonProps {
  onClick?: () => void
  icon?: string
}

export function FloatingActionButton({ onClick, icon = 'add' }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform z-40"
    >
      <span className="material-symbols-outlined text-2xl">{icon}</span>
    </button>
  )
}
