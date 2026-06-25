import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { TopAppBar } from '../../components/layout/TopAppBar'
import { ProductTypeSelector } from '../../components/product/ProductTypeSelector'
import { TelevisorForm } from '../../components/product/TelevisorForm'
import { TarjetaForm } from '../../components/product/TarjetaForm'
import type {
  ProductType,
  Marca,
  Estado,
  InventarioLookup,
  TelevisorFormData,
  TarjetaFormData,
} from '../../types/database'
import { TELEVISOR_INIT, TARJETA_INIT } from '../../types/database'

export function AddProductPage() {
  const navigate = useNavigate()

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const [productType, setProductType] = useState<ProductType | null>(null)
  const [televisorData, setTelevisorData] = useState<TelevisorFormData>(TELEVISOR_INIT)
  const [tarjetaData, setTarjetaData] = useState<TarjetaFormData>(TARJETA_INIT)

  const [marcas, setMarcas] = useState<Marca[]>([])
  const [estados, setEstados] = useState<Estado[]>([])
  const [inventarios, setInventarios] = useState<InventarioLookup[]>([])

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchLookups = async () => {
      const [marcasRes, estadosRes, inventariosRes] = await Promise.all([
        supabase.from('marcas').select('id_marca, descripcion_marca').order('descripcion_marca'),
        supabase.from('estados').select('id_estado, descripcion_estado').order('descripcion_estado'),
        supabase
          .from('inventarios')
          .select('id_inventario, descripcion_inventario')
          .order('descripcion_inventario'),
      ])
      if (marcasRes.data) setMarcas(marcasRes.data as Marca[])
      if (estadosRes.data) setEstados(estadosRes.data as Estado[])
      if (inventariosRes.data) setInventarios(inventariosRes.data as InventarioLookup[])
    }
    fetchLookups()
  }, [])

  const handleTypeChange = (type: ProductType) => {
    setProductType(type)
    setError(null)
  }

  const validateTelevisor = (): string | null => {
    if (!televisorData.marca) return 'Selecciona una marca'
    if (!televisorData.modelo.trim()) return 'Ingresa el modelo'
    if (!televisorData.estado) return 'Selecciona un estado'
    if (!televisorData.smart) return 'Indica si es Smart TV'
    if (!televisorData.precio || parseFloat(televisorData.precio) < 0) return 'Ingresa un precio válido'
    return null
  }

  const validateTarjeta = (): string | null => {
    if (!tarjetaData.inventario) return 'Selecciona el inventario'
    if (!tarjetaData.caja || parseInt(tarjetaData.caja) < 0) return 'Ingresa el número de caja'
    if (!tarjetaData.cantidad || parseInt(tarjetaData.cantidad) < 0) return 'Ingresa la cantidad'
    if (!tarjetaData.marca) return 'Selecciona una marca'
    if (!tarjetaData.modelo.trim()) return 'Ingresa el modelo'
    if (!tarjetaData.precio || parseFloat(tarjetaData.precio) < 0) return 'Ingresa un precio válido'
    return null
  }

  const handleSave = async () => {
    setError(null)

    const validationError =
      productType === 'televisor' ? validateTelevisor() : validateTarjeta()
    if (validationError) {
      setError(validationError)
      return
    }

    setSaving(true)
    try {
      if (productType === 'televisor') {
        const { error: err } = await supabase.from('televisores').insert({
          marca: parseInt(televisorData.marca),
          modelo: televisorData.modelo.trim(),
          estado: parseInt(televisorData.estado),
          smart: televisorData.smart,
          precio: parseFloat(televisorData.precio),
          observaciones: televisorData.observaciones.trim() || null,
        })
        if (err) throw err
      } else {
        const { error: err } = await supabase.from('tarjetas').insert({
          inventario: parseInt(tarjetaData.inventario),
          caja: parseInt(tarjetaData.caja),
          cantidad: parseInt(tarjetaData.cantidad),
          marca: parseInt(tarjetaData.marca),
          modelo: tarjetaData.modelo.trim(),
          precio: parseFloat(tarjetaData.precio),
          compatibilidad: tarjetaData.compatibilidad.trim() || null,
          observaciones: tarjetaData.observaciones.trim() || null,
        })
        if (err) throw err
      }
      setSuccess(true)
      setTimeout(() => navigate(-1), 1200)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar el producto')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="bg-background text-on-background min-h-screen">
      <TopAppBar
        title="Nuevo Producto"
        leading={
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-surface-container-low active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
          </button>
        }
      />

      <main className="px-margin-mobile pt-lg pb-44 space-y-lg">
        <ProductTypeSelector selected={productType} onSelect={handleTypeChange} />

        {productType === 'televisor' && (
          <TelevisorForm
            data={televisorData}
            marcas={marcas}
            estados={estados}
            onChange={setTelevisorData}
          />
        )}

        {productType === 'tarjeta' && (
          <TarjetaForm
            data={tarjetaData}
            marcas={marcas}
            inventarios={inventarios}
            onChange={setTarjetaData}
          />
        )}

        {error && (
          <div className="flex items-center gap-sm bg-error-container text-on-error-container rounded-xl p-md">
            <span className="material-symbols-outlined text-error shrink-0">error</span>
            <span className="font-body-md text-body-md">{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-sm bg-green-50 text-green-800 rounded-xl p-md">
            <span className="material-symbols-outlined text-green-600 shrink-0">check_circle</span>
            <span className="font-body-md text-body-md">Producto guardado correctamente</span>
          </div>
        )}
      </main>

      <footer className="fixed bottom-0 w-full bg-surface border-t border-outline-variant p-margin-mobile z-50">
        <div className="flex flex-col gap-sm">
          <button
            onClick={handleSave}
            disabled={saving || !productType || success}
            className="w-full h-touch-target-min bg-primary text-on-primary rounded-xl font-label-lg text-label-lg font-bold shadow-sm active:scale-95 transition-all duration-150 flex items-center justify-center gap-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
                <span className="material-symbols-outlined">save</span>
                Guardar Producto
              </>
            )}
          </button>
          <button
            onClick={() => navigate(-1)}
            disabled={saving}
            className="w-full h-touch-target-min bg-transparent text-primary rounded-xl font-label-lg text-label-lg font-bold hover:bg-surface-container-high active:scale-95 transition-all duration-150 disabled:opacity-50"
          >
            Cancelar
          </button>
        </div>
      </footer>
    </div>
  )
}
