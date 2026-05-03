import style from "./style.module.css"

export default function CheckoutSidebar({ items }) {
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const count = items.reduce((sum, item) => sum + item.qty, 0)

  return (
    <div className={style.sidebar}>
      <h2 className={style.title}>Состав заказа</h2>
      <div className={style.items}>
        {items.map(item => (
          <div key={item.product_id} className={style.item}>
            <span className={style.itemName}>{item.name}</span>
            <span className={style.itemQty}>× {item.qty}</span>
            <span className={style.itemTotal}>
              {(item.price * item.qty).toLocaleString("ru-RU")} ₽
            </span>
          </div>
        ))}
      </div>
      <div className={style.divider} />
      <div className={style.totalRow}>
        <span>Итого ({count} шт.)</span>
        <span className={style.totalPrice}>{total.toLocaleString("ru-RU")} ₽</span>
      </div>
    </div>
  )
}
