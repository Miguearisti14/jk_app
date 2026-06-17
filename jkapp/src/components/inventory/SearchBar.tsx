interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchBar({ value, onChange, placeholder = 'Buscar...' }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none">
        <span className="material-symbols-outlined text-on-surface-variant">search</span>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full h-[48px] pl-12 pr-md bg-surface-container border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 outline-none font-body-md text-on-surface placeholder:text-on-surface-variant"
      />
    </div>
  )
}
