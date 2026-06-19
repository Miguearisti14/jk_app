import type { ChangeEvent } from 'react'

interface SelectOption {
  id: string | number
  label: string
}

interface FormSelectProps {
  label: string
  value: string | number
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  options: SelectOption[]
  placeholder?: string
}

export function FormSelect({ label, value, onChange, options, placeholder = 'Seleccionar...' }: FormSelectProps) {
  return (
    <div className="flex flex-col gap-xs">
      <label className="font-label-lg text-label-lg text-on-surface-variant px-1">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          className="w-full h-touch-target-min px-md pr-10 rounded-xl border border-outline-variant bg-white text-on-surface appearance-none transition-all focus:border-primary focus:ring-1 focus:ring-primary"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">
          expand_more
        </span>
      </div>
    </div>
  )
}

interface FormFieldProps {
  label: string
  value: string | number
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  type?: 'text' | 'number' | 'textarea'
  placeholder?: string
  rows?: number
  min?: number | string
  step?: number | string
  prefix?: string
}

export function FormField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  rows = 3,
  min,
  step,
  prefix,
}: FormFieldProps) {
  const baseClass =
    'w-full h-touch-target-min px-md rounded-xl border border-outline-variant bg-white text-on-surface transition-all focus:border-primary focus:ring-1 focus:ring-primary'

  return (
    <div className="flex flex-col gap-xs">
      <label className="font-label-lg text-label-lg text-on-surface-variant px-1">{label}</label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={rows}
          className="w-full p-md rounded-xl border border-outline-variant bg-white text-on-surface transition-all resize-none focus:border-primary focus:ring-1 focus:ring-primary"
        />
      ) : prefix ? (
        <div className="relative">
          <span className="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant font-semibold">
            {prefix}
          </span>
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            min={min}
            step={step}
            className={`${baseClass} pl-xl`}
          />
        </div>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          min={min}
          step={step}
          className={baseClass}
        />
      )}
    </div>
  )
}
