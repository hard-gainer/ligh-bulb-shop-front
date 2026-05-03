import { Link } from "react-router-dom"
import style from "./style.module.css"

export default function CartSummary({ items }) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const count = items.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className={style.summary}>
      <h2 className={style.title}>Итого</h2>
      <div className={style.row}>
        <span>Товары ({count} шт.)</span>
        <span>{total.toLocaleString("ru-RU")} ₽</span>
      </div>
      <div className={style.divider} />
      <div className={style.totalRow}>
        <span>К оплате</span>
        <span className={style.totalPrice}>{total.toLocaleString("ru-RU")} ₽</span>
      </div>
      <Link to="/checkout" className={style.btn}>
        Оформить заказ
      </Link>
    </div>
  )
}
