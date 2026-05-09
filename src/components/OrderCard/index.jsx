import style from "./style.module.css"

const STATUS_LABELS = {
  CREATED: "Создан",
  SHIPPED: "Отправлен",
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })
}

export default function OrderCard({ order }) {
  const statusLabel = STATUS_LABELS[order.status] || order.status

  return (
    <div className={style.card}>
      <div className={style.header}>
        <span className={style.orderId}>Заказ №{order.order_id}</span>
        <span className={`${style.status} ${style[order.status?.toLowerCase()]}`}>
          {statusLabel}
        </span>
        <span className={style.date}>{formatDate(order.created_at)}</span>
      </div>

      <div className={style.items}>
        {order.items.map((item, i) => (
          <div key={i} className={style.item}>
            <span className={style.itemName}>Товар #{item.product_id}</span>
            <span className={style.itemQty}>{item.qty} шт.</span>
            <span className={style.itemPrice}>{(item.unit_price * item.qty).toFixed(2)} ₽</span>
          </div>
        ))}
      </div>

      <div className={style.footer}>
        <span className={style.address}>{order.delivery_address}</span>
        <span className={style.total}>Итого: {order.total_price.toFixed(2)} ₽</span>
      </div>
    </div>
  )
}
