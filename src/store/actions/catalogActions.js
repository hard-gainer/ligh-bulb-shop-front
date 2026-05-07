import { fetchProducts, fetchCategories } from "../../api/products"

export function loadProducts(filters = {}) {
  return async function (dispatch) {
    dispatch({ type: "catalog/loading" })
    try {
      const params = {}
      if (filters.categoryId != null) params.category_id = filters.categoryId
      if (filters.minPrice !== "") params.min_price = filters.minPrice
      if (filters.maxPrice !== "") params.max_price = filters.maxPrice
      const products = await fetchProducts(params)
      dispatch({ type: "catalog/setProducts", payload: products })
    } catch (e) {
      dispatch({ type: "catalog/error", payload: e.message })
    }
  }
}

export function loadCategories() {
  return async function (dispatch) {
    try {
      const categories = await fetchCategories()
      dispatch({ type: "catalog/setCategories", payload: categories })
    } catch {
      // не блокируем загрузку каталога при ошибке категорий
    }
  }
}
