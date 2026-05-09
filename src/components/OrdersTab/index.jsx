import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchOrders } from "../../store/actions/ordersActions"
import OrderCard from "../OrderCard"
import style from "./style.module.css"

export default function OrdersTab() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const { list, loading, error } = useSelector(state => state.orders)

  useEffect(() => {
    if (user?.email) {
      dispatch(fetchOrders(user.email))
    }
  }, [dispatch, user?.email])

  return (
    <div className={style.orders}>
      <h2 className={style.title}>Мои заказы</h2>

      {loading && <p className={style.message}>Загрузка заказов...</p>}
      {error && <p className={style.error}>Ошибка: {error}</p>}
      {!loading && !error && list.length === 0 && (
        <p className={style.message}>У вас ещё нет заказов.</p>
      )}

      <div className={style.list}>
        {list.map(order => (
          <OrderCard key={order.order_id} order={order} />
        ))}
      </div>
    </div>
  )
}
