export type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock'

export type CategoryId = 'tarjetas' | 'repuestos' | 'televisores'

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
  stock_status: StockStatus
  image_url?: string
  sku: string
  created_at: string
}

export interface ProductLocation {
  box: string
  shelf: string
}

export interface ProductDetail extends InventoryItem {
  min_threshold: number
  compatibility?: string[]
  location?: ProductLocation
}
