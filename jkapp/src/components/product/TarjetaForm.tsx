import type { ChangeEvent } from 'react'
import type { TarjetaFormData } from '../../types/database'
import { FormField } from '../ui/FormFields'

interface TarjetaFormProps {
  data: TarjetaFormData
  nextNumero?: number | null
  onChange: (data: TarjetaFormData) => void
}

export function TarjetaForm({ data, nextNumero, onChange }: TarjetaFormProps) {
  const set =
    (field: keyof TarjetaFormData) =>
      (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
        onChange({ ...data, [field]: e.target.value })

  return (
    <div className="space-y-lg">
      <div className="flex items-center gap-sm pb-xs border-b border-outline-variant">
        <span className="material-symbols-outlined text-primary">memory</span>
        <span className="font-headline-sm text-headline-sm text-on-surface">Datos de la Tarjeta</span>
      </div>

      <FormField
        label="Número de tarjeta"
        value={data.numero_tarjeta}
        onChange={set('numero_tarjeta')}
        type="number"
        placeholder={nextNumero != null ? String(nextNumero) : 'Ej: 42'}
        min={1}
      />

      <div className="grid grid-cols-2 gap-sm">
        <FormField label="Caja N°" value={data.caja} onChange={set('caja')} placeholder="Ej: 5, A-12" />
        <FormField
          label="Cantidad"
          value={data.cantidad}
          onChange={set('cantidad')}
          type="number"
          placeholder="0"
          min={0}
        />
      </div>

      <FormField label="Modelo" value={data.modelo} onChange={set('modelo')} placeholder="Ej: Bn49-..." />

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
        label="Compatibilidad"
        value={data.compatibilidad}
        onChange={set('compatibilidad')}
        type="textarea"
        placeholder="Modelos compatibles, versiones..."
      />

      <FormField
        label="Observaciones"
        value={data.observaciones}
        onChange={set('observaciones')}
        type="textarea"
        placeholder="Notas adicionales, condición, garantía..."
      />
    </div>
  )
}
