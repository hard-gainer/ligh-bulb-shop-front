import { apiCreateOrder } from "../../api/orders"
import { mockStores } from "../../data/mockData"

export function placeOrder({ contacts, delivery, cartItems }) {
  return async function (dispatch) {
    dispatch({ type: "orders/loading" })
    try {
      let deliveryAddress = ""
      if (delivery.type === "courier") {
        deliveryAddress = delivery.address
      } else {
        const store = mockStores.find(s => s.store_id === delivery.storeId)
        deliveryAddress = store ? `Самовывоз: ${store.name}, ${store.address}` : "Самовывоз"
      }

      const orderData = {
        phone: contacts.phone,
        email: contacts.email,
        delivery_address: deliveryAddress,
        items: cartItems.map(item => ({ product_id: item.product_id, qty: item.qty })),
      }

      const order = await apiCreateOrder(orderData)
      dispatch({ type: "orders/setCurrentOrder", payload: order })
      dispatch({ type: "cart/clear" })
      return { success: true, order }
    } catch (e) {
      dispatch({ type: "orders/error", payload: e.message })
      return { success: false, error: e.message }
    }
  }
}
