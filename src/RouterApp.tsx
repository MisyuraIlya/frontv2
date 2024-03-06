import React, { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import CategoryEdit from './modules/Admin/pages/CategoryEdit'
import ProductsEdit from './modules/Admin/pages/ProductsEdit'
import Clients from './modules/Admin/pages/Clients'
import Orders from './modules/Admin/pages/Orders'
import OrderItemPage from './modules/Admin/pages/OrderItemPage'
import Home from './modules/Home/pages/Home'
import Catalog from './modules/Catalog/pages/Catalog'
import CatalogView from './modules/Catalog/pages/CatalogView'
import CartPage from './modules/Cart/pages/CartPage'
import ProfilePage from './modules/Auth/pages/ProfilePage'
import DocumentsItemPage from './modules/Documents/pages/DocumentsItemPage'
import DocumentsPage from './modules/Documents/pages/DocumentsPage'
import Header from './modules/Header/Header'
import NotificationPage from './modules/PushNotifications/pages/NotificationPage'
import AgentClinets from './modules/Agent/pages/AgentClinets'
import AgentDashboard from './modules/Agent/pages/AgentDashboard'
import Objectives from './modules/Agent/pages/Objectives'
import Target from './modules/Agent/pages/Target'
import Visits from './modules/Agent/pages/Visits'
import AgentsPage from './modules/Admin/pages/AgentsPage'
import { useAuth } from './modules/Auth/store/useAuthStore'
import { Box } from '@mui/material'

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
      <Header />
      <Box sx={{ marginTop: '140px' }}>
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

            {/* <Route
              path="/admin/category-edit/:lvl1/:lvl2/:lvl3"
              element={<CategoryEdit />}
            /> */}
            {/* <Route
              path="/admin/products-edit/:lvl1/:lvl2/:lvl3"
              element={<ProductsEdit />}
            /> */}
            {/* <Route path="/admin/clients" element={<Clients />} /> */}
            {/* <Route path="/admin/approveDoc" element={<Orders />} /> */}
            {/* <Route
              path="/admin/approveDocItems/:id"
              element={<OrderItemPage />}
            /> */}
            {/* <Route path="/admin/notification" element={<NotificationPage />} /> */}
            {/* <Route path="/admin/agents" element={<AgentsPage />} /> */}

            {/* <Route path="/agentClients" element={<AgentClinets />} /> */}
            {/* <Route path="/agentDashboard/:id" element={<AgentDashboard />} /> */}
            {/* <Route path="/objectives/:id" element={<Objectives />} /> */}
            {/* <Route path="/target/:id" element={<Target />} /> */}
            {/* <Route path="/visits/:id" element={<Visits />} /> */}
          </Route>
        </Routes>
      </Box>
    </>
  )
}

export default RouterApp
