import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/home/HomePage'
import { InventoryPage } from './pages/inventory/InventoryPage'
import { InventoryListPage } from './pages/inventory/InventoryListPage'
import { ProductDetailPage } from './pages/product/ProductDetailPage'
import { AddProductPage } from './pages/product/AddProductPage'
import { UploadPage } from './pages/upload/UploadPage'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/inventory/:categoryId" element={<InventoryListPage />} />
      <Route path="/inventory/:categoryId/:productId" element={<ProductDetailPage />} />
      <Route path="/products/add" element={<AddProductPage />} />
      <Route path="/upload" element={<UploadPage />} />
    </Routes>
  )
}
