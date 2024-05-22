import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import CategoryEdit from './pages/CategoryEdit'
import ProductsEdit from './pages/ProductsEdit'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import CatalogView from './pages/CatalogView'
import CartPage from './pages/CartPage'
import ProfilePage from './pages/ProfilePage'
import DocumentsItemPage from './pages/DocumentsItemPage'
import DocumentsPage from './pages/DocumentsPage'
import NotificationPage from './pages/NotificationPage'
import AgentClinets from './pages/AgentClinets'
import AgentDashboard from './pages/AgentDashboard'
import { useAuth } from './store/useAuthStore'
import { Box } from '@mui/material'
import Users from './pages/Users'
import BottomNavigationMobile from './components/BottomNavigationMobile'
import Header from './components/header'
const RouterApp = () => {
  const { user } = useAuth()
  const isAuthenticated = !!user
  const navigate = useNavigate()
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  return (
    <>
      <Box>
        <Header />
        {/* <Box>
          <Routes>
            <Route>
              <Route path="/" element={<Home />} />
              <Route
                path="/client/:documentType/:lvl1/:lvl2/:lvl3"
                element={<Catalog />}
              />
              <Route path="/CatalogView" element={<CatalogView />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/documentPage/:documentType/:dateFrom/:dateTo"
                element={<DocumentsPage />}
              />
              <Route
                path="/documentItemPage/:documentItemType/:id"
                element={<DocumentsItemPage />}
              />

              <Route
                path="/admin/category-edit/:lvl1/:lvl2"
                element={<CategoryEdit />}
              />
              <Route
                path="/admin/products-edit/:lvl1/:lvl2/:lvl3"
                element={<ProductsEdit />}
              />
              <Route path="/admin/:userRole" element={<Users />} />
              <Route
                path="/admin/notification"
                element={<NotificationPage />}
              />

              <Route path="/agentClients/:agentId" element={<AgentClinets />} />
              <Route
                path="/agentDashboard/:tab/:id"
                element={<AgentDashboard />}
              />
            </Route>
          </Routes>
        </Box>
        <BottomNavigationMobile /> */}
      </Box>
    </>
  )
}

export default RouterApp
