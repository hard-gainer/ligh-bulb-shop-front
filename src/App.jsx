import { useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useDispatch } from "react-redux"
import CatalogPage from "./pages/CatalogPage"
import AuthPage from "./pages/AuthPage"
import RegisterPage from "./pages/RegisterPage"
import CartPage from "./pages/CartPage"
import CheckoutPage from "./pages/CheckoutPage"
import CabinetPage from "./pages/CabinetPage"
import AdminLoginPage from "./pages/AdminLoginPage"
import AdminPage from "./pages/AdminPage"
import { restoreSession } from "./store/actions/authActions"

function AppRoutes() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(restoreSession())
  }, [dispatch])

  return (
    <Routes>
      <Route path="/" element={<CatalogPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/cabinet" element={<CabinetPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
