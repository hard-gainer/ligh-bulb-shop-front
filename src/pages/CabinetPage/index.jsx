import { useState } from "react"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Header from "../../components/Header"
import ProfileTab from "../../components/ProfileTab"
import OrdersTab from "../../components/OrdersTab"
import style from "./style.module.css"

const TABS = [
  { id: "profile", label: "Профиль" },
  { id: "orders", label: "Мои заказы" },
]

export default function CabinetPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const user = useSelector(state => state.auth.user)

  if (!user) {
    return <Navigate to="/auth" replace />
  }

  return (
    <div className={style.page}>
      <Header />
      <div className={style.content}>
        <aside className={style.sidebar}>
          <div className={style.userInfo}>
            <div className={style.avatar}>👤</div>
            <span className={style.email}>{user.email}</span>
          </div>
          <nav className={style.nav}>
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`${style.navItem} ${activeTab === tab.id ? style.active : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className={style.main}>
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "orders" && <OrdersTab />}
        </main>
      </div>
    </div>
  )
}
