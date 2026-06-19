import type { ChangeEvent } from 'react'
import type { InventarioLookup, Marca, TarjetaFormData } from '../../types/database'
import { FormField, FormSelect } from '../ui/FormFields'

interface TarjetaFormProps {
  data: TarjetaFormData
  marcas: Marca[]
  inventarios: InventarioLookup[]
  onChange: (data: TarjetaFormData) => void
}

export function TarjetaForm({ data, marcas, inventarios, onChange }: TarjetaFormProps) {
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

      <FormSelect
        label="Inventario"
        value={data.inventario}
        onChange={set('inventario')}
        options={inventarios.map((inv) => ({ id: inv.id_inventario, label: inv.descripcion_inventario }))}
        placeholder="Seleccionar inventario..."
      />

      <div className="grid grid-cols-2 gap-sm">
        <FormField label="Caja N°" value={data.caja} onChange={set('caja')} type="number" placeholder="0" min={0} />
        <FormField
          label="Cantidad"
          value={data.cantidad}
          onChange={set('cantidad')}
          type="number"
          placeholder="0"
          min={0}
        />
      </div>

      <FormSelect
        label="Marca"
        value={data.marca}
        onChange={set('marca')}
        options={marcas.map((m) => ({ id: m.id_marca, label: m.descripcion_marca }))}
        placeholder="Seleccionar marca..."
      />

      <FormField label="Modelo" value={data.modelo} onChange={set('modelo')} placeholder="Ej: T-CON 55UN7300" />

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
