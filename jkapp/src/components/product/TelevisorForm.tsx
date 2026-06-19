import type { ChangeEvent } from 'react'
import type { Estado, Marca, TelevisorFormData } from '../../types/database'
import { FormField, FormSelect } from '../ui/FormFields'

interface TelevisorFormProps {
  data: TelevisorFormData
  marcas: Marca[]
  estados: Estado[]
  onChange: (data: TelevisorFormData) => void
}

export function TelevisorForm({ data, marcas, estados, onChange }: TelevisorFormProps) {
  const set =
    (field: keyof TelevisorFormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      onChange({ ...data, [field]: e.target.value })

  return (
    <div className="space-y-lg">
      <div className="flex items-center gap-sm pb-xs border-b border-outline-variant">
        <span className="material-symbols-outlined text-primary">tv</span>
        <span className="font-headline-sm text-headline-sm text-on-surface">Datos del Televisor</span>
      </div>

      <FormSelect
        label="Marca"
        value={data.marca}
        onChange={set('marca')}
        options={marcas.map((m) => ({ id: m.id_marca, label: m.descripcion_marca }))}
        placeholder="Seleccionar marca..."
      />

      <FormField label="Modelo" value={data.modelo} onChange={set('modelo')} placeholder="Ej: 55UN7300" />

      <div className="grid grid-cols-2 gap-sm">
        <FormSelect
          label="Estado"
          value={data.estado}
          onChange={set('estado')}
          options={estados.map((e) => ({ id: e.id_estado, label: e.descripcion_estado }))}
        />
        <FormField label="Smart TV" value={data.smart} onChange={set('smart')} placeholder="Ej: Android TV, WebOS..." />
      </div>

      <FormField
        label="Precio"
        value={data.precio}
        onChange={set('precio')}
        type="number"
        placeholder="0.00"
        min={0}
        step={0.01}
        prefix="$"
      />

      <FormField
        label="Observaciones"
        value={data.observaciones}
        onChange={set('observaciones')}
        type="textarea"
        placeholder="Notas adicionales, daños, garantía..."
      />
    </div>
  )
}
