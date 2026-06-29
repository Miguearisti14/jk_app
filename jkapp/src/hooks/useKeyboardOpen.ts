import { useState, useEffect } from 'react'

export function useKeyboardOpen() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onFocus = (e: FocusEvent) => {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') setOpen(true)
    }
    const onBlur = () => setOpen(false)
    document.addEventListener('focusin', onFocus)
    document.addEventListener('focusout', onBlur)
    return () => {
      document.removeEventListener('focusin', onFocus)
      document.removeEventListener('focusout', onBlur)
    }
  }, [])
  return open
}
