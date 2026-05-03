import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Header from "../../components/Header"
import CartItemList from "../../components/CartItemList"
import CartSummary from "../../components/CartSummary"
import style from "./style.module.css"

export default function CartPage() {
  const cartItems = useSelector(state => state.cart)

  if (cartItems.length === 0) {
    return (
      <div className={style.page}>
        <Header />
        <div className={style.empty}>
          <span className={style.emptyIcon}>🛒</span>
          <p className={style.emptyText}>Корзина пуста</p>
          <Link to="/" className={style.emptyLink}>Перейти в каталог</Link>
        </div>
      </div>
    )
  }

  return (
    <div className={style.page}>
      <Header />
      <div className={style.content}>
        <div className={style.main}>
          <h1 className={style.title}>Корзина</h1>
          <CartItemList items={cartItems} />
        </div>
        <CartSummary items={cartItems} />
      </div>
    </div>
  )
}
