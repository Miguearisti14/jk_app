import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import { App as CapApp } from '@capacitor/app'
import { HomePage } from './pages/home/HomePage'
import { InventoryPage } from './pages/inventory/InventoryPage'
import { InventoryListPage } from './pages/inventory/InventoryListPage'
import { ProductDetailPage } from './pages/product/ProductDetailPage'
import { AddProductPage } from './pages/product/AddProductPage'
import { UploadPage } from './pages/upload/UploadPage'
import { ScrollToTop } from './components/layout/ScrollToTop'

export function App() {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handler = CapApp.addListener('backButton', () => {
      if (location.pathname === '/') {
        CapApp.exitApp()
      } else {
        navigate(-1)
      }
    })
    return () => { handler.then(h => h.remove()) }
  }, [location.pathname, navigate])

  return (
    <>
      <ScrollToTop />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/inventory/:categoryId" element={<InventoryListPage />} />
      <Route path="/inventory/:categoryId/:productId" element={<ProductDetailPage />} />
      <Route path="/products/add" element={<AddProductPage />} />
      <Route path="/upload" element={<UploadPage />} />
    </Routes>
    </>
  )
}
