import { useEffect, useState, useCallback } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { apiGetMe } from "../../api/auth"
import { getAdminToken, clearAdminToken } from "../../utils/adminAuth"
import AdminProducts from "./AdminProducts"
import AdminOrders from "./AdminOrders"
import AdminCategories from "./AdminCategories"
import AdminPromos from "./AdminPromos"
import style from "./style.module.css"

const TABS = [
  { id: "products", label: "Товары" },
  { id: "orders", label: "Заказы" },
  { id: "categories", label: "Категории" },
  { id: "promos", label: "Акции" },
]

export default function AdminPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)
  const [activeTab, setActiveTab] = useState("products")

  useEffect(() => {
    async function verifyToken() {
      const storedToken = getAdminToken()
      if (!storedToken) {
        navigate("/admin/login")
        return
      }
      try {
        const userData = await apiGetMe(storedToken)
        if (userData.role !== "ADMIN") {
          clearAdminToken()
          navigate("/admin/login")
          return
        }
        setUser(userData)
      } catch {
        clearAdminToken()
        navigate("/admin/login")
      } finally {
        setChecking(false)
      }
    }
    verifyToken()
  }, [navigate])

  // Читает токен из cookie в момент вызова. Если cookie нет — редиректит и возвращает null.
  const getToken = useCallback(() => {
    const t = getAdminToken()
    if (!t) {
      clearAdminToken()
      dispatch({ type: "admin/setProducts", payload: [] })
      dispatch({ type: "admin/setOrders", payload: [] })
      navigate("/admin/login")
      return null
    }
    return t
  }, [navigate, dispatch])

  function handleLogout() {
    clearAdminToken()
    dispatch({ type: "admin/setProducts", payload: [] })
    dispatch({ type: "admin/setOrders", payload: [] })
    navigate("/admin/login")
  }

  if (checking) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        Проверка доступа...
      </div>
    )
  }

  if (!user) return null

  return (
    <div className={style.layout}>
      <aside className={style.sidebar}>
        <div className={style.logo}>Админ-панель</div>
        <div className={style.userInfo}>
          <span className={style.userEmail}>{user.email}</span>
        </div>
        <nav className={style.nav}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`${style.navBtn} ${activeTab === tab.id ? style.active : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <button className={style.logout} onClick={handleLogout}>
          Выйти
        </button>
      </aside>
      <main className={style.content}>
        {activeTab === "products" && <AdminProducts getToken={getToken} />}
        {activeTab === "orders" && <AdminOrders getToken={getToken} />}
        {activeTab === "categories" && <AdminCategories getToken={getToken} />}
        {activeTab === "promos" && <AdminPromos getToken={getToken} />}
      </main>
    </div>
  )
}
