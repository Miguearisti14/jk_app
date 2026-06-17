import type { ReactNode } from 'react'

interface TopAppBarProps {
  title: string
  leading?: ReactNode
  trailing?: ReactNode
  titlePosition?: 'left' | 'center'
}

export function TopAppBar({ title, leading, trailing, titlePosition = 'left' }: TopAppBarProps) {
  if (titlePosition === 'center') {
    return (
      <header className="w-full top-0 sticky z-50 bg-surface border-b border-outline-variant flex justify-between items-center px-margin-mobile h-touch-target-min">
        <div className="flex items-center">{leading}</div>
        <h1 className="font-headline-md-mobile text-primary">{title}</h1>
        <div className="flex items-center">{trailing}</div>
      </header>
    )
  }

  return (
    <header className="w-full top-0 sticky z-50 bg-surface border-b border-outline-variant flex justify-between items-center px-margin-mobile h-touch-target-min">
      <div className="flex items-center gap-sm">
        {leading}
        <h1 className="font-headline-md-mobile text-primary">{title}</h1>
      </div>
      {trailing && <div className="flex items-center">{trailing}</div>}
    </header>
  )
}
