import type { ReactNode } from 'react'

interface DetailCardProps {
  icon: string
  title: string
  children: ReactNode
}

export function DetailCard({ icon, title, children }: DetailCardProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant p-md rounded-xl shadow-sm">
      <div className="flex items-center gap-sm mb-md">
        <span className="material-symbols-outlined text-primary">{icon}</span>
        <h3 className="font-label-lg text-on-surface">{title}</h3>
      </div>
      <div className="space-y-xs">{children}</div>
    </div>
  )
}
