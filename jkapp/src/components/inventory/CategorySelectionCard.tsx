interface CategorySelectionCardProps {
  icon: string
  title: string
  description: string
  onClick?: () => void
}

export function CategorySelectionCard({ icon, title, description, onClick }: CategorySelectionCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative flex flex-col items-center justify-center p-xl bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm transition-all duration-200 hover:border-primary hover:shadow-md active:scale-95 text-left overflow-hidden w-full"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110" />
      <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-md group-hover:bg-primary transition-colors">
        <span className="material-symbols-outlined text-[32px] text-on-primary-fixed group-hover:text-on-primary">
          {icon}
        </span>
      </div>
      <div className="text-center z-10">
        <h3 className="font-headline-sm text-on-surface mb-xs">{title}</h3>
        <p className="font-body-md text-on-surface-variant">{description}</p>
      </div>
      <div className="mt-lg flex items-center gap-xs text-primary font-label-lg">
        <span>Entrar</span>
        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
      </div>
    </button>
  )
}
