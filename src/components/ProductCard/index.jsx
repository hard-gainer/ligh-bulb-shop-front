import { useDispatch } from "react-redux"
import style from "./style.module.css"

export default function ProductCard({ product }) {
  const dispatch = useDispatch()
  const inStock = product.stock_qty > 0

  function addToCart() {
    dispatch({
      type: "cart/add",
      payload: {
        product_id: product.product_id,
        name: product.name,
        price: product.price,
      },
    })
  }

  return (
    <div className={style.card}>
      <div className={style.image}>💡</div>
      <div className={style.body}>
        <p className={style.name}>{product.name}</p>
        <div className={style.meta}>
          <span className={style.price}>{product.price.toLocaleString("ru-RU")} ₽</span>
          <span className={inStock ? style.inStock : style.outOfStock}>
            {inStock ? `В наличии: ${product.stock_qty} шт.` : "Нет в наличии"}
          </span>
        </div>
        <button className={style.btn} onClick={addToCart} disabled={!inStock}>
          В корзину
        </button>
      </div>
    </div>
  )
}
