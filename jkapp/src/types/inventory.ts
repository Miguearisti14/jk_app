export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'

export type CategoryId = 'tarjetas' | 'televisores'

export interface Category {
  id: CategoryId
  name: string
  icon: string
  itemCount: number
  imageUrl?: string
  imageAlt?: string
}

export interface InventoryItem {
  id: string
  name: string
  category: CategoryId
  subcategory: string
  price: number
  stock_quantity: number
  sku: string
  compatibility?: string | null
  numero_tarjeta?: string | null
}

export interface ProductLocation {
  box: string
  shelf: string
}

export interface ProductDetail extends InventoryItem {
  min_threshold: number
  compatibility?: string
  location?: ProductLocation
  smart?: boolean | null
  observaciones?: string | null
  numero_tarjeta?: string
  marca?: string | null
}
