import { useDispatch } from "react-redux"
import style from "./style.module.css"

export default function CartItem({ item }) {
  const dispatch = useDispatch()

  function setQty(qty) {
    if (qty < 1) {
      dispatch({ type: "cart/remove", payload: item.product_id })
    } else {
      dispatch({ type: "cart/setQty", payload: { product_id: item.product_id, qty } })
    }
  }

  const total = item.price * item.qty

  return (
    <div className={style.item}>
      <div className={style.image}>💡</div>
      <div className={style.info}>
        <p className={style.name}>{item.name}</p>
        <p className={style.price}>{item.price.toLocaleString("ru-RU")} ₽ / шт.</p>
      </div>
      <div className={style.controls}>
        <button className={style.qtyBtn} onClick={() => setQty(item.qty - 1)}>−</button>
        <span className={style.qty}>{item.qty}</span>
        <button className={style.qtyBtn} onClick={() => setQty(item.qty + 1)}>+</button>
      </div>
      <span className={style.total}>{total.toLocaleString("ru-RU")} ₽</span>
      <button
        className={style.removeBtn}
        onClick={() => dispatch({ type: "cart/remove", payload: item.product_id })}
        title="Удалить"
      >
        ✕
      </button>
    </div>
  )
}
