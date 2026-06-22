interface ProductActionBarProps {
  onSave?: () => void
  onDelete?: () => void
  saving?: boolean
  success?: boolean
  deleting?: boolean
  error?: string | null
}

export function ProductActionBar({ onSave, onDelete, saving, success, deleting, error }: ProductActionBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-md bg-surface border-t border-outline-variant z-50 space-y-sm">
      {error && (
        <div className="flex items-center gap-sm bg-error-container text-on-error-container rounded-xl px-md py-sm">
          <span className="material-symbols-outlined text-error shrink-0 text-[18px]">error</span>
          <span className="font-body-sm">{error}</span>
        </div>
      )}
      <div className="flex gap-sm">
        <button
          onClick={onSave}
          disabled={saving || success || deleting}
          className="flex-1 h-touch-target-min bg-primary text-on-primary rounded-xl font-headline-sm shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-sm disabled:opacity-60"
        >
          {saving ? (
            <>
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              Guardando...
            </>
          ) : success ? (
            <>
              <span className="material-symbols-outlined">check_circle</span>
              Guardado
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">sync</span>
              Actualizar
            </>
          )}
        </button>
        <button
          onClick={onDelete}
          disabled={saving || deleting}
          className="h-touch-target-min w-touch-target-min bg-error-container text-on-error-container rounded-xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center disabled:opacity-60"
        >
          {deleting ? (
            <span className="material-symbols-outlined animate-spin">progress_activity</span>
          ) : (
            <span className="material-symbols-outlined">delete</span>
          )}
        </button>
      </div>
    </div>
  )
}
