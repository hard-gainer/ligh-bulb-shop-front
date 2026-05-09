import { API_ORDERS } from "./config"

export async function apiCreateOrder(orderData) {
  const res = await fetch(`${API_ORDERS}/api/v1/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || "Ошибка оформления заказа")
  }
  return res.json()
}

export async function apiGetOrders(email) {
  const params = new URLSearchParams({ email })
  const res = await fetch(`${API_ORDERS}/api/v1/orders?${params}`)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || "Ошибка загрузки заказов")
  }
  return res.json()
}
