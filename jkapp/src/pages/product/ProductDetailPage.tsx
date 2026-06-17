import { TopAppBar } from '../../components/layout/TopAppBar'
import { FloatingActionButton } from '../../components/ui/FloatingActionButton'
import { ProductHeroImage } from '../../components/product/ProductHeroImage'
import { StockLevelCard } from '../../components/product/StockLevelCard'
import { LocationCard } from '../../components/product/LocationCard'
import { CompatibilitySection } from '../../components/product/CompatibilitySection'
import { ProductActionBar } from '../../components/product/ProductActionBar'
import type { ProductDetail } from '../../types/inventory'

const MOCK_PRODUCT: ProductDetail = {
  id: '3',
  name: 'T-Con Board Sony Bravia',
  category: 'tarjetas',
  subcategory: 'Main Logic Boards',
  price: 45.5,
  stock_quantity: 142,
  stock_status: 'in_stock',
  min_threshold: 25,
  image_url:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA06zolcWCUxVkt3y2ZhOznEk-nTsB43CIwevv0in7ALiu_PMh8F9OvEjoLS5M3D4OVJjNOvmJCtZENAM1-XKLx4Ij10utQKCo0A0HnFb1Qt56nytvH_vtwv9z37FRRdEKUdKK7yv3d2lzuSYNdNy8v85spSX40k8yzQm7fiIcvajyaVYnuAmEbEMjAk1MFQLDAfoAEcWAuN8wBmRjay3dQPeNgt_IA2sUKnjl73Oa9AmsVfY3uJNKdUOfxcCpXn-_0NlW0NkWlWuFC',
  sku: 'SNY-772-TC',
  created_at: '2026-06-13',
  compatibility: ['XBR-55X850D', 'KD-55X8500D', 'XBR-65X850D'],
  location: {
    box: 'B-42',
    shelf: 'Row 14 / D4',
  },
}

interface ProductDetailPageProps {
  onBack?: () => void
  onEdit?: () => void
}

export function ProductDetailPage({ onBack, onEdit }: ProductDetailPageProps) {
  const product = MOCK_PRODUCT

  return (
    <div className="bg-background text-on-background min-h-screen pb-32">
      <TopAppBar
        title="Product Details"
        titlePosition="center"
        leading={
          <button
            onClick={onBack}
            className="p-2 hover:bg-surface-container-low rounded-full active:scale-95 transition-transform duration-150"
          >
            <span className="material-symbols-outlined text-primary">arrow_back</span>
          </button>
        }
        trailing={
          <button
            onClick={onEdit}
            className="p-2 hover:bg-surface-container-low rounded-full active:scale-95 transition-transform duration-150"
          >
            <span className="material-symbols-outlined text-primary">edit</span>
          </button>
        }
      />

      <main className="max-w-4xl mx-auto pb-8">
        <ProductHeroImage
          imageUrl={product.image_url}
          name={product.name}
          stockStatus={product.stock_status}
        />

        <section className="px-margin-mobile pt-lg space-y-xs">
          <p className="font-label-sm text-primary uppercase tracking-widest">
            {product.subcategory}
          </p>
          <h2 className="font-headline-md text-on-surface">{product.name}</h2>
        </section>

        <section className="px-margin-mobile mt-lg grid grid-cols-1 gap-md">
          <StockLevelCard
            initialQuantity={product.stock_quantity}
            minThreshold={product.min_threshold}
          />
          {product.location && (
            <LocationCard location={product.location} sku={product.sku} />
          )}
        </section>

        {product.compatibility && product.compatibility.length > 0 && (
          <CompatibilitySection models={product.compatibility} />
        )}
      </main>

      <FloatingActionButton icon="qr_code_scanner" />
      <ProductActionBar />
    </div>
  )
}
