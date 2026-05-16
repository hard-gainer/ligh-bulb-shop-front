import { API_PRODUCTS, API_ORDERS } from "./config"

function authHeader(token) {
  return { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
}

export async function apiCreateProduct(token, data) {
  const res = await fetch(`${API_PRODUCTS}/api/v1/products`, {
    method: "POST",
    headers: authHeader(token),
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || "Ошибка создания товара")
  }
  return res.json()
}

export async function apiUpdateProduct(token, productId, data) {
  const res = await fetch(`${API_PRODUCTS}/api/v1/products/${productId}`, {
    method: "PUT",
    headers: authHeader(token),
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || "Ошибка обновления товара")
  }
  return res.json()
}

export async function apiDeleteProduct(token, productId) {
  const res = await fetch(`${API_PRODUCTS}/api/v1/products/${productId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || "Ошибка удаления товара")
  }
  return res.json()
}

export async function apiGetAllOrders(token) {
  const res = await fetch(`${API_ORDERS}/api/v1/orders`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || "Ошибка загрузки заказов")
  }
  return res.json()
}

export async function apiUpdateOrderStatus(token, orderId, status) {
  const res = await fetch(`${API_ORDERS}/api/v1/orders/${orderId}/status`, {
    method: "PATCH",
    headers: authHeader(token),
    body: JSON.stringify({ status }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || "Ошибка обновления статуса заказа")
  }
  return res.json()
}

export async function apiCreateCategory(token, name) {
  const res = await fetch(`${API_PRODUCTS}/api/v1/categories`, {
    method: "POST",
    headers: authHeader(token),
    body: JSON.stringify({ name }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || "Ошибка создания категории")
  }
  return res.json()
}

export async function apiGetAllPromos(token) {
  const res = await fetch(`${API_PRODUCTS}/api/v1/promos`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || "Ошибка загрузки акций")
  }
  return res.json()
}

export async function apiCreatePromo(token, data) {
  const res = await fetch(`${API_PRODUCTS}/api/v1/promos`, {
    method: "POST",
    headers: authHeader(token),
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || "Ошибка создания акции")
  }
  return res.json()
}

export async function apiAddProductToPromo(token, promoId, productId) {
  const res = await fetch(`${API_PRODUCTS}/api/v1/promos/${promoId}/products/${productId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || "Ошибка добавления товара в акцию")
  }
  return res.json()
}

export async function apiRemoveProductFromPromo(token, promoId, productId) {
  const res = await fetch(`${API_PRODUCTS}/api/v1/promos/${promoId}/products/${productId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.detail || "Ошибка исключения товара из акции")
  }
  return res.json()
}
