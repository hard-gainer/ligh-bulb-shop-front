import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadAdminOrders, updateOrderStatus } from "../../store/actions/adminActions"
import style from "./style.module.css"

const ORDER_STATUSES = ["CREATED", "SHIPPED"]

export default function AdminOrders({ getToken }) {
  const dispatch = useDispatch()
  const { orders, loading } = useSelector(state => state.admin)
  const [updating, setUpdating] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    const token = getToken()
    if (!token) return
    dispatch(loadAdminOrders(token))
  }, [dispatch, getToken])

  async function handleStatusChange(orderId, status) {
    const token = getToken()
    if (!token) return

    setUpdating(orderId)
    setError("")
    const result = await dispatch(updateOrderStatus(token, orderId, status))
    setUpdating(null)
    if (!result.success) setError(result.error)
  }

  return (
    <div className={style.section}>
      <div className={style.sectionHeader}>
        <h2 className={style.sectionTitle}>Заказы</h2>
      </div>

      {error && <p className={style.error} style={{ marginBottom: 16 }}>{error}</p>}
      {loading && <p>Загрузка...</p>}

      <div className={style.tableWrap}>
        <table className={style.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Дата</th>
              <th>Email</th>
              <th>Телефон</th>
              <th>Адрес</th>
              <th>Сумма</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && !loading && (
              <tr>
                <td colSpan={7} className={style.empty}>Нет заказов</td>
              </tr>
            )}
            {orders.map(order => (
              <tr key={order.order_id}>
                <td>#{order.order_id}</td>
                <td>{order.created_at ? new Date(order.created_at).toLocaleDateString("ru-RU") : "—"}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td style={{ maxWidth: 180, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {order.delivery_address}
                </td>
                <td>{order.total_price} ₽</td>
                <td>
                  <select
                    className={style.statusSelect}
                    value={order.status}
                    disabled={updating === order.order_id}
                    onChange={e => handleStatusChange(order.order_id, e.target.value)}
                  >
                    {ORDER_STATUSES.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
