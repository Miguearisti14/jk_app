import { useState } from 'react'
import { HomePage } from './pages/home/HomePage'
import { InventoryPage } from './pages/inventory/InventoryPage'
import { InventoryListPage } from './pages/inventory/InventoryListPage'
import { ProductDetailPage } from './pages/product/ProductDetailPage'
import { AddProductPage } from './pages/product/AddProductPage'
import type { CategoryId } from './types/inventory'

type ActivePage = 'home' | 'inventory' | 'inventory-list' | 'product-detail' | 'add-product'

export function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home')
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('tarjetas')

  const handleTabChange = (tab: string) => {
    if (tab === 'dashboard') setActivePage('home')
    if (tab === 'inventory') setActivePage('inventory')
  }

  switch (activePage) {
    case 'inventory':
      return (
        <InventoryPage
          onTabChange={handleTabChange}
          onCategorySelect={(categoryId) => {
            setSelectedCategory(categoryId as CategoryId)
            setActivePage('inventory-list')
          }}
        />
      )
    case 'inventory-list':
      return (
        <InventoryListPage
          categoryId={selectedCategory}
          onBack={() => setActivePage('inventory')}
          onItemClick={() => setActivePage('product-detail')}
          onTabChange={handleTabChange}
        />
      )
    case 'product-detail':
      return <ProductDetailPage onBack={() => setActivePage('inventory-list')} />
    case 'add-product':
      return <AddProductPage onBack={() => setActivePage('home')} />
    default:
      return (
        <HomePage
          onTabChange={handleTabChange}
          onCategorySelect={(categoryId) => {
            setSelectedCategory(categoryId as CategoryId)
            setActivePage('inventory-list')
          }}
          onAddProduct={() => setActivePage('add-product')}
        />
      )
  }
}
