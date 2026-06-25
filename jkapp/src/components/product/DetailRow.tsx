import type { ReactNode } from 'react'

interface DetailRowProps {
  label: string
  value: ReactNode
  valueClassName?: string
  last?: boolean
}

export function DetailRow({ label, value, valueClassName, last }: DetailRowProps) {
  return (
    <div className={`flex justify-between items-center py-2 ${!last ? 'border-b border-surface-variant' : ''}`}>
      <span className="font-body-md text-on-surface-variant">{label}</span>
      <span className={`font-label-lg text-on-surface ${valueClassName ?? ''}`}>{value}</span>
    </div>
  )
}
