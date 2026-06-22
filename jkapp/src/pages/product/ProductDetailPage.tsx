import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { TopAppBar } from '../../components/layout/TopAppBar'
import { StockLevelCard } from '../../components/product/StockLevelCard'
import { LocationCard } from '../../components/product/LocationCard'
import { CompatibilitySection } from '../../components/product/CompatibilitySection'
import { ProductActionBar } from '../../components/product/ProductActionBar'
import type { CategoryId, ProductDetail, StockStatus } from '../../types/inventory'

function toStockStatus(quantity: number): StockStatus {
  if (quantity === 0) return 'out_of_stock'
  if (quantity <= 5) return 'low_stock'
  return 'in_stock'
}

async function fetchProductDetail(categoryId: CategoryId, productId: string): Promise<ProductDetail> {
  if (categoryId === 'tarjetas') {
    const { data, error } = await supabase
      .from('tarjetas')
      .select('id_tarjeta, modelo, precio, cantidad, caja, compatibilidad, observaciones, marcas(descripcion_marca), inventarios(descripcion_inventario), tipos_tarjeta(descripcion_tipo)')
      .eq('id_tarjeta', productId)
      .single()

    if (error) throw error

    const compatibility = data.compatibilidad
      ? data.compatibilidad.split(',').map((s: string) => s.trim()).filter(Boolean)
      : undefined

    return {
      id: String(data.id_tarjeta),
      name: `${(data.marcas as any)?.descripcion_marca ?? ''} ${data.modelo}`.trim(),
      category: 'tarjetas',
      subcategory: (data.tipos_tarjeta as any)?.descripcion_tipo ?? '',
      price: data.precio,
      stock_quantity: data.cantidad,
      sku: data.modelo,
      min_threshold: 5,
      location: {
        box: String(data.caja ?? '—'),
        shelf: (data.inventarios as any)?.descripcion_inventario ?? '—',
      },
      compatibility,
    }
  }

  if (categoryId === 'televisores') {
    const { data, error } = await supabase
      .from('televisores')
      .select('id_televisor, modelo, precio, smart, observaciones, marcas(descripcion_marca), estados(descripcion_estado)')
      .eq('id_televisor', productId)
      .single()

    if (error) throw error

    return {
      id: String(data.id_televisor),
      name: `${(data.marcas as any)?.descripcion_marca ?? ''} ${data.modelo}`.trim(),
      category: 'televisores',
      subcategory: (data.estados as any)?.descripcion_estado ?? '',
      price: data.precio,
      stock_quantity: 1,
      sku: data.modelo,
      min_threshold: 1,
    }
  }

  throw new Error('Categoría no válida')
}

export function ProductDetailPage() {
  const navigate = useNavigate()
  const { categoryId, productId } = useParams<{ categoryId: CategoryId; productId: string }>()

  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [currentQuantity, setCurrentQuantity] = useState(0)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!categoryId || !productId) return
    setLoading(true)
    setError(null)
    fetchProductDetail(categoryId as CategoryId, productId)
      .then((p) => { setProduct(p); setCurrentQuantity(p.stock_quantity) })
      .catch((err) => {
        console.error('fetchProductDetail error:', err)
        setError('No se pudo cargar el producto')
      })
      .finally(() => setLoading(false))
  }, [categoryId, productId])

  const handleSave = async () => {
    if (!product || !categoryId || !productId) return
    setSaving(true)
    setSaveError(null)
    setSaveSuccess(false)
    try {
      if (categoryId === 'tarjetas') {
        const { error: err } = await supabase
          .from('tarjetas')
          .update({ cantidad: currentQuantity })
          .eq('id_tarjeta', productId)
        if (err) throw err
      }
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 2000)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!categoryId || !productId || !product) return
    const confirmed = window.confirm(`¿Eliminar "${product.name}"? Esta acción no se puede deshacer.`)
    if (!confirmed) return
    setDeleting(true)
    try {
      const table = categoryId === 'tarjetas' ? 'tarjetas' : 'televisores'
      const idColumn = categoryId === 'tarjetas' ? 'id_tarjeta' : 'id_televisor'
      const { error: err } = await supabase.from(table).delete().eq(idColumn, productId)
      if (err) throw err
      navigate(-1)
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Error al eliminar')
      setDeleting(false)
    }
  }

  const backButton = (
    <button
      onClick={() => navigate(-1)}
      className="p-2 hover:bg-surface-container-low rounded-full active:scale-95 transition-transform duration-150"
    >
      <span className="material-symbols-outlined text-primary">arrow_back</span>
    </button>
  )

  if (loading) {
    return (
      <div className="bg-background text-on-background min-h-screen">
        <TopAppBar title="Detalles del producto" titlePosition="center" leading={backButton} />
        <div className="flex flex-col items-center justify-center py-xl text-on-surface-variant mt-20">
          <span className="material-symbols-outlined text-5xl opacity-30 animate-spin">progress_activity</span>
          <p className="font-body-md mt-sm">Cargando...</p>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="bg-background text-on-background min-h-screen">
        <TopAppBar title="Detalles del producto" titlePosition="center" leading={backButton} />
        <div className="flex items-center gap-sm bg-error-container text-on-error-container rounded-xl p-md mx-margin-mobile mt-lg">
          <span className="material-symbols-outlined text-error shrink-0">error</span>
          <span className="font-body-md">{error ?? 'Producto no encontrado'}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-background text-on-background min-h-screen pb-32">
      <TopAppBar
        title="Detalles del producto"
        titlePosition="center"
        leading={backButton}
        trailing={
          <button className="p-2 hover:bg-surface-container-low rounded-full active:scale-95 transition-transform duration-150">
            <span className="material-symbols-outlined text-primary">edit</span>
          </button>
        }
      />

      <main className="max-w-4xl mx-auto pb-8">

        <section className="px-margin-mobile pt-lg space-y-xs">
          {product.subcategory && (
            <p className="font-label-sm text-primary uppercase tracking-widest">
              {product.subcategory}
            </p>
          )}
          <h2 className="font-headline-md text-on-surface">{product.name}</h2>
          <p className="font-body-md text-on-surface-variant">${product.price.toFixed(2)}</p>
        </section>

        <section className="px-margin-mobile mt-lg grid grid-cols-1 gap-md">
          <StockLevelCard
            initialQuantity={product.stock_quantity}
            minThreshold={product.min_threshold}
            onUpdate={setCurrentQuantity}
          />
          {product.location && (
            <LocationCard location={product.location} sku={product.sku} id={product.id} />
          )}
        </section>

        {product.compatibility && product.compatibility.length > 0 && (
          <CompatibilitySection models={product.compatibility} />
        )}
      </main>

      <ProductActionBar
        onSave={handleSave}
        onDelete={handleDelete}
        saving={saving}
        success={saveSuccess}
        deleting={deleting}
        error={saveError}
      />
    </div>
  )
}
