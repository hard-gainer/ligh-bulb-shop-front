import {
  apiCreateProduct,
  apiUpdateProduct,
  apiDeleteProduct,
  apiGetAllOrders,
  apiUpdateOrderStatus,
  apiCreateCategory,
  apiGetAllPromos,
  apiCreatePromo,
  apiAddProductToPromo,
  apiRemoveProductFromPromo,
} from "../../api/admin"
import { fetchProducts, fetchCategories } from "../../api/products"

export function loadAdminProducts() {
  return async function (dispatch) {
    dispatch({ type: "admin/loading" })
    try {
      const products = await fetchProducts({ limit: 100 })
      dispatch({ type: "admin/setProducts", payload: products })
    } catch (e) {
      dispatch({ type: "admin/error", payload: e.message })
    }
  }
}

export function createProduct(token, data) {
  return async function (dispatch) {
    try {
      const product = await apiCreateProduct(token, data)
      dispatch({ type: "admin/addProduct", payload: product })
      return { success: true }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }
}

export function updateProduct(token, productId, data) {
  return async function (dispatch) {
    try {
      const product = await apiUpdateProduct(token, productId, data)
      dispatch({ type: "admin/updateProduct", payload: product })
      return { success: true }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }
}

export function deleteProduct(token, productId) {
  return async function (dispatch) {
    try {
      await apiDeleteProduct(token, productId)
      dispatch({ type: "admin/removeProduct", payload: productId })
      return { success: true }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }
}

export function loadAdminOrders(token) {
  return async function (dispatch) {
    dispatch({ type: "admin/loading" })
    try {
      const orders = await apiGetAllOrders(token)
      dispatch({ type: "admin/setOrders", payload: orders })
    } catch (e) {
      dispatch({ type: "admin/error", payload: e.message })
    }
  }
}

export function updateOrderStatus(token, orderId, status) {
  return async function (dispatch) {
    try {
      const order = await apiUpdateOrderStatus(token, orderId, status)
      dispatch({ type: "admin/updateOrder", payload: order })
      return { success: true }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }
}

export function loadAdminCategories() {
  return async function (dispatch) {
    try {
      const categories = await fetchCategories()
      dispatch({ type: "admin/setCategories", payload: categories })
    } catch (e) {
      dispatch({ type: "admin/error", payload: e.message })
    }
  }
}

export function createCategory(token, name) {
  return async function (dispatch) {
    try {
      const category = await apiCreateCategory(token, name)
      dispatch({ type: "admin/addCategory", payload: category })
      return { success: true }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }
}

export function loadAdminPromos(token) {
  return async function (dispatch) {
    dispatch({ type: "admin/loading" })
    try {
      const promos = await apiGetAllPromos(token)
      dispatch({ type: "admin/setPromos", payload: promos })
    } catch (e) {
      dispatch({ type: "admin/error", payload: e.message })
    }
  }
}

export function createPromo(token, data) {
  return async function (dispatch) {
    try {
      const promo = await apiCreatePromo(token, data)
      dispatch({ type: "admin/addPromo", payload: promo })
      return { success: true }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }
}

export function addProductToPromo(token, promoId, productId) {
  return async function () {
    try {
      await apiAddProductToPromo(token, promoId, productId)
      return { success: true }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }
}

export function removeProductFromPromo(token, promoId, productId) {
  return async function () {
    try {
      await apiRemoveProductFromPromo(token, promoId, productId)
      return { success: true }
    } catch (e) {
      return { success: false, error: e.message }
    }
  }
}
