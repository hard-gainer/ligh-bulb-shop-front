import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import style from "./style.module.css"

export default function UserActions() {
  const cartItems = useSelector(state => state.cart)
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0)
  const user = useSelector(state => state.auth.user)

  return (
    <div className={style.actions}>
      <Link to={user ? "/cabinet" : "/auth"} className={style.action}>
        <span className={style.icon}>👤</span>
        <span className={style.label}>{user ? user.email.split("@")[0] : "Кабинет"}</span>
      </Link>
      <Link to="/cart" className={style.action}>
        <span className={style.icon}>🛒</span>
        <span className={style.label}>Корзина</span>
        {cartCount > 0 && <span className={style.badge}>{cartCount}</span>}
      </Link>
    </div>
  )
}
