import { API_PRODUCTS } from "./config"

export async function fetchProducts(params = {}) {
  const query = new URLSearchParams()
  if (params.category_id != null) query.set("category_id", params.category_id)
  if (params.min_price != null && params.min_price !== "") query.set("min_price", params.min_price)
  if (params.max_price != null && params.max_price !== "") query.set("max_price", params.max_price)
  if (params.in_stock) query.set("in_stock", "true")
  if (params.sort_by) query.set("sort_by", params.sort_by)
  if (params.sort_direction) query.set("sort_direction", params.sort_direction)
  if (params.skip != null) query.set("skip", params.skip)
  if (params.limit != null) query.set("limit", params.limit)

  const res = await fetch(`${API_PRODUCTS}/api/v1/products?${query}`)
  if (!res.ok) throw new Error("Не удалось загрузить товары")
  return res.json()
}

export async function fetchCategories() {
  const res = await fetch(`${API_PRODUCTS}/api/v1/categories`)
  if (!res.ok) throw new Error("Не удалось загрузить категории")
  return res.json()
}
